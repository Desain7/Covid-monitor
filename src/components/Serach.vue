<template>
    <section class="jumbotron">
      <h3 class="jumbotron-heading">Search Github Users</h3>
      <div>
        <input type="text" placeholder="enter the name you search" v-model="keyWord" @keyup.enter='serach'/>&nbsp;<button>Search</button>
      </div>
    </section>
</template>

<script>
import axios from 'axios'
export default {
    name:'IsSerach',
    data() {
      return {
        keyWord:'',
      }
    },

    methods: {
      serach() {
        this.$bus.$emit('getUsers',{users:[],isLoading:true,isFirst:false,errMsg:''}),
        axios.get(`https://api.github.com/search/users?q=${this.keyWord}`).then(
          response => {
            console.log('发送请求到githubAPI')
            console.log(response.data)
            this.$bus.$emit('getUsers',{users:response.data.items,isLoading:false,errMsg:''})
          },
          error => {
            console.log('出错啦!!',error.messages)
          }
        )
        
      }
    },

    mounted() {
      
    },
}
</script>

<style scoped>

</style>