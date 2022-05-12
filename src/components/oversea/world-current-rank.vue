<template>
    <div class="worldCurrentRank" style="width: 100%;height: 90%; display: inline-block;" ref="worldCurrentRank"></div>
</template>

<script>
import theme from '../../assets/confirm.json';

export default {
    data() {
        return {
            chartInstance:null,
            allData:null,
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
            this.chartInstance = this.$echarts.init(document.querySelector('.worldCurrentRank'), 'theme');
            let initOption = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                    type: 'cross'
                    },
                    formatter: '{b}<br/>现有确诊：{c} <br/>致死率：{c1}%'
                },
                legend: {
                    data: ['现有确诊', '致死率'],
                    textStyle: { //图例文字的样式
                            color: '#fff',
                            fontSize: 16
                        },
                },
                xAxis: [
                    {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    data: []
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '现有确诊',
                        position: 'left',
                        alignTicks: true,
                        axisLine: {
                            show: true,
                            lineStyle: {
                            }
                        },
                    },
                    {
                        type: 'value',
                        name: '致死率',
                        position: 'right',
                        alignTicks: true,
                        axisLine: {
                            show: true,
                            lineStyle: {
                            }
                        },
                        axisLabel: {
                            formatter: '{value}%'
                        }
                    },
                ],
            };
           this.chartInstance.setOption(initOption);
        },
        getData(){
            this.allData = this.$store.state.mainInformation.caseOutsideList
            this.allData.sort((a, b) => {
                return a.curConfirm - b.curConfirm // 从小到大的排序
            })
            console.log('123',this.allData)
            this.updateChart()
                
        },
        updateChart() {
            const rankData = this.allData.slice(this.allData.length - 11, this.allData.length - 1)
            const province = rankData.map((item) => {
            return item.area
            })
            const currentConfirmedCount = rankData.map((item) => {
            return item.curConfirm
            })
            const deadRate = rankData.map((item) => {
            return parseFloat(item.diedPercent)
            })
            const dataOption = {
                xAxis: {
                type: 'category',
                data: province,
                axisLabel: {
                    color: '#fff',
                    interval: 0,
                    }
                },
                yAxis: [
                    {type: 'value',
                    axisLabel: {
                        color: '#fff',
                    }
                    },
                    {type: 'value',
                    axisLabel: {
                        color: '#fff',
                    }
                    },
                    
                ],
                series: [
                    {
                        name: '现有确诊',
                        type: 'bar',
                        yAxisIndex: 0,
                        data: currentConfirmedCount,
                        markPoint:{
                            data: [
                                {
                                    type: 'max',
                                    name: '最大值',
                                },	
                                {
                                    type: 'min',
                                    name: '最小值',
                                },
                            ]
                        }
                    },
                    {
                    name: '致死率',
                    type: 'line',
                    yAxisIndex: 1,
                    data: deadRate
                    
                    }
                ]
            }
            this.chartInstance.setOption(dataOption);
        },
        screenAdapter () {
            this.titleFontSize = this.$refs.worldCurrentRank.offsetWidth / 100 * 3.6
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
.confirmLine{
    display: inline-block;
}

</style>