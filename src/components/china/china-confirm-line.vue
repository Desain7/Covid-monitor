<template>
    <div class="confirmLine" style="width: 100%;height: 100%; display: inline-block;" ref="chinaConfirmLine"></div>
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
            this.chartInstance = this.$echarts.init(document.querySelector('.confirmLine'), 'theme');
            let initOption = {
                xAxis: {
                type: 'category',
                axisLabel: {
                    color: '#333',
                    rotate: -45,
                    interval: 2,
                }
                },
                yAxis: {
                    type: 'value'
                },
                legend: {
                    data: ['新增确诊', '新增境外输入']
                },
                series: [
                    {
                    type: 'line'
                    }
                ], 
                dataZoom: [
                    {
                        type: 'slider',
                        show: true,
                        start: 50,
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
                    colorStops: [{
                        offset: 0, color: 'rgb(255,128,128)' // 0% 处的颜色
                    }, {
                        offset: 1, color: 'rgb(255,0,0)' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                }
            };
           this.chartInstance.setOption(initOption);
        },
        async getData(){
            await axios.get('http://localhost:8080/covid-data/list-total').then(
                response =>{
                    console.log('1111',response.data);
                    response.data.data.chinaDayList.forEach(item => {
                        this.date.push(item.date);
                        this.confirm.push(item.today.confirm);
                        this.input.push(item.today.input);
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
                series:[
                    {
                    name: '新增确诊',
                    type: 'line',
                    emphasis: {
                        focus: 'series'
                    },
                    data: this.confirm,
                    color: 'rgb(255,128,128)'
                    },
                    {
                    name: '新增境外输入',
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
        screenAdapter () {
            this.titleFontSize = this.$refs.chinaConfirmLine.offsetWidth / 100 * 3.6
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