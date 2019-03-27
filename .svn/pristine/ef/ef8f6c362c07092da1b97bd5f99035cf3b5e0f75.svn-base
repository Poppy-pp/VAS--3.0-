<!-- 库房管理——基础设置 -->
<template>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="设备管理" name="1">
            <equipmentList :windowOutHeight="windowOutHeight"></equipmentList>
        </el-tab-pane>
        <el-tab-pane label="SIM管理" name="2">
            <simList :windowOutHeight="windowOutHeight"></simList>
        </el-tab-pane>
        <el-tab-pane label="配件管理" name="3">
            <partsList :windowOutHeight="windowOutHeight"></partsList>
        </el-tab-pane>
        <el-tab-pane label="库房管理" name="4">
            <storeHouseList :windowOutHeight="windowOutHeight"></storeHouseList>
        </el-tab-pane>
        <el-tab-pane label="供应商管理" name="5">
            <supplierList :windowOutHeight="windowOutHeight"></supplierList>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import equipmentList from './equipmentList/index.vue'	//设备
    import simList from './simList/index.vue'			//sim卡
    import partsList from './partsList/index.vue'		//配件
    import storeHouseList from './storeHouseList/index.vue'//库房
    import supplierList from './supplierList/index.vue'		//供应商
    

    export default {
        name: 'dictionaryManage',
        props: ['windowOutHeight'],
        data () {
            return {
                activeName: '1'
            }
        },
        methods: {
            handleClick (val) {

            }
        },
        components: {
            equipmentList,
            simList,
            partsList,
            storeHouseList,
            supplierList
        }
    }
</script>

<style lang="stylus" scoped>
</style>
