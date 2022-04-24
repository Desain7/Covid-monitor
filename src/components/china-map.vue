<template>
    <div class="chinaMap" style="width: 1000px;height: 800px; display: block;"></div>
</template>

<script>
import * as echarts from 'echarts';
import axios from 'axios';

export default {
    name: 'chinaMap',
    data() {
        return {
            
        }
    },
    methods: {
        drawMap(){
            let mCharts = echarts.init(document.querySelector(".chinaMap"))
            axios.get('http://localhost:5000/api/static/map/china').then(
                response => {
                let ret = response.data
                echarts.registerMap('chinaMap', ret)
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
                }
                mCharts.setOption(option)
                },
                error=>{
                    console.log('请求失败！',error.message)
                }
            )
        }
    },
    mounted() {
        setTimeout(() => {
            this.drawMap()
            console.log(this.$store.getters.chinaProvince)
        }, 1000);
    },
    
}


</script>

<style>

</style>