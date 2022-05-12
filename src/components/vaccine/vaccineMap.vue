<template>
    <div class="vaccineMap" style="width: 100%;height: 90%; display: block;" ref="vaccineMap"></div>
</template>

<script>
import axios from 'axios';
import {formatWorldMapToZH} from '../../utils/worldFormat.js';

export default {
    name: 'vaccineMap',
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
            this.chartInstance = this.$echarts.init(this.$refs.vaccineMap)
            let initOption = {
                    geo: {
                        type: 'map',
                        map: 'global', // chinaMap需要和registerMap中的第一个参数保持一致
                        roam: true, // 设置允许缩放以及拖动的效果
                        center:undefined,
                        itemStyle: {
                            normal: {
                                // 未选中状态
                                color: "rgb(18,35,92)",
                                shadowColor: "#d4dfe9",
                                borderColor: "rgb(40,176,247)",
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
                    },
                    scaleLimit: {
                        min: 1.2,
                        max: 2,
                    },
                    visualMap: {
                    min: 0,
                    inRange: {
                        color: ['white', 'rgb(44,91,142)'] // 控制颜色渐变的范围
                    },
                    continuous:{
                        show:true,
                    },
                    textStyle: { //图例文字的样式
                            color: '#fff',
                            fontSize: 16
                    },
                    pieces: [
                        {min: 100000000}, // 不指定 max，表示 max 为无限大（Infinity）。
                        {min: 10000000, max: 99999999},
                        {min: 1000000, max: 9999999},
                        {min: 10000, max: 999999},
                        {min: 1, max: 99,color:'rgb(253,235,207)'},
                    ]
                    },
                    select:false,
                }
            this.chartInstance.setOption(initOption)
            this.getData()
        },
        getData() {
            this.allData = this.$store.state.vaccineInformation;
            
            this.updateChart()
        },
        updateChart() {
            // 处理图表需要的数据
            // 图例的数据
            const seriesArr = this.allData.map(item => {
                if(item.country === '格陵兰'){
                    return {
                    name:'格陵兰岛', 
                    value:item.total_vaccinations
                } 
                }
                if(item.country === '蒙古'){
                    return {
                    name:'蒙古国', 
                    value:item.total_vaccinations
                }
                }
                return {
                    name:item.country, 
                    value:item.total_vaccinations
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
                        formatter: '{b}<br/>当前接种剂次:{c}'
                    },
            }
            this.chartInstance.setOption(dataOption)
        },
            screenAdapter () {
                this.titleFontSize = this.$refs.vaccineMap.offsetWidth / 100 * 3.6
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
    },

    
}


</script>

<style>

</style>