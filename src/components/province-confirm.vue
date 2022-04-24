<template>
    <div class="provinceConfirm" style="width: 500px;height: 500px; display: block;"></div>
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
        setTimeout(() => {
            this.getData()
            this.initChart()
        }, 1000);
    },
    methods: {
        // 初始化echartInstance对象
        initChart () {
        this.chartInstance = this.$echarts.init(document.querySelector('.provinceConfirm'))
        // 对图表初始化配置的控制
        const initOption = {
            title: {
            text: '中国各地区累计确诊数',
            left: 20,
            top: 20
            },
            grid: {
            top: '20%',
            left: '3%',
            right: '6%',
            bottom: '3%',
            containLabel: true // 距离是包含坐标轴上的文字
            },
            yAxis: {
            type: 'value'
            },
            xAxis: {
            type: 'category',
            axisLabel: {
            color: '#333',
            //  让x轴文字方向为竖向
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
        // 获取服务器的数据
        getData () {
        // http://127.0.0.1:8888/api/seller
        this.$http.get('http://localhost:8080/covid-data/list-total').then(
            response =>{
                this.allData = response.data.data.areaTree[2].children
                this.currentPage = 1
                console.log('446',this.allData)
            },

        ).then( () => {
            this.allData.sort((a, b) => {
                return a.total.confirm - b.total.confirm // 从小到大的排序
            })
            console.log('123',this.allData)
            this.totalPage = this.allData.length % 10 === 0 ? this.allData.length / 10 : this.allData.length / 10 + 1
            this.updateChart()
            }
        )
        // 对数据排序
        
        // 每5个元素显示一页

        // 启动定时器
        this.startInterval()
        },
        // 更新图表
        updateChart () {
        const start = (this.currentPage - 1) * 10
        const end = this.currentPage * 10
        const showData = this.allData.slice(start, end)
        const province = showData.map((item) => {
            return item.name
        })
        const confirm = showData.map((item) => {
            return item.total.confirm
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
    }
}

</script>

<style>

</style>