<template>
    <div class="index">
        <header class="header left">
            <div class="left nav">
                <ul>
                    <li><i class="nav_1"></i>
                        <div class="china" >
                            <router-link to="/china">
                                <span>中国</span>
                            </router-link>
                        </div> 
                    </li>
                    <li><i class="nav_2"></i>           
                        <div class="oversea">
                            <router-link to="/oversea">
                                <span>世界</span>
                            </router-link>
                        </div> 
                    </li>
                    <li><i class="nav_3"></i>           
                        <div class="vaccine">
                            <router-link to="/vaccine">
                                <span>疫苗</span>
                            </router-link>
                        </div> 
                    </li>
                    <!-- <li class="nav_active"><i class="nav_4"></i><a href="chronic.html">慢病病人列表</a> </li> -->
                </ul>
            </div>
            <div class="header_center left" style="position:relative">
                <h2><strong>疫情监控系统</strong></h2>

            </div>
            <div class="right nav text_right">
                <ul>
                </ul>
                <timer></timer>
            </div>

        </header>
        <router-view></router-view>
    </div>
</template>

<script>
import timer from './showTime.vue';

export default {
    name:'my-header',

    components:{
        timer,
    },
}
</script>

<style scoped>
    .index{
        background-color: #f5f7fa;
        padding: 0;
        height: 60px;
        color: white;
        font-size: 18px;
        font-weight: 500;
        border-bottom: 1px solid #ebeef5;
    }
    .locationChange{
        display: inline-flex;
        width: 120px;
    }
    .china{
        display: inline-block;
    }
    .oversea{
        display: inline-block;
    }
    .vaccine{
        display: inline-block;
    }
    
</style>