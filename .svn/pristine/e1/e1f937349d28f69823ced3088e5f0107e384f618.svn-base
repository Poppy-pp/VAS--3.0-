<!-- 订单补登 -->
<template>
    <section class="tab_content-wrapper">
        <el-tabs :tab-position="tabPosition" v-model="active" class="newForm_s">
            <el-tab-pane label="新装登记" name="1">
                <el-card class="newForm_s_col_2 ml10">
                    <div class="text item">
                        <section class="myorderFF">
                            <section class="newForm_i">
                                <el-row>
                                    <el-form label-position="top" :model="ruleForm" ref="ruleForm" :rules="rules" class="cur-form-inn" label-width="110px" inline style="width:100%;font-size: 0;">
                                        <el-col :span="24" class="cbstyle">
                                            <el-collapse v-model="activeNames" class="bdcoll">
                                                <el-collapse-item title="车主信息" name="3" class="pb18 lefw10">
                                                    <el-row :gutter="20">
                                                        <el-col :span="8">
                                                            <el-form-item label="车主姓名" prop="name">
                                                                <el-input type="text" placeholder="请输入车主姓名" :readonly="isVinFlag" v-model="ruleForm.name"></el-input>
                                                            </el-form-item>
                                                        </el-col>
                                                        <el-col :span="8">
                                                            <el-form-item label="车主电话" prop="mobile">
                                                                <el-input type="text" placeholder="请输入车主电话" :readonly="isVinFlag" v-model="ruleForm.mobile"></el-input>
                                                            </el-form-item>
                                                        </el-col>
                                                        <el-col :span="8">
                                                            <el-form-item label="车主身份证号码" prop="idcard">
                                                                <el-input type="text" placeholder="请输入车主身份证号码" :readonly="isVinFlag" v-model="ruleForm.idcard"></el-input>
                                                            </el-form-item>
                                                        </el-col>
                                                    </el-row>
                                                </el-collapse-item>
                                                <el-collapse-item title="车信息" name="2" class="pb18 lefw10">
                                                    <el-row :gutter="20">
                                                        <el-col :span="8">
                                                            <el-form-item label="车架号" prop="vin">
                                                                <el-input type="text" :readonly="isVinFlag" placeholder="请输入车架号" @keyup.native="vinCheckJ" v-model="ruleForm.vin"></el-input>
                                                            </el-form-item>
                                                        </el-col>
                                                        <el-col :span="8">
                                                            <el-form-item label="车型信息" prop="model">
                                                                <el-autocomplete class="inline-input searchInput" popper-class="my-autocomplete" v-model="ruleForm.model" :fetch-suggestions="handleItemChange" custom-item="my-item-zh-model" placeholder="请选择车型信息" @select="handleSelectModel"></el-autocomplete>
                                                            </el-form-item>
                                                        </el-col>
                                                        <el-col :span="8">
                                                            <el-form-item label="车辆颜色" prop="color">
                                                                <div style="display:flex;">
                                                                    <el-select v-model="ruleForm.color" clearable style="flex:1;" placeholder="请选择车辆颜色">
                                                                        <el-option v-for="item in carColor" :key="item.color" :label="item.color" :value="item.color_rgb">
                                                                            <p>
                                                                            <div :style="{height:'20px',width:'20px',backgroundColor:item.color_rgb,float:'left',marginTop:'7px'}"></div>&nbsp;{{ item.color }}</p>
                                                                        </el-option>
                                                                    </el-select>
                                                                    <el-color-picker style="width:40px;flex:0 0 40px;" v-model="ruleForm.color"></el-color-picker>
                                                                </div>
                                                            </el-form-item>
                                                        </el-col>
                                                    </el-row>
                                                    <el-row :gutter="20">
                                                        <el-col :span="8">
                                                            <el-form-item label="车牌号" class="mt18" prop="licenseplatenum">
                                                                <el-input type="text" :readonly="isVinFlag" placeholder="请输入车牌号" v-model="ruleForm.licenseplatenum"></el-input>
                                                            </el-form-item>
                                                        </el-col>
                                                        <el-col :span="8">
                                                            <el-form-item label="车辆购置价" class="mt18" prop="price">
                                                                <el-input type="text" placeholder="请输入车价" v-model="ruleForm.price" :readonly="isVinFlag">
                                                                    <template slot="append">元</template>
                                                                </el-input>
                                                            </el-form-item>
                                                        </el-col>

                                                        <el-col :span="8" v-if="!isNew" class="mt18">
                                                            <el-form-item label="客户名称" prop="corpname">
                                                                <el-select v-model="ruleForm.corpid" value-key="corpname" @visible-change="changeCop" clearable filterable :loading="copLoading" placeholder="请选择">
                                                                    <el-option v-for="(item,index) in copName" :key="item.corpname" :label="item.corpname" :value="item.id">
                                                                    </el-option>
                                                                </el-select>
                                                            </el-form-item>
                                                        </el-col>
                                                    </el-row>
                                                    <el-row :gutter="20">
                                                        <el-col :span="8" v-if="!isNew">
                                                            <el-form-item label="受理银行" class="mt18" prop="receivingbankid">
                                                                <el-select v-model="ruleForm.receivingbankid" @visible-change="receivinList" :disabled="isVinFlag" clearable :loading="receLoading" filterable placeholder="请选择">
                                                                    <el-option v-for="item in salerData" :label="item.corpname" :key="item.corpname" :value="item.id">
                                                                    </el-option>
                                                                </el-select>
                                                            </el-form-item>
                                                        </el-col>
                                                        <el-col :span="8">
                                                            <el-form-item label="安装日期" class="mt18" prop="installapplydate">
                                                                <el-date-picker type="datetime" placeholder="选择日期" v-model="ruleForm.installapplydate" style="width: 100%;"></el-date-picker>
                                                            </el-form-item>
                                                        </el-col>
                                                    </el-row>
                                                </el-collapse-item>

                                                <el-collapse-item title="施工信息补登" name="4" class="pb18 lefw10" v-if="!isNew">
                                                    <el-row :gutter="20">
                                                        <el-col :span="24" class="mb10">
                                                            <el-form-item label="车辆照片" class="mt10">
                                                                <el-row :gutter="20">
                                                                    <el-col class="photosh sgphtosh">
                                                                        <el-card :body-style="{ padding: '0px !important' }" class="devptosty">
                                                                            <el-upload name="mediaFile" class="avatar-uploader" action="/vasms-web/atta/upload" :show-file-list="false" :accept="accept" :before-upload="util.beforeAvatarUpload" :on-success="vinHandleAvatarSuccess">
                                                                                <img v-if="ruleForm.pictures[0].piclink" :src="$store.state.IMG_URL+ruleForm.pictures[0].piclink" class="avatar">
                                                                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                                                            </el-upload>
                                                                            <div class="btsty">
                                                                                车架号照片
                                                                            </div>
                                                                        </el-card>
                                                                    </el-col>
                                                                    <el-col class="photosh sgphtosh">
                                                                        <el-card :body-style="{ padding: '0px !important' }" class="devptosty">
                                                                            <el-upload name="mediaFile" class="avatar-uploader" action="/vasms-web/atta/upload" :show-file-list="false" :accept="accept" :before-upload="util.beforeAvatarUpload" :on-success="carNumHandleAvatarSuccess">
                                                                                <img v-if="ruleForm.pictures[1].piclink" :src="$store.state.IMG_URL+ruleForm.pictures[1].piclink" class="avatar">
                                                                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                                                            </el-upload>
                                                                            <div class="btsty">
                                                                                车牌号照片
                                                                            </div>
                                                                        </el-card>
                                                                    </el-col>
                                                                    <el-col class="photosh sgphtosh">
                                                                        <el-card :body-style="{ padding: '0px !important' }" class="devptosty">
                                                                            <el-upload name="mediaFile" class="avatar-uploader" action="/vasms-web/atta/upload" :show-file-list="false" :accept="accept" :before-upload="util.beforeAvatarUpload" :on-success="carMpHandleAvatarSuccess">
                                                                                <img v-if="ruleForm.pictures[2].piclink" :src="$store.state.IMG_URL+ruleForm.pictures[2].piclink" class="avatar">
                                                                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                                                            </el-upload>
                                                                            <div class="btsty">
                                                                                铭牌号照片
                                                                            </div>
                                                                        </el-card>
                                                                    </el-col>

                                                                    <el-col class="photosh sgphtosh" v-for="(item,index) in ruleForm.pictures" v-if="index > 2">
                                                                        <el-card :body-style="{ padding: '0px !important' }" class="devptosty">
                                                                            <el-upload name="mediaFile" class="avatar-uploader" action="/vasms-web/atta/upload" :show-file-list="false" :accept="accept" :before-upload="util.beforeAvatarUpload" @click.native="carHandleMouseover(index)" :on-success="carHandleSuccess">
                                                                                <img v-if="ruleForm.pictures[index].piclink" :src="$store.state.IMG_URL+ruleForm.pictures[index].piclink" class="avatar">
                                                                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                                                            </el-upload>
                                                                            <div class="btsty">
                                                                                <el-select class="fl" :style="{width:(index == ruleForm.pictures.length-1)?'100%':''}" @visible-change="changeCarPicLac" filterable v-loading="carPicLoading" v-model="ruleForm.pictures[index].picdesc" clearable placeholder="请选择车辆照片位置">
                                                                                    <el-option v-for="item in carPicList" :key="item.dictdatavalue" :label="item.dictdatavalue" :value="item.dictdatavalue">
                                                                                    </el-option>
                                                                                </el-select>
                                                                                <div class="bottom clearfix text_al fr" v-if="index != ruleForm.pictures.length-1">
                                                                                    <i class="iconfont icon-p-delet operate operate-p-delet" @click="removeBusiPicture(index)" title="删除照片"></i>
                                                                                </div>
                                                                            </div>
                                                                        </el-card>
                                                                    </el-col>
                                                                </el-row>
                                                            </el-form-item>
                                                        </el-col>

                                                        <template v-for="(item,index) in deviceCurData">
                                                            <el-col :span="24" class="mt10" style="border-bottom:1px solid #e8e8e8;">
                                                                <el-col :span="10">
                                                                    <dl class="dllist">
                                                                        <dt>设备类型:</dt>
                                                                        <dd>{{ item.PRODSPEC }}</dd>
                                                                    </dl>
                                                                    <dl class="dllist">
                                                                        <dt>卡类型:</dt>
                                                                        <dd>{{ item.C_PRODMODEL }}</dd>
                                                                    </dl>
                                                                </el-col>
                                                                <el-col :span="9">
                                                                    <dl class="dllist">
                                                                        <dt>设备型号:</dt>
                                                                        <dd>{{ item.E_PRODMODEL }}</dd>
                                                                    </dl>
                                                                    <dl class="dllist">
                                                                        <dt>SIM卡号:</dt>
                                                                        <dd>{{ item.C_PRODUNUM }}</dd>
                                                                    </dl>
                                                                </el-col>
                                                                <el-col :span="5">
                                                                    <dl class="dllist">
                                                                        <dt>设备编号:</dt>
                                                                        <dd>{{ item.E_PRODUNUM }}</dd>
                                                                    </dl>
                                                                </el-col>
                                                                <el-col :span="10" v-if="ruleForm.installDetails.length > 0">
                                                                    <el-form-item label="安装位置(必选)" class="mt10">
                                                                        <el-select filterable :loading="codeloading" @visible-change="changeInstallDecode" v-model="ruleForm.installDetails[index].installpositioncode" placeholder="请选择安装位置">
                                                                            <el-option v-for="item in InstallPositionArray" :key="item.dictdatavalue" :label="item.dictdatavalue" :value="item.dictdataname">
                                                                            </el-option>
                                                                        </el-select>
                                                                    </el-form-item>
                                                                </el-col>

                                                                <el-col :span="13">
                                                                    <el-form-item class="mbs5 mt8">
                                                                        <div slot="label">
                                                                            设备是否在线
                                                                            <el-button @click="cldeviceIsOnstate(item.E_PRODUNUM,index)" :loading="realTimeRefreshLoading" size="mini"><i class="pr5 iconfont icon-shuaxin"></i>刷新</el-button>
                                                                        </div>
                                                                        <el-radio-group v-model="ruleForm.installDetails[index].onlinestatus" size="medium">
                                                                            <el-radio-button :disabled="ruleForm.installDetails[index].onlinestatus == 0" label='1'>已上线</el-radio-button>
                                                                            <el-radio-button :disabled="ruleForm.installDetails[index].onlinestatus == 1" label='0'>不在线</el-radio-button>
                                                                        </el-radio-group>
                                                                    </el-form-item>
                                                                </el-col>

                                                                <el-col :span="24" class="mb10">
                                                                    <el-form-item label="当前设备照片" prop="installactualdate">
                                                                        <el-row :gutter="20">
                                                                            <el-col class="photosh sgphtosh">
                                                                                <el-card :body-style="{ padding: '0px !important' }" class="devptosty">
                                                                                    <el-upload name="mediaFile" :ref="'devUploada'+index" :data="{ind:index}" class="avatar-uploader" action="/vasms-web/atta/upload" @click.native="deviceHandleMouseover(0,'devUploada'+index)" :show-file-list="false" :accept="accept" :before-upload="util.beforeAvatarUpload" :on-success="deviveZxHandleAvatarSuccess">
                                                                                        <img v-if="ruleForm.installDetails[index].pictures[0].piclink" :src="$store.state.IMG_URL+ruleForm.installDetails[index].pictures[0].piclink" class="avatar">
                                                                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                                                                    </el-upload>
                                                                                    <div class="btsty">
                                                                                        设备走线照片
                                                                                    </div>
                                                                                </el-card>
                                                                            </el-col>
                                                                            <el-col class="photosh sgphtosh">
                                                                                <el-card :body-style="{ padding: '0px !important' }" class="devptosty">
                                                                                    <el-upload name="mediaFile" :ref="'devUploadb'+(index+1)" :data="{ind:index}" class="avatar-uploader" @click.native="deviceHandleMouseover(1,'devUploadb'+(index+1))" action="/vasms-web/atta/upload" :show-file-list="false" :accept="accept" :before-upload="util.beforeAvatarUpload" :on-success="deviveSbhHandleAvatarSuccess">
                                                                                        <img v-if="ruleForm.installDetails[index].pictures[1].piclink" :src="$store.state.IMG_URL+ruleForm.installDetails[index].pictures[1].piclink" class="avatar">
                                                                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                                                                    </el-upload>
                                                                                    <div class="btsty">
                                                                                        设备号照片
                                                                                    </div>
                                                                                </el-card>
                                                                            </el-col>
                                                                            <el-col class="photosh sgphtosh">
                                                                                <el-card :body-style="{ padding: '0px !important' }" class="devptosty">
                                                                                    <el-upload name="mediaFile" :ref="'devUploadc'+(index+2)" :data="{ind:index}" class="avatar-uploader" action="/vasms-web/atta/upload" :show-file-list="false" @click.native="deviceHandleMouseover(2,'devUploadc'+(index+2))" :accept="accept" :before-upload="util.beforeAvatarUpload" :on-success="deviveSbHandleAvatarSuccess">
                                                                                        <img v-if="ruleForm.installDetails[index].pictures[2].piclink" :src="$store.state.IMG_URL+ruleForm.installDetails[index].pictures[2].piclink" class="avatar">
                                                                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                                                                    </el-upload>
                                                                                    <div class="btsty">
                                                                                        设备照片
                                                                                    </div>
                                                                                </el-card>
                                                                            </el-col>

                                                                            <el-col class="photosh sgphtosh" v-for="(item,ind) in ruleForm.installDetails[index].pictures" v-if="ind > 2">
                                                                                <el-card :body-style="{ padding: '0px !important' }" class="devptosty">
                                                                                    <el-upload name="mediaFile" :ref="'devUploadd'+(index*6+ind+3)" :data="{ind:index}" class="avatar-uploader" action="/vasms-web/atta/upload" :show-file-list="false" :accept="accept" :before-upload="util.beforeAvatarUpload" @click.native="deviceHandleMouseover(ind,'devUploadd'+(index*6+ind+3))" :on-success="deviceHandleSuccess">
                                                                                        <img v-if="ruleForm.installDetails[index].pictures[ind].piclink" :src="$store.state.IMG_URL+ruleForm.installDetails[index].pictures[ind].piclink" class="avatar">
                                                                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                                                                    </el-upload>
                                                                                    <div class="btsty">
                                                                                        <el-select class="fl" :style="{width:(ind == ruleForm.installDetails[index].pictures.length-1)?'100%':''}" @visible-change="changeCarPicLac" filterable v-loading="carPicLoading" v-model="ruleForm.installDetails[index].pictures[ind].picdesc" clearable placeholder="请选择设备照片位置">
                                                                                            <el-option v-for="item in carPicList" :key="item.dictdatavalue" :label="item.dictdatavalue" :value="item.dictdatavalue">
                                                                                            </el-option>
                                                                                        </el-select>
                                                                                        <div class="bottom clearfix text_al fr" v-if="(ind != ruleForm.installDetails[index].pictures.length-1)">
                                                                                            <i class="iconfont icon-p-delet operate operate-p-delet" @click="deviceRemoveBusiPicture(index,ind,ruleForm.installDetails[index].pictures[ind].piclink)" title="删除照片"></i>
                                                                                        </div>
                                                                                    </div>
                                                                                </el-card>
                                                                            </el-col>
                                                                        </el-row>
                                                                    </el-form-item>
                                                                </el-col>
                                                                <el-col :span="24">
                                                                    <el-form-item label="当前设备描述" prop="installremark">
                                                                        <el-input type="textarea" autosize placeholder="请输入当前设备描述" v-model="ruleForm.installDetails[index].installremark"></el-input>
                                                                    </el-form-item>
                                                                </el-col>
                                                                <el-col :span="24" class="mb10 mt10">
                                                                    <el-button type="danger" class="ml5 fr" icon="el-icon-delete" v-if="!isEditPro && !isEditProFlag" @click="delDevice(item,index)">删除当前设备</el-button>
                                                                    <el-button type="danger" class="ml5 fr" v-if="isEditPro" @click="replaceDevice(item,index)">
                                                                        <i class='iconfont icon-tihuan'></i> 替换当前设备
                                                                    </el-button>
                                                                </el-col>
                                                            </el-col>
                                                        </template>
                                                        <el-col :span="24" class="mt10">
                                                            <el-popover ref="popover4" placement="left" width="720" v-model="visible" @show="showDeviceXz" @hide="profilters.search_key = ''" trigger="click">
                                                                <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
                                                                    <el-form :inline="true" :model="profilters">
                                                                        <el-form-item>
                                                                            <el-input v-model="profilters.search_key" @keyup.native.enter="searchDevceinfo" placeholder="例如:设备编号,卡编号,卡号"></el-input>
                                                                        </el-form-item>
                                                                        <el-form-item>
                                                                            <el-button type="primary" @click="searchDevceinfo" icon="el-icon-search">查询</el-button>
                                                                        </el-form-item>
                                                                    </el-form>
                                                                </el-col>
                                                                <el-table :data="deviceData" max-height="300" :row-class-name="tableRowClassName" v-loading="listLoading" @row-dblclick="deviceClickHandle">
                                                                    <el-table-column align="center" prop="PRODSPEC" label="设备种类"></el-table-column>
                                                                    <el-table-column align="center" prop="PACKSELFID" label="自编号"></el-table-column>
                                                                    <el-table-column align="center" prop="E_PRODMODEL" label="设备类型"></el-table-column>
                                                                    <el-table-column align="center" prop="E_PRODUNUM" label="设备ID"></el-table-column>
                                                                    <el-table-column align="center" prop="E_STATUS" label="设备状态" :formatter="statusFormat"></el-table-column>
                                                                    <el-table-column align="center" prop="C_PRODMODEL" label="卡类型"></el-table-column>
                                                                    <el-table-column align="center" prop="C_PRODUNUM" label="SIM卡号"></el-table-column>
                                                                    <el-table-column align="center" prop="E_INSURANCEFLAG" label="保险设备">
                                                                        <template scope="props">
                                                                            {{ props.row.E_INSURANCEFLAG == "Y"?"是":"否" }}
                                                                        </template>
                                                                    </el-table-column>
                                                                    <el-table-column align="center" prop="E_NORMALFLAG" label="常规设备">
                                                                        <template scope="props">
                                                                            {{ props.row.E_NORMALFLAG == "Y"?"是":"否" }}
                                                                        </template>
                                                                    </el-table-column>
                                                                </el-table>
                                                                <!--工具条-->
                                                                <el-col :span="24" class="toolbar">
                                                                    <el-pagination @size-change="dhandleSizeChange" background @current-change="dhandleCurrentChange" :page-sizes="[15, 50,80,99]" :page-size="dpageSize" layout="total, sizes, prev, pager, next" :total="dtotal" style="float:right;margin-top:10px;">
                                                                    </el-pagination>
                                                                </el-col>
                                                            </el-popover>
                                                            <el-button icon="el-icon-plus" type="primary" v-popover:popover4>添加安装设备</el-button>
                                                        </el-col>
                                                    </el-row>
                                                </el-collapse-item>
                                                <el-collapse-item title="其它信息" name="5" class="lefw10">
                                                    <el-row :gutter="20">
                                                        <div v-if="!isNew">
                                                            <el-col :span="24">
                                                                <el-form-item label="接入平台" prop="hasPlat">
                                                                    <el-switch v-model="ruleForm.hasPlat" active-value="1" active-text="是" inactive-value="0" inactive-text="否">
                                                                    </el-switch>
                                                                </el-form-item>
                                                            </el-col>
                                                            <div v-show="ruleForm.hasPlat == '1'">
                                                                <el-col :span="8">
                                                                    <el-form-item label="平台名称" prop="platnameId">
                                                                        <el-select v-model="ruleForm.platid" @visible-change="platChange" @change="getIpAdd" :loading="platLoading" filterable clearable placeholder="请选择平台名称">
                                                                            <el-option v-for="item in platlist" :key="item.platname" :label="item.platname" :value="item.ID">
                                                                            </el-option>
                                                                        </el-select>
                                                                    </el-form-item>
                                                                </el-col>
                                                                <el-col :span="8" v-if="!isNew">
                                                                    <el-form-item label="平台IP" prop="platip">
                                                                        <el-input v-model="ruleForm.platip" disabled auto-complete="off" placeholder="自动匹配平台IP"></el-input>
                                                                    </el-form-item>
                                                                </el-col>
                                                            </div>
                                                        </div>
                                                        <el-col :span="24">
                                                            <el-form-item label=" " prop="remark">
                                                                <el-input type="textarea" autosize :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入备注" v-model="ruleForm.remark"></el-input>
                                                            </el-form-item>
                                                        </el-col>
                                                    </el-row>
                                                </el-collapse-item>
                                            </el-collapse>
                                            <el-col class="footer_but_bd" :span="24">
                                                <el-button @click="resetForm" style="margin-left:5px;float:right;">清空</el-button>
                                                <el-button type="primary" @click="submitForm('ruleForm')" :loading="addLoading" style="margin-left:5px;float:right;">提交</el-button>
                                            </el-col>
                                        </el-col>
                                    </el-form>
                                </el-row>

                                <!-- 替换当前设备弹出框 -->
                                <el-dialog title="设备选择" :modal-append-to-body="false" :visible.sync="deviceDialogVisible">
                                    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
                                        <el-form :inline="true" :model="profilters">
                                            <el-form-item>
                                                <el-input v-model="profilters.search_key" @keyup.native.enter="searchDevceinfo" placeholder="例如:设备编号,卡编号,卡号"></el-input>
                                            </el-form-item>
                                            <el-form-item>
                                                <el-button type="primary" @click="searchDevceinfo" icon="search">查询</el-button>
                                            </el-form-item>
                                        </el-form>
                                    </el-col>
                                    <el-table :data="deviceData" max-height="300" v-loading="listLoading" @row-dblclick="replaceDeviceClickHandle">
                                        <el-table-column align="center" prop="PRODSPEC" label="设备种类"></el-table-column>
                                        <el-table-column align="center" prop="PACKSELFID" label="自编号"></el-table-column>
                                        <el-table-column align="center" prop="E_PRODMODEL" label="设备类型"></el-table-column>
                                        <el-table-column align="center" prop="E_PRODUNUM" label="设备ID"></el-table-column>
                                        <el-table-column align="center" prop="E_STATUS" label="设备状态" :formatter="statusFormat"></el-table-column>
                                        <el-table-column align="center" prop="C_PRODMODEL" label="卡类型"></el-table-column>
                                        <el-table-column align="center" prop="C_PRODUNUM" label="SIM卡号"></el-table-column>
                                        <el-table-column align="center" prop="E_INSURANCEFLAG" label="保险设备">
                                            <template scope="props">
                                                {{ props.row.E_INSURANCEFLAG == "Y"?"是":"否" }}
                                            </template>
                                        </el-table-column>
                                        <el-table-column align="center" prop="E_NORMALFLAG" label="常规设备">
                                            <template scope="props">
                                                {{ props.row.E_NORMALFLAG == "Y"?"是":"否" }}
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                    <!--工具条-->
                                    <el-col :span="24" class="toolbar">
                                        <el-pagination @size-change="dhandleSizeChange" background @current-change="dhandleCurrentChange" :page-sizes="[15, 50,80,99]" :page-size="dpageSize" layout="total, sizes, prev, pager, next" :total="dtotal" style="float:right;margin-top:10px;">
                                        </el-pagination>
                                    </el-col>
                                </el-dialog>
                            </section>
                        </section>
                    </div>
                </el-card>
            </el-tab-pane>
        </el-tabs>
    </section>
</template>

<script src="./index.js">

</script>

<style scoped>
    @import '../../../assets/styl/customerDeclaration.styl';
</style>