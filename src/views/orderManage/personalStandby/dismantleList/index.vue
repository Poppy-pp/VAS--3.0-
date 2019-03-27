<!--* 
* @description: 拆除单管理
*-->
<template>
    <section>
        <el-col :span="24" class="mb10">
            <el-radio-group v-model="stepState" size="medium" @change="changeStateHandle">
                <el-radio-button label="0" :disabled="listLoading">全部（{{ fromNum.num0 }}）</el-radio-button>
                <el-radio-button label="1" :disabled="listLoading">派单（{{ fromNum.num1 }}）</el-radio-button>
                <el-radio-button label="2" :disabled="listLoading">接单（{{ fromNum.num2 }}）</el-radio-button>
                <el-radio-button label="3" :disabled="listLoading">施工（{{ fromNum.num3 }}）</el-radio-button>
                <el-radio-button label="4" :disabled="listLoading">保险退保（{{ fromNum.num4 }}）</el-radio-button>
                <el-radio-button label="5" :disabled="listLoading">订单完成（{{ fromNum.num5 }}）</el-radio-button>
            </el-radio-group>
        </el-col>
        <!--报单中心列表 新装单子 拆除单子 售后单子  start-->
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :model="filters" ref="filters" :inline="true" class="flexSearchForm">
                <template v-for="(item,index) in filters.domSearch">
                    <template v-if="index == 0">
                        <div style="display:inline-block;margin:0 10px 10px 0;">
                            <el-input class="noborder color icon nofocus" @keyup.native.ctrl.8="clearAll()" @keyup.native.13="handleQuery" placeholder="请输入查询内容" v-model="filters.domSearch[index].content">
                                <el-select class="wp_select" multiple clearable filterable v-model="filters.domSearch[index].select" slot="prepend" placeholder="选择条件">
                                    <el-option label="单号" value="orderno"></el-option>
                                    <el-option label="订单来源" value="declarefromname"></el-option>
                                    <el-option label="报单公司" value="corpname"></el-option>
                                    <el-option label="状态" value="statusname"></el-option>
                                    <el-option label="处理人" value="assignbyname"></el-option>
                                    <el-option label="车架号" value="vin"></el-option>
                                    <el-option label="车主" value="ownername"></el-option>
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
                                <el-input class="noborder color icon nofocus" @keyup.native.ctrl.8="clearAll()" @keyup.native.13="handleQuery" placeholder="请输入查询内容" v-model="filters.domSearch[index].content">
                                    <el-select class="wp_select" multiple clearable filterable v-model="filters.domSearch[index].select" slot="prepend" placeholder="选择条件">
                                        <el-option label="单号" value="orderno"></el-option>
                                        <el-option label="订单来源" value="declarefromname"></el-option>
                                        <el-option label="报单公司" value="corpname"></el-option>
                                        <el-option label="状态" value="statusname"></el-option>
                                        <el-option label="处理人" value="assignbyname"></el-option>
                                        <el-option label="车架号" value="vin"></el-option>
                                        <el-option label="车主" value="ownername"></el-option>
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
                        <el-form-item label="拆除日期">
                            <el-date-picker style="width:250px;" v-model="filters.timeScope" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="getTodo" icon="el-icon-search">查询</el-button>
                            <el-button type="info" @click="resetForm('filters')" icon="el-icon-refresh">重置</el-button>
                        </el-form-item>
                    </template>
                </template>
            </el-form>
        </el-col>

        <el-table :max-height="windowOutHeight-320" :data="todo" border ref="todeTable" highlight-current-row @expand-change="expandHandle" v-loading="listLoading" style="width: 100%;">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-tabs v-model="activeName" 
                    v-loading="expandLoading"
                    element-loading-text="订单详情加载中，请稍后..."
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(247, 247, 247, 0.7)"
                    type="border-card">
                        <el-tab-pane label="订单详情" name="1">
                            <el-row>
                                <el-col :span="24">
                                    <span class="formTile">报单/派单信息</span>
                                </el-col>
                                <el-col :span="4">
                                    <dl class="dllist">
                                        <dt>派单公司:</dt>
                                        <dd>{{ props.row.corpname }}</dd>
                                    </dl>
                                    <dl class="dllist">
                                        <dt>安装产品:</dt>
                                        <dd>{{ props.row.packageid }}</dd>
                                    </dl>
                                    <dl class="dllist">
                                        <dt>安装人员:</dt>
                                        <dd>{{ props.row.impbyname }}</dd>
                                    </dl>
                                    <dl class="dllist">
                                        <dt>处理人:</dt>
                                        <dd>{{ props.row.assignbyname }}</dd>
                                    </dl>
                                </el-col>
                                <el-col :span="4">
                                    <dl class="dllist">
                                        <dt>派单时间:</dt>
                                        <dd>{{ Dayjs(props.row.assigndate).format('YYYY-MM-DD HH:mm') }}</dd>
                                    </dl>
                                    <dl class="dllist">
                                        <dt>接单时间:</dt>
                                        <dd>{{ props.row.acceptdate ? Dayjs(props.row.acceptdate).format('YYYY-MM-DD HH:mm') : '--' }}</dd>
                                    </dl>
                                    <dl class="dllist">
                                        <dt>安装联系人:</dt>
                                        <dd>{{ props.row.contactname }}</dd>
                                    </dl>
                                    <dl class="dllist">
                                        <dt>安装联系方式:</dt>
                                        <dd>{{ props.row.contactmobile }}</dd>
                                    </dl>
                                </el-col>
                                <el-col :span="5">
                                    <dl class="dllist">
                                        <dt>订单编号:</dt>
                                        <dd>{{ props.row.orderno }}</dd>
                                    </dl>
                                    <dl class="dllist">
                                        <dt>安装时间:</dt>
                                        <dd>{{ Dayjs(props.row.impapplydate).format('YYYY-MM-DD HH:mm') }}</dd>
                                    </dl>
                                    <dl class="dllist">
                                        <dt>开始安装时间:</dt>
                                        <dd>{{ props.row.impactualstartdate ? Dayjs(props.row.impactualstartdate).format('YYYY-MM-DD HH:mm') : '--'}}</dd>
                                    </dl>
                                    <dl class="dllist">
                                        <dt>完成安装时间:</dt>
                                        <dd>{{ props.row.impactualenddate ? Dayjs(props.row.impactualenddate).format('YYYY-MM-DD HH:mm') : '--'}}</dd>
                                    </dl>
                                </el-col>
                                <el-col :span="10">
                                    <dl class="dllist">
                                        <dt>订单来源:</dt>
                                        <dd>{{ props.row.declarefromname }}</dd>
                                    </dl>
                                    <dl class="dllist">
                                        <dt>安装地址:</dt>
                                        <dd>{{ props.row.impaddress }}</dd>
                                    </dl>
                                    <dl class="dllist">
                                        <dt>开始安装地址:</dt>
                                        <dd>{{ props.row.impaddress }}</dd>
                                    </dl>
                                    <dl class="dllist">
                                        <dt>完成安装地址:</dt>
                                        <dd>{{ props.row.impaddress }}</dd>
                                    </dl>
                                </el-col>
                                <el-col :span="24">
                                    
                                </el-col>
                                <el-col :span="24">
                                    <span class="formTile">车主车辆信息</span>
                                </el-col>
                                <el-col :span="6">
                                    <dl class="dllist">
                                        <dt>车主姓名:</dt>
                                        <dd>{{ props.row.rpvehicleinfo.ownerInfo == null ? '--' :  props.row.rpvehicleinfo.ownerInfo.name }}</dd>
                                    </dl>
                                    <dl class="dllist">
                                        <dt>身份证号:</dt>
                                        <dd>{{ props.row.rpvehicleinfo.ownerInfo == null ? '--' :  props.row.rpvehicleinfo.ownerInfo.idcard  }}</dd>
                                    </dl>
                                    <dl class="dllist">
                                        <dt>车主电话:</dt>
                                        <dd>{{ props.row.rpvehicleinfo.ownerInfo == null ? '--' :  props.row.rpvehicleinfo.ownerInfo.mobile  }}</dd>
                                    </dl>
                                    <dl class="dllist">
                                        <dt>联系地址:</dt>
                                        <dd>{{ props.row.rpvehicleinfo.ownerInfo == null ? '--' :  props.row.rpvehicleinfo.ownerInfo.addresshome  }}</dd>
                                    </dl>
                                </el-col>
                                <el-col :span="7">
                                    <dl class="dllist">
                                        <dt>车架号:</dt>
                                        <dd>{{ props.row.rpvehicleinfo.vin }}</dd>
                                    </dl>
                                    <dl class="dllist">
                                        <dt>厂牌型号:</dt>
                                        <dd>{{ props.row.rpvehicleinfo.model }}</dd>
                                    </dl>
                                    <dl class="dllist">
                                        <dt>发动机号:</dt>
                                        <dd>{{ props.row.rpvehicleinfo.enginenum }}</dd>
                                    </dl>
                                    <dl class="dllist">
                                        <dt>车牌号:</dt>
                                        <dd>{{ props.row.rpvehicleinfo.licenseplatenum }}</dd>
                                    </dl>
                                </el-col>
                                <el-col :span="5">
                                    <dl class="dllist">
                                        <dt>车辆分类:</dt>
                                        <dd>{{ props.row.rpvehicleinfo.vehiclecategory == 1 ? '新车' : props.row.rpvehicleinfo.vehiclecategory == 2 ? '二手车' 
                                        : '资管追回' }}</dd>
                                    </dl>
                                    <dl class="dllist">
                                        <dt>车辆类型:</dt>
                                        <dd>{{ props.row.rpvehicleinfo.vehicletypename }}</dd>
                                    </dl>
                                    <dl class="dllist">
                                        <dt>车辆购置价:</dt>
                                        <dd>{{ props.row.rpvehicleinfo.price }} 元</dd>
                                    </dl>
                                    <dl class="dllist">
                                        <dt>车辆颜色:</dt>
                                        <dd>{{ props.row.rpvehicleinfo.colorname }}</dd>
                                    </dl>
                                </el-col>
                                <el-col :span="6">
                                    <dl class="dllist">
                                        <dt>能源类型:</dt>
                                        <dd>{{ props.row.rpvehicleinfo.vehiclepowername }}</dd>
                                    </dl>
                                    <dl class="dllist">
                                        <dt>初登日期:</dt>
                                        <dd>{{ Dayjs(props.row.rpvehicleinfo.firstregisterdate).format('YYYY-MM-DD') }}</dd>
                                    </dl>
                                    <dl class="dllist">
                                        <dt>第一受益人:</dt>
                                        <dd>{{ props.row.rpvehicleinfo.beneficiary ? props.row.rpvehicleinfo.beneficiary : '--' }}</dd>
                                    </dl>
                                </el-col>
                            </el-row>
                        </el-tab-pane>
                        
                        <el-tab-pane label="操作记录" name="2">
                            <el-table
                            :data="opHistoryData"
                            style="width: 100%">
                                <el-table-column prop="name" align="center" label="操作节点" width="100"> </el-table-column>
                                <el-table-column prop="assignee_name" align="center"  label="操作人">  </el-table-column>
                                <el-table-column align="center" prop="end_time" label="时间"> </el-table-column>
                                <el-table-column  prop="" align="center" label="操作记录"> </el-table-column>
                            </el-table>
                        </el-tab-pane>
                    </el-tabs>
                </template>
            </el-table-column>
            <el-table-column prop="orderno" align="center" label="拆除单号" width="180"></el-table-column>
            <el-table-column prop="rptype" align="center" label="拆除类型" width="80"></el-table-column>
            <el-table-column prop="statusname" align="center" label="当前状态" width="80"></el-table-column>
            <el-table-column prop="assignbyname" align="center" label="处理人" width="80"></el-table-column>
            <el-table-column prop="corpname" align="center" label="所属公司"></el-table-column>
            <el-table-column prop="rpFaultremark" align="center" label="拆除原因"></el-table-column>
            <el-table-column align="left" label="车主车辆信息" width="350">
                <template slot-scope="scope">
                    <p>车主姓名：{{ scope.row.rpvehicleinfo.ownerInfo?scope.row.rpvehicleinfo.ownerInfo.name:'--' }}</p>
                    <p>车架号：{{ scope.row.rpvehicleinfo ?
                    scope.row.rpvehicleinfo.vin : '--'}}</p>
                    <p>车辆型号：{{ scope.row.rpvehicleinfo ?
                    scope.row.rpvehicleinfo.model : '--'}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="impapplydate" align="center" label="拆除时间" :formatter="dateFormatter" width="140"></el-table-column>
            <el-table-column prop="returnremark" align="center" label="退回原因"></el-table-column>
            <el-table-column label="操作" width="100" align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-dropdown trigger="click">
                            <el-button size="mini" type="primary">
                                更多操作<i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item v-if="scope.row.status == 6" @click.native="detailsOrder(scope.row)">详 情</el-dropdown-item>
                                <el-dropdown-item v-if="scope.row.status == 1" @click.native="dispatchOrder(scope.row)">派 单</el-dropdown-item>
                                <el-dropdown-item v-if="scope.row.status == 2 || scope.row.status == 3" @click.native="transferOrder(scope.row)">转 派</el-dropdown-item>
                                <el-dropdown-item v-if="scope.row.status == 2 || scope.row.status == 3" @click.native="passConstructionOrder(scope.$index, scope.row)">退 回</el-dropdown-item>
                                <el-dropdown-item v-if="scope.row.status == 1 || scope.row.status == 2 || scope.row.status == 3 || scope.row.status == 4" @click.native="deleteOrder(scope.$index, scope.row)">废 单</el-dropdown-item>
                                <el-dropdown-item @click.native="startRemove(scope.row)" v-if="scope.row.status == 3">开始拆除</el-dropdown-item>
                                <el-dropdown-item @click.native="finishRemove(scope.row)" v-if="scope.row.status == 4">完成拆除</el-dropdown-item>
                                <el-dropdown-item v-if="scope.row.status == 5" @click.native="formDetailHandle(scope.row,scope.row.id)">保单详情</el-dropdown-item>
                                <el-dropdown-item v-if="scope.row.status == 5" @click.native="electronicPrint(scope.row,scope.row.id)">电子保单</el-dropdown-item>
                                <el-dropdown-item v-if="scope.row.status == 5" @click.native="surrender(scope.row,scope.row.id)">退保</el-dropdown-item>

                                <!-- <el-dropdown-item @click.native="formDetailHandle(scope.row,scope.row.id)">保单详情</el-dropdown-item>
                                <el-dropdown-item @click.native="electronicPrint(scope.row.id,scope.row.id)">电子保单</el-dropdown-item>
                                <el-dropdown-item @click.native="surrender(scope.row,scope.row.id)">退保</el-dropdown-item> -->
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
            </el-table-column>
        </el-table>


        <!-- 保单退保——保单详情 start -->
        <el-dialog title="保单信息详情" :modal-append-to-body="false" :visible.sync="formDialogTableVisible" class="details">
            <el-tabs v-model="activeName">
                <!-- 保单详情 -->
                <el-tab-pane label="保单详情" name="first">
                    <el-row>
                        <el-col :span="24">
                            <span class="formTile">保单信息</span>
                        </el-col>
                        <el-col :span="9">
                            <dl class="dllist" style="margin-bottom:10px;">
                                <dt>保险状态：</dt>
                                <dd>
                                    <!--{{moreDetailsData.status == 1 ? '已无效' :-->
                                    <!--moreDetailsData.status == 2 ? '生效中' :-->
                                    <!--moreDetailsData.status == 3 ? '待生效' :-->
                                    <!--moreDetailsData.status == 4 ? '已退保' :-->
                                    <!--moreDetailsData.status == 5 ? '已报案' :-->
                                    <!--moreDetailsData.status == 6 ? '已理赔' :-->
                                    <!--moreDetailsData.status == 7 ? '已过期' :-->
                                    <!--moreDetailsData.status == 8 ? '理赔中' : '未知'}}-->
                                    {{moreDetailsData.statusname}}
                                </dd>
                            </dl>
                            <dl class="dllist" style="margin-bottom:10px;">
                                <dt>大保单编号：</dt>
                                <dd>{{moreDetailsData.policyno == undefined ? '--' : moreDetailsData.policyno}}</dd>
                            </dl>
                            <dl class="dllist" style="margin-bottom:10px;">
                                <dt>万网盗抢险服务费：</dt>
                                <dd>{{moreDetailsData.price == undefined ? '--' : moreDetailsData.price}}</dd>
                            </dl>
                            <dl class="dllist" style="margin-bottom:10px;">
                                <dt>第一受益人：</dt>
                                <dd>{{moreDetailsData.beneficiary == undefined ? '--' : moreDetailsData.beneficiary}}</dd>
                            </dl>
                            <dl class="dllist" style="margin-bottom:10px;">
                                <dt>报单公司：</dt>
                                <dd>{{moreDetailsData.busicorpname == undefined ? '--' : moreDetailsData.busicorpname}}</dd>
                            </dl>
                        </el-col>
                        <el-col :span="8">
                            <dl class="dllist" style="margin-bottom:10px;">
                                <dt>保险公司：</dt>
                                <dd>{{moreDetailsData.insurancecorpname == undefined ? '--' : moreDetailsData.insurancecorpname}}</dd>
                            </dl>
                            <dl class="dllist" style="margin-bottom:10px;">
                                <dt>万网保单编号：</dt>
                                <dd>{{moreDetailsData.serialnum == undefined ? '--' : moreDetailsData.serialnum}}</dd>
                            </dl>
                            <dl class="dllist" style="margin-bottom:10px;">
                                <dt>赔偿限额(元)：</dt>
                                <dd>{{moreDetailsData.indemnitylimit == undefined ? '--' : moreDetailsData.indemnitylimit}}</dd>
                            </dl>
                            <dl class="dllist" :formatter="dateFormatterSecond" style="margin-bottom:10px;">
                                <dt>生效日：</dt>
                                <dd>{{ moreDetailsData.effectivedate == null ? "--" :fmtdata.formatDate.format(new Date(moreDetailsData.effectivedate),
                                    'yyyy-MM-dd') }}
                                </dd>
                            </dl>
                            <dl class="dllist" style="margin-bottom:10px;">
                                <dt>备注：</dt>
                                <dd>{{ moreDetailsData.price }}</dd>
                            </dl>
                        </el-col>
                        <el-col :span="7">
                            <dl class="dllist" style="margin-bottom:10px;">
                                <dt>保险项目：</dt>
                                <dd>{{moreDetailsData.insurancetype == undefined ? '--' : moreDetailsData.insurancetype}}</dd>
                            </dl>
                            <dl class="dllist" style="margin-bottom:10px;">
                                <dt>保单类型：</dt>
                                <dd>{{ moreDetailsData.insurancetype == undefined ? '--' : moreDetailsData.insurancetype }}</dd>
                            </dl>
                            <dl class="dllist" style="margin-bottom:10px;">
                                <dt>出单日：</dt>
                                <dd>{{ moreDetailsData.issuedate == null ? "--" :fmtdata.formatDate.format(new Date(moreDetailsData.issuedate), 'yyyy-MM-dd')
                                    }}
                                </dd>
                            </dl>
                            <dl class="dllist" style="margin-bottom:10px;">
                                <dt>到期日：</dt>
                                <dd>{{moreDetailsData.expiredate == null ? "--" :fmtdata.formatDate.format(new Date(moreDetailsData.expiredate),
                                    'yyyy-MM-dd')}}
                                </dd>
                            </dl>
                        </el-col>
                        <el-col :span="24">
                            <el-tag type="success" class="buttonTag">
                                <el-collapse ref="rpShowimgDialog">
                                    <el-collapse-item title="保险出单所需图片">
                                        <div class="imgMd mr4 mt5" v-if="moreDetailsData.picinvoice">
                                            <img title="购车发票" class="image" :src="$store.state.IMG_URL+moreDetailsData.picinvoice">
                                            <span>购车发票</span>
                                        </div>
                                        <div class="imgMd mr4 mt5" v-if="moreDetailsData.picvehiclelicense">
                                            <img title="行驶证" class="image" :src="$store.state.IMG_URL+moreDetailsData.picvehiclelicense">
                                            <span>行驶证</span>
                                        </div>
                                        <div class="imgMd mr4 mt5" v-if="moreDetailsData.picidcard">
                                            <img title="身份证" class="image" :src="$store.state.IMG_URL+moreDetailsData.picidcard">
                                            <span>身份证</span>
                                        </div>
                                        <div class="imgMd mr4 mt5" v-if="moreDetailsData.picregistration">
                                            <img title="登记证" class="image" :src="$store.state.IMG_URL+moreDetailsData.picregistration">
                                            <span>登记证</span>
                                        </div>
                                        <div class="imgMd mr4 mt5" v-if="moreDetailsData.piccertificate">
                                            <img title="合格证" class="image" :src="$store.state.IMG_URL+moreDetailsData.piccertificate">
                                            <span>合格证</span>
                                        </div>
                                        <div class="imgMd mr4 mt5" v-if="moreDetailsData.picimport">
                                            <img title="货物进口证" class="image" :src="$store.state.IMG_URL+moreDetailsData.picimport">
                                            <span>货物进口证</span>
                                        </div>
                                        <div class="imgMd mr4 mt5"
                                             v-if="!moreDetailsData.picinvoice && !moreDetailsData.picvehiclelicense &&  !moreDetailsData.picidcard && !moreDetailsData.picregistration && !moreDetailsData.piccertificate && !moreDetailsData.picimport">
                                            <!-- <img title="" class="image" src="../../../assets/images/nothing.jpg"> -->
                                            <span>暂无图片</span>
                                        </div>
                                    </el-collapse-item>
                                </el-collapse>
                            </el-tag>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <span class="formTile">车主车辆信息</span>
                        </el-col>
                        <el-col :span="6">
                            <dl class="dllist" style="margin-bottom:10px;">
                                <dt>车主姓名：</dt>
                                <dd v-if="moreDetailsData">{{moreDetailsData.vehicleowner}}</dd>
                            </dl>
                            <dl class="dllist" style="margin-bottom:10px;">
                                <dt>车牌号：</dt>
                                <dd v-if="moreDetailsData">{{moreDetailsData.vehicleplate == undefined ? '--' : moreDetailsData.vehicleplate}}</dd>
                            </dl>
                            <dl class="dllist" style="margin-bottom:10px;">
                                <dt>车辆颜色：</dt>
                                <dd v-if="moreDetailsData">{{moreDetailsData.vehiclecolor == undefined ? '--' : moreDetailsData.vehiclecolor}}</dd>
                            </dl>
                            <dl class="dllist" style="margin-bottom:10px;">
                                <dt>性别：</dt>
                                <dd v-if="moreDetailsData">{{ moreDetailsData.ownersex == 'M' ? '男' : moreDetailsData.ownersex == 'F' ? '女' : '--'}}</dd>
                            </dl>
                        </el-col>
                        <el-col :span="11">
                            <dl class="dllist" style="margin-bottom:10px;">
                                <dt>身份证号：</dt>
                                <dd v-if="moreDetailsData">{{ moreDetailsData.vehicleowneridcard == undefined ? '--' : moreDetailsData.vehicleowneridcard}}</dd>
                            </dl>
                            <dl class="dllist" style="margin-bottom:10px;">
                                <dt>车架号：</dt>
                                <dd v-if="moreDetailsData">{{ moreDetailsData.vehiclevin == undefined ? '--' : moreDetailsData.vehiclevin}}</dd>
                            </dl>
                            <dl class="dllist" style="margin-bottom:10px;">
                                <dt>厂牌型号：</dt>
                                <dd v-if="moreDetailsData">{{ moreDetailsData.vehiclemodel == undefined ? '--' : moreDetailsData.vehiclemodel}}</dd>
                            </dl>
                            <dl class="dllist" style="margin-bottom:10px;">
                                <dt>详细地址：</dt>
                                <dd v-if="moreDetailsData">{{ moreDetailsData.owneraddress == undefined ? '--' : moreDetailsData.owneraddress}}</dd>
                            </dl>
                        </el-col>
                        <el-col :span="7">
                            <dl class="dllist" style="margin-bottom:10px;">
                                <dt>电话：</dt>
                                <dd v-if="moreDetailsData">{{ moreDetailsData.vehicleownercontact}}</dd>
                            </dl>
                            <dl class="dllist" style="margin-bottom:10px;">
                                <dt>发动机号：</dt>
                                <dd v-if="moreDetailsData">{{ moreDetailsData.vehicleenginenum == undefined ? '--' : moreDetailsData.vehicleenginenum}}</dd>
                            </dl>
                            <dl class="dllist" style="margin-bottom:10px;">
                                <dt>初登日期：</dt>
                                <dd v-if="moreDetailsData">{{ moreDetailsData.createdate == null ? "--" :fmtdata.formatDate.format(new
                                    Date(moreDetailsData.createdate), 'yyyy-MM-dd') }}
                                </dd>
                            </dl>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <span class="formTile">设备信息</span>
                        </el-col>
                        <el-col :span="12">
                            <dl class="dllist" style="margin-bottom:10px;">
                                <dt>设备编号：</dt>
                                <dd v-if="moreDetailsData">{{ moreDetailsData.equipmentnum == null ? '--' : moreDetailsData.equipmentnum}}</dd>
                            </dl>
                        </el-col>
                        <el-col :span="12">
                            <dl class="dllist" style="margin-bottom:10px;">
                                <dt>安装时间：</dt>
                                <dd v-if="moreDetailsData">{{ moreDetailsData.equipmentinstalldate == null ? "--" :fmtdata.formatDate.format(new
                                    Date(moreDetailsData.equipmentinstalldate), 'yyyy-MM-dd') }}
                                </dd>
                            </dl>
                        </el-col>
                    </el-row>
                </el-tab-pane>

                <!-- 操作记录 -->
                <el-tab-pane label="操作记录" name="second">
                    <el-table :data="operationData" max-height="600">
                        <el-table-column prop="eventstatus" label="操作状态" align="center" width="80">
                            <template slot-scope="scope">
                                <el-button size="mini" :type="scope.row.eventstatus == 1 ? 'success' : ''">
                                    {{ scope.row.eventstatus == 0 ? '撤消' : scope.row.eventstatus == 1 ? '正常' : '未知'}}
                                </el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="eventtype" label="操作类型" align="center" width="80">
                            <template slot-scope="scope">
                                {{
                                scope.row.eventtype == 1 ? '报案登记' :
                                scope.row.eventtype == 2 ? '理赔中' :
                                scope.row.eventtype == 3 ? '退保完成' :
                                scope.row.eventtype == 4 ? '不予理赔' :
                                scope.row.eventtype == 5 ? '废除保单' :
                                scope.row.eventtype == 6 ? '编辑' :
                                scope.row.eventtype == 7 ? '出单' :
                                scope.row.eventtype == 8 ? '撤销报案' :
                                scope.row.eventtype == 9 ? '理赔成功' :'未知'
                                }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="createby" label="操作人" align="center" width="80"></el-table-column>
                        <el-table-column prop="createdate" label="创建时间" align="center" width="150" :formatter="dateFormatterThird"></el-table-column>
                        <el-table-column prop="updatedate" label="操作时间" align="center" width="150" :formatter="dateFormatterForth"></el-table-column>
                        <el-table-column prop="eventdesc" label="操作备注"></el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>
        <!-- 保单退保——保单详情 end -->

        <!-- 电子保单——打印 start-->
        <el-dialog title="" :modal-append-to-body="false" :visible.sync="bxDialogVisible" :close-on-click-modal="false">
            <iframe :src="iframeSrc" frameborder="0" style="width: 100%; height: 1060px;"></iframe>
        </el-dialog>
        <!-- 电子保单——打印 end-->


        <!-- 分页start-->
        <el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :page-sizes="[15, 30, 45, 60]" :page-size="pageSize" layout="total,sizes, prev, pager, next" :total="total" style="float:right;margin-top:10px;">
        </el-pagination>


        <!-- 废除、退回订单、退保弹窗  start-->
        <el-dialog :title="delorder.title" :visible.sync="delorder.orderReasonDialogVisible" width="30%">
            <el-form>
                <el-form-item :label='delorder.title+"原因"'>
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" :placeholder='"请输入"+delorder.title+"原因"' v-model="delorder.reson"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delorder.orderReasonDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="comfirDelOrder(delorder.title)">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 废除、退回订单 弹窗  end-->

        <!-- 完成 步骤 弹窗  start-->
        <el-dialog :title="installStep == '1' ? '开始拆除信息' : '完成拆除信息'" :visible.sync="finishInstallDialogVisible" :close-on-click-modal="false" @close="closeFinish">
            <!-- 第一步—开始拆除-->
            <el-form :model="startForm" ref="startForm" :rules="startFormRules" v-if="installStep == '1'">
                <el-col :span="24">
                    <span class="formTile">派单信息</span>
                </el-col>
                <el-col :span="6">
                    <dl class="dllist">
                        <dt>车架号：</dt>
                        <dd>{{ rowFinishData.rpvehicleinfo ? rowFinishData.rpvehicleinfo.vin : '--' }}</dd>
                    </dl>
                    <dl class="dllist">
                        <dt>派单时间：</dt>
                        <dd>{{ Dayjs(rowFinishData.assigndate).format('YYYY-MM-DD HH:mm') }}</dd>
                    </dl>
                </el-col>
                <el-col :span="6">
                    <dl class="dllist">
                        <dt>车牌号：</dt>
                        <dd>{{ rowFinishData.rpvehicleinfo ? rowFinishData.rpvehicleinfo.licenseplatenum : '--' }}</dd>
                    </dl>
                    <dl class="dllist">
                        <dt>拆除时间：</dt>
                        <dd>{{ Dayjs(rowFinishData.impapplydate).format('YYYY-MM-DD HH:mm') }}</dd>
                    </dl>
                </el-col>
                <el-col :span="6">
                    <dl class="dllist">
                        <dt>厂牌型号：</dt>
                        <dd>{{ rowFinishData.rpvehicleinfo ? rowFinishData.rpvehicleinfo.model : '--'  }}</dd>
                    </dl>
                    <dl class="dllist">
                        <dt>派单备注：</dt>
                        <dd>{{ rowFinishData.clerkremarks?rowFinishData.clerkremarks:'--' }}</dd>
                    </dl>
                </el-col>
                <el-col :span="6">
                    <dl class="dllist">
                        <dt>车主姓名：</dt>
                        <dd>{{ rowFinishData.rpvehicleinfo&&rowFinishData.rpvehicleinfo.ownerInfo ? rowFinishData.rpvehicleinfo.ownerInfo.name : '--' }}</dd>
                    </dl>
                    <dl class="dllist">
                        <dt>拆除原因：</dt>
                        <dd>{{ rowFinishData.rpfaultcodename }}</dd>
                    </dl>
                </el-col>
                <el-col :span="24">
                    <span class="formTile">现场车辆信息</span>
                </el-col> 
                <el-row :gutter="20" style="height: 0;">
                    <el-col :span="24">
                        <p style="color:red;">提示：现场车架号与派单车架号必须一致！</p>
                    </el-col>
                    <el-col :span="8">
                    <el-form-item label="车架号：" prop="vin">
                            <el-input placeholder="请输入车架号" v-model="startForm.vin" @input="checkVin"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                    <el-form-item label="车牌号：" >
                            <el-input placeholder="请输入" v-model="startForm.licenseplatenum"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="车辆类型：" >
                            <el-select v-model="startForm.vehicletypename" @focus="vehChange" filterable placeholder="请选择车类型" clearable>
                                <el-option v-for="item in vehlist" :key="item.id" :label="item.typedesc" :value="item.typecode"> </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="车辆图片：" prop="vehiclePic">
                            <el-upload
                                name="file" class="avatar-uploader" 
                                :headers="{Authorization: 'Bearer '+ token}" 
                                :accept="accept" 
                                :on-success="uploadSuccessInvoice"
                                action="/admin/atta/upload/picture"
                                :show-file-list="false"
                                v-model="startForm.vehiclePic">
                                <img v-if="startForm.vehiclePic" :src="$store.state.IMG_URL+startForm.vehiclePic" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                <i class="desc">车前45°照</i>
                            </el-upload>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <!-- 第二步—完成安装 -->
            <el-form :model="endForm" ref="endForm" label-width="120px" :rules="endFormRules" v-else-if="installStep == '2'">
                <el-col :span="24">
                    <span class="formTile">选择拆除设备</span>
                </el-col>
                <div v-for="(item,index) in prodCatagorys" style="margin-bottom: 10px;">
                    <el-col :span="24">
                        <p class="invoice-title">{{ item.stoPackinfoDto.promodelspecname + '设备' }}</p>
                        <div v-if="isRemove[index]" style="display:inline-block;" class="removeBtn">
                            <span style="color:red;">已拆除</span>
                            <el-button type="warning" round class="removeBtn" icon="el-icon-goods" @click="cancelEquip(index)">撤销拆除</el-button>
                        </div>
                        <el-button v-else type="danger" round class="removeBtn" icon="el-icon-sold-out" @click="demolitionEquip(item,index)">拆除此设备</el-button>
                    </el-col>
                    <el-card shadow="never" class="space">
                        <el-col :span="8">
                            <dl class="dllist">
                                <dt>设备型号：</dt>
                                <dd>{{ item.stoPackinfoDto.promodelname }}</dd>
                            </dl>
                        </el-col>
                        <el-col :span="8">
                            <dl class="dllist">
                                <dt>设备编号：</dt>
                                <dd>{{ item.stoPackinfoDto.prodnum }}</dd>
                            </dl>
                        </el-col>
                        <el-col :span="8">
                            <dl class="dllist">
                                <dt>SIM卡号：</dt>
                                <dd>{{ item.stoPackinfoDto.simnum }}</dd>
                            </dl>
                        </el-col>
                        <el-col :span="8">
                            <dl class="dllist">
                                <dt>卡类型：</dt>
                                <dd>{{ item.stoPackinfoDto.simmodelname }}</dd>
                            </dl>
                        </el-col>
                        <el-col :span="11">
                            <dl class="dllist">
                                <dt>设备安装位置：</dt>
                                <dd>{{ item.installpositioncodename }}</dd>
                            </dl>
                        </el-col>
                        <el-col :span="5">
                            <el-popover placement="bottom" width="1000" trigger="click">
                                <div>信号检测结果:
                                    <el-button style="margin-left: 10px;" type="primary" size="mini" @click="getSignalInfo(item.stoPackinfoDto.prodnum)">再次检测
                                    </el-button>
                                </div>
                                <table class="kv-table" style="margin-top: 10px;">
                                    <tr>
                                        <td class="kv-label">
                                            设备实时状态：
                                        </td>
                                        <td class="kv-content">
                                            {{signalInfo.curonlinestatus}}
                                        </td>
                                        <td class="kv-label">
                                            上线质量：
                                        </td>
                                        <td class="kv-content">
                                            {{signalInfo.onlineStatus}}
                                        </td>
                                        <td class="kv-label">
                                            定位方式：
                                        </td>
                                        <td class="kv-content">
                                            {{signalInfo.locationmode}}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="kv-label">
                                            卫星或基站数量：
                                        </td>
                                        <td class="kv-content">
                                            {{signalInfo.gps_satellite_count < 0 ? '--' : signalInfo.gps_satellite_count}}
                                        </td>
                                        <td class="kv-label">
                                            卫星/基站信号强度：
                                        </td>
                                        <td class="kv-content">
                                            {{signalInfo.signalqulity}}
                                        </td>
                                        <td class="kv-label"></td>
                                        <td class="kv-content"></td>
                                    </tr>
                                    <tr>
                                        <td class="kv-label">
                                            定位地址：
                                        </td>
                                        <td class="kv-content" colspan="5">
                                            {{signalInfo.curaddress}}
                                        </td>
                                    </tr>
                                </table>
                                <el-button style="margin-left: 20px;" slot="reference" type="success" icon="el-icon-circle-check" round plain @click="getSignalInfo(item.stoPackinfoDto.prodnum)">信号检测 </el-button>
                            </el-popover>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="设备安装图片：">
                            <el-upload v-if="item.busiPictures.length != 0"
                                    name="file" class="avatar-uploader" 
                                    :headers="{Authorization: 'Bearer '+ token}" 
                                    :accept="accept" 
                                    :on-success="successInvoiceOne"
                                    action="/admin/atta/upload/picture"
                                    :show-file-list="false"
                                    v-model="item.busiPictures[0].piclink">
                                    <img v-if="item.busiPictures[0].piclink" :src="$store.state.IMG_URL+item.busiPictures[0].piclink" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    <i class="desc">安装位置照</i>
                                </el-upload>
                                <el-upload v-if="item.busiPictures.length != 0"
                                    name="file" class="avatar-uploader" 
                                    :headers="{Authorization: 'Bearer '+ token}" 
                                    :accept="accept" 
                                    :on-success="successInvoiceTwo"
                                    action="/admin/atta/upload/picture"
                                    :show-file-list="false"
                                    v-model="item.busiPictures[1].piclink">
                                    <img v-if="item.busiPictures[1].piclink" :src="$store.state.IMG_URL+item.busiPictures[1].piclink" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    <i class="desc">铭牌+设备照</i>
                                </el-upload>
                                <p v-else>暂无照片</p>
                        </el-form-item>
                        </el-col>
                    </el-card>
                </div>
                <el-col :span="24">
                    <span class="formTile">备注</span>
                </el-col>
                <el-input type="textarea" placeholder="请输拆除备注信息" v-model="endForm.impremark"></el-input>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="installStep == '1' ? cancelInstall() : previousStep()">{{ installStep == '1' ? '取 消' : '上一步' }}</el-button>
                <el-button type="primary" @click="installStep == '1' ? nextStep(rowFinishData) : confirmFinishInstall()">{{ installStep == '1' ? '下一步' : '完成拆除' }}</el-button>
            </span>
        </el-dialog>
        <!-- 完成 步骤 弹窗  end-->

 
    </section>
</template>

<style scoped>
dl.dllist { margin-bottom: 5px; }
.formTile { margin-top: 10px; }
.el-timeline-item{padding-bottom: 10px;}
.leftCol{text-align: center;margin-top: 15px;}
.leftCol p,.leftCol button{margin-bottom:10px;}
.prompt{text-align: center;font-size: 18px;}
.removeBtn{margin-left:30px;}
.img_card{width: 150px;height: 150px;}
.kv-table {
    td {
        line-height: 38px;
    }
}

.kv-label {
    background: #FAFAFA;
    border-bottom: 1px solid #e7eaec;
    border-right: 1px solid #e7eaec;
    text-align: right;
    padding-right: 30px;
    font-size: 16px;
    color: #000;
    width: 17%;
    padding: 5px;
}

.kv-content {
    border-right: 1px solid #e7eaec;
    border-bottom: 1px solid #e7eaec;
    padding-left: 20px;
    width: 17%;
}
</style>

<script src="./index.js"></script>
