<template>
    <div class="confirmLine" style="width: 500px;height: 500px; display: block;"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
    data() {
        return {
            
        }
    },
    mounted() {
        setTimeout(() => {
            this.drawChart()
        }, 1000);
    },
    methods: {
        async drawChart() {
            console.log(this.$store.getters.date)
            let myChart = echarts.init(document.querySelector('.confirmLine'));
            let option = {
                title:{
                    show:true,
                    text:'全国新增确诊人数'

                },
                xAxis: {
                type: 'category',
                data: this.$store.getters.date
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                    data: this.$store.getters.confirm,
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
            option && myChart.setOption(option);
    
        }
    }
}

</script>

<style>

</style>