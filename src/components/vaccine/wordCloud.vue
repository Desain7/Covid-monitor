<template>
    <div class="vaccineWordCloud" style="width: 90%;height: 80%; display: inline-block;" ref="vaccineWordCloud"></div>
</template>

<script>

export default {
    data() {
        return {
            chartInstance:null,

        }
    },
    mounted() {
        this.initChart()
        // this.getData()
        window.addEventListener('resize', this.screenAdapter)
    },
    destroyed() {
        window.removeEventListener('resize', this.screenAdapter)
    },
    methods: {
        initChart() {
            this.chartInstance = this.$echarts.init(this.$refs.vaccineWordCloud, 'theme');
            let initOption = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}<br/>接种国家：{c}'
                    },
                series: [ {
                    type: 'wordCloud',
                    gridSize: 2,
                    sizeRange: [20, 40],
                    shape: 'pentagon',
                    rotationRange: [0, 12],
                    rotationStep: 45,
                    drawOutOfBound: true,
                    textStyle: {
                        color: function () {
                            return 'rgb(' + [
                                Math.round(Math.random() * 160),
                                Math.round(Math.random() * 160),
                                Math.round(Math.random() * 160)
                            ].join(',') + ')';
                        }
                    },
                    emphasis: {
                        textStyle: {
                            shadowBlur: 10,
                            shadowColor: '#333'
                        }
                    },
                    data: [
                        {
                            name: '国药/北京',
                            value: 88,
                        },
                        {
                            name: '国药/武汉',
                            value: 2
                        },
                        {
                            name: '科兴生物',
                            value: 55
                        },
                        {
                            name: '智飞生物',
                            value: 2
                        },
                        {
                            name: '强生',
                            value: 92
                        },
                        {
                            name: '莫德纳',
                            value: 90
                        },
                        {
                            name: '辉瑞/BioNTech',
                            value: 148
                        },
                        {
                            name: 'Novavax',
                            value: 10
                        },
                        {
                            name: '牛津/阿斯利康',
                            value: 178
                        },
                        {
                            name: '卫星-V',
                            value: 60
                        },
                    
                    ]
                } ]
                
            };
           this.chartInstance.setOption(initOption);
        },
        async getData(){
            this.updateChart()
        },
        updateChart() {
            // const dataOption = {
               
                
            // }
            // this.chartInstance.setOption(dataOption);
        },
        screenAdapter () {
            this.titleFontSize = this.$refs.vaccineWordCloud.offsetWidth / 100 * 3.6
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
.vaccineWordCloud{
    display: inline-block;
}

</style>