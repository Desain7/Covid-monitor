<template>
    <div class="chinaMap" style="width: 1000px;height: 800px; display: block;"></div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'chinaMap',
    data() {
        return {
            chartInstance:null,

        }
    },
    mounted() {
        this.initChart()
        this.getData()
        window.addEventListener('resize', this.screenAdapter)
    },
    destroyed() {
        window.removeEventListener('resize', this.screenAdapter)
    },
    methods: {
        initChart(){
            this.chartInstance = this.$echarts.init(document.querySelector(".chinaMap"))
            axios.get('http://localhost:5000/api/static/map/china').then(
                response => {
                let ret = response.data
                this.$echarts.registerMap('chinaMap', ret)
                let option = {
                    geo: {
                    type: 'map',
                    map: 'chinaMap', // chinaMap需要和registerMap中的第一个参数保持一致
                    roam: true, // 设置允许缩放以及拖动的效果
                    label: {
                        show: true, // 展示标签
                        backgroundColor:'rgb(222,222,222)',
                        borderRadius:5,
                    },
                    zoom: 1, // 设置初始化的缩放比例
                    center: [108, 34], // 设置地图中心点的坐标
                    
                    },
                    series: [
                    {
                        data: this.$store.getters.chinaProvince,
                        geoIndex: 0, // 将空气质量的数据和第0个geo配置关联在一起
                        type: 'map',
                        selectedMode:false,
                    }
                    ],
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
                    ]
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{b}<br/>新增确诊人数：{c}'
                    },
                    select:false,
                    timeline: {
                                // bottom: '6%',
                                label:{
                                    rotate:45,
                                },
                                data:[  '2020-01', '2020-02', '2020-03', '2020-04','2020-05', '2020-06',
                                        '2020-07', '2020-08','2020-09', '2020-10','2020-11', '2020-12',
                                        '2021-01', '2021-02', '2021-03', '2021-04','2021-05', '2021-06',
                                        '2021-07', '2021-08','2021-09', '2021-10','2021-11', '2021-12',
                                        '2022-01', '2022-02', '2022-03', '2022-04','2022-05',
                                    ],
                            },
                }
                this.chartInstance.setOption(option)
                },
                error=>{
                    console.log('请求失败！',error.message)
                }
            )
        },
        getData() {

        },
        updateChart() {

        },
        screenAdapter() {

        },
    },

    
}


</script>

<style>

</style>