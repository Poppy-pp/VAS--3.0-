<template>
	<section class="tab_content-wrapper">
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item label="单号">
					<el-input @keyup.native.13="handleQuery" placeholder="请输入查询内容" v-model="filters.batchno"></el-input>
				</el-form-item>
				<el-form-item label="报损日期">
					<el-date-picker style="width:250px;" v-model="filters.timeScope" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleQuery" icon="el-icon-search">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd" icon="el-icon-plus">新增报损</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="warning" @click="viewRestocking" icon="el-icon-sold-out">重新入库</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table :max-height="windowOutHeight-215" border :data="listData" highlight-current-row v-loading="listLoading" >
			<el-table-column type="index" width="30" label="#" align="center">
			</el-table-column>
			<el-table-column prop="batchno" label="单号" align="center" >
			</el-table-column>
			<el-table-column prop="actiondate" label="报损日期" align="center" :formatter="dateFormatter" >
			</el-table-column>
			<el-table-column prop="qty" label="报损数量" align="center">
			</el-table-column>
			<el-table-column label="状态" align="center">
				<template slot-scope="scope">
				            <el-tag :type="scope.row.actiontype == 'OUT_DAMAGE' ? 'success' : 'info'">
				     	{{ scope.row.actiontypename == null ? '--' : scope.row.actiontypename}}</el-tag>
				</template>
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="50" align="center">
				<template slot-scope="scope">
			                    <el-button id="button" @click="viewDetails(scope.row)" title="查看详情" >
			                        <i class="iconfont icon-xiangqing operate operate-xiangqing"></i>
			                    </el-button>
			            </template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :page-sizes="[15, 50, 80, 99]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total">
			</el-pagination>
		</el-col>


		<!--新增界面——新增调拨-->
		<loss-detail v-if="addFormVisible" :storageInvoice="storageInvoice" @submit="submit(index)"></loss-detail>

		<!-- 重新入库 弹窗 -->
		<el-dialog title="重新入库" :modal-append-to-body="false" :close-on-click-modal='false' :visible.sync="restockFormVisible">
		            <el-tabs v-model="activeName" @tab-click="handleClickResto" type="card">
		                	<el-tab-pane label="重新入库" name="first">
			                	<el-form :model="restockForm" label-width="120px" :rules="restockFormRules" ref="restockForm">
			                		<span class="formTile">填写入库信息</span>
						<el-row :gutter="10">
							<el-col :span="24">
								<el-form-item label="重新入库库房：" prop="storagename">
									<el-select v-model="restockForm.storagename" @visible-change="stoChange"filterable clearable placeholder="请选择重新入库库房" :loading="storageLoading">
							                            <el-option v-for="item in storageList" :key="item.storagename" :label="item.storagename + ' （库管：' + item.managername + '）'" :value="item.id"></el-option>
							                        </el-select>
								</el-form-item>
							</el-col>
							<el-col :span="24">
								<el-form-item label="重新入库备注：">
									<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入重新入库备注" v-model="restockForm.remarks"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<span class="formTile">入库设备信息</span>
						<el-row>
							<el-table border :data="chooseRestockProdData" max-height="600">
					                                  <el-table-column type="index" width="50" align="center" label="序号"></el-table-column>
					                                  <el-table-column prop="prodnum" label="设备编号" align="center" ></el-table-column>
					                                  <el-table-column prop="modelcategoryname" label="分类" align="center" width="80"></el-table-column>
					                                  <el-table-column prop="modelspecname" label="规格" align="center" width="100"></el-table-column>
					                                  <el-table-column prop="modelname" label="类型名称" align="center"></el-table-column>
					                                  <el-table-column prop="qty" label="数量" align="center" width="60"></el-table-column>
							         <el-table-column label="操作" width="50" align="center" fixed="right">
						                         <template slot-scope="scope">
							                         <el-button id="button" @click="handleDelete(scope.$index, scope.row)" title="删除"> <i class="iconfont icon-p-delet operate operate-cha"></i></el-button>
						                        	</template>
						                      </el-table-column>
					                        </el-table>
						</el-row>
						<el-button style="margin-top: 10px;" type="danger" size="small" @click="addDeviceList(0)"><i class="iconfont icon-qiandao"></i>  添加设备 </el-button>
						<el-button style="margin-top: 10px;" type="danger" size="small" @click="addDeviceList(1)"><i class="iconfont icon-zhibiao"></i>  添加配件 </el-button>
					</el-form>
			   	</el-tab-pane>

		                	<el-tab-pane label="重新入库历史记录" name="second">
		                		<el-form :inline="true" :model="filtersYishi" style="margin-top:10px;">
						<div style="display:inline-block;margin:0 10px 10px 0;">
							<el-input class="noborder color icon nofocus" @keyup.native.ctrl.8="clearAll()" @keyup.native.13="getDeciceListInfo" placeholder="请输入查询内容" v-model="filtersYishi.domSearch[0].content">
								<el-select class="wp_select" multiple clearable filterable v-model="filtersYishi.domSearch[0].select" slot="prepend" placeholder="选择条件">
									<el-option label="型号名称" value="modelname"></el-option>
									<el-option label="设备编号" value="prodnum"></el-option>
									<el-option label="SIM卡类型" value="simmodelname"></el-option>
									<el-option label="SIM卡通讯号" value="simnum"></el-option>
								</el-select>
							</el-input>
						</div>
						<el-form-item label="重新入库日期：">
							<el-date-picker style="width:250px;" v-model="filtersYishi.timeScope" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
			                        			<el-button style="margin-left: 10px;" type="primary" @click="getRestockData" icon="el-icon-search">查询</el-button>
						</el-form-item>
					</el-form>
			                        
			                        <el-table :data="moreData" v-loading="lostLoading" max-height="500" border>
			                                  <el-table-column type="index" width="50" align="center" label="序号"></el-table-column>
			                                  <el-table-column prop="batchno" label="单号" align="center" width="80"></el-table-column>
			                                  <el-table-column prop="storagename" label="入库库房" align="center" ></el-table-column>
			                                  <el-table-column prop="modelname" label="类型名称" align="center"></el-table-column>
			                                  <el-table-column prop="prodnum" label="设备编号" align="center" ></el-table-column>
			                                  <el-table-column prop="simmodelname" label="SIM卡类型" align="center" width="100"></el-table-column>
			                                  <el-table-column prop="simnum" label="SIM通讯号" align="center" width="100"></el-table-column>
			                                  <el-table-column prop="actiondate" label="重新入库日期" align="center" :formatter="dateFormatter" width="105"></el-table-column>
			                                  <el-table-column prop="remarks" label="备注" align="center"></el-table-column>
			                        </el-table>
			                        <el-col :span="24" class="toolbar">
			                            <el-pagination @size-change="yhandleSizeChange" @current-change="yhandleCurrentChange" :page-sizes="[15, 50, 80,99]" :page-size="ypageSize" layout="total, sizes, prev, pager, next, jumper" :total="ytotal">
			                            </el-pagination>
			                        </el-col>
			             </el-tab-pane>
		            </el-tabs>

	                	<div slot="footer" class="dialog-footer" v-if="activeName == 'first'">
				<el-button @click.native="restockFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="restockSubmit">提交</el-button>
			</div>		
		</el-dialog>

		<!-- 设备选择列表 -->
		<el-dialog :modal-append-to-body="false" :visible.sync="deviceFormVisible">
		    <el-tabs v-model="activeName2" type="card">
    		        <el-tab-pane label="设备选择列表" name="first" v-if="!editable">
			<el-col :span="24" class="toolbar" >
				<el-form :inline="true" :model="filtersProd" style="margin-top:10px;">
					<div style="display:inline-block;margin:0 10px 10px 0;">
						<el-input class="noborder color icon nofocus" @keyup.native.ctrl.8="clearAll()" @keyup.native.13="getDeciceListInfo" placeholder="请输入查询内容" v-model="filtersProd.domSearch[0].content">
							<el-select class="wp_select" multiple clearable filterable v-model="filtersProd.domSearch[0].select" slot="prepend" placeholder="选择条件">
								<el-option label="设备编号" value="prodnum"></el-option>
								<el-option label="设备类型" value="modelname"></el-option>
								<el-option label="SIM卡通讯号" value="simnum"></el-option>
								<el-option label="类别" value="modelcategoryname"></el-option>
							</el-select>
						</el-input>
					</div>
					<el-form-item>
						<el-button type="primary" @click="getDeciceListInfo" @keyup.native.13="getDeciceListInfo" icon="el-icon-search">查询</el-button>
					</el-form-item>
				</el-form>
			</el-col>
			<!--列表-->
			<el-table border :data="deviceListData" max-height="500" ref="deviceListData" v-loading="devicelistLoading" @row-dblclick="comlist">
				<el-table-column type="index" width="30" align="center" label="#"></el-table-column>
				<el-table-column prop="prodnum" label="设备编号" align="center">
					<template slot-scope="scope">
						<el-tooltip class="item" effect="dark" content="双击选择当前设备" placement="left"> <p>{{ scope.row.prodnum }}</p></el-tooltip>
					</template>
				</el-table-column>
	                                    <el-table-column prop="modelspecname" label="设备规格" align="center" width="80"></el-table-column>
	                                    <el-table-column prop="modelname" label="设备类型" align="center"></el-table-column>
	                                    <el-table-column prop="modelcategoryname" label="类别" align="center" width="80"></el-table-column>
	                                    <el-table-column prop="simnum" label="SIM卡通讯号" align="center"></el-table-column>
	                                    <el-table-column prop="simmodelspec" label="卡规格" align="center" width="80"></el-table-column>
	                                    <el-table-column prop="simmodelname" label="卡类型" align="center"></el-table-column>
			</el-table>
			<!--工具条-->
			<el-col :span="24" class="toolbar">
				<el-pagination @size-change="dhandleSizeChange" @current-change="dhandleCurrentChange" :page-sizes="[10, 50, 80,100]" :page-size="dpageSize" layout="total, sizes, prev, pager, next, jumper" :total="dtotal"></el-pagination>
			</el-col>
    		        </el-tab-pane>

    		        <el-tab-pane label="配件选择列表" name="second" v-else>
			<el-form :model="typeForm" ref="typeForm" label-width="100px">
			 <el-row :gutter="10">
			    <el-col :span="12">
	                                <el-form-item label="配件型号" prop="modelnameArr" :rules="{required: true, message: '型号不能为空', trigger: 'blur'}">
	                                     <el-cascader @focus="modelCascader" @change="handleChangeModel" :options="modelOptions" v-model="typeForm.modelnameArr" ref="cascader" clearable></el-cascader>
	                                 </el-form-item>
	                             </el-col>
	                             <el-col :span="12">
	                                <el-form-item label="配件数量" prop="qty" :rules="{required: true, message: '数量不能为空', trigger: 'blur'}">
	                                     <el-input placeholder="请输入重新入库配件数量" v-model="typeForm.qty"></el-input>
	                                 </el-form-item>
	                             </el-col>
		             </el-row>
		            </el-form>
		      </el-tab-pane>
		   </el-tabs>

		   <div slot="footer" class="dialog-footer" v-if="activeName2 == 'second'">
                                <el-button @click="cancelParts()">取消</el-button>
	                    <el-button type="primary" @click="confirmParts()">确认</el-button>
	               </div>
		</el-dialog>

	</section>
</template>

<style type="text/css" media="screen">
.logistics{margin:10px 50px;font-size: 16px;display: inline-block;}
.logistics i {color: #41B883;font-style: normal;}
</style>

<script src="./index.js"></script>