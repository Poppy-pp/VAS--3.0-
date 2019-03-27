<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <template v-for="(item,index) in filters.domSearch">
                    <template v-if="index == 0">
                        <div style="display:inline-block;margin:0 10px 10px 0;">
                            <el-input class="noborder color icon nofocus" @keyup.native.ctrl.8="clearAll()" @keyup.native.13="getTodo" placeholder="请输入查询内容" v-model="filters.domSearch[index].content">
                                <el-select class="wp_select" multiple clearable filterable v-model="filters.domSearch[index].select" slot="prepend" placeholder="选择条件">
                                        <el-option label="报单公司" value="busicorpname"></el-option>
                                        <el-option label="车主姓名" value="vehicleowner"></el-option>
                                        <el-option label="车架号" value="vehiclevin"></el-option>
                                        <el-option label="车牌号" value="vehicleplate"></el-option>
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
                                <el-input class="noborder color icon nofocus" @keyup.native.ctrl.8="clearAll()" @keyup.native.13="getTodo" placeholder="请输入查询内容" v-model="filters.domSearch[index].content">
                                    <el-select class="wp_select" multiple clearable filterable v-model="filters.domSearch[index].select" slot="prepend" placeholder="选择条件">
                                        <el-option label="报单公司" value="busicorpname"></el-option>
                                        <el-option label="车主姓名" value="vehicleowner"></el-option>
                                        <el-option label="车架号" value="vehiclevin"></el-option>
                                        <el-option label="车牌号" value="vehicleplate"></el-option>
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
                            <el-button type="primary" @click="getTodo" icon="el-icon-search">查询</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="info" @click="resetForm" icon="el-icon-refresh">重置</el-button>
                        </el-form-item>
                    </template>
                </template>
            </el-form>
        </el-col>

        <el-table :max-height="windowOutHeight-215" :data="todo" border ref="todeTable" highlight-current-row v-loading="listLoading">
            <el-table-column type="index" align="center" label="#" width="30">
            </el-table-column>
            <el-table-column prop="status" label="保险状态" align="center" width="80">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.status == null ? 'danger' : ''">
                    {{ scope.row.status == null ? '待出单' : '未知'}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="handlename" align="center" label="当前处理人" width="100">
            </el-table-column>
            <el-table-column prop="createdate" align="center" label="申请时间" :formatter="dateFormatter" width="160">
            </el-table-column>
            <el-table-column prop="busicorpname" align="center" label="报单公司">
            </el-table-column>
            <el-table-column prop="vehicleowner" align="center" label="车主姓名" width="80">
            </el-table-column>
            <el-table-column prop="vehiclevin" align="center" label="车架号" width="170">
            </el-table-column>
            <el-table-column prop="vehiclemodel" align="center" label="车型" width="350">
            </el-table-column>
            <el-table-column prop="vehicleplate" align="center" label="车牌号" width="180">
            </el-table-column>
            <el-table-column label="操作" width="60" align="center" fixed="right">
                <template slot-scope="scope">
                    <el-button id="button" @click="issueIns(scope.$index, scope.row)" title="出单">
                        <i class="iconfont icon-chudan operate operate-chudan"></i>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :page-sizes="[15, 50, 80, 99]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total">
            </el-pagination>
        </el-col>
    </section>
</template>

<style type="text/css" media="screen">
</style>

<script src="./index.js"></script>
