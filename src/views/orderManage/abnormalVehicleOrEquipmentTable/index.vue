<!--* 
* @description: 异常车辆/设备表 离线车辆表 离线设备表 停车车辆表
*-->
<template>
    <section class="tab_content-wrapper yewu">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick" >
            <el-tab-pane label="离线车辆表" name="1">
                <offlineVehicleMeter :windowOutHeight="windowOutHeight"></offlineVehicleMeter>
            </el-tab-pane>
            <el-tab-pane label="离线设备表" name="2">
                <offlineEquipmentTable :windowOutHeight="windowOutHeight"></offlineEquipmentTable>
           </el-tab-pane>
           <el-tab-pane label="停车车辆表" name="3">
               <parkingWatches :windowOutHeight="windowOutHeight"></parkingWatches>
           </el-tab-pane>
        </el-tabs>
    </section>
</template>

<script>
    //组件引入
    import offlineVehicleMeter from './offlineVehicleMeter/index.vue';//离线车辆表
    import offlineEquipmentTable from './offlineEquipmentTable/index.vue';//离线设备表
    import parkingWatches from './parkingWatches/index.vue';//停车车辆表
    export default {
        name:'abnormalVehicleOrEquipmentTable',
        props: ['windowOutHeight'],
        components: {
            offlineVehicleMeter,
            offlineEquipmentTable,
            parkingWatches
        },
        data() {
            return {
                activeName: '1',
            }
        },
        methods: {
            //页面管理切换
            handleClick(tab) {
                
            }
        }
    }
</script>


<style scoped>
    
</style>

