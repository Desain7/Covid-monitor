<template>
    <div class="index">
        <div class="locationChange">
            <div class="china" >
                <router-link to="/china">
                    <span>中国</span>
                </router-link>
            </div>
            
            <div class="oversea">
                    <span>世界</span>
            </div>
        </div>
        <timer></timer>
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
        line-height: 60px;
        color: #303133;
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
    
</style>