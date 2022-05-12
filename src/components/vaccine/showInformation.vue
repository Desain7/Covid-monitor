<template>
    <div class="center" v-if="this.informIsOK">
        <table id="vaccineTable" style="text-align: center; width: 650px; height:100px;" class="table" >
            <thead>
                <tr>
                    <th>
                        <p>全球累计接种</p>
                        <big id="confirmedCount" class="text-danger">{{worldSum}}</big><small>亿剂次</small>
                        
                    </th>
                    <th>
                        <p>全球较上日新增</p>
                        <big id="suspectedCount" class="text-warning">{{worldNew}}</big><small>万剂次</small>
                    </th>
                    <th>
                        <p>全球每百人接种</p>
                        <big id="deadCount" class="text-primary">{{information.全球.total_vaccinations_per_hundred}}</big><small>剂次</small>
                    </th>
                    <th>
                        <p>中国累计接种</p>
                        <big id="curedCount" class="text-success">{{chinaSum}}</big><small>亿剂次</small>
                    </th>
                    <th>
                        <p>中国较上日新增</p>
                        <big id="curedCount" class="text-success">{{chinaNew}}</big><small>万剂次</small>
                    </th>
                    <th>
                        <p>中国每百人接种</p>
                        <big id="curedCount" class="text-success">{{information.中国.total_vaccinations_per_hundred}}</big><small>剂次</small>
                    </th>
                </tr>
            </thead>
        </table>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name:'vaccineInformaiton',
    data(){
        return{
            information:{},
            informIsOK:false,
        }
    },
    computed:{
        worldSum() {
            return (this.information.全球.total_vaccinations / 100000000).toFixed(1);
        },
        chinaSum() {
            return (this.information.中国.total_vaccinations / 100000000).toFixed(1);
        },
        worldNew() {
            return (this.information.全球.new_vaccinations / 10000).toFixed(1);
        },
        chinaNew() {
            return (this.information.中国.new_vaccinations / 10000).toFixed(1);
        }
    },
    mounted() {
        this.getData()

    },
    methods:{
        async getData() {
                
            await axios.get('http://localhost:8080/vaccine-data/v1/automation/modules/list?modules=VaccineTopData').then(
            res=> {
                this.information = res.data.data.VaccineTopData
                console.log(this.information)
            }
            )
            this.informIsOK = true
        }
    },

}
</script>

<style scoped>
    .center{
        height: 150px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        position: relative;
    }
    p{
        font-size: 12px;
        font-weight: bold;
    }
    th{
        width: 16%;
        white-space: nowrap;
    }
</style>
