<template>
    <div class="notice-card-wrapper" >
        <div class="header">
        <div class="title"  @mouseover="moveShow = false" @mouseout="moveShow = true">
            <!-- 系统公告 -->
            <div class="inner-container" :class="moveShow?'':'active'">
            <span v-for="(item,index) in newsData" @click="openLink(item.url)" :key="index" :v-if="index < 3">{{item.title}}</span>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name:'show-news',
    data(){
        return{
            newsData:[],
            moveShow:true,
        }
    },
    methods:{
        getNews(){
            axios.get('https://lab.isaaclin.cn/nCoV/api/news?page=1&num=10').then(
                response=>{
                    console.log('getNews',response.data)
                    response.data.results.forEach(item=>{
                        this.newsData.push({
                            title:item.summary,
                            url:item.sourceUrl,
                        })
                    })
                }
            )
        },
        openLink(url){
            window.open(url)
        },
    },
    mounted() {
        this.getNews()
    },
}
</script>

<style lang="less" scoped>
.notice-card-wrapper {
  width: 100%;
  background: #F9F9F9;
  border: 1px solid #EEF1F9;
  line-height: 46px;
  .header{
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
      max-width: 600px;
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
      transform: translateX(-6100px);
    }
  }
}
</style>
