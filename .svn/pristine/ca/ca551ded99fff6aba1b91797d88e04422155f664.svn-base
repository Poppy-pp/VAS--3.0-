<template>
    <section>
        <!-- 工具条 start -->
        <el-col>
            <el-select v-model="handoverPerson" placeholder="请选择交接人" style="width:19%;margin-bottom:20px;">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-button type="primary">确认交接</el-button>
        </el-col>
        <!-- 工具条 end -->
        <!--列表-->
		<el-table :max-height="windowOutHeight-215" border :data="listData" :row-class-name="tableRowClassName" highlight-current-row v-loading="listLoading" style="width: 100%;" @sort-change="sortChange" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center">
            </el-table-column>
            <el-table-column type="index" width="30" align="center" label="#">
			</el-table-column>
			<el-table-column prop="toDoNum" label="待办编号" align="center" width="130" >
			</el-table-column>
			<el-table-column prop="AbnormalCauses" label="异常原因" align="center" width="340">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="bottom">
                    <alarmComponent></alarmComponent>
                    <div slot="reference" class="name-wrapper">
                        {{ scope.row.AbnormalCauses }}
                    </div>
                    </el-popover>
                </template>
			</el-table-column>
			<el-table-column prop="generationtime" label="待办生成时间" align="center" width="155">
			</el-table-column>
			<el-table-column prop="carInfo" label="车辆信息" align="center" width="250">
                <template slot-scope="scope">
                    <div>
                       <table>
                           <tr style="background-color: transparent;">
                               <td style="border:0;">车牌号：</td>
                               <td style="border:0;">川A12345</td>
                           </tr>
                           <tr style="background-color: transparent;">
                               <td style="border:0;">车架号：</td>
                               <td style="border:0;">LGWEF4A52JF538615</td>
                           </tr>
                       </table>
                    </div>
                </template>
			</el-table-column>
			<el-table-column prop="AffiliatedCompany" label="所属公司" align="center" >
			</el-table-column>
			<el-table-column prop="VehicleLabels" label="车辆标签" align="center" width="250">
                 <template slot-scope="scope">
                     <div v-for="(item,index) in scope.row.VehicleLabels" style="display:inline-block;margin-left:10px;">
                          <el-tag :type="item === '有保险' ? 'primary' : 'success'" disable-transitions>{{item}}</el-tag>
                     </div>
                     <div style='display:inline-block;margin-left:10px;'>
                         <el-button type="text" @click="openMore=true">更多</el-button>
                     </div>
                </template>
			</el-table-column>
			<el-table-column prop="LatestProcessingDetails" label="最新处理详情" align="center" width="180" >
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="bottom">
                    <div class="handlingDetails">
                        <div style="font-weight:bold;margin-bottom:20px;">处理详情</div>
                        <ul>
                            <li class="handlingDetailsList">
                                <p class="timeNode"></p>
                                <p class="solid"></p>
                                <div>
                                    <div style="display:flex;">
                                        <p>万网-小张</p>
                                        <p>2018-12-29 10:30:35</p>
                                    </div>
                                    <div style="display:flex;"> 
                                        <p>【派单维护】</p>
                                        <p>已派单-维修</p>
                                    </div>
                                </div>
                            </li>
                            <li class="handlingDetailsList">
                                <p class="timeNode"></p>
                                <p class="solid"></p>
                                <div>
                                    <div style="display:flex;">
                                        <p>万网-小张</p>
                                        <p>2018-12-29 10:30:35</p>
                                    </div>
                                    <div style="display:flex;">
                                        <p>【派单维护】</p>
                                        <p>已派单-维修</p>
                                    </div>
                                </div>
                            </li>
                            <li class="handlingDetailsList">
                                <p class="timeNode"></p>
                                <!-- <p class="solid"></p> -->
                                <div>
                                    <div style="display:flex;">
                                        <p>万网-小张</p>
                                        <p>2018-12-29 10:30:35</p>
                                    </div>
                                    <div style="display:flex;">
                                        <p>【派单维护】</p>
                                        <p>已派单-维修</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div slot="reference" class="name-wrapper">
                        {{ scope.row.AbnormalCauses }}
                    </div>
                    </el-popover>
                </template>
			</el-table-column>
            <el-table-column prop="jurisdiction" label="交接电子围栏权限" align="center" width="120" >
                <template scope="scope">
                    <el-checkbox v-model="scope.row.jurisdiction">是</el-checkbox>
                </template>
			</el-table-column>
            <el-table-column prop="handoverInfo" fixed="right" label="填写交接说明" align="center" width="200" >
                <template scope="scope">
                    <el-input v-model="scope.row.handoverInfo" placeholder="请输入交接说明"></el-input>
                </template>
			</el-table-column>
		</el-table>
        <!-- 更多 start -->
        <el-dialog title="已有车辆标签" :visible.sync="openMore" width="40%">
            <newLabel style="margin-top:10px;" :show="true"></newLabel>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="openMore = false">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 更多 end -->
        <!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :page-sizes="[15, 50, 80, 99]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
    </section>
    
</template>
<script src="./index.js"></script>
<style scoped>
.alarmComponent {
  width: 300px;
  line-height: 28px;
  text-align: center;
}
.deviceInfo {
  display: flex;
  justify-content: space-around;
  margin-bottom: 8px;
}
.handlingDetails ul {
  padding-bottom: 20px;
}
.handlingDetailsList {
  display: flex;
  width: 300px;
  justify-content: flex-start;
  position: relative;
}
.handlingDetailsList .timeNode {
  border-radius: 50%;
  width: 15px;
  height: 15px;
  background-color: #41b883;
  margin-top: 6px;
  margin-left: 20px;
}
.handlingDetailsList > div {
  line-height: 28px;
  margin-left: 30px;
}
.solid {
  background-color: rgb(148, 145, 145);
  width: 1px;
  height: 35px;
  position: absolute;
  top: 23px;
  left: 27px;
}
</style>

