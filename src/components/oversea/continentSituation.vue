<template>
    <div class='continentSituation' style="width: 80%;height: 75%;; display: inline-block;" ref='continentSituation'></div>
</template>

<script>


export default {
  data () {
    return {
      chartInstance: null,
      allData: null,
      currentIndex: 0, // 当前所展示出的一级分类数据
      titleFontSize: 0,
      patientData:{}
    } 
  },
  computed: {
    catName () {
      if (!this.allData) {
        return ''
      } else {
        return this.allData[this.currentIndex].name
      }
    },
    comStyle () {
      return {
        fontSize: this.titleFontSize + 'px',
      }
    },
  },
  mounted () {
    this.initChart()
    this.getData()
    window.addEventListener('resize', this.screenAdapter)
    this.screenAdapter()
  },
  destroyed () {
    window.removeEventListener('resize', this.screenAdapter)
  },
  methods: {
    initChart () {
      this.chartInstance = this.$echarts.init(this.$refs.continentSituation)
      const initOption = {
            tooltip: {
            trigger: 'item'
            },
            legend: {
                top: '15%',
                icon: 'circle',
                orient: 'vertical',
                left: 'right',
                itemHeight: 6,
                textStyle: { //图例文字的样式
                            color: '#fff',
                            fontSize: 16
                        },
            },
            series: [
                {
                name: '现有确诊',
                type: 'pie',
                radius: ['40%', '70%'],
                center: ["30%", "30%"],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                    show: true,
                    fontSize: '40',
                    fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                }
            ]
      }
      this.chartInstance.setOption(initOption)
    },
    async getData () {
      // 获取服务器的数据, 对this.allData进行赋值之后, 调用updateChart方法更新图表
        this.patientData = this.$store.state.mainInformation.globalList
        console.log(this.patientData)
        this.updateChart()
    },
    updateChart () {
      // 处理图表需要的数据
      const legendData = ['亚洲', '欧洲', '非洲', '大洋洲', '北美洲', '南美洲']
      const seriesData = [{
        name: '亚洲',
        value: this.patientData[0].curConfirm,
        
      }, {
        name: '欧洲',
        value: this.patientData[1].curConfirm,
      }, {
        name: '非洲',
        value: this.patientData[2].curConfirm,
      }, {
        name: '大洋洲',
        value: this.patientData[3].curConfirm,
      }, {
        name: '北美洲',
        value: this.patientData[4].curConfirm,
      }, {
        name: '南美洲',
        value: this.patientData[5].curConfirm,
      }
      ]
      const dataOption = {
        legend: {
          data: legendData
        },
        series: [
          {
            label:{ 
            show: true, 
            formatter: function (arg) { 
                        return arg.percent + '%'
                        } 
                },
            data:seriesData
          }
        ]
      }
      this.chartInstance.setOption(dataOption)
    },
    screenAdapter () {
      this.titleFontSize = this.$refs.continentSituation.offsetWidth / 100 * 3.6
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
  },

}
</script>

<style lang='less' scoped>

</style>