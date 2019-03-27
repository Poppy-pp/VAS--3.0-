<template>
    <div id="h5_entryExitStatistics">
        <div class="choose_search">
            <div>
                <el-cascader :options="storages" :props="props" v-model="selectForm.storagenameFour" @change="handleChangeFour" filterable clearable change-on-select placeholder="请选择库房"></el-cascader>
            </div>
            <div class="selectMonth">
                <el-select v-model="selectForm.prodFour" @change="chooseProd" filterable clearable placeholder="请选择物资">
                                        <el-option v-for="item in storagesFour" :key="item.value"  :label="item.label" :value="item.value"></el-option>
                                    </el-select>
            </div>
        </div>
        <div class="chartBox">
            <div id="entryExitStatistics" style="width:100%;height:200pt;"></div>
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
  display: flex;
}
.choose_search>div{
  width: 50%;
}
.chartBox {
  width: 100%;
  height: 600px;
  padding-top: 20px;
}
</style>
<script src="./index.js"></script>


