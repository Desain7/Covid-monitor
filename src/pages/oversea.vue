<template>
  <div>
    <div class="wrapper">
			<div class="content">
				<div class="col col-l">
					<div class="xpanel-wrapper xpanel-wrapper-40">
						<div class="xpanel xpanel-l-t">
							<div class="title">各国累计确诊</div>
              <worldCondition v-if="$store.state.mainIsOk"></worldCondition>
						</div>
					</div>
					<div class="xpanel-wrapper xpanel-wrapper-60">
						<div class="xpanel xpanel-l-b">
							<div class="title">世界疫情形势</div>
              
              <worldSituation v-if="$store.state.mainIsOk"></worldSituation>
						</div>
					</div>
				</div>
				<div class="col col-c">
					<div class="xpanel-wrapper xpanel-wrapper-75">
						<div class="xpanel no-bg">
              <worldMap v-if="$store.state.mainIsOk"></worldMap>
						</div>
					</div>
					<div class="xpanel-wrapper xpanel-wrapper-25">
						<div class="xpanel xpanel-c-b">
							<div class="title title-long">全球疫情概况</div>
              <showInformation v-if="$store.state.mainIsOk"></showInformation>
						</div>
					</div>
				</div>
				<div class="col col-r">
					<div class="xpanel-wrapper xpanel-wrapper-25">
						<div class="xpanel xpanel-r-t">
							<div class="title">各大洲现有确诊</div>
                  <continentSituation v-if="$store.state.mainIsOk"></continentSituation>
						</div>
					</div>
					<div class="xpanel-wrapper xpanel-wrapper-30">
						<div class="xpanel xpanel-r-m">
							<div class="title">新增确诊Top10</div>
              <worldConfirm v-if="$store.state.mainIsOk"></worldConfirm>
						</div>
					</div>
					<div class="xpanel-wrapper xpanel-wrapper-45">
						<div class="xpanel xpanel-r-b">
							<div class="title">现存确诊Top10</div>
              <worldCurrentRank v-if="$store.state.mainIsOk"></worldCurrentRank>
						</div>
					</div>
				</div>
			</div>
		</div>
  </div>
</template>

<script>

import axios from 'axios'
import worldCondition from '../components/oversea/worldCondition'
import worldMap from '../components/oversea/world-map';
import worldCurrentRank from '../components/oversea/worldCurrentRank.vue';
import showInformation from '../components/oversea/showInformation.vue';
import worldConfirm from '../components/oversea/worldConfirm.vue';
import worldSituation from '../components/oversea/worldSituation.vue';
import continentSituation from '../components/oversea/continentSituation.vue';

export default {
  name:'globalData',
  data() {
    return{

    }
  },
  methods: {
    getData() {
        if (!this.getLocalData('oversea')) {
        //初次请求数据
            axios.get('http://api.tianapi.com/ncovabroad/index?key=54690b563dc6b1aca2009da3fc100993').then(
                response => {
                this.$store.state.overseaData = response.data.newslist; // 使用数据
                this.setLocalData('oversea'); // 缓存数据
            }).then(
                res=>{
                  res
                  console.log('new api',this.$store.state.overseaData);
                  this.$store.state.overseaIsOk = true;
                }
            )
            
        }
        
    },
    setLocalData(key) {
        // 缓存数据
        sessionStorage.setItem(`${key}CovidData`, JSON.stringify(this.$store.state.overseaData)); // 缓存数据
        sessionStorage.setItem(`${key}Timestamp`, Date.now()); // 记录时间戳
    },
    // 获取缓存  查找映射表 并 检查过期时间 
    getLocalData(key) {
        let storageTimestamp = sessionStorage.getItem(`${key}Timestamp`);
        let expires = 1000 * 600; // 有效时间
        let timestamp = Date.now();  // 当前时间戳
        // 从缓存中取数据（10min内数据）
        if (storageTimestamp && (timestamp - storageTimestamp) < expires) {
            let overseaData = sessionStorage.getItem(`${key}CovidData`); // 从缓存中拿到数据给程序使用
            this.$store.state.overseaData = JSON.parse(overseaData);
            return true;
        }
        return false;
    }

  },
  components:{
    worldCondition,
    worldMap,
    worldCurrentRank,
    showInformation,
    worldConfirm,
    worldSituation,
    continentSituation
  },
  mounted(){
    this.getData()
  },
}
</script>

<style scoped>
</style>