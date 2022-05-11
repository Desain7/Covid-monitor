<template>
    <div class="center">
        <small id="last_update" class="text-muted">上次更新:{{lastUpdateTime}}</small>
        <table id="overallTable" style="text-align: center; width: 650px; height:100px;" class="table">
            <thead>
                <tr>
                    <th>
                        <p>现存确诊</p>
                        <big id="confirmedCount" class="text-danger">{{information.curConfirm}}</big>
                        <br>
                        <small><span id="confirmedIncr" class="text-muted">较昨日
                            <span class="text-danger">{{information.curConfirmRelative}}</span></span></small>
                        
                    </th>
                    <th>
                        <p>累计确诊</p>
                        <big id="suspectedCount" class="text-warning">{{information.confirmed}}</big>
                        <br>
                        <small><span id="suspectedIncr" class="text-muted">较昨日
                            <span class="text-warning">{{information.confirmedRelative}}</span></span></small>
                    </th>
                    <th>
                        <p>累计死亡</p>
                        <big id="deadCount" class="text-primary">{{information.died}}</big>
                        <br>
                        <small><span id="deadIncr" class="text-muted">较昨日
                            <span class="text-primary">{{information.diedRelative}}</span></span></small>
                        
                    </th>
                    <th>
                        <p>累计治愈</p>
                        <big id="curedCount" class="text-success">{{information.cured}}</big>
                        <br>
                        <small><span id="curedIncr" class="text-muted">较昨日
                            <span class="text-success">{{information.curedRelative}}</span></span></small>
                    </th>
                </tr>
            </thead>
        </table>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name:'overseaInformaiton',
    data(){
        return{
            information:{},
            lastUpdateTime:'',
            informIsOK:false,
        }
    },
    computed:{

    },
    mounted() {
        this.getData()
        axios.get('http://localhost:8080/global-data/get').then(
            res=> {
                let made = JSON.parse(res.data);
                let madeData = made.component;
                let data = madeData[0];
                console.log('521',data);
            }
        )
    },
    methods:{
        getData() {
                
                this.information = this.$store.state.mainInformation.summaryDataOut
                console.log('123123123123',this.information)
                this.lastUpdateTime = this.$store.state.mainInformation.mapLastUpdatedTime
             
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
    #last_update{
        position: absolute;
        right: 5%;
        bottom: 0;
    }
    p{
        font-size: 12px;
        font-weight: bold;
    }
    th{
        width: 16%;
    }
</style>
