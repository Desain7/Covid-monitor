<template>
    <div  v-if="isShow" class="center">
        <vue-seamless-scroll  :data="highRiskArea"  :class-option="optionHover" class="seamless-warp">
            <ul>
                <li v-for="(item, index) in highRiskArea" :key="index">
                    <span>{{item}}<span>(高风险)</span></span>
                </li>
            </ul>
            <ul>
                <li v-for="(item, index) in midRiskArea" :key="index">
                    <span>{{item}}<span>(中风险)</span></span>
                </li>
            </ul>
        </vue-seamless-scroll>

    </div>
</template>

<script>

export default {
    name:'riskArea',
    data(){
        return{
            highRiskArea:[],
            midRiskArea:[],
            isShow:false,
        }
    },
    computed: {
        optionHover() {
            return {
            step: 0.5, // 数值越大速度滚动越快
            limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
            hoverStop: true, // 是否开启鼠标悬停stop
            direction: 1, // 0向下 1向上 2向左 3向右
            openWatch: true, // 开启数据实时监控刷新dom
            singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
            singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
            waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
            };
        },
    },
    mounted() {
        this.getData()
    },
    methods:{
        getData() {
                    this.$store.state.baseInformation.riskarea.high.forEach(element => {
                        this.highRiskArea.push(element)
                    });
                    this.$store.state.baseInformation.riskarea.mid.forEach(element => {
                        this.midRiskArea.push(element)
                    });
                    console.log(this.highRiskArea)
                    this.isShow=true
        },
    },


}
</script>

<style  scoped>
.center{
    overflow: hidden;
    height: 80%;
}
.center li{
    margin-left: 5%;
}

</style>
