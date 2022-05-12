<template>
  <div>
        <div class="wrapper">
			<div class="content">
				<div class="col col-l">
					<div class="xpanel-wrapper xpanel-wrapper-40">
						<div class="xpanel xpanel-l-t">
							<div class="title">各国疫苗接种剂次</div>
              <vaccineCondition v-if="this.$store.state.vaccineIsOk"></vaccineCondition>
						</div>
					</div>
					<div class="xpanel-wrapper xpanel-wrapper-60">
						<div class="xpanel xpanel-l-b">
							<div class="title">各国人均接种剂次</div>
              <averVaccine v-if="this.$store.state.vaccineIsOk"></averVaccine>
						</div>
					</div>
				</div>
				<div class="col col-c">
					<div class="xpanel-wrapper xpanel-wrapper-75">
						<div class="xpanel no-bg">
              <vaccineMap v-if="this.$store.state.vaccineIsOk"></vaccineMap>
						</div>
					</div>
					<div class="xpanel-wrapper xpanel-wrapper-25">
						<div class="xpanel xpanel-c-b">
							<div class="title title-long">全球实时接种数据</div>
                <showInformation></showInformation>
						</div>
					</div>
				</div>
				<div class="col col-r">
					<div class="xpanel-wrapper xpanel-wrapper-25">
						<div class="xpanel xpanel-r-t">
							<div class="title">中国疫苗接种情况</div>
                <chinaVaccine></chinaVaccine>
						</div>
					</div>
					<div class="xpanel-wrapper xpanel-wrapper-30">
						<div class="xpanel xpanel-r-m">
							<div class="title">疫苗研制单位</div>
              <wordCloud></wordCloud>
						</div>
					</div>
					<div class="xpanel-wrapper xpanel-wrapper-45">
						<div class="xpanel xpanel-r-b">
							<div class="title">部分国家疫苗接种情况</div>
                <areaVaccine></areaVaccine>
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
import wordCloud from '../components/vaccine/wordCloud'
import vaccineMap from '../components/vaccine/vaccineMap'
import showInformation from '../components/vaccine/showInformation'
import chinaVaccine from '../components/vaccine/chinaVaccine'
import areaVaccine from '../components/vaccine/areaVaccine'

export default {
  name:'vaccineData',
  data() {
    return{

    }
  },
  methods: {
    async getData() {
        // if (!this.getLocalData('china')) {
        //初次请求数据
            await axios.get('http://localhost:8080/vaccine-data//v1/automation/modules/list?modules=VaccineSituationData').then(
                response => {
                this.$store.state.vaccineInformation = response.data.data.VaccineSituationData; // 使用数据
                // this.setLocalData('china'); // 缓存数据
            });
        // }
        this.$store.state.vaccineIsOk = true;
    },
    // setLocalData(key) {
    //     // 缓存数据
    //     sessionStorage.setItem(`${key}CovidData`, JSON.stringify(this.$store.state.chinaData)); // 缓存数据
    //     sessionStorage.setItem(`${key}Timestamp`, Date.now()); // 记录时间戳
    // },
    // //获取缓存  查找映射表 并 检查过期时间 
    // getLocalData(key) {
    //     let storageTimestamp = sessionStorage.getItem(`${key}Timestamp`);
    //     let expires = 1000 * 600; // 有效时间
    //     let timestamp = Date.now();  // 当前时间戳
    //     // 从缓存中取数据（10min内数据）
    //     if (storageTimestamp && (timestamp - storageTimestamp) < expires) {
    //         let chinaData = sessionStorage.getItem(`${key}CovidData`); // 从缓存中拿到数据给程序使用
    //         this.$store.state.chinaData = JSON.parse(chinaData);
    //         return true;
    //     }
    //     return false;
    // }

  },
  components:{
    vaccineCondition,
    averVaccine,
    wordCloud,
    vaccineMap,
    showInformation,
    chinaVaccine,
    areaVaccine
  },
  created(){
    this.getData()
      
  },
}
</script>

<style scoped>
</style>