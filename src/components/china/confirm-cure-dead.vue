<template>
    <div class="multiplyCondition" style="width: 100%;height: 90%; display: inline-block;" ref="multiplyCondition"></div>
</template>

<script>
import axios from 'axios';
import theme from '../../assets/confirm.json';

export default {
    data() {
        return {
            chartInstance:null,
            date:[],
            confirm:[],
            heal:[],
            dead:[],
            input:[],
            timeOut:null,
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
            this.chartInstance = this.$echarts.init(document.querySelector('.multiplyCondition'), 'theme');
            console.log('123123',this.chartInstance);
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
                    rotate: -15,
                    interval: 1,
                }
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                    color: '#fff',
                    },
                },
                legend: {
                    data: ['累计确诊', '累计治愈', '累计死亡', '累计境外输入'],
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
        async getData(){
            await axios.get('http://localhost:8080/covid-data/list-total').then(
                response =>{
                    response.data.data.chinaDayList.forEach(item => {
                        this.date.push(item.date);
                        this.confirm.push(item.total.confirm);
                        this.heal.push(item.total.heal);
                        this.dead.push(item.total.dead);
                        this.input.push(item.total.input);
                    });
                }
            )
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
                    {
                    name: '累计境外输入',
                    type: 'line',
                    emphasis: {
                        focus: 'series'
                    },
                    data: this.input,
                    color: 'rgb(71,109,160)'
                    }
                ], 
            }
            this.chartInstance.setOption(dataOption);
        },
        autoPlay() {
            let option = {
                dataZoom: [
                    {
                        type: 'slider',
                        show: true,
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
                        show: true,
                        yAxisIndex: 0,
                        filterMode: 'empty',
                        width: 12,
                        height: '70%',
                        handleSize: 8,
                        showDataShadow: false,
                        left: '93%'
                    }
                ],
            };

        this.timeOut=setInterval(()=>{
                if (option.dataZoom[0].endValue == this.date.length ) {
                option.dataZoom[0].end = 5;
                option.dataZoom[0].start = 0;
                } else {
                option.dataZoom[0].end = option.dataZoom[0].end + 1;
                option.dataZoom[0].start = option.dataZoom[0].start + 1;
                }
                this.chartInstance.setOption(option);
            },2000)
        },
  
        },
        screenAdapter () {
            this.titleFontSize = this.$refs.multiplyCondition.offsetWidth / 100 * 3.6
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


</script>

<style>


</style>