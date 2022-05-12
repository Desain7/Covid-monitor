<template>
    <div class="chinaMap" style="width: 100%;height: 90%; display: block;" ref="chinaMap" @dblclick="revertMap"></div>
</template>

<script>
import axios from 'axios';
import {getProvinceMapInfo} from '../../utils/map_utils.js'

export default {
    name: 'chinaMap',
    data() {
        return {
            chartInstance:null,
            mapData:{},
            allData:null,
            provinceData:null,
        }
    },
    mounted() {
        this.initChart()
        window.addEventListener('resize', this.screenAdapter)
    },
    destroyed() {
        window.removeEventListener('resize', this.screenAdapter)
    },
    methods: {
        async initChart(){
            await axios.get('http://localhost:5000/api/static/map/china').then(
                response => {
                let ret = response.data
                this.$echarts.registerMap('china', ret)
                },
                error=>{
                    console.log('请求失败！',error.message)
                }
            )
            this.chartInstance = this.$echarts.init(this.$refs.chinaMap)
            let initOption = {
                    geo: {
                        type: 'map',
                        map: 'china', // chinaMap需要和registerMap中的第一个参数保持一致
                        roam: true, // 设置允许缩放以及拖动的效果
                        center:undefined,
                        label: {
                            show: true, // 展示标签
                            backgroundColor:'rgb(222,222,222)',
                            borderRadius:5,
                        },
                        itemStyle: {
                            normal: {
                                // 未选中状态
                                color: "rgb(18,35,92)",
                                shadowColor: "#d4dfe9",
                                borderColor: "rgb(60,63,65)",
                                borderWidth: 1,
                                shadowBlur: 1,
                                // shadowOffsetX: -5,
                                // shadowOffsetY: 10,
                            },
                            emphasis: {
                                // 选中样式
                                color: "rgb(42,184,255)", // 地图颜色
                                borderColor: "rgb(255, 255, 255)", // 边框颜色
                            },
                        },
                    zoom: 1, // 设置初始化的缩放比例
                    },
                    scaleLimit: {
                        min: 1,
                        max: 2,
                    },
                    visualMap: {
                    min: 0,
                    inRange: {
                        color: ['white', 'red'] // 控制颜色渐变的范围
                    },
                    continuous:{
                        show:true,
                    },
                    pieces: [
                        {min: 2000}, // 不指定 max，表示 max 为无限大（Infinity）。
                        {min: 500, max: 1999},
                        {min: 100, max: 499},
                        {min: 10, max: 99},
                        {min: 1, max: 9,color:'rgb(253,235,207)'},
                        {min: 0, max: 0,color:'rgb(255,255,255)'},
                    ]
                    },
                    select:false,
                }
                this.chartInstance.setOption(initOption)
                this.getData()
                this.chartInstance.on('click', async arg => {
                    console.log(arg)
                    // arg.name 得到所点击的省份, 这个省份他是中文
                    const provinceInfo = getProvinceMapInfo(arg.name)
                    console.log(provinceInfo)
                    // 需要获取这个省份的地图矢量数据
                    // 判断当前所点击的这个省份的地图矢量数据在mapData中是否存在
                    if (!this.mapData[provinceInfo.key]) {
                    const ret = await axios.get('http://localhost:5000/api/' + provinceInfo.path)
                    this.mapData[provinceInfo.key] = ret.data
                    this.$echarts.registerMap(provinceInfo.key, ret.data)
                    }
                    const changeOption = {
                    geo: {
                        map: provinceInfo.key
                    }
                    }
                    this.chartInstance.setOption(changeOption)
                    this.getProvinceData(arg.name)
                })
        },
        historyMap() {
                            //     timeline: {
                            //     // bottom: '6%',
                            //     label:{
                            //         rotate:45,
                            //     },
                            //     data:[  '2020-01', '2020-02', '2020-03', '2020-04','2020-05', '2020-06',
                            //             '2020-07', '2020-08','2020-09', '2020-10','2020-11', '2020-12',
                            //             '2021-01', '2021-02', '2021-03', '2021-04','2021-05', '2021-06',
                            //             '2021-07', '2021-08','2021-09', '2021-10','2021-11', '2021-12',
                            //             '2022-01', '2022-02', '2022-03', '2022-04','2022-05',
                            //         ],
                            // },
        },
        async getData() {
            await axios.get('http://111.231.75.86:8000/api/provinces/CHN/').then(
                response=> {
                    this.allData = response.data
                    console.log('allData',this.allData)
                },
            )
            this.updateChart()
        },
        updateChart() {
            // 处理图表需要的数据
            // 图例的数据
            const seriesArr = this.allData.map(item => {
                return {
                    name:item.provinceName, 
                    value:item.currentConfirmedCount
                }    
            })
            const dataOption = {
                series: [{
                    type: 'map',
                    selectedMode:false,
                    data: seriesArr,
                    // data: [{name:'宜春市',value:100},{name:'赣州',value:200},{name:'吉安',value:300},{name:'抚州',value:400},{name:'上饶',value:500}],
                    geoIndex: 0, // 将空气质量的数据和第0个geo配置关联在一起
                }],
                tooltip: {
                        trigger: 'item',
                        formatter: '{b}<br/>当前确诊人数：{c}'
                    },
            }
            this.chartInstance.setOption(dataOption)
        },
        async getProvinceData(province){
            province += '省'
            console.log(province)
            await axios.get(`https://lab.isaaclin.cn/nCoV/api/area?latest=1&province=${province}`).then(
                response=> {
                    this.provinceData = response.data.results[0].cities
                },
            )
            this.provinceUpdateChart()
        },
        provinceUpdateChart() {
            // 处理图表需要的数据
            // 图例的数据
            const seriesArr = this.provinceData.map(item => {
                return {
                    name:item.cityName+'市', 
                    value:item.currentConfirmedCount
                }    
            })
            const dataOption = {
                geo:{
                    center:undefined,
                    },
                series: [{
                    type: 'map',
                    selectedMode:false,
                    data: seriesArr,
                    geoIndex: 0,
                }],
                tooltip: {
                        trigger: 'item',
                        formatter: '{b}<br/>当前确诊人数：{c}'
                    },
            }
            this.chartInstance.setOption(dataOption)
        },
        screenAdapter () {
            this.titleFontSize = this.$refs.chinaMap.offsetWidth / 100 * 3.6
            const adapterOption = {
                title: {
                textStyle: {
                    fontSize: this.titleFontSize
                }
                },
                legend: {
                itemWidth: this.titleFontSize,
                itemHeight: this.titleFontSize,
                itemGap: this.titleFontSize / 2,
                textStyle: {
                    fontSize: this.titleFontSize / 2
                }
                },
                series: [
                {
                    radius: this.titleFontSize * 4.5,
                    center: ['50%', '60%']
                }
                ]
            }
            this.chartInstance.setOption(adapterOption)
            this.chartInstance.resize()
        },
        revertMap() {
            const revertOption = {
                geo: {
                map:'china',
                center:undefined,
                }
            }
            this.getData()
            this.chartInstance.setOption(revertOption)
        }
    },


    
}


</script>

<style>

</style>