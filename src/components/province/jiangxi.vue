<template>
    <div class="jiangxi" style="width: 1000px;height: 800px; display: block;"></div>
</template>

<script>
import * as echarts from 'echarts';
import axios from 'axios';

export default {
    name: 'jiangxiMap',
    data() {
        return {
            cities:[],
        }
    },
    methods: {
        // getData(){
        //     axios.get('https://lab.isaaclin.cn/nCoV/api/area?latest=1&province=江西省').then(
        //         response =>{
        //             console.log('欸嘿')
        //             console.log('drawMap',response.data.results)
        //             response.data.results[0].cities.forEach(item=>{
        //                 this.cities.push({
        //                     name:item.cityName+'市',
        //                     value:item.confirmedCount,
        //                 })
        //             })
        //         }
        //     )
        // //    this.updateChart()
        // },
        async drawMap(){
            this.mCharts = echarts.init(document.querySelector(".jiangxi"))
            await axios.get('https://lab.isaaclin.cn/nCoV/api/area?latest=1&province=江西省').then(
                response =>{
                    response.data.results[0].cities.forEach(item=>{
                        this.cities.push({
                            name:item.cityName+'市',
                            value:item.confirmedCount,
                        })
                    })
                }
            )
            axios.get('http://localhost:5000/api/static/map/province/jiangxi').then(
                response =>{
                    let ret = response.data
                    echarts.registerMap('jiangxiMap', ret)
                    let option = {
                        geo: {
                        type: 'map',
                        map: 'jiangxiMap', // chinaMap需要和registerMap中的第一个参数保持一致
                        roam: true, // 设置允许缩放以及拖动的效果
                        label: {
                            show: true // 展示标签
                        },
                        zoom: 1, // 设置初始化的缩放比例
                        center: [116.358351,27.98385], // 设置地图中心点的坐标
                        
                        },
                        series: [
                        {
                            data: this.cities,
                            // data: [{name:'宜春市',value:100},{name:'赣州',value:200},{name:'吉安',value:300},{name:'抚州',value:400},{name:'上饶',value:500}],
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
                            formatter: '{b}<br/>累计确诊人数：{c}'
                    },
                    }
                    this.mCharts.setOption(option)
                },
                error=>{
                    console.log('请求失败！',error.message)
                }
            )
        },
        // updateChart () {
        //     // 处理图表需要的数据
        //     // 图例的数据
        //     const seriesArr=[
        //     {
        //         data: this.cities,
        //         // data: [{name:'宜春市',value:100},{name:'赣州',value:200},{name:'吉安',value:300},{name:'抚州',value:400},{name:'上饶',value:500}],
        //         geoIndex: 0, // 将空气质量的数据和第0个geo配置关联在一起
        //         type: 'map',
        //         selectedMode:false,
        //     }]
        //     const dataOption = {
        //         series: seriesArr
        //     }
        //     this.mCharts.setOption(dataOption)
        // },

    },
    mounted() {
        setTimeout(() => {
            this.drawMap()
        }, 1000);
    },
    
}


</script>

<style>

</style>