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
      await axios.get('http://localhost:8080/global-data/get').then(
            res=> {
                let made = JSON.parse(res.data);
                let madeData = made.component;
                let data = madeData[0];
                this.$store.state.mainInformation = data;
                console.log('521',data);
            }
        )
        this.$store.state.mainIsOk = true;
    }
  },
  components:{
    index,
    // china,
  },
}
</script>

<style scoped>

</style>