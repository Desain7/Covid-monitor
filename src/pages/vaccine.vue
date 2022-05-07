<template>
  <div>
        <div class="wrapper">
			<div class="content">
				<div class="col col-l">
					<div class="xpanel-wrapper xpanel-wrapper-40">
						<div class="xpanel xpanel-l-t">
							<div class="title"></div>
              <vaccineCondition></vaccineCondition>
						</div>
					</div>
					<div class="xpanel-wrapper xpanel-wrapper-60">
						<div class="xpanel xpanel-l-b">
							<div class="title"></div>
              <averVaccine></averVaccine>
						</div>
					</div>
				</div>
				<div class="col col-c">
					<div class="xpanel-wrapper xpanel-wrapper-75">
						<div class="xpanel no-bg">
						</div>
					</div>
					<div class="xpanel-wrapper xpanel-wrapper-25">
						<div class="xpanel xpanel-c-b">
							<div class="title title-long"></div>
              
						</div>
					</div>
				</div>
				<div class="col col-r">
					<div class="xpanel-wrapper xpanel-wrapper-25">
						<div class="xpanel xpanel-r-t">
							<div class="title"></div>
						</div>
					</div>
					<div class="xpanel-wrapper xpanel-wrapper-30">
						<div class="xpanel xpanel-r-m">
							<div class="title"></div>
						</div>
					</div>
					<div class="xpanel-wrapper xpanel-wrapper-45">
						<div class="xpanel xpanel-r-b">
							<div class="title"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
  </div>
</template>

<script>

import axios from 'axios'
import vaccineCondition from '../components/vaccine/vaccineCondition'
import averVaccine from '../components/vaccine/averVaccine'

export default {
  name:'vaccineData',
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
    vaccineCondition,
    averVaccine,
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