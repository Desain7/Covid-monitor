<template>
    <el-header>
        <timer></timer>
    </el-header>
</template>

<script>
import timer from './showTime.vue';

export default {
    name:'my-header',

    components:{
        timer
    },
}
</script>

<style>
    .el-header{
        background-color: #f5f7fa;
        padding: 0;
        height: 60px;
        line-height: 60px;
        color: #303133;
        font-size: 18px;
        font-weight: 500;
        border-bottom: 1px solid #ebeef5;
        width: 100%;
    }
    
</style>