<template>
    <section class="tab_content-wrapper">
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item>
                    <el-button type="primary" @click="handleAdd" icon="el-icon-plus">新增部门</el-button>
                </el-form-item>
                <el-form-item>
                    <el-switch v-model="filters.isactive" active-color="#41B883" inactive-color="#ff4949" active-value="1" active-text="有效" inactive-value="0"
                               inactive-text="无效" @change="showData">
                    </el-switch>
                </el-form-item>
            </el-form>
        </el-col>
        <!--列表-->
        <el-table stripe border :data="listData" :row-class-name="tableRowClassName" highlight-current-row v-loading="listLoading"
                  @selection-change="selsChange" style="width: 100%;" @sort-change="sortChange">
            <el-table-column type="index" width="30" align="center" label="#">
            </el-table-column>
            <el-table-column prop="deptname" label="部门" width="150" align="center">
            </el-table-column>
            <el-table-column prop="deptshortname" label="名称缩写" align="center">
            </el-table-column>
            <el-table-column prop="parentname" label="父级部门" align="center">
            </el-table-column>
            <!--<el-table-column prop="corpname" label="所属公司" align="center" >-->
            <!--</el-table-column>-->
            <el-table-column prop="deptmanagername" label="负责人" align="center">
            </el-table-column>
            <el-table-column prop="deptaddress" label="地址" align="center">
            </el-table-column>
            <el-table-column prop="deptcontactno" label="电话" align="center">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="130" align="center">
                <template slot-scope="scope">
                    <el-button id="button" @click="formDetailHandle(scope.row)" title="详情" :disabled="scope.row.isactive != '1' ? true : false">
                        <i :class="scope.row.isactive != '1' ? 'iconfont icon-xiangqing operate' : 'iconfont icon-xiangqing operate operate-xiangqing'"></i>
                    </el-button>
                    <el-button id="button" @click="handleEdit(scope.$index, scope.row)" :disabled="scope.row.isactive != '1' ? true : false" title="编辑">
                        <i :class="scope.row.isactive != '1' ? 'iconfont icon-bianji1 operate' : 'iconfont icon-bianji1 operate operate-bianji'"></i>
                    </el-button>
                    <el-button id="button" @click="handleChange(scope.$index, scope.row)" :title='scope.row.isactive != "1" ? "设置为有效" : "设置为无效"'>
                        <i :class='scope.row.isactive != "1" ? "iconfont icon-cha operate operate-cha" : "iconfont icon-duigou operate operate-duigou"'
                           @mouseover="mouseoverChange" @mouseout="mouseoutChange"></i>
                    </el-button>
                    <!-- <el-button id="button"  @click="handleDel(scope.$index, scope.row)"  title="删除" :disabled="scope.row.isactive == '0' ? true : false">
                        <i :class="scope.row.isactive == '0' ? 'iconfont icon-p-delet operate operate-gray' : 'iconfont icon-p-delet operate operate-p-delet'"></i>
                    </el-button> -->
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <!-- <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button> -->
            <el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :page-sizes="[15, 50, 80, 99]" :page-size="pageSize"
                           layout="total, sizes, prev, pager, next" :total="total" style="float:right;">
            </el-pagination>
        </el-col>

        <!-- 详情 弹窗 start-->
        <el-dialog title="" :visible.sync="formDialogTableVisible">
            <el-tabs>
                <el-row style="padding:0 40px;margin-bottom:20px;border-bottom:1px solid #C4E8D6;">
                    <el-col :span="24">
                        <span class="formTile">部门信息</span>
                    </el-col>
                    <el-col :span="12">
                        <dl class="dllist" style="margin-bottom:10px;">
                            <dt>部门:</dt>
                            <dd>{{ deptData.deptname }}</dd>
                        </dl>
                        <dl class="dllist" style="margin-bottom:10px;">
                            <dt>代码:</dt>
                            <dd>{{ deptData.deptcode == undefined ? '暂无' : deptData.deptcode }}</dd>
                        </dl>
                        <dl class="dllist" style="margin-bottom:10px;">
                            <dt>名称缩写:</dt>
                            <dd>{{ deptData.deptshortname == undefined ? '暂无' : deptData.deptshortname }}</dd>
                        </dl>
                        <dl class="dllist" style="margin-bottom:10px;">
                            <dt>负责人:</dt>
                            <dd>{{ deptData.deptmanagername == undefined ? '暂无' : deptData.deptmanagername }}</dd>
                        </dl>
                    </el-col>
                    <el-col :span="8">
                        <dl class="dllist" style="margin-bottom:10px;">
                            <dt>地址:</dt>
                            <dd>{{ deptData.deptaddress == undefined ? '暂无' : deptData.deptaddress }}</dd>
                        </dl>
                        <dl class="dllist" style="margin-bottom:10px;">
                            <dt>电话:</dt>
                            <dd>{{ deptData.deptcontactno == undefined ? '暂无' : deptData.deptcontactno}}</dd>
                        </dl>
                        <dl class="dllist" style="margin-bottom:10px;">
                            <dt>父级部门:</dt>
                            <dd>{{ deptData.parentname == undefined ? '暂无' : deptData.parentname }}</dd>
                        </dl>
                        <dl class="dllist" style="margin-bottom:10px;">
                            <dt>所属公司:</dt>
                            <dd>{{ deptData.corpname == undefined ? '暂无' : deptData.corpname }}</dd>
                        </dl>
                    </el-col>
                </el-row>

                <el-row style="padding:10px 40px;margin-bottom:20px;border-bottom:1px solid #C4E8D6;">
                    <el-col :span="24">
                        <span class="formTile">创建信息</span>
                    </el-col>
                    <el-col :span="6">
                        <dl class="dllist" style="margin-bottom:10px;">
                            <dt>创建人:</dt>
                            <dd>{{createname == undefined ? '暂无' : createname}}</dd>
                        </dl>
                    </el-col>
                    <el-col :span="6">
                        <dl class="dllist" style="margin-bottom:10px;">
                            <dt>创建日期:</dt>
                            <dd>{{deptData.createdate == null ? "暂无" :fmtdata.formatDate.format(new Date(deptData.createdate), 'yyyy-MM-dd') }}</dd>
                        </dl>
                    </el-col>
                    <el-col :span="6">
                        <dl class="dllist" style="margin-bottom:10px;">
                            <dt>修改人:</dt>
                            <dd>{{updatename == undefined ? '暂无' : updatename}}</dd>
                        </dl>
                    </el-col>
                    <el-col :span="6">
                        <dl class="dllist" style="margin-bottom:10px;">
                            <dt>修改日期:</dt>
                            <dd>{{deptData.updatedate == null ? "暂无" :fmtdata.formatDate.format(new Date(deptData.updatedate), 'yyyy-MM-dd') }}</dd>
                        </dl>
                    </el-col>
                </el-row>
            </el-tabs>
        </el-dialog>
        <!-- 订单详情 弹窗  end-->

        <!--编辑界面-->
        <el-dialog title="编辑" :modal-append-to-body="false" :visible.sync="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="所属公司" prop="corpname">
                            <el-autocomplete class="inline-input searchInput" v-model="editForm.corpname" :fetch-suggestions="querySearchCorpName" disabled
                                             placeholder="请输入公司名称" :trigger-on-focus="false" clearable @select="handleSelectCorpName"></el-autocomplete>
                        </el-form-item>
                        <el-form-item label="部门名称" prop="deptname" ref="deptname">
                            <el-input v-model="editForm.deptname" placeholder="请输入部门名称" auto-complete="off"
                                      @blur="checkout('deptname',editForm.deptname,0)"></el-input>
                        </el-form-item>
                        <el-form-item label="部门名称缩写" prop="deptshortname" ref="deptshortname">
                            <el-input v-model="editForm.deptshortname" placeholder="请输入部门名称缩写" auto-complete="off"
                                      @blur="checkout('deptshortname',editForm.deptshortname,1)"></el-input>
                        </el-form-item>
                        <el-form-item label="负责人" prop="deptmanagername">
                            <!--<el-autocomplete class="inline-input searchInput" v-model="editForm.deptmanagername" :fetch-suggestions="querySearchName"-->
                                             <!--placeholder="请输入负责人" :trigger-on-focus="false" @select="handleSelectName"></el-autocomplete>-->
                            <el-select v-model="editForm.deptmanagername" @visible-change="employChange" filterable placeholder="请选择负责人"
                                       clearable remote>
                                <el-option v-for="item in employlist" :key="item.id" :label="item.employeename" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="部门电话" prop="deptcontactno">
                            <el-input v-model="editForm.deptcontactno" placeholder="请输入部门电话" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="地址" prop="addressAll">
                            <el-cascader placeholder="请选择省/市/区" v-model="editForm.addressAll" :options="prOptions" filterable clearable
                                         change-on-select></el-cascader>
                        </el-form-item>
                        <!-- 判断是否有父级部门 -->
                        <el-form-item label="父级部门" prop="hasParent">
                            <el-switch v-model="editForm.hasParent" active-color="#00C1DE" inactive-color="#ff4949" active-value="1" active-text="有"
                                       inactive-value="0" inactive-text="无">
                            </el-switch>
                        </el-form-item>
                        <el-form-item>
                            <el-select v-show="editForm.hasParent == '1'" v-model="editForm.parentname" @visible-change="deptChange" :loading="deptLoading"
                                       filterable placeholder="请选择父级部门" clearable>
                                <el-option v-for="item in deptlist" :key="item.id" :label="item.deptname" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>

        <!--新增界面-->
        <el-dialog title="新增" :modal-append-to-body="false" :visible.sync="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="所属公司" prop="corpname">
                            <el-autocomplete class="inline-input searchInput" v-model="addForm.corpname" :fetch-suggestions="querySearchCorpName" disabled
                                             placeholder="请输入公司名称" :trigger-on-focus="false" clearable @select="handleSelectCorpName"></el-autocomplete>
                        </el-form-item>
                        <el-form-item label="部门名称" prop="deptname" ref="deptname">
                            <el-input v-model="addForm.deptname" placeholder="请输入部门名称" auto-complete="off"
                                      @blur="checkout('deptname',addForm.deptname,0)"></el-input>
                        </el-form-item>
                        <el-form-item label="部门编码" prop="deptname" ref="deptname">
                            <el-input v-model="addForm.deptcode" placeholder="请输入部门编码" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="部门名称缩写" prop="deptshortname" ref="deptshortname">
                            <el-input v-model="addForm.deptshortname" placeholder="请输入部门名称缩写" auto-complete="off"
                                      @blur="checkout('deptshortname',addForm.deptshortname,1)"></el-input>
                        </el-form-item>
                        <el-form-item label="负责人" prop="deptmanagerid">
                            <!--<el-autocomplete class="inline-input searchInput" v-model="addForm.deptmanagername" :fetch-suggestions="querySearchName"-->
                                             <!--placeholder="请输入负责人" :trigger-on-focus="false" @select="handleSelectName"></el-autocomplete>-->
                            <el-select v-model="addForm.deptmanagerid" @visible-change="employChange" filterable placeholder="请选择负责人"
                                       clearable remote>
                                <el-option v-for="item in employlist" :key="item.ID" :label="item.employeename" :value="item.ID">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="部门电话" prop="deptcontactno">
                            <el-input v-model="addForm.deptcontactno" placeholder="请输入部门电话" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="地址" prop="addressAll">
                            <el-cascader placeholder="请选择省/市/区" v-model="addForm.addressAll" :options="prOptions" filterable clearable
                                         change-on-select></el-cascader>
                        </el-form-item>
                        <!-- 判断是否有父级部门 -->
                        <el-form-item label="父级部门" prop="hasParent">
                            <el-switch v-model="addForm.hasParent" active-color="#00C1DE" inactive-color="#ff4949" active-value="1" active-text="有"
                                       inactive-value="0" inactive-text="无">
                            </el-switch>
                        </el-form-item>
                        <el-form-item>
                            <el-select v-show="addForm.hasParent == '1'" v-model="addForm.parentname" @visible-change="deptChange" :loading="deptLoading"
                                       filterable placeholder="请选择父级部门" clearable>
                                <el-option v-for="item in deptlist" :key="item.id" :label="item.deptname" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script src="./index.js"></script>

<style scoped>
    .el-table .warning-row {
        background-color: #F3F5F8;
        color: #BFCBD9;
    }
</style>