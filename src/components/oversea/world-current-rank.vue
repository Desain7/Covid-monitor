<template>
    <div class="worldCurrentRank" style="width: 500px;height: 500px; display: inline-block;" ref="worldCurrentRank"></div>
</template>

<script>
import axios from 'axios';
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
                    }
                },
                grid: {
                    right: '20%'
                },
                legend: {
                    data: ['现有确诊', '死亡率']
                },
                xAxis: [
                    {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    // prettier-ignore
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
                            // color: colors[0]
                        
                            }
                        },
                    },
                    {
                        type: 'value',
                        name: '死亡率',
                        position: 'right',
                        alignTicks: true,
                        offset: 20,
                        axisLine: {
                            show: true,
                            lineStyle: {
                            // color: colors[1]
                            }
                        },
                        axisLabel: {
                            formatter: '{value} %'
                        }
                    },
                ],
            };
           this.chartInstance.setOption(initOption);
        },
        async getData(){
            await axios.get('http://api.tianapi.com/ncovabroad/index?key=54690b563dc6b1aca2009da3fc100993').then(
                response =>{
                    this.allData = response.data.newslist
                    console.log('allDataGlo111',this.allData)
                }
            ).then( () => {
                    this.allData.sort((a, b) => {
                        return a.currentConfirmedCount - b.currentConfirmedCount // 从小到大的排序
                    })
                    console.log('123',this.allData)
                    this.updateChart()
                    }
                )
        },
        updateChart() {
            const rankData = this.allData.slice(this.allData.length - 11, this.allData.length - 1)
            const province = rankData.map((item) => {
            return item.provinceName
            })
            const currentConfirmedCount = rankData.map((item) => {
            return item.currentConfirmedCount
            })
            const deadRate = rankData.map((item) => {
            return item.deadRate
            })
            const dataOption = {
                xAxis: {
                type: 'category',
                data: province,
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                    name: '现有确诊',
                    type: 'bar',
                    yAxisIndex: 0,
                    data: currentConfirmedCount
                    },
                    {
                    name: '死亡率',
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