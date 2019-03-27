<template>
    <section class="tab_content-wrapper">
        <div class="general-situation" v-if="isInsurance">
            <p>保险公司：</p>
            <span>{{corporateinfo.corpname}}</span>
            <span>|</span>
            <p>当前大保单号</p>
            <el-select v-model="policyno" placeholder="请选择" style="width: 200px;margin-left: 15px;" size="mini"  @change="getInsuranceDataCount">
                <el-option label="全部" value=""></el-option>
                <el-option
                        v-for="item in policynos"
                        :key="item.id"
                        :label="item.policyno"
                        :value="item.policyno">
                </el-option>
            </el-select>
        </div>
        <el-row :gutter="40" style="margin-bottom: 10px;" v-if="isInsurance">
            <el-col :md="12" :lg="5">
                <div class="count-box bg-cyan">
                    <div class="count-sum">{{countData.issue_num}}</div>
                    <div class="count-content">出单总数</div>
                </div>
            </el-col>
            <el-col :md="12" :lg="5">
                <div class="count-box bg-yellow">
                    <div class="count-sum">{{countData.issue_price_total}}</div>
                    <div class="count-content">出单保费（元）</div>
                    <div>最终保费以财务结算为准</div>
                </div>
            </el-col>
            <el-col :md="12" :lg="5">
                <div class="count-box bg-blue" @click="jump('/insuranceManage/policynoList', isJump('policynoList'))">
                    <div class="count-sum">{{countData.total_insurance_price}}</div>
                    <div class="count-content">总保费（元）</div>
                </div>
            </el-col>
            <el-col :md="12" :lg="5">
                <div class="count-box bg-red" @click="jump('/insuranceManage/policynoList', isJump('policynoList'))">
                    <div class="count-sum">{{countData.remain_insurance_price}}</div>
                    <div class="count-content">剩余保费（元）</div>
                </div>
            </el-col>
        </el-row>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <template v-for="(item,index) in filters.domSearch">
                    <template v-if="index == 0">
                        <div style="display:inline-block;margin:0 10px 10px 0;">
                            <el-input class="noborder color icon nofocus" @keyup.native.ctrl.8="clearAll()" @keyup.native.13="GetInsurances"
                                      placeholder="请输入查询内容" v-model="filters.domSearch[index].content">
                                <el-select class="wp_select" multiple clearable filterable v-model="filters.domSearch[index].select" slot="prepend"
                                           placeholder="选择条件">
                                    <el-option label="保单状态" value="isactive"></el-option>
                                    <el-option label="保险状态" value="status"></el-option>
                                    <el-option label="大保单编号" value="policyno" v-if="!isInsurance"></el-option>
                                    <el-option label="万网保单编号" value="serialnum"></el-option>
                                    <el-option label="报单公司" value="busicorpname"></el-option>
                                    <el-option label="保险项目" value="insurancetype"></el-option>
                                    <el-option label="金额(元)" value="price"></el-option>
                                    <el-option label="赔偿限额(元)" value="indemnitylimit"></el-option>
                                    <el-option label="车主" value="vehicleowner"></el-option>
                                    <el-option label="车架号" value="vehiclevin"></el-option>
                                    <el-option label="车牌号" value="vehicleplate"></el-option>
                                    <el-option label="保险公司" value="insurancecorpname" v-if="!isInsurance"></el-option>
                                    <el-option label="第一受益人" value="beneficiary"></el-option>
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
                                <el-input class="noborder color icon nofocus" @keyup.native.ctrl.8="clearAll()" @keyup.native.13="GetInsurances"
                                          placeholder="请输入查询内容" v-model="filters.domSearch[index].content">
                                    <el-select class="wp_select" multiple clearable filterable v-model="filters.domSearch[index].select" slot="prepend"
                                               placeholder="选择条件">
                                        <el-option label="保单状态" value="isactive"></el-option>
                                        <el-option label="保险状态" value="status"></el-option>
                                        <el-option label="大保单编号" value="policyno" v-if="!isInsurance"></el-option>
                                        <el-option label="万网保单编号" value="serialnum"></el-option>
                                        <el-option label="报单公司" value="busicorpname"></el-option>
                                        <el-option label="保险项目" value="insurancetype"></el-option>
                                        <el-option label="金额(元)" value="price"></el-option>
                                        <el-option label="赔偿限额(元)" value="indemnitylimit"></el-option>
                                        <el-option label="车主" value="vehicleowner"></el-option>
                                        <el-option label="车架号" value="vehiclevin"></el-option>
                                        <el-option label="车牌号" value="vehicleplate"></el-option>
                                        <el-option label="保险公司" value="insurancecorpname" v-if="!isInsurance"></el-option>
                                        <el-option label="第一受益人" value="beneficiary"></el-option>
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
                        <el-form-item label="出单日">
                            <el-date-picker style="width:250px;" value-format="yyyy-MM-dd" v-model="filters.issueDate" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="生效日">
                            <el-date-picker style="width:250px;" value-format="yyyy-MM-dd" v-model="filters.effectiveDate" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="GetInsurances" icon="el-icon-search">查询</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="warning" @click="handleExport" icon="el-icon-download">导出</el-button>
                        </el-form-item>

                        <el-form-item>
                            <el-switch v-model="filters.isactive" active-color="#41B883" inactive-color="#ff4949"
                                       active-value="1" active-text="正常" inactive-value="0" inactive-text="作废" @change="showData">
                            </el-switch>
                        </el-form-item>
                    </template>
                </template>
            </el-form>
        </el-col>
        <!--列表-->
        <el-table :max-height="windowOutHeight-215" border :data="insurances" :row-class-name="tableRowClassName" highlight-current-row v-loading="listLoading"
                  @selection-change="selsChange" style="width: 100%;">
            <el-table-column type="index" width="30" align="center" label="#">
            </el-table-column>
            <el-table-column prop="isactive" label="保单状态" align="center" width="80">
                <template slot-scope="scope">
                    <el-button class="button" size="mini" :type="scope.row.isactive == 1 ? 'success' : scope.row.isactive == 0 ? 'danger' : 'info'">
                        {{ scope.row.isactive == 1 ? '正 常' : scope.row.isactive == 0 ? '作 废' : '未知'}}
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="保险状态" align="center" width="100">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.status == 1 ? 'info' :
                        scope.row.status == 2 ? 'success' :
                        scope.row.status == 3 ? 'warning' :
                        scope.row.status == 4 ? 'danger' :
                        scope.row.status == 5 ? 'danger' :
                        scope.row.status == 6 ? 'danger' :
                        scope.row.status == 7 ? 'primary' : ''">
                        <!--{{ scope.row.status == 1 ? '已无效' : scope.row.status == 2 ? '生效中' : scope.row.status == 3 ? '待生效' : scope.row.status == 4 ? '已退保' :-->
                        <!--scope.row.status == 5 ? '已报案' : scope.row.status == 6 ? '已理赔' : scope.row.status == 7 ? '已过期' : scope.row.status == 8 ? '理赔中' : '未知'}}-->
                        {{scope.row.statusname}}
                        <!--<el-badge v-if="scope.row.status == 3" class="mark" value="续" style="top:0.5em;" />-->
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="policyno" label="大保单编号" width="200" align="center" v-if="!isInsurance">
            </el-table-column>
            <el-table-column prop="serialnum" label="万网保单编号" width="170" align="center">
            </el-table-column>
            <el-table-column prop="busicorpname" label="报单公司" align="center">
            </el-table-column>
            <el-table-column prop="insurancetype" label="保险项目" align="center" width="80">
            </el-table-column>
            <el-table-column prop="price" label="盗抢险服务费(元)" align="center">
            </el-table-column>
            <el-table-column prop="indemnitylimit" label="赔偿限额(元)" align="center" width="80">
            </el-table-column>
            <el-table-column prop="priceInsucorp" label="保费(元)" align="center" width="80">
            </el-table-column>
            <el-table-column prop="issuedate" label="出单日" :formatter="dateFormatter" align="center" width="100">
            </el-table-column>
            <el-table-column prop="effectivedate" label="生效日" :formatter="dateFormatterSecond" align="center" width="100">
            </el-table-column>
            <el-table-column prop="" label="车主车辆信息" width="300">
                <template slot-scope="scope">
                    <p>车主姓名：{{scope.row.vehicleowner}}</p>
                    <p>厂牌型号：{{scope.row.vehiclemodel}}</p>
                    <p>车架号：{{scope.row.vehiclevin}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="insurancecorpname" label="保险公司" width="200" align="center" v-if="!isInsurance">
            </el-table-column>
            <el-table-column prop="beneficiary" label="第一受益人" align="center" width="300">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="120" align="center">
                <template scope="scope">
                    <template v-if="!isInsurance">
                        <el-button id="button" @click="formDetailHandle(scope.row,scope.row.id)" title="详情">
                            <i class="iconfont icon-xiangqing operate operate-xiangqing"></i>
                        </el-button>
                        <el-button id="button" @click="electronicPrint(scope.row.templateid,scope.row.id)" title="电子保单">
                            <i class="iconfont icon-saomiao operate operate-saomiao"></i>
                        </el-button>
                        <!-- 操作 -->
                        <el-dropdown v-if="scope.row.isactive != 0 && scope.row.status != 4 && scope.row.status != 6 && scope.row.status != 7">
                             <span class="el-dropdown-link">
                                <i class="el-icon-arrow-down el-icon--right size"></i>
                              </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item @click.native="handleNote(0, scope.row)" v-if="scope.row.status == 2"
                                >报案登记
                                </el-dropdown-item>
                                <el-dropdown-item @click.native="handleNote(1, scope.row)" v-if="scope.row.status == 3 || scope.row.status == 2"
                                >退保完成
                                </el-dropdown-item>
                                <el-dropdown-item @click.native="handleNote(2, scope.row)" v-if="scope.row.status == 5 || scope.row.status == 8"
                                >理赔成功
                                </el-dropdown-item>
                                <el-dropdown-item @click.native="handleNote(3, scope.row)" v-if="scope.row.status == 5 || scope.row.status == 8"
                                >不予理赔
                                </el-dropdown-item>
                                <el-dropdown-item @click.native="handleNote(4, scope.row)" v-if="scope.row.status == 5"
                                >撤销报案
                                </el-dropdown-item>
                                <el-dropdown-item @click.native="handleNote(6, scope.row)" v-if="scope.row.status == 5"
                                >理赔中
                                </el-dropdown-item>
                                <!--<el-dropdown-item @click.native="handleEdit(scope.$index, scope.row)" -->
                                <!--&gt;编辑</el-dropdown-item>-->
                                <!--<el-dropdown-item @click.native="handleAgain(scope.$index, scope.row)" v-if="scope.row.status == 7 || scope.row.status == 4"-->
                                <!--&gt;出单</el-dropdown-item>-->
                                <el-dropdown-item @click.native="handleNote(7, scope.row)"
                                                  v-if="scope.row.status == 3 || scope.row.status == 2 || scope.row.status == 5 || scope.row.status == 8"
                                >废除保单
                                </el-dropdown-item>
                                <!--<el-dropdown-item @click.native="handleNote(5, scope.row)" v-if="scope.row.insurancecorpid == 10290" -->
                                <!--&gt;批改</el-dropdown-item>-->
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                    <template v-else>
                        <el-button id="button" @click="electronicPrint(scope.row.templateid,scope.row.id)" title="电子保单">
                            <i class="iconfont icon-saomiao operate operate-saomiao"></i>
                        </el-button>
                    </template>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :page-sizes="[15, 50, 80, 99]" :page-size="pageSize"
                           layout="total, sizes, prev, pager, next" :total="total">
            </el-pagination>
        </el-col>

        <!-- 订单详情 弹窗 start-->
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
                                            <img title="" class="image" src="../../../assets/images/nothing.jpg">
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
        <!-- 订单详情 弹窗  end-->

        <!--编辑界面-->
        <el-dialog title="编辑" :modal-append-to-body="false" :visible.sync="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="120px" :rules="editFormRules" ref="editForm">
                <el-row :gutter="20">
                    <el-col :span="10">
                        <el-form-item label="万网保单编号" prop="serialnum" ref="serialnum">
                            <el-input v-model="editForm.serialnum" auto-complete="off" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="金额(元)" prop="price">
                            <el-input v-model="editForm.price"></el-input>
                        </el-form-item>
                        <el-form-item label="赔偿限额(元)" prop="indemnitylimit">
                            <el-input v-model="editForm.indemnitylimit" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="出单日" prop="issuedate">
                            <el-date-picker v-model="editForm.issuedate" type="date" placeholder="选择日期" :picker-options="pickerOptions"
                                            @change="issuedateChange">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="生效日" prop="effectivedate">
                            <el-date-picker v-model="editForm.effectivedate" type="date" placeholder="选择日期" :picker-options="pickerOptions" @change="matchDate">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="到期日" prop="expiredate">
                            <el-date-picker v-model="editForm.expiredate" type="date" placeholder="选择日期" :picker-options="pickerOptions" @change="matchDateTwo">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="14">
                        <el-form-item label="保单状态" prop="isactive">
                            <el-input v-model="editForm.isactive" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="保险状态" prop="status">
                            <el-input v-model="editForm.status" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="第一受益人" prop="beneficiary">
                            <el-autocomplete class="inline-input searchInput" popper-class="my-autocomplete" v-model="editForm.beneficiary"
                                             :fetch-suggestions="corpChangeTwo" custom-item="my-item-zh-model" placeholder="请选择第一受益人"
                                             @select="handleSelectCorp"></el-autocomplete>
                        </el-form-item>
                        <el-form-item label="保险公司" prop="insurancecorpname">
                            <el-select v-model="editForm.insurancecorpname" @visible-change="incorpChange" :loading="incorpLoading" filterable
                                       placeholder="请选择保单公司" clearable>
                                <el-option v-for="(item,index) in incorplist" :key="index" :label="item.insucorpname" :value="item.insucorpid">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="保险项目" prop="insurancetype">
                            <el-select v-model="editForm.insurancetype" @visible-change="insuranceChange" :loading="insuranceLoading" filterable
                                       placeholder="请选择保险项目" clearable>
                                <el-option v-for="item in insurancelist" :key="item.value" :label="item.label" :value="item.value">
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


        <!--重新出单界面-->
        <el-dialog title="重新出单" :modal-append-to-body="false" :visible.sync="editFormVisibleAgain" :close-on-click-modal="false">
            <el-form :model="editFormAgain" label-width="120px" :rules="editFormAgainRules" ref="editFormAgain">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="保险公司" prop="insurancecorpname">
                            <el-select v-model="editFormAgain.insurancecorpname" @visible-change="incorpChange" :loading="incorpLoading" filterable
                                       placeholder="请选择保险公司" clearable @change="handleSelectInsu" value-key="insucorpid">
                                <el-option v-for="(item,index) in incorplist" :key="index" :label="item.insucorpname" :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="保单编号" prop="policyno">
                            <el-input v-model="editFormAgain.policyno" auto-complete="off" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="出单日期" prop="issuedate">
                            <el-date-picker v-model="editFormAgain.issuedate" type="date" placeholder="选择日期" :picker-options="pickerOptions"
                                            @change="issuedateChange">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="生效日期" prop="effectivedate">
                            <el-date-picker v-model="editFormAgain.effectivedate" type="date" placeholder="选择日期" :picker-options="pickerOptions"
                                            @change="matchDate">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="失效日期" prop="expiredate">
                            <el-date-picker v-model="editFormAgain.expiredate" type="date" placeholder="选择日期" :picker-options="pickerOptions"
                                            @change="matchDateTwo">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="初次登记日期" prop="createdate">
                            <el-date-picker v-model="editFormAgain.createdate" type="date" placeholder="选择初次登记日期" :picker-options="pickerOptions">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="保险价格(元)" prop="price">
                            <el-input v-model="editFormAgain.price"></el-input>
                        </el-form-item>
                        <el-form-item label="赔偿限额(元)" prop="indemnitylimit">
                            <el-input v-model="editFormAgain.indemnitylimit" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="第一受益人" prop="beneficiary">
                            <el-autocomplete class="inline-input searchInput" popper-class="my-autocomplete" v-model="editFormAgain.beneficiary"
                                             :fetch-suggestions="corpChangeTwo" custom-item="my-item-zh-model" placeholder="请选择第一受益人"
                                             @select="handleSelectCorp"></el-autocomplete>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="车主姓名" prop="vehicleowner">
                            <el-input v-model="editFormAgain.vehicleowner" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="车主身份证" prop="vehicleowneridcard">
                            <el-input v-model="editFormAgain.vehicleowneridcard" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="车主手机号" prop="vehicleownercontact">
                            <el-input v-model="editFormAgain.vehicleownercontact" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="车架号" prop="vehiclevin">
                            <el-input v-model="editFormAgain.vehiclevin" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="车牌号" prop="vehicleplate">
                            <el-input v-model="editFormAgain.vehicleplate" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="厂牌型号" prop="vehiclemodel">
                            <el-select v-model="editFormAgain.vehiclemodel" @visible-change="modelChange" :loading="modelLoading" filterable
                                       placeholder="请选择保险公司" clearable filterable @change="handleSelectModel" remote :remote-method="remoteMethod">
                                <el-option v-for="(item,index) in modellist" :key="index" :label="item.model" :value="item.model">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="发动机号" prop="vehicleenginenum">
                            <el-input v-model="editFormAgain.vehicleenginenum" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="保险项目" prop="insurancetype">
                            <el-select v-model="editFormAgain.insurancetype" @visible-change="insuranceChange" :loading="insuranceLoading" filterable
                                       placeholder="请选择保险项目" clearable>
                                <el-option v-for="item in insurancelist" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="备注" prop="remark">
                            <el-input v-model="editFormAgain.remark" type="textarea"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisibleAgain = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmitAgain" :loading="editLoading">重新出单</el-button>
            </div>
        </el-dialog>

        <!-- 电子保单——打印 -->
        <el-dialog title="" :modal-append-to-body="false" :visible.sync="bxDialogVisible" :close-on-click-modal="false">
            <iframe :src="iframeSrc" frameborder="0" style="width: 100%; height: 1060px;"></iframe>
        </el-dialog>

        <!-- 操作备注弹窗 -->
        <el-dialog :title="noteTitle" :modal-append-to-body="false" :visible.sync="noteDialogVisible" width="30%" :close-on-click-modal="false">
            <el-form :model="noteForm" ref="noteForm" :inline="true" label-width="80px">
                <el-row class="remark">
                    <el-col :span="24">
                        <el-form-item prop="remark" label="备注说明" ref="remark">
                            <el-input v-model="noteForm.remark" placeholder="请输入备注说明" type="textarea" @keyup.native="checkWords"
                                      :autosize="{ minRows: 4}"></el-input>
                            <span>{{noteForm.words}}/500</span>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                            <el-button @click="noteDialogVisible = false">取 消</el-button>
                            <el-button type="primary" @click="remarkConfirm()">确 定</el-button>
                    </span>
        </el-dialog>

    </section>
</template>

<style lang="stylus" media="screen" scoped>
    .el-table .warning-row {
        background-color: #F3F5F8;
        color: #BFCBD9;
    }

    .size {
        font-size: 22px;
        cursor: pointer;
        color: #909399;
    }

    .remark .el-form-item--medium .el-form-item__content {
        width: 95%;
        margin-left: 2%;
    }

    .remark .el-form-item {
        width: 100%;
        margin-bottom: 0;
    }

    .remark span {
        float: right;
        color: #BBBBBB;
    }

    .button {
        padding: 7px 10px;
    }

    .mark .el-badge__content {
        background-color: #41B883;
    }

    .buttonTag .el-collapse-item__header {
        background-color: transparent;
        font-weight: normal;
    }

    .buttonTag.el-tag--medium {
        height: 37px;
        line-height: 37px;
    }

    .buttonTag .el-collapse-item__wrap {
        border-bottom: none;
    }

    .count-sum
        font-size 18px;

    .count-content
        font-size 16px;
        margin 10px 0;

    .count-box
        height 100px;

    .general-situation
        margin 10px 0;
        font-size 18px;
        span {
            font-size 18px;
        }

</style>

<script src="./index.js"></script>
