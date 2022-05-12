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
                    color: '#333',
                    rotate: -45,
                    interval: 2,
                }
                },
                yAxis: {
                    type: 'value'
                },
                // legend: {
                //     data: ['新增确诊', '新增境外输入']
                // },
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
                    data: this.totalVaccinations,
                    color: 'rgb(63,177,227)'
                    },
                    // {
                    // name: '新增境外输入',
                    // type: 'line',
                    // emphasis: {
                    //     focus: 'series'
                    // },
                    // data: this.input,
                    // color: 'rgb(71,109,160)'
                    // }
                ], 
            }
            this.chartInstance.setOption(dataOption);
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