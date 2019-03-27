<template>
    <section class="tab_content-wrapper">
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <template v-for="(item,index) in filters.domSearch">
                    <template v-if="index == 0">
                        <div style="display:inline-block;margin:0 10px 10px 0;">
                            <el-input class="noborder color icon nofocus" @keyup.native.ctrl.8="clearAll()" @keyup.native.13="handleQuerySelect"
                                      placeholder="请输入查询内容" v-model="filters.domSearch[index].content">
                                <el-select class="wp_select" multiple clearable filterable v-model="filters.domSearch[index].select" slot="prepend"
                                           placeholder="选择条件">
                                    <el-option label="设备编号" value="prodprodnum"></el-option>
                                    <el-option label="卡号" value="simnum"></el-option>
                                    <el-option label="车架号" value="vin"></el-option>
                                    <el-option label="车牌号" value="licenseplatenum"></el-option>
                                    <el-option label="客户" value="corpname"></el-option>
                                    <el-option label="平台名称" value="platname"></el-option>
                                    <el-option label="平台IP" value="platip"></el-option>
                                    <el-option label="指定类型" value="appointtype"></el-option>
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
                                <el-input class="noborder color icon nofocus" @keyup.native.ctrl.8="clearAll()" @keyup.native.13="handleQuerySelect"
                                          placeholder="请输入查询内容" v-model="filters.domSearch[index].content">
                                    <el-select class="wp_select" multiple clearable filterable v-model="filters.domSearch[index].select" slot="prepend"
                                               placeholder="选择条件">
                                        <el-option label="设备编号" value="prodprodnum"></el-option>
                                        <el-option label="卡号" value="simnum"></el-option>
                                        <el-option label="车架号" value="vin"></el-option>
                                        <el-option label="车牌号" value="licenseplatenum"></el-option>
                                        <el-option label="客户" value="corpname"></el-option>
                                        <el-option label="平台名称" value="platname"></el-option>
                                        <el-option label="平台IP" value="platip"></el-option>
                                        <el-option label="指定类型" value="appointtype"></el-option>
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
                            <el-button type="primary" @click="handleQuerySelect" @keyup.native.13="handleQuerySelect" icon="el-icon-search">查询</el-button>
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
            </el-form>
        </el-col>
        <!--列表-->
        <el-table :max-height="windowOutHeight-165" stripe border :data="listData" :row-class-name="tableRowClassName" highlight-current-row
                  v-loading="listLoading" style="width: 100%;">
            <el-table-column type="index" width="50" align="center" label="#">
            </el-table-column>
            <el-table-column prop="prodprodnum" label="设备编号" align="center">
            </el-table-column>
            <el-table-column prop="simnum" label="卡号" align="center">
            </el-table-column>
            <el-table-column prop="vin" label="车架号" align="center">
            </el-table-column>
            <el-table-column prop="licenseplatenum" label="车牌号" :formatter="licenseplatenumFormat" align="center">
            </el-table-column>
            <el-table-column prop="appointsource" label="设备来源" :formatter="fromFormat" align="center">
            </el-table-column>
            <el-table-column prop="corpname" label="客户" :formatter="corpFormat" align="center">
            </el-table-column>
            <el-table-column prop="platname" label="平台名称" align="center">
            </el-table-column>
            <el-table-column prop="platip" label="平台IP" align="center">
            </el-table-column>
            <el-table-column prop="appointtype" label="指定类型" :formatter="typeFormat" align="center">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="140" align="center">
                <template scope="scope">
                    <el-button id="button" @click="formDetailHandle(scope.row)" title="详情">
                        <i class='iconfont icon-xiangqing operate operate-xiangqing'></i>
                    </el-button>
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
            <el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :page-sizes="[15, 50, 100, 500, 1000]"
                           :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total" style="float:right;">
            </el-pagination>
        </el-col>

        <!-- 详情 弹窗 start-->
        <el-dialog title="" :modal-append-to-body="false" :visible.sync="formDialogTableVisible" size="small">
            <el-tabs>
                <el-row style="padding:0 40px;">
                    <el-col :span="24">
                        <span class="formTile">平台设备信息</span>
                    </el-col>
                    <el-col :span="12">
                        <dl class="dllist" style="margin-bottom:10px;">
                            <dt>设备编号:</dt>
                            <dd>{{ platProdList.prodprodnum }}</dd>
                        </dl>
                        <dl class="dllist" style="margin-bottom:10px;">
                            <dt>卡号:</dt>
                            <dd>{{ platProdList.simnum }}</dd>
                        </dl>
                        <dl class="dllist" style="margin-bottom:10px;">
                            <dt>协议类型:</dt>
                            <dd>{{ platProdList.prodprotoclotype }}</dd>
                        </dl>
                        <dl class="dllist" style="margin-bottom:10px;">
                            <dt>车架号:</dt>
                            <dd>{{ platProdList.vin}}</dd>
                        </dl>
                        <dl class="dllist" style="margin-bottom:10px;">
                            <dt>车牌号:</dt>
                            <dd>{{ platProdList.licenseplatenum == undefined ? platProdList.orlicenseplatenum : platProdList .licenseplatenum }}</dd>
                        </dl>
                        <dl class="dllist" style="margin-bottom:10px;">
                            <dt>客户:</dt>
                            <dd>{{ platProdList.corpname == undefined ? platProdList.orcorpname : platProdList.corpname }}</dd>
                        </dl>
                    </el-col>
                    <el-col :span="12">
                        <dl class="dllist" style="margin-bottom:10px;">
                            <dt>平台名称:</dt>
                            <dd>{{ platProdList.platname }}</dd>
                        </dl>
                        <dl class="dllist" style="margin-bottom:10px;">
                            <dt>平台IP:</dt>
                            <dd>{{ platProdList.platip }}</dd>
                        </dl>
                        <dl class="dllist" style="margin-bottom:10px;">
                            <dt>指定类型:</dt>
                            <dd>{{ platProdList.appointtype == 'I' ? '系统内' : platProdList.appointtype == 'E' ? '系统外' : '' }}</dd>
                        </dl>
                        <dl class="dllist" style="margin-bottom:10px;">
                            <dt>指定时间:</dt>
                            <dd>{{ platProdList.appointdate == null ? "" :fmtdata.formatDate.format(new Date(platProdList.appointdate), 'yyyy-MM-dd') }}</dd>
                        </dl>
                        <dl class="dllist" style="margin-bottom:10px;">
                            <dt>指定人:</dt>
                            <dd>{{ platProdList.appointby }}</dd>
                        </dl>
                    </el-col>
                </el-row>
            </el-tabs>
        </el-dialog>
        <!-- 订单详情 弹窗  end-->

        <!--编辑界面-->
        <el-dialog title="编辑" :modal-append-to-body="false" :visible.sync="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm" v-if="editFormVisible">
                <el-form-item label="设备编号" prop="prodprodnum">
                    <el-input v-model="editForm.prodprodnum" auto-complete="off" placeholder="请输入设备编号" disabled></el-input>
                </el-form-item>
                <el-form-item label="平台名称" prop="platname">
                    <el-select v-model="editForm.platname" @visible-change="platChange" :loading="platLoading" filterable placeholder="请选择平台名称" clearable
                               value-key="id" @change="getIpAdd">
                        <el-option v-for="item in platlist" :key="item.id" :label="item.platname" :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="平台IP" prop="platip">
                    <el-input v-model="editForm.platip" auto-complete="off" disabled></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>

        <!--新增界面-->
        <el-dialog title="新增" :modal-append-to-body="false" :visible.sync="addFormVisible" :close-on-click-modal="false">

            <el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm" v-if="addFormVisible">
                <el-tabs type="border-card" @tab-click="tabclick">
                    <el-tab-pane label="自主平台" v-model="addForm.appointtype">
                        <el-collapse v-model="activeNames">
                            <el-collapse-item title="设备信息" name="1">
                                <el-row style="padding: 5px 0 10px 0;" :gutter="20">
                                    <el-col :span="12">
                                        <el-form-item label="设备型号" prop="modelname">
                                            <el-select v-model="addForm.modelname" @visible-change="moNameChange" @change="getNameAdd"
                                                       :loading="moNameLoading" filterable placeholder="请选择设备型号" clearable value-key="id">
                                                <el-option v-for="item in moNamelist" :key="item.id" :label="item.modelname" :value="item">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="设备类别" prop="prodspec">
                                            <el-input v-model="addForm.prodspec" disabled auto-complete="off" placeholder="自动匹配设备分类"></el-input>
                                        </el-form-item>
                                        <el-form-item label="设备编号" prop="prodnum">
                                            <el-autocomplete class="inline-input searchInput" v-model="addForm.prodnum"
                                                             :fetch-suggestions="querySearchName" placeholder="请输入设备编号" :trigger-on-focus="true"
                                                             @select="handleSelectName"></el-autocomplete>
                                        </el-form-item>
                                        <el-form-item label="协议名称" prop="protocoltype">
                                            <el-input v-model="addForm.protocoltype" placeholder="自动匹配协议" disabled></el-input>
                                        </el-form-item>
                                        <!--<el-form-item label="备注" prop="remark">-->
                                        <!--<el-input v-model="addForm.remark" auto-complete="off"></el-input>-->
                                        <!--</el-form-item>-->
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="设备来源" prop="appointsource">
                                            <el-select v-model="addForm.appointsource" filterable placeholder="请选择设备来源" clearable>
                                                <el-option v-for="item in appointsourceOptions" :key="item.value" :label="item.label" :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="所属客户" prop="corpname">
                                            <el-input v-model="addForm.corpname" auto-complete="off" placeholder="所属客户" disabled></el-input>
                                        </el-form-item>
                                        <el-form-item label="车架号" prop="vin" ref="vines">
                                            <el-input v-model="addForm.vin" auto-complete="off" placeholder="车架号" disabled></el-input>
                                        </el-form-item>
                                        <el-form-item label="车牌号" prop="licenseplatenum" ref="licenseplatenumes">
                                            <el-input v-model="addForm.licenseplatenum" auto-complete="off" placeholder="车牌号" disabled></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-collapse-item>
                            <el-collapse-item title="绑定平台" name="2">
                                <el-row style="padding: 5px 0 10px 0;" :gutter="20">
                                    <el-col :span="24">
                                        <el-form-item label="平台名称" prop="platid">
                                            <el-select v-model="addForm.platname" @visible-change="platChange" @change="getIpAdd" :loading="platLoading"
                                                       filterable placeholder="请选择平台名称" clearable value-key="id">
                                                <el-option v-for="item in platlist" :key="item.id" :label="item.platname" :value="item">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="平台IP" prop="platip">
                                            <el-input v-model="addForm.platip" disabled auto-complete="off" placeholder="自动匹配平台IP"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-collapse-item>
                        </el-collapse>
                    </el-tab-pane>
                    <el-tab-pane label="其他平台">

                    </el-tab-pane>
                </el-tabs>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script src="./index.js">
</script>

<style scoped>

</style>