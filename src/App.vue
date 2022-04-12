<template>
  <div id="container">
    <IsSerach></IsSerach>
    <IsList></IsList>
  </div>
</template>

<script>

import IsList from './components/List.vue'
import IsSerach from './components/Serach.vue'


export default {
  name:'App',
  data() {
    return{

    }
  },
  methods: {

  },
  components:{
    IsSerach,
    IsList
    
  },
  props:['IsList','IsSerach']
}
</script>

<style scoped>
  #container{
    margin-left: 10%;
  }
</style>