<template>
    <table id="overallTable" style="text-align: center; width: 650px;" class="table" v-if="isShow">
        <thead>
            <tr>
                <th>
                    <small><span id="confirmedIncr" class="text-muted">较昨日新增
                        <span class="text-danger">{{this.$store.state.baseInformation.desc.currentConfirmedIncr}}</span></span></small>
                    <br>
                    <big id="confirmedCount" class="text-danger">{{this.$store.state.baseInformation.desc.currentConfirmedCount}}</big>
                    <p>现存确诊</p>
                </th>
                <th>
                    <small><span id="suspectedIncr" class="text-muted">较昨日新增
                        <span class="text-warning">{{this.$store.state.baseInformation.desc.suspectedIncr}}</span></span></small>
                    <br>
                    <big id="suspectedCount" class="text-warning">{{this.$store.state.baseInformation.desc.suspectedCount}}</big>
                    <p>累计境外输入</p>
                </th>
                <th>
                    <small><span id="seriousIncr" class="text-muted">较昨日新增
                        <span class="text-info">{{this.$store.state.baseInformation.desc.seriousIncr}}</span></span></small>
                    <br>
                    <big id="seriousCount" class="text-info">{{this.$store.state.baseInformation.desc.seriousCount}}</big>
                    <p>现存无症状</p>
                </th>
                <th>
                    <small><span id="deadIncr" class="text-muted">较昨日新增
                        <span class="text-primary">{{this.$store.state.baseInformation.desc.deadIncr}}</span></span></small>
                    <br>
                    <big id="deadCount" class="text-primary">{{this.$store.state.baseInformation.desc.deadCount}}</big>
                    <p>累计死亡</p>
                </th>
                <th>
                    <small><span id="curedIncr" class="text-muted">较昨日新增
                        <span class="text-success">{{this.$store.state.baseInformation.desc.curedIncr}}</span></span></small>
                    <br>
                    <big id="curedCount" class="text-success">{{this.$store.state.baseInformation.desc.curedCount}}</big>
                    <p>治愈</p>
                </th>
            </tr>
        </thead>
    </table>
</template>

<script>
import axios from 'axios'

export default {
    name:'show-news',
    data(){
        return{
            newsData:[],
            isShow:false,
        }
    },
    mounted() {
        this.getData()
    },
    methods:{
        getData() {
            axios.get('http://api.tianapi.com/ncov/index?key=54690b563dc6b1aca2009da3fc100993').then(
                response => {
                    this.$store.state.baseInformation = response.data.newslist[0]
                    this.isShow = true
                }
            )
        }
    },

}
</script>

<style scoped>

</style>
