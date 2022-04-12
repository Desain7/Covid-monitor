<template>
      <div class="row" >
          <div v-show='info.users.length' class="card" v-for="user in info.users" :key='user.login'>
          <a :href="user.html_url" target="_blank">
              <img :src="user.avatar_url" style='width: 100px'/>
          </a>
          <p class="card-text">{{user.login}}</p>
          </div>
          <div class='tip' v-if="this.info.isFirst">欢迎使用!</div>
          <div class='tip' v-if="this.info.isLoading">正在加载....</div>
          <div class='tip' v-if="this.info.errMsg">出错啦!--{{this.info.errMsg}}</div>
      </div>
</template>

<script>

export default {
  name:'IsList',
  data() {
    return {
      info:{
        users:[],
        isFirst:true,
        isLoading:false,
        errMsg:''
      },
    }
  },

  mounted() {
    this.$bus.$on('getUsers',info => {
      this.info={...this.info,...info}
    })
  },
    
}
</script>

<style scoped>
    .album {
  min-height: 50rem; /* Can be removed; just added for demo purposes */
  padding-top: 3rem;
  padding-bottom: 3rem;
  background-color: #f7f7f7;
}

.tip{
  font-size: 30px;
}

.card {
  float: left;
  width: 33.333%;
  padding: .75rem;
  margin-bottom: 2rem;
  border: 1px solid #efefef;
  text-align: center;
}

.card > img {
  margin-bottom: .75rem;
  border-radius: 100px;
}

.card-text {
  font-size: 85%;
}

</style>