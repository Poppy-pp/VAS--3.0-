<template>
    <div id="h5_outboundStatistical">
        <div class="choose_search">
            <div>
                <el-cascader :options="storages" :props="props" v-model="selectForm.outboundstoragename" @change="handleChangeStorage" filterable clearable change-on-select placeholder="请选择库房"></el-cascader>
            </div>
            <div class="selectMonth">
                <el-date-picker v-model="selectForm.outboundmonth" type="month" placeholder="选择月份" @change="handleDate"> </el-date-picker>
            </div>
        </div>
        <div class="chartBox">
            <div id="outboundStatistical" style="width:100%;height:200pt;"></div>
        </div>
        
    </div>
</template>
<style scoped>
#h5_outboundStatistical {
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


