<template>
    <div class="worldSituation" style="width: 100%;height: 90%; display: inline-block;" ref="worldSituation"></div>
</template>

<script>

import theme from '../../assets/confirm.json';

export default {
    data() {
        return {
            chartInstance:null,
            date:[],
            confirm:[],
            heal:[],
            dead:[],
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
        initChart() {
            this.$echarts.registerTheme("theme", theme);
            this.chartInstance = this.$echarts.init(this.$refs.worldSituation, 'theme');
            let initOption = {
                  grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                type: 'category',
                axisLabel: {
                    color: '#fff',
                    rotate: -45,
                    interval: 1,
                }
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                    color: '#fff',
                    }
                    
                },
                legend: {
                    data: ['累计确诊', '累计治愈', '累计死亡'],
                    textStyle: { //图例文字的样式
                            color: '#fff',
                            fontSize: 16
                        },
                },
                series: [
                    {
                    type: 'line'
                    }
                ], 
                dataZoom: [
                    {
                        type: 'slider',
                        show: false,
                        start: 75,
                        end: 100,
                        handleSize: 8
                    },
                    {
                        type: 'inside',
                        start: 50,
                        end: 100
                    },
                    {
                        type: 'slider',
                        show: false,
                        yAxisIndex: 0,
                        filterMode: 'empty',
                        width: 12,
                        height: '70%',
                        handleSize: 8,
                        showDataShadow: false,
                        left: '93%'
                    }
                ],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                    type: 'line'
                    },
                },
                color:{
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    global: false // 缺省为 false
                }
            };
           this.chartInstance.setOption(initOption);
        },
        getData(){
            this.date = this.$store.state.mainInformation.allForeignTrend.updateDate
            this.confirm = this.$store.state.mainInformation.allForeignTrend.list[0].data
            this.heal = this.$store.state.mainInformation.allForeignTrend.list[1].data
            this.dead = this.$store.state.mainInformation.allForeignTrend.list[2].data
            
            this.updateChart()
        },
        
        updateChart() {
            const dataOption = {
                xAxis: {
                type: 'category',
                data: this.date,
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                    name: '累计确诊',
                    type: 'line',
                    emphasis: {
                        focus: 'series'
                    },
                    data: this.confirm,
                    color: 'rgb(255,128,128)'
                    },
                    {
                    name: '累计治愈',
                    type: 'line',
                    emphasis: {
                        focus: 'series'
                    },
                    data: this.heal,
                    color: 'rgb(16,174,181)'
                    },
                    {
                    name: '累计死亡',
                    type: 'line',
                    emphasis: {
                        focus: 'series'
                    },
                    data: this.dead,
                    color: 'rgb(77,80,84)'
                    },
                ], 
            }
            this.chartInstance.setOption(dataOption);
        },
        screenAdapter () {
            this.titleFontSize = this.$refs.worldSituation.offsetWidth / 100 * 3.6
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

    }
}

</script>

<style>


</style>