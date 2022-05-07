<template>
    <div class='com-chart' style="width: 100%;height: 90%; display: inline-block;" ref='patientType'></div>
</template>

<script>

import axios from 'axios';

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
    // window.addEventListener('resize', this.screenAdapter)
    // this.screenAdapter()
  },
  destroyed () {
    // window.removeEventListener('resize', this.screenAdapter)
  },
  methods: {
    initChart () {
      this.chartInstance = this.$echarts.init(this.$refs.patientType)
      const initOption = {
        legend: {
          top: '15%',
          icon: 'circle',
          orient: 'vertical',
          left: 'right',
        },
        tooltip: {
          show: true,
          
        },
        series: [
          {
            type: 'pie',
            radius : '35%',
            center: ['50%', '60%'],
            emphasis: {
              label: {
                show: true
              },
              emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                },
              labelLine: {
                show: false
              }
            }
          }
        ]
      }
      this.chartInstance.setOption(initOption)
    },
    async getData () {
      // 获取服务器的数据, 对this.allData进行赋值之后, 调用updateChart方法更新图表
      await axios.get('http://api.tianapi.com/ncov/index?key=54690b563dc6b1aca2009da3fc100993').then(
                response => {
                   this.patientData = response.data.newslist[0].desc
                }
            )
      console.log(this.patientData)
      this.updateChart()
    },
    updateChart () {
      // 处理图表需要的数据
      const legendData = ['现存确诊', '现存无症状', '治愈', '死亡']
      const seriesData = [{
        name: '现存确诊',
        value: this.patientData.currentConfirmedCount,
        
      }, {
        name: '现存无症状',
        value: this.patientData.suspectedCount
      }, {
        name: '治愈',
        value: this.patientData.curedCount
      }, {
        name: '死亡',
        value: this.patientData.deadCount
      }]
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
    // screenAdapter () {
    //   this.titleFontSize = this.$refs.hot_ref.offsetWidth / 100 * 3.6
    //   const adapterOption = {
    //     title: {
    //       textStyle: {
    //         fontSize: this.titleFontSize
    //       }
    //     },
    //     legend: {
    //       itemWidth: this.titleFontSize,
    //       itemHeight: this.titleFontSize,
    //       itemGap: this.titleFontSize / 2,
    //       textStyle: {
    //         fontSize: this.titleFontSize / 2
    //       }
    //     },
    //     series: [
    //       {
    //         radius: this.titleFontSize * 4.5,
    //         center: ['50%', '60%']
    //       }
    //     ]
    //   }
    //   this.chartInstance.setOption(adapterOption)
    //   this.chartInstance.resize()
    // },
  },

}
</script>

<style lang='less' scoped>

</style>