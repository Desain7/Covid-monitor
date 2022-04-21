<template>
  <div>
  <el-container>
    <index></index>
    
  </el-container>
  <!-- <chinaConfirmLine></chinaConfirmLine> -->
  <showNews></showNews>
  <chinaMap></chinaMap>
  </div>
</template>

<script>
import axios from 'axios'

import index from './components/index.vue'
// import chinaConfirmLine from './components/china-confirm-line.vue'
import chinaMap from './components/china-map.vue'
import showNews from './components/showNews.vue';

export default {
  name:'App',
  data() {
    return{

    }
  },
  methods: {
    isOK(){
      console.log('ok')
    }
  },
  components:{
    index,
    // chinaConfirmLine,
    chinaMap,
    showNews,
    
  },
  created(){

    axios.get('http://localhost:8080/covid-data/list-total').then(
          response => {
						console.log('成功获取数据')
						this.$store.state.covidData = response.data
            console.log(response.data)
					},
          error => {
						console.log('请求失败',error.message)
					}
    )
  },
}
</script>

<style scoped>
  #container{
    margin-left: 10%;
  }
</style>