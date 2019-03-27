<template>
    <section style="width: 70%" v-loading="loading">
        <el-row>
            <el-col :span="24">
                <dl class="dllist cust-title">
                    <dt>报单公司 ：</dt>
                    <!--<dd v-if="ruleFormStatic.corporateInfo">{{ ruleFormStatic.corporateInfo.corpname || '万网鑫成' }}</dd>-->
                    <dd>
                        <el-select style="width: auto; margin-left: 10px;" v-model="form.corpname" filterable placeholder="请选择" @change="changeCorp" :disabled="!isEmployee"
                                   size="mini" @visible-change="getCorpnList">
                            <el-option v-for="item in corplist" :key="item.id" :label="item.corpname" :value="item.id">
                            </el-option>
                        </el-select>
                    </dd>
                </dl>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="cbstyle">
                <el-collapse v-model="activeNames" class="bdcoll rpShowimgDialog" ref="rpShowimgDialog">
                    <el-collapse-item title="车主车辆信息" class="lefw10 wzpdt10" name="1">
                        <el-form :model="form" ref="form" :rules="rules">
                            <el-row class="mt2 pt2" :gutter="20">
                                <el-col :span="8">
                                    <!--<el-form-item label="车架号" prop="vehiclevin">-->
                                    <!--<el-select v-model="form.vehiclevin" clearable filterable placeholder="请输入车架号"-->
                                    <!--@change="selectVin">-->
                                    <!--<el-option-->
                                    <!--v-for="item in vinList"-->
                                    <!--:key="item.vin"-->
                                    <!--:label="item.vin"-->
                                    <!--:value="item.vin">-->
                                    <!--</el-option>-->
                                    <!--</el-select>-->
                                    <!--</el-form-item>-->
                                    <el-form-item label="车架号" prop="vehiclevin">
                                        <el-autocomplete class="inline-input searchInput" popper-class="my-autocomplete" v-model="form.vehiclevin"
                                                         :fetch-suggestions="querySearchVins" custom-item="my-item-zh" placeholder="请输入车牌号/车架号"
                                                         @select="handleSelectVin">
                                            <template slot-scope="props">
                                                <div class="name">{{ props.item.model }}</div>
                                                <div class="addr">{{ props.item.licenseplatenum }}</div>
                                                <span class="addr">{{ props.item.vin }}</span>
                                            </template>
                                        </el-autocomplete>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="车主姓名" prop="vehicleowner">
                                        <el-input type="text" placeholder="请输入车主姓名" v-model="form.vehicleowner"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="车牌号" prop="vehicleplate">
                                        <el-input type="text" placeholder="请输入车牌号" v-model="form.vehicleplate"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row class="mt2 pt2" :gutter="20">
                                <el-col :span="8">
                                    <el-form-item label="车主电话" prop="vehicleownercontact">
                                        <el-input type="text" placeholder="请输入车主电话" v-model="form.vehicleownercontact"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="车主证件号码" prop="vehicleowneridcard">
                                        <el-input type="text" placeholder="请输入车主证件号码" v-model="form.vehicleowneridcard"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="车辆型号" prop="vehiclemodel">
                                        <el-input type="text" placeholder="请输入车辆型号" v-model="form.vehiclemodel"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="车辆类型" prop="vehiclecategory">
                                        <el-select v-model="form.vehiclecategory" @visible-change="vehChange" filterable
                                                   placeholder="请选择车类型" clearable>
                                            <el-option v-for="item in vehlist" :key="item.id" :label="item.typedesc" :value="item.typedesc">
                                            </el-option>
                                        </el-select>
                                        <!--<el-input type="text" placeholder="请输入车辆类型" v-model="ruleFormStatic.vehicleInfo.vehiclecategory"></el-input>-->
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="车辆颜色" prop="vehiclecolor">
                                        <br>
                                        <div style="display: flex">
                                            <el-select v-model="form.vehiclecolor" clearable placeholder="请选择车辆颜色">
                                                <el-option v-for="item in carColor" :key="item.color" :label="item.color" :value="item.color_rgb">
                                                    <div :style="{height:'20px',width:'20px',backgroundColor:item.color_rgb,float:'left',marginTop:'7px'}"></div>&nbsp;{{
                                                    item.color }}
                                                </el-option>
                                            </el-select>
                                            <el-color-picker v-model="form.vehiclecolor"></el-color-picker>
                                        </div>
                                    </el-form-item>
                                    <!--<el-form-item label="车辆颜色" prop="color">-->
                                    <!--<el-input type="text" placeholder="请输入车辆颜色" v-model="ruleFormStatic.vehicleInfo.color"></el-input>-->
                                    <!--</el-form-item>-->
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="车价" prop="vehicleprice">
                                        <el-input type="text" placeholder="请输入车价" v-model="form.vehicleprice" @change="checkNum">
                                            <template slot="append">元</template>
                                        </el-input>
                                    </el-form-item>
                                </el-col>

                                <!--<el-col :span="8">-->
                                <!--<dl class="dllist">-->
                                <!--<dt>车架号:</dt>-->
                                <!--<dd>{{ ruleFormStatic.vehicleInfo.vin }}</dd>-->
                                <!--</dl>-->
                                <!--</el-col>-->
                                <!--<el-col :span="8">-->
                                <!--<dl class="dllist">-->
                                <!--<dt>车主姓名:</dt>-->
                                <!--<dd>{{ ruleFormStatic.ownerInfo.name }}</dd>-->
                                <!--</dl>-->
                                <!--</el-col>-->
                                <!--<el-col :span="8">-->
                                <!--<dl class="dllist">-->
                                <!--<dt>车牌号:</dt>-->
                                <!--<dd>{{ ruleFormStatic.vehicleInfo.licenseplatenum }}</dd>-->
                                <!--</dl>-->
                                <!--</el-col>-->
                                <!--<el-col :span="8">-->
                                <!--<dl class="dllist">-->
                                <!--<dt>车主电话:</dt>-->
                                <!--<dd>{{ ruleFormStatic.ownerInfo.mobile }}</dd>-->
                                <!--</dl>-->
                                <!--</el-col>-->
                                <!--<el-col :span="8">-->
                                <!--<dl class="dllist">-->
                                <!--<dt>车主证件号码:</dt>-->
                                <!--<dd>{{ ruleFormStatic.ownerInfo.idcard }}</dd>-->
                                <!--</dl>-->
                                <!--</el-col>-->
                                <!--<el-col :span="8">-->
                                <!--<dl class="dllist">-->
                                <!--<dt>车辆型号:</dt>-->
                                <!--<dd>{{ ruleFormStatic.vehicleInfo.model }}</dd>-->
                                <!--</dl>-->
                                <!--</el-col>-->
                                <!--<el-col :span="8">-->
                                <!--<dl class="dllist">-->
                                <!--<dt>车辆类型:</dt>-->
                                <!--<dd>{{ ruleFormStatic.vehicleInfo.vehiclecategory ? ruleFormStatic.vehicleInfo.vehiclecategory.typedesc : '暂无' }}-->
                                <!--</dd>-->
                                <!--</dl>-->
                                <!--</el-col>-->
                                <!--<el-col :span="8">-->
                                <!--<dl class="dllist">-->
                                <!--<dt>车辆颜色:</dt>-->
                                <!--<template v-if="ruleFormStatic.vehicleInfo.color">-->
                                <!--<dd v-if="ruleFormStatic.vehicleInfo.color.indexOf('#') < 0">{{ ruleFormStatic.vehicleInfo.color }}</dd>-->
                                <!--<dd v-else>-->
                                <!--<span class="color_rgba" :style="{background:ruleFormStatic.vehicleInfo.color}"></span>-->
                                <!--</dd>-->
                                <!--</template>-->
                                <!--</dl>-->
                                <!--</el-col>-->
                                <!--<el-col :span="8">-->
                                <!--<dl class="dllist">-->
                                <!--<dt>车价:</dt>-->
                                <!--<dd v-if="ruleFormStatic.vehicleInfo.price">{{ ruleFormStatic.vehicleInfo.price }}元</dd>-->
                                <!--</dl>-->
                                <!--</el-col>-->

                            </el-row>
                        </el-form>
                    </el-collapse-item>
                    <template v-if="currentVehicleVin">
                        <el-collapse-item title="报单信息" class="lefw10 wzpdt10" name="2">
                            <el-row>
                                <!--<el-col :span="8">-->
                                <!--<dl class="dllist">-->
                                <!--<dt>报单类型:</dt>-->
                                <!--<dd>{{ ruleFormStatic.declaretype }}</dd>-->
                                <!--</dl>-->

                                <!--</el-col>-->
                                <!--<el-col :span="8">-->
                                <!--<dl class="dllist">-->
                                <!--<dt>客户名称:</dt>-->
                                <!--<dd v-if="ruleFormStatic.corporateInfo">{{ ruleFormStatic.corporateInfo.corpname }}</dd>-->
                                <!--</dl>-->
                                <!--</el-col>-->
                            </el-row>
                            <el-row class="mt2 pt2">
                                <el-col :span="24">
                                    <dl class="dllist">
                                        <dt>受理银行:</dt>
                                        <dd v-if="ruleFormStatic.vehicleInfo.receivingbank && ruleFormStatic.vehicleInfo.receivingbank.corpname">{{
                                            ruleFormStatic.vehicleInfo.receivingbank.corpname }}
                                        </dd>
                                    </dl>
                                </el-col>
                                <!--<el-col :span="8">-->
                                <!--<dl class="dllist">-->
                                <!--<dt>是否有盗抢险:</dt>-->
                                <!--<dd v-if="ruleFormStatic.vehicleInfo.hastheftinsurance">{{ ruleFormStatic.vehicleInfo.hastheftinsurance == 1 ? '有':'无' }}-->
                                <!--</dd>-->
                                <!--</dl>-->
                                <!--</el-col>-->
                            </el-row>
                            <el-row class="mt2 pt2">
                                <el-col :span="8">
                                    <dl class="dllist">
                                        <dt>业务员:</dt>
                                        <dd>{{ ruleFormStatic.salername }}</dd>
                                    </dl>
                                </el-col>
                                <el-col :span="8">
                                    <dl class="dllist">
                                        <dt>业务员联系电话:</dt>
                                        <dd>{{ ruleFormStatic.salermobile }}</dd>
                                    </dl>
                                </el-col>
                                <!--<el-col :span="8">-->
                                <!--<dl class="dllist">-->
                                <!--<dt>当前处理人:</dt>-->
                                <!--<dd v-if="$store.state.formObj.assignee">{{ $store.state.formObj.assignee }}</dd>-->
                                <!--</dl>-->
                                <!--</el-col>-->
                                <el-col :span="8">
                                    <dl class="dllist">
                                        <dt>当前处理人:</dt>
                                        <dd>{{ ruleFormStatic.contactperson }}</dd>
                                    </dl>
                                </el-col>
                                <el-col :span="8">
                                    <dl class="dllist">
                                        <dt>安装联系人:</dt>
                                        <dd>{{ ruleFormStatic.contactperson }}</dd>
                                    </dl>
                                </el-col>
                                <el-col :span="8">
                                    <dl class="dllist">
                                        <dt>安装联系电话:</dt>
                                        <dd>{{ ruleFormStatic.contactmobile }}</dd>
                                    </dl>
                                </el-col>
                            </el-row>
                            <el-row class="mt2 pt2 bt1">
                                <el-col :span="8">
                                    <dl class="dllist">
                                        <dt>安装保险产品数量:</dt>
                                        <dd>{{ ruleFormStatic.installapplyinsu ? ruleFormStatic.installapplyinsu : 0 }}台</dd>
                                    </dl>
                                </el-col>
                                <el-col :span="8">
                                    <dl class="dllist">
                                        <dt>安装常规产品数量:</dt>
                                        <dd>{{ ruleFormStatic.installapplymorn ? ruleFormStatic.installapplymorn : 0 }}台</dd>
                                    </dl>
                                </el-col>
                                <el-col :span="8">
                                    <dl class="dllist">
                                        <dt>安装地址:</dt>
                                        <dd v-if="ruleFormStatic.installaddress">{{ ruleFormStatic.installaddress }}</dd>
                                    </dl>
                                </el-col>
                                <el-col :span="8">
                                    <dl class="dllist">
                                        <dt>预约安装日期:</dt>
                                        <dd>{{ ruleFormStatic.installapplydate }}</dd>
                                    </dl>
                                </el-col>
                                <el-col :span="16">
                                    <dl class="dllist">
                                        <dt>安装生效日期:</dt>
                                        <dd>{{ ruleFormStatic.installactualdate }}</dd>
                                    </dl>
                                </el-col>
                                <el-col :span="24">
                                    <dl class="dllist">
                                        <dt>安装说明:</dt>
                                        <dd style="color:red;">默认安装的保险产品为有线车载终端(有源)，常规产品为无线车载终端(无源)。</dd>
                                    </dl>
                                </el-col>
                            </el-row>
                        </el-collapse-item>

                        <el-collapse-item title="派单信息" name="13" class="lefw10 wzpdt10">
                            <el-row class="mt5">
                                <el-col :span="8">
                                    <dl class="dllist">
                                        <dt>安装小组:</dt>
                                        <dd v-if="ruleFormStatic.installGroupInfo && ruleFormStatic.installGroupInfo.groupname">{{
                                            ruleFormStatic.installGroupInfo.groupname}}
                                        </dd>
                                    </dl>
                                </el-col>
                                <el-col :span="8">
                                    <dl class="dllist">
                                        <dt>安装人员:</dt>
                                        <dd>{{ ruleFormStatic.installEmployee.employeename }}</dd>
                                    </dl>
                                </el-col>
                                <el-col :span="8">
                                    <dl class="dllist">
                                        <dt>车辆情况选项:</dt>
                                        <dd v-if="ruleFormStatic.carstatus">{{ ruleFormStatic.carstatus?"已到":"未到" }}</dd>
                                    </dl>
                                </el-col>
                                <el-col :span="8">
                                    <dl class="dllist">
                                        <dt>服务年限:</dt>
                                        <dd v-if="ruleFormStatic.vehicleInfo.yearsofservice">{{ ruleFormStatic.vehicleInfo.yearsofservice }}年</dd>
                                    </dl>
                                </el-col>
                            </el-row>
                        </el-collapse-item>
                        <el-collapse-item title="车辆照片" name="14" class="lefw10 wzpdt10">
                            <el-row class="mt5">
                                <el-col :span="24">
                                    <dl class="dllist lh55_mb10">
                                        <dd>
                                            <div class="imgMd mr4 mt5" v-for="(item,index) in ruleFormStatic.pictures">
                                                <img :title="item.picdesc" class="image" :src="$store.state.ORIGINAL_URL+item.piclink">
                                                <span>{{ item.picdesc }}</span>
                                            </div>
                                        </dd>
                                    </dl>
                                </el-col>
                            </el-row>
                        </el-collapse-item>
                        <!--<el-collapse-item title="设备地图实时位置" name=receLoading"10086" class="enlargeArea"-->
                        <!--v-if="ruleFormStatic.installDetails && ruleFormStatic.installDetails.length>0">-->
                        <!--<template slot="title">-->
                        <!--<div class="fl sebei" style="margin-right:10px;">设备地图实时位置</div>-->
                        <!--<el-button @click.stop="realTimeRefreshPro('vueAmap3')" :loading="realTimeRefreshLoading" size="mini"><i-->
                        <!--class="iconfont icon-shuaxin" style="padding-right: 6px;"></i>刷新-->
                        <!--</el-button>-->
                        <!--</template>-->
                        <!--<el-row class="mt5">-->
                        <!--<el-col :span="24">-->
                        <!--<gdmap3 ref="vueAmap3"></gdmap3>-->
                        <!--</el-col>-->
                        <!--</el-row>-->
                        <!--</el-collapse-item>-->
                        <template v-for="(item,index) in ruleFormStatic.installDetails">
                            <el-collapse-item :title="item.packInfo.E_PRODTYPE+'设备'+item.packInfo.E_PRODMODEL" :name="(++index)+''"
                                              class="lefw10 wzpdt10">
                                <el-row class="mt5">
                                    <el-col :span="24" v-if="item.isActive == 0">
                                        <dl class="dllist">
                                            <dd style="color:red;">无效设备</dd>
                                        </dl>
                                    </el-col>
                                    <el-col :span="8">
                                        <dl class="dllist">
                                            <dt>安装位置:</dt>
                                            <dd>{{ item.installpositionname }}</dd>
                                        </dl>
                                    </el-col>
                                    <el-col :span="8">
                                        <dl class="dllist">
                                            <dt>安装时状态：</dt>
                                            <dd v-if="item.onlinestatus">{{ item.onlinestatus == 0 ? "未上线" : "在线" }}</dd>
                                            <dd v-else>未上线</dd>
                                        </dl>
                                    </el-col>
                                    <el-col :span="8">
                                        <dl class="dllist">
                                            <dt>设备ID:</dt>
                                            <dd>{{ item.packInfo.E_PRODUNUM }}</dd>
                                        </dl>
                                    </el-col>
                                    <el-col :span="8">
                                        <dl class="dllist">
                                            <dt>设备类型:</dt>
                                            <dd>{{ item.packInfo.E_PRODTYPE }}</dd>
                                        </dl>
                                    </el-col>
                                    <el-col :span="8">
                                        <dl class="dllist">
                                            <dt>设备型号:</dt>
                                            <dd>{{ item.packInfo.E_PRODMODEL }}</dd>
                                        </dl>
                                    </el-col>
                                    <el-col :span="8">
                                        <dl class="dllist">
                                            <dt>SIM卡号:</dt>
                                            <dd>{{ item.packInfo.C_PRODUNUM }}</dd>
                                        </dl>
                                    </el-col>
                                    <el-col :span="8">
                                        <dl class="dllist">
                                            <dt>iccid:</dt>
                                            <dd>{{ item.packInfo.SIMCARDID }}</dd>
                                        </dl>
                                    </el-col>
                                    <el-col :span="8">
                                        <dl class="dllist">
                                            <dt>卡类型:</dt>
                                            <dd>{{ item.packInfo.C_PRODMODEL }}</dd>
                                        </dl>
                                    </el-col>
                                    <el-col :span="8">
                                        <dl class="dllist">
                                            <dt>设备实时状态：</dt>
                                            <dd v-if="item.curonlinestatus">{{ item.curonlinestatus }}</dd>
                                        </dl>
                                    </el-col>
                                    <el-col :span="8">
                                        <dl class="dllist">
                                            <dt>最后一次通讯时间：</dt>
                                            <dd v-if="item.recvtime">{{ item.recvtime }}</dd>
                                        </dl>
                                    </el-col>
                                    <el-col :span="16">
                                        <dl class="dllist">
                                            <dt>实时位置信息：</dt>
                                            <dd>
                                                {{ item.curaddress ? item.curaddress : '-' }}
                                                <el-button size='mini' icon="el-icon-refresh" @click="cldeviceIsOnstateItem(item)">刷新</el-button>
                                            </dd>
                                        </dl>
                                    </el-col>
                                    <el-col :offset="8" :span="16">
                                        <dl class="dllist">
                                            <dt>上线时位置信息：</dt>
                                            <dd>{{ item.curaddress ? item.curaddress : '-' }}</dd>
                                        </dl>
                                    </el-col>
                                    <el-col :span="24">
                                        <dl class="dllist lh55_mb10">
                                            <dd>
                                                <div class="imgMd mr4 mt5" v-for="(item,index) in item.pictures">
                                                    <img :title="item.picdesc" class="image" :src="$store.state.ORIGINAL_URL+item.piclink">
                                                    <span>{{ item.picdesc }}</span>
                                                </div>
                                            </dd>
                                        </dl>
                                    </el-col>
                                </el-row>
                            </el-collapse-item>
                        </template>

                        <el-collapse-item title="备注信息" name="15" class="lefw10">
                            <el-row>
                                <el-col :span="12" v-if="ruleFormStatic.flowData">
                                    <dl class="dllist">
                                        <dt>报单备注:</dt>
                                        <dd>{{ ruleFormStatic.flowData.apply_remark }}</dd>
                                    </dl>
                                </el-col>
                                <el-col :span="12" v-if="ruleFormStatic.flowData">
                                    <dl class="dllist">
                                        <dt>派单备注:</dt>
                                        <dd>{{ ruleFormStatic.flowData.verify_remark }}</dd>
                                    </dl>
                                </el-col>
                                <el-col :span="12" v-if="ruleFormStatic.flowData">
                                    <dl class="dllist">
                                        <dt>施工备注:</dt>
                                        <dd>{{ ruleFormStatic.flowData.work_remark }}</dd>
                                    </dl>
                                </el-col>
                                <el-col :span="12" v-if="ruleFormStatic.flowData">
                                    <dl class="dllist">
                                        <dt>审核备注:</dt>
                                        <dd>{{ ruleFormStatic.flowData.service_verify_remark }}</dd>
                                    </dl>
                                </el-col>
                            </el-row>
                        </el-collapse-item>

                        <el-collapse-item title="保险操作" name="8" class="lefw10">
                            <el-row :gutter="20">
                                <el-form label-position="top" :model="ruleForm" ref="ruleForm" :rules="ruleFormrules" class="cur-form-inn" label-width="110px"
                                         inline>
                                    <el-form-item label="保险出单所需图片上传" class="mt10">

                                        <el-col class="photosh sgphtosh">
                                            <el-card :body-style="{ padding: '0px !important' }" class="devptosty">
                                                <el-upload name="file" class="avatar-uploader" action="/admin/atta/upload/picture" :show-file-list="false"
                                                           :headers="{Authorization: 'Bearer '+ token}"
                                                           :accept="accept" :before-upload="util.beforeAvatarUpload" :on-success="uploadSuccessInvoice">
                                                    <img v-if="form.picinvoice"
                                                         :src="$store.state.IMG_URL+form.picinvoice" class="avatar">
                                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                                </el-upload>
                                                <div class="btsty">
                                                    <span class="fl">购车发票</span>
                                                    <div class="bottom clearfix text_al fr" v-if="form.picinvoice">
                                                        <i title="删除照片" class="iconfont icon-p-delet operate operate-p-delet"
                                                           @click="removePic('picinvoice')"></i>
                                                    </div>
                                                </div>
                                            </el-card>
                                        </el-col>
                                        <el-col class="photosh sgphtosh">
                                            <el-card :body-style="{ padding: '0px !important' }" class="devptosty">
                                                <el-upload name="file" class="avatar-uploader" action="/admin/atta/upload/picture" :show-file-list="false"
                                                           :headers="{Authorization: 'Bearer '+ token}"
                                                           :accept="accept" :before-upload="util.beforeAvatarUpload" :on-success="uploadSuccessVehiclelicense">
                                                    <img v-if="form.picvehiclelicense"
                                                         :src="$store.state.IMG_URL+form.picvehiclelicense" class="avatar">
                                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                                </el-upload>
                                                <div class="btsty">
                                                    <span class="fl">行驶证</span>
                                                    <div class="bottom clearfix text_al fr" v-if="form.picvehiclelicense">
                                                        <i title="删除照片" class="iconfont icon-p-delet operate operate-p-delet"
                                                           @click="removePic('picvehiclelicense')"></i>
                                                    </div>
                                                </div>
                                            </el-card>
                                        </el-col>
                                        <el-col class="photosh sgphtosh">
                                            <el-card :body-style="{ padding: '0px !important' }" class="devptosty">
                                                <el-upload name="file" class="avatar-uploader" action="/admin/atta/upload/picture" :show-file-list="false"
                                                           :headers="{Authorization: 'Bearer '+ token}"
                                                           :accept="accept" :before-upload="util.beforeAvatarUpload" :on-success="uploadSuccessIdcard">
                                                    <img v-if="form.picidcard"
                                                         :src="$store.state.IMG_URL+form.picidcard" class="avatar">
                                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                                </el-upload>
                                                <div class="btsty">
                                                    <span class="fl">身份证</span>
                                                    <div class="bottom clearfix text_al fr" v-if="form.picidcard">
                                                        <i title="删除照片" class="iconfont icon-p-delet operate operate-p-delet"
                                                           @click="removePic('picidcard')"></i>
                                                    </div>
                                                </div>
                                            </el-card>
                                        </el-col>
                                        <el-col class="photosh sgphtosh">
                                            <el-card :body-style="{ padding: '0px !important' }" class="devptosty">
                                                <el-upload name="file" class="avatar-uploader" action="/admin/atta/upload/picture" :show-file-list="false"
                                                           :headers="{Authorization: 'Bearer '+ token}"
                                                           :accept="accept" :before-upload="util.beforeAvatarUpload" :on-success="uploadRegistration">
                                                    <img v-if="form.picregistration"
                                                         :src="$store.state.IMG_URL+form.picregistration" class="avatar">
                                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                                </el-upload>
                                                <div class="btsty">
                                                    <span class="fl">登记证</span>
                                                    <div class="bottom clearfix text_al fr" v-if="form.picregistration">
                                                        <i title="删除照片" class="iconfont icon-p-delet operate operate-p-delet"
                                                           @click="removePic('picregistration')"></i>
                                                    </div>
                                                </div>
                                            </el-card>
                                        </el-col>
                                        <el-col class="photosh sgphtosh">
                                            <el-card :body-style="{ padding: '0px !important' }" class="devptosty">
                                                <el-upload name="file" class="avatar-uploader" action="/admin/atta/upload/picture" :show-file-list="false"
                                                           :headers="{Authorization: 'Bearer '+ token}"
                                                           :accept="accept" :before-upload="util.beforeAvatarUpload" :on-success="uploadSuccessCertificate">
                                                    <img v-if="form.piccertificate"
                                                         :src="$store.state.IMG_URL+form.piccertificate" class="avatar">
                                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                                </el-upload>
                                                <div class="btsty">
                                                    <span class="fl">合格证</span>
                                                    <div class="bottom clearfix text_al fr" v-if="form.piccertificate">
                                                        <i title="删除照片" class="iconfont icon-p-delet operate operate-p-delet"
                                                           @click="removePic('piccertificate')"></i>
                                                    </div>
                                                </div>
                                            </el-card>
                                        </el-col>
                                        <el-col class="photosh sgphtosh">
                                            <el-card :body-style="{ padding: '0px !important' }" class="devptosty">
                                                <el-upload name="file" class="avatar-uploader" action="/admin/atta/upload/picture" :show-file-list="false"
                                                           :headers="{Authorization: 'Bearer '+ token}"
                                                           :accept="accept" :before-upload="util.beforeAvatarUpload" :on-success="uploadSuccessImport">
                                                    <img v-if="form.picimport"
                                                         :src="$store.state.IMG_URL+form.picimport" class="avatar">
                                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                                </el-upload>
                                                <div class="btsty">
                                                    <span class="fl">货物进口证</span>
                                                    <div class="bottom clearfix text_al fr" v-if="form.picimport">
                                                        <i title="删除照片" class="iconfont icon-p-delet operate operate-p-delet"
                                                           @click="removePic('picimport')"></i>
                                                    </div>
                                                </div>
                                            </el-card>
                                        </el-col>
                                    </el-form-item>
                                </el-form>
                            </el-row>
                            <el-row>
                                <el-col class="footer_but_bd" :span="24" style="height: 100px;">
                                    <el-button type="primary" @click="submitForm" :loading="addLoading" style="margin-left:5px;float:right;">提交
                                    </el-button>
                                </el-col>
                            </el-row>
                        </el-collapse-item>
                    </template>
                    <template v-else>
                        <el-row class="hint-message">
                            <el-col :offset="6" :span="12"></el-col>
                            <el-col :span="24">
                                提示：若VAS系统无车主信息和设备信息，请先去订单补登
                            </el-col>
                            <el-col :span="24">
                                <el-button type="primary" size="small" @click="$router.push('/insuranceManage/orderSupplement')">订单补登</el-button>
                            </el-col>
                        </el-row>
                    </template>
                </el-collapse>
            </el-col>
        </el-row>
    </section>
</template>

<script src="./index.js"></script>

<style lang="stylus">
    @import '../../../assets/styl/customerDeclaration.styl';

    .width.el-autocomplete
        width: 100%

    .cust-title
        line-height 40px
        padding-left 15px
        &:before
            content: "";
            padding: 0 2px;
            height: 20px;
            background: #41B883;
            float left;
            margin-top 10px;
            margin-right 10px;

    .location-refresh
        font-weight bold;
        margin-left 10px;
        cursor pointer
        font-size 18px;

    .hint-message
        text-align: center;
        div:first-of-type
            height: 1px;
            background: #ccc;
            margin-bottom: 30px;
        div:last-of-type
            margin-top: 30px;
        div:nth-child(2)
            color #787878
            font-size 16px;


</style>