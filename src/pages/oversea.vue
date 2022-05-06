<template>
  <div>
      <worldCondition></worldCondition>
      <worldMap></worldMap>
      <worldCurrentRank></worldCurrentRank>
  </div>
</template>

<script>

import axios from 'axios'
import worldCondition from '../components/oversea/worldCondition'
import worldMap from '../components/oversea/world-map';
import worldCurrentRank from '../components/oversea/world-current-rank.vue';

export default {
  name:'globalData',
  data() {
    return{

    }
  },
  methods: {
    async getData() {
        if (!this.getLocalData('china')) {
        //初次请求数据
            await axios.get('http://api.tianapi.com/ncovabroad/index?key=54690b563dc6b1aca2009da3fc100993').then(
                response => {
                this.$store.state.overseaData = response.data; // 使用数据
                this.setLocalData('oversea'); // 缓存数据
            });
            console.log('new api',this.$store.state.overseaData);
        }
        this.$store.state.overseaIsOk = true;
    },
    setLocalData(key) {
        // 缓存数据
        sessionStorage.setItem(`${key}CovidData`, JSON.stringify(this.$store.state.overseaData)); // 缓存数据
        sessionStorage.setItem(`${key}Timestamp`, Date.now()); // 记录时间戳
    },
    //获取缓存  查找映射表 并 检查过期时间 
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
  },
  created(){
    this.getData()
  },
}
</script>

<style scoped>
</style>