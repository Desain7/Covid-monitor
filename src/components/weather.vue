<template>
    <div class="showWeather"></div>
</template>
 
<script>
import axios from 'axios'

export default {
  name: "show-weather",
  data() {
    return {

    }
  },
  mounted() {
    this.searchWeather()
  },
  methods: {
      getAdd(){
        return axios.get('http://pv.sohu.com/cityjson?ie=utf-8').then(
            response => {
                return response.data.cname
            }
        )
      },
      async searchWeather(){
        let address=await this.getAdd()
        axios.get(`https://www.tianqiapi.com/api/?version=v1&city=${address}`).then(res=>{
            console.log(res.data)
            this.isShow = true
        })
      }
  
  }
 
}
 
</script>

<style>
  
</style>