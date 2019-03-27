<template>
    <div id="h5_inventoryStatistics">
        <div class="choose_search">
            <el-cascader :options="storages" :props="props" v-model="selectForm.storagename" @change="handleChange" filterable change-on-select clearable placeholder="请选择库房"></el-cascader>
        </div>
        <div class="chartBox">
            <div id="inventoryStatistics" style="width:100%;height:200pt;"></div>
        </div>
        
    </div>
</template>
<style scoped>
#h5_inventoryStatistics {
  height: 100%;
  border: 1px solid blue;
}
.choose_search {
  width: 100%;
}
.chartBox {
  width: 100%;
  height: 600px;
  padding-top: 20px;
}
</style>
<script src="./index.js"></script>


