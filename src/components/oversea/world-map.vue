<template>
    <div class="globalMap" style="width: 1000px;height: 800px; display: block;" ref="globalMap"></div>
</template>

<script>
import axios from 'axios';
import {formatWorldMapToZH} from '../../utils/worldFormat.js';

export default {
    name: 'globalMap',
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
            await axios.get('http://localhost:5000/api/static/map/world').then(
                response => {
                let ret = response.data
                ret = formatWorldMapToZH(ret);
                console.log('oklll')
                this.$echarts.registerMap('global', ret)
                },
                error=>{
                    console.log('请求失败！',error.message)
                }
            )
            this.chartInstance = this.$echarts.init(document.querySelector(".globalMap"))
            console.log(111,this.chartInstance)
            let initOption = {
                    title: {
                        text: '全球现有确诊人数',
                        left: 20,
                        top: 20
                    },
                    geo: {
                        type: 'map',
                        map: 'global', // chinaMap需要和registerMap中的第一个参数保持一致
                        roam: true, // 设置允许缩放以及拖动的效果
                        center:undefined,
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
                        {min: 1000000}, // 不指定 max，表示 max 为无限大（Infinity）。
                        {min: 100000, max: 999999},
                        {min: 10000, max: 99999},
                        {min: 100, max: 9999},
                        {min: 1, max: 99,color:'rgb(253,235,207)'},
                    ]
                    },
                    select:false,
                }
            this.chartInstance.setOption(initOption)
            this.getData()
            // this.chartInstance.on('click', async arg => {
            //     console.log(arg)
            //     // arg.name 得到所点击的省份, 这个省份他是中文
            //     const provinceInfo = getProvinceMapInfo(arg.name)
            //     console.log(provinceInfo)
            //     // 需要获取这个省份的地图矢量数据
            //     // 判断当前所点击的这个省份的地图矢量数据在mapData中是否存在
            //     if (!this.mapData[provinceInfo.key]) {
            //     const ret = await axios.get('http://localhost:5000/api/' + provinceInfo.path)
            //     this.mapData[provinceInfo.key] = ret.data
            //     this.$echarts.registerMap(provinceInfo.key, ret.data)
            //     }
            //     const changeOption = {
            //     geo: {
            //         map: provinceInfo.key
            //     }
            //     }
            //     this.chartInstance.setOption(changeOption)
            //     this.getProvinceData(arg.name)
            // })
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
            await axios.get('http://api.tianapi.com/ncovabroad/index?key=54690b563dc6b1aca2009da3fc100993').then(
                response=> {
                    this.allData = response.data.newslist
                    console.log('allDataGlo',this.allData)
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
            console.log(123,this.chartInstance)
            this.chartInstance.setOption(dataOption)
        },
        screenAdapter() {

        },
    },

    
}


</script>

<style>

</style>