<template>
    <div  v-if="isShow" class="center">
        <small id="last_update" class="text-muted">上次更新:{{updateTime}}</small>
        <table id="overallTable" style="text-align: center; width: 650px; height:100px;" class="table">
            <thead>
                <tr>
                    <th>
                        <p>现存确诊</p>
                        <big id="confirmedCount" class="text-danger">{{this.$store.state.baseInformation.desc.currentConfirmedCount}}</big>
                        <br>
                        <small><span id="confirmedIncr" class="text-muted">较昨日
                            <span class="text-danger">{{this.$store.state.baseInformation.desc.currentConfirmedIncr}}</span></span></small>
                        
                    </th>
                    <th>
                        <p>累计境外输入</p>
                        <big id="suspectedCount" class="text-warning">{{this.$store.state.baseInformation.desc.suspectedCount}}</big>
                        <br>
                        <small><span id="suspectedIncr" class="text-muted">较昨日
                            <span class="text-warning">{{this.$store.state.baseInformation.desc.suspectedIncr}}</span></span></small>
                        
                        
                    </th>
                    <th>
                        <p>现存无症状</p>
                        <big id="seriousCount" class="text-info">{{this.$store.state.baseInformation.desc.seriousCount}}</big>
                        <br>
                        <small><span id="seriousIncr" class="text-muted">较昨日
                            <span class="text-info">{{this.$store.state.baseInformation.desc.seriousIncr}}</span></span></small>
                        
                        
                    </th>
                    <th>
                        <p>累计死亡</p>
                        <big id="deadCount" class="text-primary">{{this.$store.state.baseInformation.desc.deadCount}}</big>
                        <br>
                        <small><span id="deadIncr" class="text-muted">较昨日
                            <span class="text-primary">{{this.$store.state.baseInformation.desc.deadIncr}}</span></span></small>
                        
                    </th>
                    <th>
                        <p>治愈</p>
                        <big id="curedCount" class="text-success">{{this.$store.state.baseInformation.desc.curedCount}}</big>
                        <br>
                        <small><span id="curedIncr" class="text-muted">较昨日
                            <span class="text-success">{{this.$store.state.baseInformation.desc.curedIncr}}</span></span></small>
                    </th>
                    <th>
                        <p>高风险地区</p>
                        <big id="curedCount" class="text-success">{{this.$store.state.baseInformation.desc.highDangerCount}}</big>
                        <!-- <div class="highRisk">
                            <div class="title"  @mouseover="moveShow = false" @mouseout="moveShow = true">
                                <div class="inner-container" :class="moveShow?'':'active'">
                                <span v-for="(item,index) in highRiskArea"  :key="index" :v-if="index < 3">{{item}}</span>
                                </div>
                            </div>
                        </div> -->
                        <br>
                        <p>中风险地区</p>
                        <big id="curedCount" class="text-success">{{this.$store.state.baseInformation.desc.midDangerCount}}</big>
                        <!-- <div class="midRisk">
                            <div class="title"  @mouseover="moveShow = false" @mouseout="moveShow = true">
                                <div class="inner-container" :class="moveShow?'':'active'">
                                <span v-for="(item,index) in midRiskArea" :key="index" :v-if="index < 3">{{item}}</span>
                                </div>
                            </div>
                        </div> -->
                    </th>
                </tr>
            </thead>
        </table>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name:'show-news',
    data(){
        return{
            newsData:[],
            highRiskArea:[],
            midRiskArea:[],
            isShow:false,
        }
    },
    computed:{
        updateTime(){
		let date = new Date(this.$store.state.baseInformation.desc.modifyTime)	// 时间戳为秒：10位数
		let year = date.getFullYear()
		let month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
		let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
		let hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
		let minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
		let second = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
		return `${year}-${month}-${day} ${hour}:${minute}:${second}`
        },
    },
    mounted() {
        this.getData()
    },
    methods:{
        getData() {
            axios.get('http://api.tianapi.com/ncov/index?key=54690b563dc6b1aca2009da3fc100993').then(
                response => {
                    this.$store.state.baseInformation = response.data.newslist[0]
                    this.isShow = true
                    this.$store.state.baseInformation.riskarea.high.forEach(element => {
                        this.highRiskArea.push(element)
                    });
                    this.$store.state.baseInformation.riskarea.mid.forEach(element => {
                        this.midRiskArea.push(element)
                    });
                    console.log(this.$store.state.baseInformation)
                    // console.log(this.midRiskArea)
                }
            )
        },
    },

}
</script>

<style lang='less' scoped>
    .center{
        height: 150px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        position: relative;
    }
    #last_update{
        position: absolute;
        right: 5%;
        bottom: 0;
    }
    p{
        font-size: 12px;
        font-weight: bold;
    }
    th{
        width: 16%;
    }
.notice-card-wrapper {
  width: 100%;
  background: #c59696;
  border: 1px solid #EEF1F9;
  line-height: 46px;
  .news{
    width: 1200px;
    overflow: hidden;
    margin: 0 auto;
    position: relative;
    .title{
      width: calc(100% - 20px);
    }
  }
  .inner-container {
    margin-left: 100%; // 把文字弄出可见区域
    width: 2000%;
    animation: myMove 45s linear infinite; // 定义动画
    animation-fill-mode: forwards;
    &.active{
      animation-play-state: paused;
    }
    span{
      margin-right: 30px;
      font-size: 14px;
      vertical-align: middle;
      max-width: 800px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      display: inline-block;
      cursor: pointer;
    }
  }
  /*文字无缝滚动*/
  @keyframes myMove {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-5175px);
    }
  }
}
</style>
