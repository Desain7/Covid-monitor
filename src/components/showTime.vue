<template>
    <div class="time">{{time}}</div>
</template>
 
<script>
export default {
  name: "show-time",
  data() {
    return {
      //显示时间
      time:'',
      date:'',
    }
  },
  mounted() {
    this.dateShow();
  },
  created() {
    this.dateFormat();
  },
  beforeDestroy() {
  this.dataDestroy();
  },
  methods: {
    dataDestroy(){
      if (this.timer) {
        clearInterval(this.timer);
      }
 
    },
    dateShow() {
      this.timer = setInterval(() => {
        this.dateFormat()
      }, 1000)
    },
    dateFormat() {
      this.date = new Date();
      let year = this.date.getFullYear();
      let month = this.date.getMonth() + 1 < 10 ? "0" + (this.date.getMonth() + 1) : this.date.getMonth() + 1;
      let day = this.date.getDate() < 10 ? "0" + this.date.getDate() : this.date.getDate();
      let hours = this.date.getHours() < 10 ? "0" + this.date.getHours() : this.date.getHours();
      let minutes = this.date.getMinutes() < 10 ? "0" + this.date.getMinutes() : this.date.getMinutes();
      let seconds = this.date.getSeconds() < 10 ? "0" + this.date.getSeconds() : this.date.getSeconds();
      this.time = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    },
 
  
  }
 
}
 
</script>

<style>

  .time{
    float: right;
    display:inline-flex;
    font-size: 20px;
    font-weight: 500;
    color: #303133;
    text-align: left;
    line-height: 60px;
  }
  
</style>