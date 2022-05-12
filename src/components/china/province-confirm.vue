<template>
    <div class="provinceConfirm" style="width: 100%;height: 90%; display: inline-block;" ref="provinceConfirm"></div>
</template>

<script>

export default {
    data() {
        return {
            chartInstance: null,
            allData: null, // 服务器返回的数据
            currentPage: 1, // 当前显示的页数
            totalPage: 0, // 一共有多少页
            timerId: null // 定时器的标识
        }
    },
    mounted() {
        this.initChart()
        this.getData()
        window.addEventListener('resize', this.screenAdapter)
    },
    destroyed() {
        clearInterval(this.timerId)
        window.removeEventListener('resize', this.screenAdapter)
    },
    methods: {
        // 初始化echartInstance对象
        initChart () {
        this.chartInstance = this.$echarts.init(document.querySelector('.provinceConfirm'))
        // 对图表初始化配置的控制
        const initOption = {
            grid: {
                top: '20%',
                left: '3%',
                right: '6%',
                bottom: '3%',
                containLabel: true // 距离是包含坐标轴上的文字
            },
            yAxis: {
            type: 'value',
            axisLabel: {
                    color: '#fff',
                },
            },
            xAxis: {
                type: 'category',
                axisLabel: {
                color: '#fff',
                interval: 0,
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'line',
                    z: 0,
                    lineStyle: {
                    color: '#2D3443'
                    }
            }
            },
            series: [
            {
                type: 'bar',
                label: {
                show: true,
                position: 'top',
                },
                barWidth: '40%',
                itemStyle: {
                // 指明颜色渐变的方向
                // 指明不同百分比之下颜色的值
                color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    // 百分之0状态之下的颜色值
                    {
                    offset: 0,
                    color: 'rgb(255,128,128)'
                    },
                    // 百分之100状态之下的颜色值
                    {
                    offset: 1,
                    color: 'rgb(255,0,0)'
                    }
                ]),
                borderRadius:[10, 10, 0, 0]
                }
            }
            ]
        }
        this.chartInstance.setOption(initOption)
        // 对图表对象进行鼠标事件的监听
        this.chartInstance.on('mouseover', () => {
            clearInterval(this.timerId)
        })
        this.chartInstance.on('mouseout', () => {
            this.startInterval()
        })
        },
        async getData() {
            // if (!this.getLocalData('china')) {
            //初次请求数据
                await this.$http.get('http://111.231.75.86:8000/api/provinces/CHN/').then(
                    response => {
                    this.allData = response.data; // 使用数据
                    // this.setLocalData('china'); // 缓存数据
                    console.log('new api',this.allData);
                }).then( () => {
                    this.allData.sort((a, b) => {
                        return a.confirmedCount - b.confirmedCount // 从小到大的排序
                    })
                    console.log('123',this.allData)
                    this.totalPage = this.allData.length % 10 === 0 ? this.allData.length / 10 : this.allData.length / 10 + 1
                    this.updateChart()
                    }
                )
            // }
            this.startInterval()
        },
        // 更新图表
        updateChart () {
        const start = (this.currentPage - 1) * 10
        const end = this.currentPage * 10
        const showData = this.allData.slice(start, end)
        const province = showData.map((item) => {
            return item.provinceName
        })
        const confirm = showData.map((item) => {
            return item.confirmedCount
        })
        const dataOption = {
            xAxis: {
            data: province
            },
            series: [
            {
                data: confirm
            }
            ]
        }
        this.chartInstance.setOption(dataOption)
        },
        startInterval () {
        if (this.timerId) {
            clearInterval(this.timerId)
        }
        this.timerId = setInterval(() => {
            this.currentPage++
            if (this.currentPage > this.totalPage) {
            this.currentPage = 1
            }
            this.updateChart()
        }, 3000)
        },
        screenAdapter () {
            this.titleFontSize = this.$refs.provinceConfirm.offsetWidth / 100 * 3.6
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

<style scoped>
</style>