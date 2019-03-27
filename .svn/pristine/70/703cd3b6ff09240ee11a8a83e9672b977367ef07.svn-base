<template>
    <div>
        <div class="delimit-box-bg" v-if="active"></div>
        <div class="delimit-box" :class="{'active': active}">
            <div class="delimit-box-header">
                <span>{{title}}</span>
                <i class="el-icon-close pull-right" title="关闭" @click="$emit('close')"></i>
            </div>
            <div style="clear: both"></div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        name: "delimit-box",
        props: {
            active: {
                default: false,
                type: Boolean
            },
            title: {
                default: '滑动框',
                type: String
            }
        }
    }
</script>

<style scoped lang="stylus">

    .delimit-box-bg {
        height: 100%;
        width: 100%;
        position: fixed;
        z-index: 1038;
        background black
        opacity .8
        left 0
        top 0
    }

    .delimit-box {
        padding: 15px;
        position: fixed;
        z-index: 1039;
        background-color: rgb(255, 255, 255);
        width: calc(70% - 0px);
        height: 100%;
        overflow: auto;
        left: 100%;
        top: 0;
        box-shadow: rgba(153, 153, 153, 0.75) 0 0 10px 0;
        transition: left 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    }

    .delimit-box.active {
        left: 30%;
    }

    .delimit-box-header {
        overflow: hidden;
        position: relative;
        margin-bottom: 10px;
        font-size 20px;
        .el-icon-close {
            font-size: 30px;
            cursor: pointer;
        }
        span {
            font-weight: 600;
        }
    }

    .pull-right {
        float right
    }
</style>