<template>
    <div class="vaccineCondition" style="width: 500px;height: 500px; display: inline-block;" ref="chinaVaccineCondition"></div>
</template>

<script>
import axios from 'axios';
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
                title:{
                    show:true,
                    text:'全球疫苗接种情况'

                },
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
        async getData(){
            await axios.get('http://localhost:8080/vaccine-data//v1/automation/modules/list?modules=VaccineSituationData').then(
                response =>{
                    console.log('1111',response.data.data.VaccineSituationData);
                    response.data.data.VaccineSituationData.forEach(item => {
                        this.totalVaccinations.push(item.total_vaccinations);
                        this.countries.push(item.country);
                    });
                }
            )
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