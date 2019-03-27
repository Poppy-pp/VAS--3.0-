<!--* 
* @description: 添加车辆标签--子组件
* @author: mt 
* @update: mt
*-->
<template>
    <div>
        <div>
            <p v-show='show'>已有车辆标签</p>
            <div class="moreCarLabel">
                <el-tag class="moreCarLabel_one" v-for="(tag,index) in tags" :key="tag.name"
                    closable
                    :type="tag.type" @close="handleClose(index)">
                    {{tag.name}}
                </el-tag>
            </div>
        </div>
        <div style="display:flex;justify-content:space-between;">
            <div style="width:48%;">
                <el-select v-model="AddOtherLabels" placeholder="添加其他标签" style="width:60%;">
                    <el-option
                    v-for="item in otherLabels"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="text" style="margin:0 0 0 20px;" @click="addInput=true">自定义标签 + </el-button>
            </div>
            <div v-show="addInput" style="width:50%;margin-left:20px;">
                <el-input placeholder="请输入标签，最多五个字" v-model="customlabel" clearable style="width:74%;" validate-event=true>
                </el-input>
                <el-button type="primary" @click="addLabel">添加</el-button>
            </div>
        </div>
    </div>
</template>
<script src="./index.js"></script>
<style>
.moreCarLabel{
   display:flex;
   justify-content: flex-start;
   flex-wrap: wrap;
   padding-bottom:20px;
}
.moreCarLabel .moreCarLabel_one{
    margin:10px 10px 0 10px;
}
</style>

