<template>
  <div>
    <index></index>
    <!-- <china></china> -->
  </div>
</template>

<script>

import index from './components/index.vue'
import axios from 'axios'
// import china from './pages/china.vue'

export default {
  name:'App',
  data() {
    return{

    }
  },
  mounted(){
    this.getData()
  },
  methods: {
    async getData() {
      if (!this.getLocalData('main')) {
          await axios.get('http://localhost:8080/global-data/get').then(
              res=> {
                  let made = JSON.parse(res.data);
                  let madeData = made.component;
                  let data = madeData[0];
                  this.$store.state.mainInformation = data;
                  this.setLocalData('main');
                  console.log('521',data);
              }
          )
          
      }
      this.$store.state.mainIsOk = true;
    },
    setLocalData(key) {
        // 缓存数据
        localStorage.setItem(`${key}Data`, JSON.stringify(this.$store.state.mainInformation)); // 缓存数据
        localStorage.setItem(`${key}Timestamp`, Date.now()); // 记录时间戳
    },
    //获取缓存  查找映射表 并 检查过期时间 
    getLocalData(key) {
        let storageTimestamp = localStorage.getItem(`${key}Timestamp`);
        let expires = 1000 * 600; // 有效时间
        let timestamp = Date.now();  // 当前时间戳
        // 从缓存中取数据（10min内数据）
        if (storageTimestamp && (timestamp - storageTimestamp) < expires) {
            let mainInformation = localStorage.getItem(`${key}Data`); // 从缓存中拿到数据给程序使用
            this.$store.state.mainInformation = JSON.parse(mainInformation);
            return true;
        }
        return false;
    },
    

  },
  components:{
    index,
    // china,
  },
}
</script>

<style scoped>

</style>