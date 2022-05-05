<template>
  <div>
      <showNews></showNews>
      <showInformation></showInformation>
      <!-- <weather></weather> -->
      <provinceConfirm></provinceConfirm>
      <chinaConfirmLine></chinaConfirmLine>
      <multiplyCondition></multiplyCondition>
      <patientType></patientType>
      <chinaMap></chinaMap>
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
    // weather,
  },
  created(){
    this.getData(),
      
    axios.get('http://111.231.75.86:8000/api/provinces/CHN/').then(
          response => {
						console.log('成功获取数据')
						this.$store.state.covidData = response.data
                        console.log(response.data)
                        console.log('new 123123123api',this.$store.state.covidData);
					},
          error => {
						console.log('请求失败',error.message)
					}
                    
    )
  },
}
</script>

<style scoped>
</style>