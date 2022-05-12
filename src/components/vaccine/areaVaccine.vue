<template>
    <div class="areaVaccine" style="width: 100%;height: 90%; display: inline-block;" ref="areaVaccine"></div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            chartInstance:null,
            date:[],
            allData:null
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
            this.chartInstance = this.$echarts.init(this.$refs.areaVaccine, 'theme');
            let initOption = {
                xAxis: {
                type: 'category',
                axisLabel: {
                    color: '#333',
                    rotate: -45,
                    interval: 2,
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
                            formatter: '{value}'
                        },
                        scale:true
                    },
                ],
                dataZoom: [
                    {
                        type: 'slider',
                        show: true,
                        start: 50,
                        end: 100,
                        handleSize: 8
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
            await axios.get('http://localhost:8080/vaccine-data/v1/automation/modules/list?modules=VaccineTrendData').then(
                response =>{
                    console.log('1111',response.data);
                    this.allData = response.data.data.VaccineTrendData.totalTrend
                    response.data.data.VaccineTrendData.totalTrend.中国.forEach(item => {
                        this.date.push(item.date);
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
                yAxis:{
                    legend: {
                        data: ['中国', '印度', '德国', '日本', '欧盟', '美国']
                    },
                },
                series: [
                    {
                        name: '中国',
                        type: 'line',
                        yAxisIndex: 0,
                        data: this.allData.中国.map(item => item.total_vaccinations / 10000),
                    },
                    {
                        name: '印度',
                        type: 'line',
                        data: this.allData.印度.map(item => item.total_vaccinations / 10000)
                    },
                    {
                        name: '德国',
                        type: 'line',
                        data: this.allData.德国.map(item => item.total_vaccinations / 10000)
                    },
                    {
                        name: '日本',
                        type: 'line',
                        data: this.allData.日本.map(item => item.total_vaccinations / 10000)
                    },
                    {
                        name: '欧盟',
                        type: 'line',
                        data: this.allData.欧盟.map(item => item.total_vaccinations / 10000)
                    },
                    {
                        name: '美国',
                        type: 'line',
                        data: this.allData.美国.map(item => item.total_vaccinations / 10000)
                    }
                ], 
            }
            this.chartInstance.setOption(dataOption);
        },
        screenAdapter () {
            this.titleFontSize = this.$refs.areaVaccine.offsetWidth / 100 * 3.6
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