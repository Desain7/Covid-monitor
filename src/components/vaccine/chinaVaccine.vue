<template>
    <div class="chinaVaccine" style="width: 100%;height: 100%; display: inline-block;" ref="chinaVaccine"></div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            chartInstance:null,
            date:[],
            vaccined:[],
            perHundred:[],
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
            this.$echarts.registerTheme("theme");
            this.chartInstance = this.$echarts.init(this.$refs.chinaVaccine, 'theme');
            let initOption = {
                xAxis: {
                type: 'category',
                axisLabel: {
                    color: '#fff',
                    rotate: -25,
                    interval: 1,
                }
                },
                yAxis: [
                     {
                        type: 'value',
                        name: '累计接种剂次/万人',
                        position: 'left',
                        alignTicks: true,
                        axisLine: {
                            show: true,
                            lineStyle: {
                            // color: colors[0]
                            
                            }
                        },
                        axisLabel:{color: '#fff'},
                        scale:true,
                    },
                    {
                        type: 'value',
                        name: '每百人接种',
                        position: 'right',
                        alignTicks: true,
                        axisLine: {
                            show: true,
                            lineStyle: {
                            // color: colors[1]
                            }
                        },
                        axisLabel: {
                            color: '#fff',
                            formatter: '{value}'
                        },
                        scale:true
                    },
                ],
                legend: {
                    data: ['累计接种', '每百人接种'],
                    textStyle: { //图例文字的样式
                            color: '#fff',
                            fontSize: 10
                        },
                },
                series: [
                    {
                        name: '累计接种',
                        type: 'bar',
                        yAxisIndex: 0,
                        data: this.perHundred
                    },
                    {
                        name: '每百人接种',
                        type: 'line',
                        yAxisIndex: 1,
                        data: this.perHundred
                    }
                ], 
                dataZoom: [
                    {
                        type: 'slider',
                        show: false,
                        start: 80,
                        end: 100,
                        handleSize: 8
                    },
                    {
                        type: 'inside',
                        start: 50,
                        end: 100
                    },
                ],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                    type: 'line'
                    },
                },
            };
           this.chartInstance.setOption(initOption);
        },
        async getData(){
            await axios.get('http://localhost:8080/vaccine-data/v1/automation/modules/list?modules=ChinaVaccineTrendData').then(
                response =>{
                    console.log('1111',response.data);
                    response.data.data.ChinaVaccineTrendData.forEach(item => {
                        this.date.push(item.date);
                        this.vaccined.push(item.total_vaccinations / 10000);
                        this.perHundred.push(item.total_vaccinations_per_hundred);
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
                series:[
                    {
                    name: '累计接种',
                    type: 'line',
                    emphasis: {
                        focus: 'series'
                    },
                    data: this.vaccined,
                    color: 'rgb(63,177,227)'
                    },
                    {
                    name: '每百人接种',
                    type: 'line',
                    emphasis: {
                        focus: 'series'
                    },
                    data: this.perHundred,
                    color: 'rgb(44,91,142)'
                    }
                ], 
            }
            this.chartInstance.setOption(dataOption);
        },
        screenAdapter () {
            this.titleFontSize = this.$refs.chinaVaccine.offsetWidth / 100 * 3.6
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