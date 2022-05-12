<template>
  <div>
    <div class="wrapper">
			<div class="content">
				<div class="col col-l">
					<div class="xpanel-wrapper xpanel-wrapper-40">
						<div class="xpanel xpanel-l-t">
							<div class="title">省份累计确诊</div>
              <provinceConfirm></provinceConfirm>
						</div>
					</div>
					<div class="xpanel-wrapper xpanel-wrapper-60">
						<div class="xpanel xpanel-l-b">
							<div class="title">全国疫情形势</div>
              
              <multiplyCondition></multiplyCondition>
						</div>
					</div>
				</div>
				<div class="col col-c">
					<div class="xpanel-wrapper xpanel-wrapper-75">
						<div class="xpanel no-bg">
              <chinaMap></chinaMap>
						</div>
					</div>
					<div class="xpanel-wrapper xpanel-wrapper-25">
						<div class="xpanel xpanel-c-b">
							<div class="title title-long">当前疫情</div>
              <showInformation v-if="this.$store.state.baseIsOk"></showInformation>
						</div>
					</div>
				</div>
				<div class="col col-r">
					<div class="xpanel-wrapper xpanel-wrapper-25">
						<div class="xpanel xpanel-r-t">
							<div class="title">病患类型分布</div>
               <patientType></patientType>
						</div>
					</div>
					<div class="xpanel-wrapper xpanel-wrapper-30">
						<div class="xpanel xpanel-r-m">
							<div class="title" >中高风险地区</div>
              <riskArea v-if="this.$store.state.baseIsOk"></riskArea>
						</div>
					</div>
					<div class="xpanel-wrapper xpanel-wrapper-45">
						<div class="xpanel xpanel-r-b">
							<div class="title">全国新增确诊</div>
              <chinaConfirmLine></chinaConfirmLine>
						</div>
					</div>
				</div>
			</div>
		</div>
      <showNews></showNews>
      <!-- <weather></weather> -->
  </div>
</template>

<script>

import axios from 'axios'
import chinaConfirmLine from '../components/china/china-confirm-line.vue'
import multiplyCondition from '../components/china/confirm-cure-dead.vue'
import chinaMap from '../components/china/china-map.vue'
import showNews from '../components/china/showNews.vue';
import provinceConfirm from '../components/china/province-confirm.vue';
import showInformation from '../components/china/showInformation.vue';
import patientType from '../components/china/patient-type.vue';
import riskArea from '../components/china/riskArea.vue';
// import weather from '../components/weather.vue';

export default {
  name:'chinaData',
  data() {
    return{

    }
  },
  methods: {
    async getData() {
        if (!this.getLocalData('china')) {
        //初次请求数据
            await axios.get('http://111.231.75.86:8000/api/provinces/CHN/').then(
                response => {
                this.$store.state.chinaData = response.data; // 使用数据
                this.setLocalData('china'); // 缓存数据
                console.log('new api',this.$store.state.chinaData);
            });
        }
    },
    setLocalData(key) {
        // 缓存数据
        sessionStorage.setItem(`${key}CovidData`, JSON.stringify(this.$store.state.chinaData)); // 缓存数据
        sessionStorage.setItem(`${key}Timestamp`, Date.now()); // 记录时间戳
    },
    //获取缓存  查找映射表 并 检查过期时间 
    getLocalData(key) {
        let storageTimestamp = sessionStorage.getItem(`${key}Timestamp`);
        let expires = 1000 * 600; // 有效时间
        let timestamp = Date.now();  // 当前时间戳
        // 从缓存中取数据（10min内数据）
        if (storageTimestamp && (timestamp - storageTimestamp) < expires) {
            let chinaData = sessionStorage.getItem(`${key}CovidData`); // 从缓存中拿到数据给程序使用
            this.$store.state.chinaData = JSON.parse(chinaData);
            return true;
        }
        return false;
    }

  },
  components:{
    chinaConfirmLine,
    multiplyCondition,
    chinaMap,
    showNews,
    provinceConfirm,
    showInformation,
    patientType,
    riskArea,
    // weather,
  },
  created(){
    this.getData(),
      
            
    axios.get('http://api.tianapi.com/ncov/index?key=54690b563dc6b1aca2009da3fc100993').then(
        response => {
            this.$store.state.baseInformation = response.data.newslist[0]
            this.$store.state.baseIsOk = true
            console.log('123',this.$store.state.baseInformation)
        }
    )
        
  },
}
</script>

<style scoped>
</style>