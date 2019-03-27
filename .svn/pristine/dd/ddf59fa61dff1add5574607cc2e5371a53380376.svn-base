<template>
	<section class="tab_content-wrapper">
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input @keyup.native.ctrl.8="clearAll()" @keyup.native.13="handleQuerySelect" placeholder="请输入中心区域" v-model="filters.attendcentername"></el-input>
					<el-input type="text" style="display:none"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleQuerySelect" icon="el-icon-search">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd" icon="el-icon-plus">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table :max-height="windowOutHeight-215" border :data="listData" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="index" width="30" align="center" label="#">
			</el-table-column>
			<el-table-column prop="attendcentername" label="考勤中心区域名称" align="center" width="150">
			</el-table-column>
			<el-table-column prop="longitude" label="经度" align="center" width="150">
			</el-table-column>
			<el-table-column prop="latitude" label="纬度" align="center" width="150">
			</el-table-column>
			<el-table-column prop="attendcenteraddress" label="定位地址" align="center">
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="100" align="center">
				<template scope="scope">
					<el-button id="button" @click="handleEdit(scope.$index, scope.row)" title="编辑">
						<i class='iconfont icon-bianji1 operate operate-bianji'></i>
					</el-button>
					<el-button id="button" @click="handleDel(scope.$index, scope.row)" title="删除">
						<i class='iconfont icon-p-delet operate operate-p-delet'></i>
					</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :page-sizes="[15, 50, 80,99]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog title="编辑" :modal-append-to-body="false" :visible.sync="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm" v-if="editFormVisible">
				<el-form-item label="区域名称" prop="attendcentername">
					<el-input v-model="editForm.attendcentername" auto-complete="off" placeholder="请输入中心区域"></el-input>
				</el-form-item>
				<el-form-item label="定位地址" prop="attendcenteraddress">
					<el-input v-model="editForm.attendcenteraddress" @change="changeMap1" auto-complete="off" placeholder="请选择或输入定位地址"></el-input>
				</el-form-item>
				<el-form-item label="经度" prop="longitude">
					<el-input v-model="editForm.longitude" auto-complete="off" readonly></el-input>
				</el-form-item>
				<el-form-item label="纬度" prop="latitude">
					<el-input v-model="editForm.latitude" auto-complete="off" readonly></el-input>
				</el-form-item>
				<gdmap1 @draggerMapMarker="draggerMapMarker" :address="editForm.attendcenteraddress" ref="vueAmap1"></gdmap1>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增" :modal-append-to-body="false" :visible.sync="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm" v-if="addFormVisible">
				<el-form-item label="区域名称" prop="attendcentername">
					<el-input v-model="addForm.attendcentername" auto-complete="off" placeholder="请输入考勤中心区域"></el-input>
				</el-form-item>
				<el-form-item label="定位地址" prop="attendcenteraddress">
					<el-input v-model="addForm.attendcenteraddress" @change="changeMap" auto-complete="off" placeholder="请选择或输入定位地址"></el-input>
				</el-form-item>
				<el-form-item label="经度" prop="longitude">
					<el-input v-model="addForm.longitude" auto-complete="off" readonly></el-input>
				</el-form-item>
				<el-form-item label="纬度" prop="latitude">
					<el-input v-model="addForm.latitude" auto-complete="off" readonly></el-input>
				</el-form-item>
				<gdmap @draggerMapMarker="draggerMapMarker" ref="vueAmap"></gdmap>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script src="./index.js"></script>