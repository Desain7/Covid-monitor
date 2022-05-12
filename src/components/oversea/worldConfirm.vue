<template>
    <div class="worldConfirm" style="width: 100%;height: 100%; display: inline-block;" ref="worldConfirm"></div>
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
            this.chartInstance = this.$echarts.init(this.$refs.worldConfirm, 'theme');
            let initOption = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                    type: 'cross'
                    },
                    formatter: '{b}<br/>新增确诊：{c}'
                },
                color:[{
                    type: 'linear',
                    x: 0,
                    y: 1,
                    x2: 0,
                    y2: 0,
                    colorStops: [{
                        offset: 0, color: 'rgb(255,128,128)' // 0% 处的颜色
                    },],
                    global: false // 缺省为 false
                },
                {color: 'rgb(0,255,0)'}
                ],
                xAxis: [
                    {
                    axisLabel: {
                        color: '#fff',
                        interval: 0,
                    },
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
                        name: '新增确诊',
                        position: 'left',
                        alignTicks: true,
                        axisLabel: {
                            color: '#fff',
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                            // color: colors[0]
                        
                            }
                        },
                    },
                ],
            };
           this.chartInstance.setOption(initOption);
        },
        getData(){
            this.allData = this.$store.state.mainInformation.topAddCountry
            console.log('123',this.allData)
            this.updateChart()
                
        },
        updateChart() {
            const province = this.allData.map((item) => {
            return item.name
            })
            const currentConfirmedCount = this.allData.map((item) => {
            return item.value
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
                    name: '新增确诊',
                    type: 'bar',
                    yAxisIndex: 0,
                    data: currentConfirmedCount,
                    markPoint:{
                        label:{color:'#fff'},
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
                ]
            }
            this.chartInstance.setOption(dataOption);
        },
        screenAdapter () {
            this.titleFontSize = this.$refs.worldConfirm.offsetWidth / 100 * 3.6
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