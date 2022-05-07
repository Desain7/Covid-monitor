<template>
    <div class="globalMap" style="width: 100%;height: 90%; display: block;" ref="globalMap"></div>
</template>

<script>
import axios from 'axios';
import {formatWorldMapToZH} from '../../utils/worldFormat.js';

export default {
    name: 'globalMap',
    data() {
        return {
            chartInstance:null,
            allData:null,
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
        getData() {
            this.allData = this.$store.state.overseaData
            console.log('allDataGlo',this.allData)
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
                    geoIndex: 0,
                }],
                tooltip: {
                        trigger: 'item',
                        formatter: '{b}<br/>当前确诊人数:{c}'
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