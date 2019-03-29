<template>
    <section class="tab_content-wrapper">
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <template v-for="(item,index) in filters.domSearch">
                    <template v-if="index == 0">
                        <div style="display:inline-block;margin:0 10px 10px 0;">
                            <el-input class="noborder color icon nofocus" @keyup.native.ctrl.8="clearAll()" @keyup.native.13="handleQuerySelect" placeholder="请输入查询内容" v-model="filters.domSearch[index].content">
                                <el-select class="wp_select" multiple clearable filterable v-model="filters.domSearch[index].select" slot="prepend" placeholder="选择条件">
                                    <el-option label="待办编号" value="toDoNum"></el-option>
                                    <el-option label="异常原因" value="abnormalReason"></el-option>
                                    <el-option label="车辆信息" value="vehicleInfo"></el-option>
                                    <el-option label="所属公司" value="affiliatedCompany"></el-option>
                                    <el-option label="车辆标签" value="vehicleLabels"></el-option>
                                    <el-option label="任务处理人" value="taskHandler"></el-option>
                                    <el-option label="最新处理详情" value="handleDetailNew"></el-option>
                                </el-select>
                                <template v-if="index == filters.domSearch.length-1">
                                    <el-button slot="append" @click="addSelect" icon="el-icon-plus" title="添加查询条件"></el-button>
                                </template>
                                <template v-else>
                                    <el-button slot="append" @click="removeSelect(index)" icon="el-icon-minus" title="移除查询条件"></el-button>
                                </template>
                            </el-input>
                        </div>
                    </template>
                    <template v-else>
                        <el-col :span="24">
                            <div style="display:inline-block;margin:0 10px 10px 0;">
                                <el-input class="noborder color icon nofocus" @keyup.native.ctrl.8="clearAll()" @keyup.native.13="handleQuerySelect" placeholder="请输入查询内容" v-model="filters.domSearch[index].content">
                                    <el-select class="wp_select" multiple clearable filterable v-model="filters.domSearch[index].select" slot="prepend" placeholder="选择条件">
                                        <el-option label="待办编号" value="toDoNum"></el-option>
                                        <el-option label="异常原因" value="abnormalReason"></el-option>
                                        <el-option label="车辆信息" value="vehicleInfo"></el-option>
                                        <el-option label="所属公司" value="affiliatedCompany"></el-option>
                                        <el-option label="车辆标签" value="vehicleLabels"></el-option>
                                        <el-option label="任务处理人" value="taskHandler"></el-option>
                                        <el-option label="最新处理详情" value="handleDetailNew"></el-option>
                                    </el-select>
                                    <template v-if="index == filters.domSearch.length-1">
                                        <el-button slot="append" @click="addSelect" icon="el-icon-plus" title="添加查询条件"></el-button>
                                    </template>
                                    <template v-else>
                                        <el-button slot="append" @click="removeSelect(index)" icon="el-icon-minus" title="移除查询条件"></el-button>
                                    </template>
                                </el-input>
                            </div>
                        </el-col>
                    </template>
                    <template v-if="index == 0">
                        <el-form-item prop="startDate" class="sf100">
                            <el-date-picker v-model="filters.startDate" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="handleQuerySelect" icon="el-icon-search">查询</el-button>
                        </el-form-item>
                    </template>
                </template>
            </el-form>
        </el-col>
        <!--列表-->
		<el-table :max-height="windowOutHeight-215" border :data="listData" :row-class-name="tableRowClassName" highlight-current-row v-loading="listLoading" style="width: 100%;" @sort-change="sortChange">
			<el-table-column type="index" width="30" align="center" label="#">
			</el-table-column>
           
            <el-table-column prop="stopCarSituation" label="车辆停车情况" align="center" width="340">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="bottom">
                    <alarmComponent></alarmComponent>
                    <div slot="reference" class="name-wrapper">
                        {{ scope.row.stopCarSituation }}
                    </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="generationtime" label="停车触发时间" align="center" width="155">
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
                            <li class="handlingDetailsList" v-for="(item,index) in activities">
                                <p class="timeNode"></p>
                                <p v-if="index!=activities.length-1" class="solid"></p>
                                <div>
                                    <div>
                                        <p>{{item.name}}</p>
                                        <p>{{item.currentNode}}</p>
                                    </div>
                                    <div style="margin-left:20px;"> 
                                        <p>{{item.timestamp}}</p>
                                        <p>{{item.currentState}}</p>
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
			<el-table-column fixed="right" label="操作" width="120" align="center">
				<template scope="scope">
					<el-button id="button" title="详情" @click="formDetailHandle(scope.row)">
						<i class="iconfont icon-xiangqing operate operate-xiangqing"></i>
					</el-button>
                    <el-button id="button" title="推送给客户" @click="pushToCustomers(scope.row)">
						<i class="iconfont icon-jiaoseshezhi operate operate-bianji-coc"></i>
					</el-button>
                    <el-dropdown>
                             <span class="el-dropdown-link">
                                <i class="el-icon-arrow-down el-icon--right size"></i>
                              </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item @click.native="handleNote(0)"
                                >远程处理
                                </el-dropdown-item>
                                <el-dropdown-item @click.native="handleNote(1)" 
                                >设备检测
                                </el-dropdown-item>
                                <el-dropdown-item @click.native="handleNote(2)" 
                                >跟进处理
                                </el-dropdown-item>
                                <el-dropdown-item @click.native="handleNote(3)" 
                                >转为待办
                                </el-dropdown-item>
                                <el-dropdown-item @click.native="handleNote(4, scope.row)" 
                                >派单维护
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
				</template>
			</el-table-column>
		</el-table>

        <!-- 详情 弹窗 start-->
		<el-dialog title="详情" :modal-append-to-body="false" :visible.sync="formDialogTableVisible">
			<el-tabs>
				<el-row>
					<el-col :span="24">
						<span class="formTile">设备信息</span>
					</el-col>
                    <el-col :span="24" style="display:flex;margin-bottom:10px;">
						<span class="equipmentTitle">无线WH</span>
                        <span class="sanjiao"></span>
					</el-col>
					<el-col :span="8">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>设备编号:</dt>
							<dd> 111 </dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>设备接入时间:</dt>
							<dd> 222 </dd>
						</dl>
					</el-col>
                    <el-col :span="8">
                        <dl class="dllist" style="margin-bottom:10px;">
							<dt>SIM卡号:</dt>
							<dd> 333 </dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>设备最近安装时间:</dt>
							<dd> 444</dd>
						</dl>
                    </el-col>
                    <el-col :span="8">
                        <dl class="dllist" style="margin-bottom:10px;">
							<dt>设备电量:</dt>
							<dd> 333 </dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>设备安装位置:</dt>
							<dd> 主座内[查看图片]444</dd>
						</dl>
                    </el-col>
                    <el-col :span="24" style="display:flex;margin-bottom:10px;">
						<span class="equipmentTitle">有线WA</span>
                        <span class="sanjiao"></span>
					</el-col>
					<el-col :span="8">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>设备编号:</dt>
							<dd> 333 </dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>设备接入时间:</dt>
							<dd> 444</dd>
						</dl>
					</el-col>
                    <el-col :span="8">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>SIM卡号:</dt>
							<dd> 333 </dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>设备最近安装时间:</dt>
							<dd> 444</dd>
						</dl>
					</el-col>
                    <el-col :span="8">
                        <dl class="dllist" style="margin-bottom:10px;">
							<dt>设备电量:</dt>
							<dd> 333 </dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>设备安装位置:</dt>
							<dd> 主座内[查看图片]444</dd>
						</dl>
                    </el-col>
				</el-row>
                <el-row>
					<el-col :span="24">
						<span class="formTile">车辆信息</span>
					</el-col>
					<el-col :span="8">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>车架号:</dt>
							<dd> 111 </dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>所属公司:</dt>
							<dd> 222 </dd>
						</dl>
                        <dl class="dllist" style="margin-bottom:10px;">
							<dt>车主电话:</dt>
							<dd> 111 </dd>
						</dl>
					</el-col>
					<el-col :span="8">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>车牌号:</dt>
							<dd> 333 </dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>车辆购置价:</dt>
							<dd> 444</dd>
						</dl>
                        <dl class="dllist" style="margin-bottom:10px;">
							<dt>车辆服务期限:</dt>
							<dd> 333 </dd>
						</dl>
					</el-col>
                    <el-col :span="8">
                        <dl class="dllist" style="margin-bottom:10px;">
							<dt>车辆型号:</dt>
							<dd> 333 </dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>车主姓名:</dt>
							<dd> 444</dd>
						</dl>
                        <dl class="dllist" style="margin-bottom:10px;">
							<dt>车辆保险期限:</dt>
							<dd> 444</dd>
						</dl>
                    </el-col>
                    <el-col :span="24">
                        <dl class="dllist" style="margin-bottom:10px;">
							<dt style="margin-top:10px;">车辆标签:</dt>
							<dd>
                                <newLabel :show="false"></newLabel>
                            </dd>
						</dl>
                    </el-col>
				</el-row>
            </el-tabs>
		</el-dialog>
		<!-- 详情 弹窗 end-->

        <!-- 更多 start-->
        <el-dialog title="已有车辆标签" :visible.sync="openMore" width="40%">
            <newLabel style="margin-top:10px;" :show="true"></newLabel>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="openMore = false">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 更多 end -->

        <!-- 推送给客户 start -->
        <el-dialog title="推送给客户公司" :model-append-to-body='false' :visible.sync='pushToCustomersVisible'>
            <div style="width:80%;margin:20px auto;">
                <p style="margin-bottom:10px;font-size:16px;">推送说明</p>
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入推送说明" v-model="pushInstructions">
                </el-input>
                <!-- <el-select v-model="receiver" placeholder="请选择微信接收人" style="margin:10px 0;width:35%;">
                    <el-option
                    v-for="item in receiverArray"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select> -->
                <newLabel style="margin-top:10px;" :show="true"></newLabel>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="pushToCustomersVisible = false">取 消</el-button>
                <el-button type="primary" @click="pushToCustomersVisible = false">确认推送</el-button>
            </span>
        </el-dialog>
        <!-- 推送给客户 end -->


    </section>
</template>
<script src="./index.js"></script>
<style scoped>
.handlingDetails ul {
  padding-bottom: 20px;
}
.handlingDetailsList {
  display: flex;
  width: 100%;
  justify-content: flex-start;
  position: relative;
  margin: 20px 0;
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
  width: 100%;
  line-height: 28px;
  margin-left: 20px;
  display: flex;
  justify-content: flex-start;
}
.solid {
  background-color: rgb(148, 145, 145);
  width: 1px;
  height: 55px;
  position: absolute;
  top: 23px;
  left: 27px;
}
</style>
