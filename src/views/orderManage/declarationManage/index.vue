<!--* 
* @description: 报单中心列表 新装单 拆除单 维修单
*-->
<template>
    <section class="tab_content-wrapper yewu">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick" >
            <el-tab-pane label="新装单管理" name="1">
                <newpackinglist :isEmployee="isEmployee" :windowOutHeight="windowOutHeight"></newpackinglist>
            </el-tab-pane>
            <el-tab-pane label="拆除单管理" name="2" v-if="isEmployee">
               <dismantlelist :windowOutHeight="windowOutHeight"></dismantlelist>
           </el-tab-pane>
           <el-tab-pane label="维修单管理" name="3" v-if="isEmployee">
               <repairlist :windowOutHeight="windowOutHeight"></repairlist>
           </el-tab-pane>
            
        </el-tabs>
    </section>
</template>

<script>
    //组件引入
    import newpackinglist from './newPackingList/index.vue';//安装单管理
    import dismantlelist from './dismantleList/index.vue';//拆除单管理
    import repairlist from './repairList/index.vue';//维修单管理
    import { mapState } from "vuex";
    export default {
        props: ['windowOutHeight'],
        components: {
            newpackinglist,
            dismantlelist,
            repairlist,
        },
        computed: {
            ...mapState({
                isEmployee: state => state.user.isEmployee
            }),
        },
        data() {
            return {
                activeName: '1'
            }
        },
        methods: {
            //页面管理切换
            handleClick(tab) {
            }
        },
    }
</script>


<style scoped lang="stylus">
    
</style>

