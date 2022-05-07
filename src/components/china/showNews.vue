<template>
    <div class="notice-card-wrapper" >
        <div class="news">
          <div class="title"  @mouseover="moveShow = false" @mouseout="moveShow = true">
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
            axios.get('http://api.tianapi.com/txapi/ncov/index?key=964dc226dd5b57e892e6199735b6c55f').then(
                response=>{
                    console.log('getNews',response.data)
                    response.data.newslist[0].news.forEach(item=>{
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
  background: #c59696;
  border: 1px solid #EEF1F9;
  line-height: 46px;
  .news{
    width: 800px;
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
