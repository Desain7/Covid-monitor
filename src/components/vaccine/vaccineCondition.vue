<template>
    <div class="vaccineCondition" style="width: 100%;height: 90%; display: inline-block;" ref="chinaVaccineCondition"></div>
</template>

<script>
import theme from '../../assets/confirm.json';

export default {
    data() {
        return {
            chartInstance:null,
            countries:[],
            totalVaccinations:[],
        }
    },
    mounted() {
        this.initChart()
        this.getData()
        this.autoPlay()
        window.addEventListener('resize', this.screenAdapter)
    },
    destroyed() {
        window.removeEventListener('resize', this.screenAdapter)
    },
    methods: {
        initChart() {
            this.$echarts.registerTheme("theme", theme);
            this.chartInstance = this.$echarts.init(document.querySelector('.vaccineCondition'), 'theme');
            let initOption = {
                xAxis: {
                type: 'category',
                axisLabel: {
                    color: '#fff',
                    rotate: -25,
                    interval: 0,
                }
                },
                yAxis: [
                    {
                        type: 'value',
                        name: '累计接种剂次/万人',
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
                series: [
                    {
                    type: 'line'
                    }
                ], 
                dataZoom: [
                    {
                        type: 'slider',
                        show: false,
                        start: 0,
                        end: 5,
                        handleSize: 6
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
                    formatter: '{b}<br/>已接种剂次：{c}万人'
                },
            };
           this.chartInstance.setOption(initOption);
        },
        getData(){

            this.$store.state.vaccineInformation.forEach(item => {
                this.totalVaccinations.push(item.total_vaccinations);
                this.countries.push(item.country);
            });
            
            
            this.updateChart()
        },
        updateChart() {
            const dataOption = {
                xAxis: {
                type: 'category',
                data: this.countries,
                },
                yAxis: {
                    type: 'value'
                },
                series:[
                    {
                    name: '已接种剂次',
                    type: 'bar',
                    emphasis: {
                        focus: 'series'
                    },
                    data: this.totalVaccinations.map(item =>{
                        return (item / 10000).toFixed(1)}),
                    color: 'rgb(63,177,227)'
                    },
                ], 
            }
            this.chartInstance.setOption(dataOption);
        },
            autoPlay() {
            let option = {
                    dataZoom: [
                        {
                            type: 'slider',
                            show: false,
                            start: 0,
                            end: 5,
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
                };

            this.timeOut=setInterval(()=>{
                    if (option.dataZoom[0].endValue == this.countries.length ) {
                    option.dataZoom[0].end = 5;
                    option.dataZoom[0].start = 0;
                    } else {
                    option.dataZoom[0].end = option.dataZoom[0].end + 1;
                    option.dataZoom[0].start = option.dataZoom[0].start + 1;
                    }
                    this.chartInstance.setOption(option);
                },2000)
            },
        screenAdapter () {
            this.titleFontSize = this.$refs.chinaVaccineCondition.offsetWidth / 100 * 3.6
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
.vaccineCondition{
    display: inline-block;
}

</style>