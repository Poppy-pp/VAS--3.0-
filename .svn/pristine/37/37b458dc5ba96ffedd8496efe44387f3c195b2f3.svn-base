<template>
    <section class="tab_content-wrapper" id="policynomessage">
        <div class="general-situation" v-if="isInsurance">
            <p>保险公司：</p>
            <span>{{corporateinfo.corpname}}</span>
        </div>
        <el-row class="policyno-count" v-if="isInsurance">
            <el-col :lg="6" :md="12">
                <span>大保单总保费：</span>{{countData.total_insurance_price}}
            </el-col>
            <el-col :lg="6" :md="12">
                <span>出单保费：</span>{{countData.issue_price_total}}
            </el-col>
            <el-col :lg="6" :md="12">
                <span>剩余保费：</span>{{countData.remain_insurance_price}}
            </el-col>
        </el-row>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;" v-if="!isInsurance">
            <el-form :inline="true">
                <el-form-item>
                    <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新增</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button @click="openSetting">设置</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <!--列表-->
        <el-table border :max-height="windowOutHeight-215" :data="listData" highlight-current-row v-loading="loading">
            <el-table-column type="index" label="#" width="35" align="center">
            </el-table-column>
            <el-table-column align="center" label="保单号状态" width="100">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.isactive==='1'" type="success">有效</el-tag>
                    <el-tag v-else type="danger">无效</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="policyno" align="center" label="大保单编号">
            </el-table-column>
            <el-table-column prop="insucorpname" align="center" label="保险公司名称" width="200" v-if="!isInsurance">
            </el-table-column>
            <el-table-column prop="subnoPrefix" align="center" label="小保单号前缀" width="110" v-if="!isInsurance">
            </el-table-column>
            <el-table-column prop="subnoMid" align="center" label="小保单号日期" width="110" v-if="!isInsurance">
            </el-table-column>
            <el-table-column prop="subnoSerial" align="center" label="小保单号起始序列号" width="150" v-if="!isInsurance">
            </el-table-column>
            <el-table-column prop="currentsubno" align="center" label="当前小保单号" v-if="!isInsurance">
            </el-table-column>
            <el-table-column prop="totalpremium" align="center" label="大保单总保费（元）">
                <template slot-scope="scope">
                    <span>{{scope.row.totalpremium}}</span>
                    <br>
                    <el-button type="primary" size="mini" style="padding:4px 6px;" @click="openPremiumRecord(scope.$index, scope.row)"
                               title="保费记录">保费记录
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column prop="premiumBalance" align="center" label="保费余额">
            </el-table-column>
            <el-table-column prop="createdate" align="center" label="添加日期">
            </el-table-column>
            <el-table-column prop="remark" align="center" label="备注" width="150" v-if="!isInsurance">
            </el-table-column>
            <el-table-column label="操作" fixed="right" align="center" width="120">
                <template slot-scope="scope">
                    <template v-if="!isInsurance">
                        <el-button id="button" @click="detailsList(scope.$index,scope.row)" title="详情">
                            <i class="iconfont icon-xiangqing operate operate-xiangqing"></i>
                        </el-button>
                        <el-button id="button" @click="handleEdit(scope.$index, scope.row)" title="增加保费">
                            <i class="iconfont icon-jia operate"></i>
                        </el-button>
                        <el-button id="button" @click="handleChange(scope.$index, scope.row)" :title='scope.row.isactive == "0" ? "设置为有效" : "设置为无效"'>
                            <i :class='scope.row.isactive == "0" ? "iconfont icon-cha operate operate-cha" : "iconfont icon-duigou operate operate-duigou"'
                               @mouseover="mouseoverChange" @mouseout="mouseoutChange"></i>
                        </el-button>
                    </template>
                    <template v-else>
                        <el-button type="text" @click="jump(scope.row.policyno, isJump('insuranceList'))">出单详情
                        </el-button>
                    </template>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :page-sizes="[15, 50, 80,99]" :page-size="pageSize"
                           :current-page="currentPage" layout="total, sizes, prev, pager, next" :total="total">
            </el-pagination>
        </el-col>

        <!-- 新增保单号 -->
        <el-dialog title="添加保单号" :modal-append-to-body="false" :visible.sync="addFormVisible" :close-on-click-modal="false" id="addpolicy">
            <el-form :model="form" label-width="110px" :rules="rules" ref="form" v-if="addFormVisible">
                <el-form-item label="选择保险公司" prop="insucorpname">
                    <el-select v-model="form.insucorpid" placeholder="请选择保险公司" @change="editinsucorpname">
                        <el-option
                                v-for="(item, index) in insuranceCompList"
                                :key="index"
                                :label="item.corpname"
                                :value="item.corpcode">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="大保单编号" prop="policyno" ref="policyno">
                    <el-input type="text" v-model="form.policyno" @blur="policyNum_IsRepeat(form.policyno)"></el-input>
                </el-form-item>
                <el-form-item label="大保单有效期" prop="validityTime">
                    <el-date-picker
                            v-model="form.validityTime"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="小保单号规则" prop="smallPolicyRule">
                    前缀+日期+起始序列号：SCWW+{{smallPolicyRule}}+YYYYMM+0000001
                </el-form-item>
                <el-form-item label="大保单保费" class="clear" prop="totalpremium" style="position:relative;">
                    <el-input type="text" v-model="form.totalpremium"></el-input>
                    <span style="position:absolute;top:0;right:10px;">元</span>
                </el-form-item>
                <el-form-item label="缴费日期" prop="paymentDate">
                    <el-date-picker
                            v-model="form.paymentDate"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input type="text" v-model="form.remark" auto-complete="off" placeholder="请输入备注"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click="addSubmit" :loading="addLoading">提交添加</el-button>
            </div>
        </el-dialog>

        <!-- 详情 -->
        <el-dialog title="保单号详情" :modal-append-to-body="false" :visible.sync="detailsVisible" :close-on-click-modal="false" class="details" id="policyDetail">
            <el-row :model="detailsData" ref="detailsData" v-if="detailsVisible">
                <el-col :span="24">
                    <span class="formTile">保单号信息</span>
                </el-col>
                <el-col :span="8">
                    <dl class="dllist" style="margin-bottom:10px;">
                        <dt>保单号状态：</dt>
                        <dd>{{detailsData.isactive==1?"有效":"无效"}}</dd>
                    </dl>
                    <dl class="dllist" style="margin-bottom:10px;">
                        <dt>大保单总保费：</dt>
                        <dd>{{detailsData.totalpremium}}</dd>
                    </dl>
                </el-col>
                <el-col :span="8">
                    <dl class="dllist" style="margin-bottom:10px;">
                        <dt>大保单号：</dt>
                        <dd>{{detailsData.policyno}}</dd>
                    </dl>
                    <dl class="dllist" style="margin-bottom:10px;">
                        <dt>当前小保单号：</dt>
                        <dd>{{detailsData.currentsubno}}</dd>
                    </dl>
                </el-col>
                <el-col :span="8">
                    <dl class="dllist" style="margin-bottom:10px;">
                        <dt>保险公司：</dt>
                        <dd>{{detailsData.insucorpname}}</dd>
                    </dl>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="14">
                    <dl class="dllist" style="margin-bottom:10px;">
                        <dt>大保单号有效期：</dt>
                        <dd>
                            <template>
                                <div class="block">
                                    <el-date-picker
                                            v-model="detailsValidityTime"
                                            disabled
                                            type="daterange"
                                            range-separator="至"
                                            start-placeholder="开始日期"
                                            end-placeholder="结束日期">
                                    </el-date-picker>
                                </div>
                            </template>
                        </dd>
                    </dl>
                    <dl class="dllist" style="margin-bottom:10px;">
                        <dt>小保单号规则：</dt>
                        <dd>前缀+日期+起始序列号：{{detailsData.subnoPrefix?detailsData.subnoPrefix:"---"}}+YYYYMM+0000001</dd>
                    </dl>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <span class="formTile">创建信息</span>
                </el-col>
                <el-col :span="8">
                    <dl class="dllist" style="margin-bottom:10px;">
                        <dt>添加日期：</dt>
                        <dd>{{detailsData.createdate}}</dd>
                    </dl>
                </el-col>
                <el-col :span="8">
                    <dl class="dllist" style="margin-bottom:10px;">
                        <dt>添加人：</dt>
                        <dd>{{detailsData.createby}}</dd>
                    </dl>
                </el-col>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button @click="detailsVisible = false">取消</el-button>
                <el-button type="primary" @click="modifyValidityDate">修改有效期</el-button>
            </div>
        </el-dialog>

        <!-- 新增保费 -->
        <el-dialog title="新增保费" :modal-append-to-body="false" :visible.sync="addPremiumVisible" :close-on-click-modal="false">
            <el-form :model="addPremiumForm" label-width="110px" :rules="rules" ref="addPremiumForm" v-if="addPremiumVisible">
                <el-form-item label="大保单编号" prop="largePolicyNum">
                    {{addPremiumForm.policyno}}
                </el-form-item>
                <el-form-item label="大保单保费" class="clear" prop="addPolicyPremium" style="position:relative;">
                    <el-input type="text" v-model="addPremiumForm.addPolicyPremium" @blur="checkFloatNum(addPremiumForm.addPolicyPremium)"></el-input>
                    <span style="position:absolute;top:0;right:10px;">元</span>
                </el-form-item>
                <el-form-item label="增加日期" prop="addPremiumTime">
                    <el-date-picker
                            v-model="addPremiumForm.addPremiumTime"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <!--<el-form-item label="备注" prop="remark">-->
                <!--<el-input type="text" v-model="addPremiumForm.remark" auto-complete="off" placeholder="请输入备注"></el-input>-->
                <!--</el-form-item>-->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addPremiumVisible = false">取消</el-button>
                <el-button type="primary" @click="addPremiumSubmit" :loading="addPremiumLoading">确认增加</el-button>
            </div>
        </el-dialog>

        <!-- 保费记录 -->
        <el-dialog title="大保单号保费增加记录" :modal-append-to-body="false" :visible.sync="premiumRecord" :close-on-click-modal="false">
            <el-form :model="premiumRecordData" label-width="110px" ref="premiumRecordData" v-if="premiumRecord" style="padding:0 60px;"
                     v-loading="premiumRecordLoading">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="大保单编号：" prop="policyno">
                            {{premiumRecordData.policyno}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="总保费：" prop="totalpremium">
                            {{premiumRecordData.totalpremium}}元
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-table
                        :data="tableRecordData"
                        style="width: 100%;">
                    <el-table-column
                            prop="premium"
                            align="center"
                            label="增加保费（元）">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="paymentDate"
                            label="缴费日期">
                    </el-table-column>
                    <!--<el-table-column-->
                    <!--prop="remark"-->
                    <!--align="center"-->
                    <!--label="备注">-->
                    <!--</el-table-column>-->
                    <el-table-column
                            prop="createby"
                            align="center"
                            label="操作人">
                    </el-table-column>
                    <el-table-column
                            prop="createdate"
                            align="center"
                            label="操作时间"
                            width="150">
                    </el-table-column>
                </el-table>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="premiumRecord = false">取消</el-button>
                <el-button type="primary" @click="handleEdit(_index,premiumRecordData)">增加保费</el-button>
            </div>
        </el-dialog>

        <!-- 修改有效期 -->
        <el-dialog title="修改有效期" :modal-append-to-body="false" :visible.sync="editFormVisible" :close-on-click-modal="false" style="margin-top:12vh;">
            <el-form :model="ModifyValidityperiod" label-width="110px" :rules="rules" ref="ModifyValidityperiod" v-if="editFormVisible">
                <el-form-item label="大保单有效期" prop="validityTime">
                    <el-date-picker
                            v-model="ModifyValidityperiod.validityTime"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click="modifyPolicy(detailsData)" :loading="detailsLoading">确认修改</el-button>
            </div>
        </el-dialog>

        <el-dialog title="设置" :visible.sync="settingDialog" width="700px" v-if="settingDialog">
            <el-form label-width="200px" :model="alertForm" :rules="alertRules" ref="alertForm">
                <el-form-item label="保费余额预警设置">
                    <el-switch
                            active-value="1"
                            inactive-value="0"
                            v-model="alertForm.balanceIsactive"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                    </el-switch>
                </el-form-item>
                <el-form-item label="保费余额低于" style="margin-top: -20px;" prop="balanceParamvalue">
                    <el-input style="width: 150px;" size="mini" v-model="alertForm.balanceParamvalue">
                        <template slot="append">元</template>
                    </el-input>
                    时，每次出单时提醒
                </el-form-item>
                <el-form-item label="保单号到期预警设置">
                    <el-switch
                            active-value="1"
                            inactive-value="0"
                            v-model="alertForm.expireIsactive"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                    </el-switch>
                </el-form-item>
                <el-form-item label="保单号有效期少于" style="margin-top: -20px;" prop="expireParamvalue">
                    <el-input style="width: 150px;" size="mini" v-model="alertForm.expireParamvalue">
                        <template slot="append">天</template>
                    </el-input>
                    时，每次出单时提醒
                </el-form-item>
            </el-form>
            <p class="setting-remind">注：以上提醒只对状态为有效的保单号生效</p>
            <div slot="footer" class="dialog-footer">
                <el-button @click="settingDialog = false">取消</el-button>
                <el-button type="primary" @click="modifyAlertSetting" :loading="alertSettingLoading">确定</el-button>
            </div>
        </el-dialog>

    </section>
</template>
<script src="./index.js"></script>
<style scoped lang="stylus">
    #policynomessage #policyDetail .el-date-editor.el-input, #policynomessage #policyDetail .el-date-editor.el-input__inner, #policynomessage #policyDetail .el-autocomplete {
        width: 75%;
    }

    #policynomessage .el-date-editor .el-range-separator {
        width: 10%;
    }

    #policynomessage #addpolicy .el-date-editor.el-input, #policynomessage #addpolicy .el-date-editor.el-input__inner, #policynomessage #addpolicy .el-autocomplete {
        width: 100%;
    }

    .setting-remind {
        margin: 30px 0 0 30px;
    }

    .general-situation
        margin 10px 0;
        font-size 18px;
        span {
            font-size 18px;
        }

    .policyno-count
        font-size 16px;
        margin 15px 0;
        color #575757
</style>


