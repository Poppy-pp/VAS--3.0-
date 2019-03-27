<template>
    <section class="tab_content-wrapper">
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <template v-for="(item,index) in filters.domSearch">
                    <template v-if="index == 0">
                        <div style="display:inline-block;margin:0 10px 10px 0;">
                            <el-input class="noborder color icon nofocus" @keyup.native.ctrl.8="clearAll()" @keyup.native.13="handleQuerySelectFn"
                                      placeholder="请输入查询内容" v-model="filters.domSearch[index].content">
                                <el-select class="wp_select" multiple clearable filterable v-model="filters.domSearch[index].select" slot="prepend"
                                           placeholder="选择条件">
                                    <el-option label="姓名" value="custname"></el-option>
                                    <el-option label="公司" value="corpname"></el-option>
                                    <!--<el-option label="部门" value="deptname"></el-option>-->
                                    <!--<el-option label="分组" value="groupname"></el-option>-->
                                    <el-option label="岗位" value="positionname"></el-option>
                                    <el-option label="用户名" value="username"></el-option>
                                    <el-option label="手机" value="mobile"></el-option>
                                    <el-option label="类型" value="custtype"></el-option>
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
                                <el-input class="noborder color icon nofocus" @keyup.native.ctrl.8="clearAll()" @keyup.native.13="handleQuerySelectFn"
                                          placeholder="请输入查询内容" v-model="filters.domSearch[index].content">
                                    <el-select class="wp_select" multiple clearable filterable v-model="filters.domSearch[index].select" slot="prepend"
                                               placeholder="选择条件">
                                        <el-option label="姓名" value="custname"></el-option>
                                        <el-option label="公司" value="corpname"></el-option>
                                        <!--<el-option label="部门" value="deptname"></el-option>-->
                                        <!--<el-option label="分组" value="groupname"></el-option>-->
                                        <el-option label="岗位" value="positionname"></el-option>
                                        <el-option label="用户名" value="username"></el-option>
                                        <el-option label="手机" value="mobile"></el-option>
                                        <el-option label="类型" value="custtype"></el-option>
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
                        <el-form-item>
                            <el-button type="primary" @click="handleQuerySelectFn" icon="el-icon-search">查询</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="handleAdd" icon="el-icon-plus">新增</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-switch v-model="filters.isactive" active-color="#41B883" inactive-color="#ff4949" active-value="1" active-text="有效"
                                       inactive-value="0" inactive-text="无效" @change="showData">
                            </el-switch>
                        </el-form-item>
                    </template>
                </template>

                <!--<el-form-item style="float:right;">-->
                <!--<el-button-group>-->
                <!--<el-button type="primary" @click="empIn" icon="el-icon-circle-check">客户入职</el-button>-->
                <!--<el-button type="primary" @click="empLeave" icon="el-icon-circle-close">客户离职</el-button>-->
                <!--</el-button-group>-->
                <!--</el-form-item>-->
            </el-form>
        </el-col>
        <!--列表-->
        <el-table :max-height="windowOutHeight-220" border :data="listData" :row-class-name="tableRowClassName" highlight-current-row
                  v-loading="listLoading" style="width: 100%;">
            <el-table-column type="index" width="30" align="center" label="#">
            </el-table-column>
            <el-table-column prop="headiconpath" label="头像" align="center" width="60">
                <template slot-scope="scope">
                    <div class="brod">
                        <template v-if="!scope.row.headiconpath">
                            <img src="../../../assets/images/pho.png" class="avatar">
                        </template>
                        <template else-if>
                            <img v-if="scope.row.headiconpath" :src="$store.state.IMG_URL+scope.row.headiconpath" class="avatar">
                        </template>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="custname" label="姓名" align="center" width="80">
            </el-table-column>
            <el-table-column prop="corpname" label="公司" align="center">
            </el-table-column>
            <!--<el-table-column prop="deptname" label="部门" align="center">-->
            <!--</el-table-column>-->
            <!--<el-table-column prop="groupname" label="分组" align="center">-->
            <!--</el-table-column>-->
            <el-table-column prop="positionname" label="岗位" align="center">
            </el-table-column>
            <el-table-column prop="username" label="用户名" align="center" width="130">
            </el-table-column>
            <el-table-column prop="mobile" label="手机" width="110" align="center">
            </el-table-column>
            <el-table-column prop="custtype" label="类型" width="100" align="center" :formatter="custtypeFormatter">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="160" align="center">
                <template slot-scope="scope">
                    <el-button id="button" @click="formDetailHandle(scope.row)" title="详情" :disabled="scope.row.isactive == '0' ? true : false">
                        <i :class="scope.row.isactive == '0' ? 'iconfont icon-xiangqing operate' : 'iconfont icon-xiangqing operate operate-xiangqing'"></i>
                    </el-button>
                    <el-button id="button" @click="handleEdit(scope.$index, scope.row)" :disabled="scope.row.isactive == '0' ? true : false" title="编辑">
                        <i :class="scope.row.isactive == '0' ? 'iconfont icon-bianji1 operate' : 'iconfont icon-bianji1 operate operate-bianji'"></i>
                    </el-button>
                    <el-button id="button" @click="roleEdit(scope.$index, scope.row)" :disabled="scope.row.isactive == '0' ? true : false" title="编辑角色">
                        <i :class="scope.row.isactive == '0' ? 'iconfont icon-jiaoseshezhi operate' : 'iconfont icon-jiaoseshezhi operate operate-bianji-coc'"></i>
                    </el-button>
                    <el-button id="button" @click="handleChange(scope.$index, scope.row)" :title='scope.row.isactive == "0" ? "设置为有效" : "设置为无效"'>
                        <i :class='scope.row.isactive == "0" ? "iconfont icon-cha operate operate-cha" : "iconfont icon-duigou operate operate-duigou"'
                           @mouseover="mouseoverChange" @mouseout="mouseoutChange"></i>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :page-sizes="[15, 50, 80, 99]" :page-size="pageSize"
                           :current-page="currentPage" layout="total, sizes, prev, pager, next" :total="total" style="float:right;">
            </el-pagination>
        </el-col>

        <!--角色编辑界面-->
        <el-dialog title="编辑角色" :modal-append-to-body="false" :visible.sync="editRoleInfoVisible" :close-on-click-modal="false" @close="roleEditClose">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="checkedCities" class="userchedaa" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="city in cities" :label="city.roleId" :key="city.roleId">{{ city.roleName }}</el-checkbox>
            </el-checkbox-group>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editRoleInfoVisible = false">取消</el-button>
                <el-button type="primary" @click.native="handleNodeClick" :loading="nodeLoading">提交</el-button>
            </div>
        </el-dialog>

        <!-- 详情 弹窗 start-->
        <el-dialog title="客户详情" :modal-append-to-body="false" :visible.sync="formDialogTableVisible" class="details">
            <el-tabs>
                <el-row>
                    <el-col :span="24">
                        <span class="formTile">客户信息</span>
                    </el-col>
                    <el-col :span="8">
                        <dl class="dllist" style="margin-bottom:10px;">
                            <dt>头像:</dt>
                            <dd>
                                <template v-if="!otherinfoData.headiconpath ">
                                    <img style="width:35px;height:35px;border-radius:100%;" src="../../../assets/images/pho.png" alt="头像">
                                </template>
                                <template v-else>
                                    <img style="width:40px;height:40px;border-radius:100%;" :src="$store.state.IMG_URL+otherinfoData.headiconpath" alt="头像">
                                </template>
                            </dd>
                        </dl>
                        <dl class="dllist" style="margin-bottom:10px;">
                            <dt>姓名:</dt>
                            <dd>{{ otherinfoData.custname }}</dd>
                        </dl>
                        <dl class="dllist" style="margin-bottom:10px;">
                            <dt>用户名:</dt>
                            <dd>{{ otherinfoData.username }}</dd>
                        </dl>
                        <dl class="dllist" style="margin-bottom:10px;">
                            <dt>客户编号:</dt>
                            <dd>{{ otherinfoData.employeecode == undefined ? '暂无' : otherinfoData.employeecode }}</dd>
                        </dl>
                        <dl class="dllist" style="margin-bottom:10px;">
                            <dt>性别:</dt>
                            <dd>{{ otherinfoData.gender == 'M' ? '男' : otherinfoData.gender == 'F' ? '女' : '暂无' }}</dd>
                        </dl>
                    </el-col>
                    <el-col :span="9">
                        <dl class="dllist" style="margin-bottom:10px;">
                            <dt>所属公司:</dt>
                            <dd>{{ otherinfoData.corpname == undefined ? '暂无' : otherinfoData.corpname }}</dd>
                        </dl>
                        <!--<dl class="dllist" style="margin-bottom:10px;">-->
                        <!--<dt>所属部门:</dt>-->
                        <!--<dd>{{ otherinfoData.deptname == undefined ? '暂无' : otherinfoData.deptname }}</dd>-->
                        <!--</dl>-->
                        <!--<dl class="dllist" style="margin-bottom:10px;">-->
                        <!--<dt>所属分组:</dt>-->
                        <!--<dd>{{ otherinfoData.groupname == undefined ? '暂无' : otherinfoData.groupname }}</dd>-->
                        <!--</dl>-->
                        <!--<dl class="dllist" style="margin-bottom:10px;">-->
                        <!--<dt>客户岗位:</dt>-->
                        <!--<dd>{{ otherinfoData.dictdatavalue == undefined ? '暂无' : otherinfoData.dictdatavalue }}</dd>-->
                        <!--</dl>-->
                        <dl class="dllist" style="margin-bottom:10px;">
                            <dt>客户类型:</dt>
                            <dd>{{ emptype[otherinfoData.custtype] == undefined ? '暂无' : emptype[otherinfoData.custtype] }}</dd>
                        </dl>
                        <dl class="dllist" style="margin-bottom:10px;">
                            <dt>手机:</dt>
                            <dd>{{ otherinfoData.mobile }}</dd>
                        </dl>
                        <dl class="dllist" style="margin-bottom:10px;">
                            <dt>区域:</dt>
                            <dd>{{ otherinfoData.region == undefined ? '暂无' : otherinfoData.region }}</dd>
                        </dl>
                        <dl class="dllist" style="margin-bottom:10px;">
                            <dt>通讯地址:</dt>
                            <dd>{{ otherinfoData.address == undefined ? '暂无' : otherinfoData.address }}</dd>
                        </dl>
                    </el-col>
                    <el-col :span="7">
                        <dl class="dllist" style="margin-bottom:10px;">
                            <dt>微信:</dt>
                            <dd>{{ otherinfoData.wechatid == undefined ? '暂无' : otherinfoData.wechatid }}</dd>
                        </dl>
                        <dl class="dllist" style="margin-bottom:10px;">
                            <dt>QQ:</dt>
                            <dd>{{ otherinfoData.qq == undefined ? '暂无' : otherinfoData.qq }}</dd>
                        </dl>
                    </el-col>
                </el-row>

                <el-row>
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
                            <dd>{{otherinfoData.createdate == null ? "暂无" :fmtdata.formatDate.format(new Date(otherinfoData.createdate), 'yyyy-MM-dd') }}</dd>
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
                            <dd>{{otherinfoData.updatedate == null ? "暂无" :fmtdata.formatDate.format(new Date(otherinfoData.updatedate), 'yyyy-MM-dd') }}</dd>
                        </dl>
                    </el-col>
                </el-row>
            </el-tabs>
        </el-dialog>
        <!-- 订单详情 弹窗  end-->

        <!--编辑界面-->
        <el-dialog title="编辑" :modal-append-to-body="false" :visible.sync="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px" :rules="addFormRules" ref="editForm" v-if="editFormVisible">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="客户头像" prop="headiconpath">
                            <el-upload v-model="editForm.headiconpath" class="avatar-uploader" action="/admin/atta/upload/picture" :show-file-list="false"
                                       :headers="{Authorization: 'Bearer '+ token}"
                                       :accept="accept" name="file" list-type="picture-card" :on-success="headImgSuccess">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar radius">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="客户姓名" prop="custname">
                            <el-input v-model="editForm.custname" placeholder="请输入客户姓名" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="性别" prop="gender">
                            <el-radio-group v-model="editForm.gender">
                                <el-radio class="radio" label="M">男</el-radio>
                                <el-radio class="radio" label="F">女</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="类型" prop="custtype">
                            <el-select v-model="editForm.custtype" filterable placeholder="请选择客户类型"
                                       clearable>
                                <el-option v-for="(value, key) in emptype" :key="key" :label="value" :value="key">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="手机号码" prop="mobile" ref="mobile" :error="mobileErrMessage">
                            <el-input v-model="editForm.mobile" placeholder="请输入客户手机号码" auto-complete="off" @blur="checkEditMobile(editForm.mobile)"></el-input>
                        </el-form-item>
                        <!--<el-form-item label="客户编号" prop="employeecode">-->
                        <!--<el-input v-model="editForm.employeecode" placeholder="请输入客户编号" auto-complete="off"></el-input>-->
                        <!--</el-form-item>-->
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="editForm.username" disabled placeholder="请输入客户用户名" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="所属公司" prop="corpname">
                            <el-select v-model="editForm.corpname" filterable @visible-change="corpEditChange" placeholder="请选择所属公司"
                                       clearable remote>
                                <el-option v-for="item in corplist" :key="item.id" :label="item.corpname" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <!--<el-form-item label="所属部门" prop="deptname">-->
                        <!--<el-select v-model="editForm.deptname" @visible-change="deptChange" :loading="deptLoading" filterable placeholder="请选择所属部门"-->
                        <!--clearable @change="sendDeptIdData">-->
                        <!--<el-option v-for="item in deptlist" :key="item.id" :label="item.deptname" :value="item.id">-->
                        <!--</el-option>-->
                        <!--</el-select>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="所属分组" prop="groupname">-->
                        <!--<el-select v-model="editForm.groupname" :loading="groupLoading" filterable @visible-change="groupChange" placeholder="请选择所属分组" clearable>-->
                        <!--<el-option v-for="item in grouplist" :key="item.id" :label="item.groupname" :value="item.id">-->
                        <!--</el-option>-->
                        <!--</el-select>-->
                        <!--</el-form-item>-->
                        <el-form-item label="客户岗位" prop="positionname">
                            <el-select v-model="editForm.positionname" @visible-change="posChange" :loading="posLoading" filterable placeholder="请选择客户岗位"
                                       clearable>
                                <el-option v-for="item in poslist" :key="item.id" :label="item.dictdatavalue" :value="item.dictdataname">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="所属区域" prop="regionAll">
                            <el-cascader placeholder="请选择省/市/区" v-model="editForm.regionAll" :options="prOptions" filterable clearable
                                         change-on-select></el-cascader>
                        </el-form-item>
                        <el-form-item label="通讯地址" prop="address">
                            <el-input v-model="editForm.address" placeholder="请输入通讯地址" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="客户QQ" prop="qq">
                            <el-input v-model="editForm.qq" placeholder="请输入客户QQ" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="客户微信" prop="wechatid">
                            <el-input v-model="editForm.wechatid" placeholder="请输入客户微信" auto-complete="off"></el-input>
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
            <el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm" v-if="addFormVisible">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="客户头像" prop="headiconpath">
                            <el-upload class="avatar-uploader" action="/admin/atta/upload/picture" :show-file-list="false" :accept="accept" name="file"
                                       :headers="{Authorization: 'Bearer '+ token}"
                                       list-type="picture-card" :on-success="headImgSuccess">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar radius">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="客户姓名" prop="custname">
                            <el-input v-model="addForm.custname" placeholder="请输入客户姓名" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="性别" prop="gender">
                            <el-radio-group v-model="addForm.gender">
                                <el-radio class="radio" label="M">男</el-radio>
                                <el-radio class="radio" label="F">女</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="类型" prop="custtype">
                            <el-select v-model="addForm.custtype" filterable placeholder="请选择客户类型"
                                       clearable>
                                <el-option v-for="(value, key) in emptype" :key="key" :label="value" :value="key">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="手机号码" prop="mobile" ref="mobile" :error="mobileErrMessage">
                            <!--@blur="checkout('mobile',addForm.mobile,0)"-->
                            <el-input v-model="addForm.mobile" placeholder="请输入客户手机号码" auto-complete="off" @blur="checkMobile(addForm.mobile)"></el-input>
                        </el-form-item>
                        <!--<el-form-item label="客户编号" prop="employeecode">-->
                        <!--<el-input v-model="addForm.employeecode" placeholder="请输入客户编号" auto-complete="off"></el-input>-->
                        <!--</el-form-item>-->
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="addForm.username" disabled placeholder="请输入客户用户名" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="所属公司" prop="corpname">
                            <el-select v-model="addForm.corpname" filterable @visible-change="corpChange" :loading="corpLoading" placeholder="请选择所属公司"
                                       clearable>
                                <el-option v-for="item in corplist" :key="item.id" :label="item.corpname" :value="item.id" :disabled="item.corpname === '万网公司'">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <!--<el-form-item label="所属部门" prop="deptname">-->
                        <!--<el-select v-model="addForm.deptname" @visible-change="deptChange" :loading="deptLoading" filterable placeholder="请选择所属部门" clearable-->
                        <!--@change="sendDeptIdData">-->
                        <!--<el-option v-for="item in deptlist" :key="item.id" :label="item.deptname" :value="item.id">-->
                        <!--</el-option>-->
                        <!--</el-select>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="所属分组" prop="groupname">-->
                        <!--<el-select v-model="addForm.groupname" :loading="groupLoading" @visible-change="groupChange" filterable placeholder="请选择所属分组" clearable>-->
                        <!--<el-option v-for="item in grouplist" :key="item.groupname" :label="item.groupname" :value="item.id">-->
                        <!--</el-option>-->
                        <!--</el-select>-->
                        <!--</el-form-item>-->
                        <el-form-item label="客户岗位" prop="positionname">
                            <el-select v-model="addForm.positionname" @visible-change="posChange" :loading="posLoading" filterable placeholder="请选择客户岗位"
                                       clearable>
                                <el-option v-for="item in poslist" :key="item.id" :label="item.dictdatavalue" :value="item.dictdataname">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="所属区域" prop="address">
                            <el-cascader placeholder="请选择省/市/区" v-model="addForm.regionAll" :options="prOptions" filterable clearable
                                         change-on-select></el-cascader>
                        </el-form-item>
                        <el-form-item label="通讯地址" prop="address">
                            <el-input v-model="addForm.address" placeholder="请输入通讯地址" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="客户QQ" prop="qq">
                            <el-input v-model="addForm.qq" placeholder="请输入客户QQ" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="客户微信" prop="wechatid">
                            <el-input v-model="addForm.wechatid" placeholder="请输入客户微信" auto-complete="off"></el-input>
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
<style>
    div.brod {
        border-radius: 100%;
        width: 35px;
        height: 35px;
        overflow: hidden;
        margin: 2px auto;
    }

    div.brod img {
        width: 100%;
        height: 100%;
    }
</style>
<script src="./index.js"></script>