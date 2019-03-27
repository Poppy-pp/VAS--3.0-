<template>
    <el-form :model="form" ref="form" :rules="rules">
        <el-collapse class="bdcoll rpShowimgDialog" ref="rpShowimgDialog" v-model="activeNames">
            <el-collapse-item class="lefw10 wzpdt10" name="1" title="退回原因" v-if="form.returnremark">
                <span style="color: red">
                    {{form.returnremark}}
                </span>
            </el-collapse-item>
            <el-collapse-item class="lefw10 wzpdt10" name="2">
                <div slot="title">
                    请选择安装产品 <span class="prompt-text" v-if="!corpid">(选择报单公司后才能选择安装产品哦)</span>
                </div>
                <div style="max-height: 600px; overflow: auto">
                    <product-list @select="selectProduct" :list="productList" :selectedId="basePackageid"></product-list>
                </div>
            </el-collapse-item>
            <el-collapse-item title="车主车辆信息" class="lefw10 wzpdt10" name="3">
                <div slot="title">
                    车主车辆信息
                    <span class="prompt-text">(为了便于保险出单，选择含盗抢险产品请填写详细信息)</span>
                    <el-tooltip class="item" effect="dark" content="" placement="bottom-end">
                        <div slot="content">说明：含盗抢险服务的产品需补充填<br>写：发动机号、车辆购置价、赔偿限<br>额、万网盗抢险服务费和初登日期，<br>才能顺利保险出单</div>
                        <i class="el-icon-question"></i>
                    </el-tooltip>
                </div>
                <div class="alert-warning" v-if="oldVehicleFlag">提示：系统已存在该车辆，若需变更车主车辆信息，请选择变更。 变更车主车辆信息
                    <el-checkbox v-model="isView"></el-checkbox>
                </div>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="车架号" prop="busiVehicleinfo.vin">
                            <el-input v-model="form.busiVehicleinfo.vin" placeholder="请输入车架号" @blur="getVehicleInfo(form.busiVehicleinfo.vin)"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="车主姓名" prop="busiVehicleinfo.ownername">
                            <el-input type="text" placeholder="请输入车主姓名" v-model="form.busiVehicleinfo.ownername"
                                      :disabled="oldVehicleFlag && isView"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="车主电话" prop="busiVehicleinfo.mobile">
                            <el-input type="text" placeholder="请输入车主电话" v-model="form.busiVehicleinfo.mobile" :disabled="oldVehicleFlag && isView"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="车主证件号码" v-if="form.hastheftinsurance" prop="busiVehicleinfo.idcard" :key="1">
                            <el-input type="text" placeholder="请输入车主证件号码" v-model="form.busiVehicleinfo.idcard" :disabled="oldVehicleFlag && isView"></el-input>
                        </el-form-item>
                        <el-form-item label="车主证件号码" v-else :key="2">
                            <el-input type="text" placeholder="请输入车主证件号码" v-model="form.busiVehicleinfo.idcard" :disabled="oldVehicleFlag && isView"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="厂牌型号" prop="busiVehicleinfo.model">
                            <el-autocomplete class="inline-input searchInput" popper-class="my-autocomplete" v-model="form.busiVehicleinfo.model"
                                             :fetch-suggestions="handleItemChange" custom-item="my-item-zh-model" placeholder="请选择车型信息"
                                             @select="handleSelectColor" :disabled="oldVehicleFlag && isView"></el-autocomplete>
                            <!--<el-input type="text" placeholder="请输入厂牌型号" v-model="form.busiVehicleinfo.model"></el-input>-->
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="车辆购置价" prop="busiVehicleinfo.price">
                            <el-input type="text" placeholder="请输入车辆购置价" :disabled="oldVehicleFlag && isView" v-model="form.busiVehicleinfo.price"
                                      @change="checkNum(form.busiVehicleinfo.price, form.busiVehicleinfo, 'price')">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="车辆分类" prop="busiVehicleinfo.vehiclecategory">
                            <el-select v-model="form.busiVehicleinfo.vehiclecategory" placeholder="请选择车辆分类" :disabled="oldVehicleFlag && isView">
                                <el-option v-for="(item, key) in vehiclecategoryList" :key="key" :value="item.value" :label="item.label"></el-option>
                            </el-select>
                            <!--<el-input type="text" placeholder="请输入车辆分类" v-model="form.busiVehicleinfo.vehiclecategory"></el-input>-->
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="车辆类型" prop="busiVehicleinfo.vehicletype">
                            <el-select v-model="form.busiVehicleinfo.vehicletypename" :disabled="oldVehicleFlag && isView" @focus="vehChange" filterable
                                       placeholder="请选择车类型" clearable value-key="id" @change="changeVehicletype">
                                <el-option v-for="item in vehlist" :key="item.id" :label="item.typedesc" :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="发动机号" v-if="form.hastheftinsurance" :key="1" prop="busiVehicleinfo.enginenum">
                            <el-input type="text" placeholder="请输入发动机号" :disabled="oldVehicleFlag && isView"
                                      v-model="form.busiVehicleinfo.enginenum"></el-input>
                        </el-form-item>
                        <el-form-item label="发动机号" v-else :key="2">
                            <el-input type="text" placeholder="请输入发动机号" :disabled="oldVehicleFlag && isView"
                                      v-model="form.busiVehicleinfo.enginenum"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="车牌号" prop="busiVehicleinfo.licenseplatenum">
                            <el-input type="text" placeholder="请输入车牌号" :disabled="oldVehicleFlag && isView"
                                      v-model="form.busiVehicleinfo.licenseplatenum"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="车辆颜色" prop="busiVehicleinfo.color">
                            <br>
                            <div style="display: flex">
                                <el-autocomplete class="inline-input searchInput" v-model="form.busiVehicleinfo.colorname"
                                                 :fetch-suggestions="handleColorChange" custom-item="my-item-zh-model" placeholder="请选择车辆颜色"
                                                 :disabled="oldVehicleFlag && isView"
                                                 @select="changeCarColor">
                                    <template slot-scope="{ item }">
                                        <div>
                                            <div :style="{height:'20px',width:'20px',backgroundColor:item.color_rgb,float:'left',margin:'8px 5px 0 0'}"></div>
                                            {{ item.value }}
                                        </div>
                                    </template>
                                </el-autocomplete>
                                <el-color-picker v-model="form.busiVehicleinfo.color" :disabled="oldVehicleFlag && isView"></el-color-picker>
                            </div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="能源类型" prop="busiVehicleinfo.vehiclepower">
                            <el-select v-model="form.busiVehicleinfo.vehiclepower" filterable :disabled="oldVehicleFlag && isView"
                                       placeholder="请选择能源类型" clearable>
                                <el-option v-for="(item, key) in vehiclepowerList" :key="key" :value="item.value" :label="item.label"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" v-if="form.hastheftinsurance">
                        <el-form-item label="第一受益人" prop="busiVehicleinfo.beneficiary">
                            <el-autocomplete v-model="form.busiVehicleinfo.beneficiary" class="inline-input width" :fetch-suggestions="getCorpList"
                                             placeholder="请选择第一受益人" value-key="corpname"></el-autocomplete>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" v-if="form.hastheftinsurance">
                        <el-form-item label="初登日期" prop="busiVehicleinfo.firstregisterdate">
                            <el-date-picker type="date" placeholder="选择初登日期" v-model="form.busiVehicleinfo.firstregisterdate"
                                            value-format="yyyy-MM-dd"
                                            style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" v-if="form.hastheftinsurance">
                        <el-form-item label="赔偿限额" prop="busiVehicleinfo.indemnitylimit">
                            <el-input type="text" placeholder="请输入赔偿限额" v-model="form.busiVehicleinfo.indemnitylimit"
                                      @change="checkNum(form.busiVehicleinfo.indemnitylimit, form.busiVehicleinfo, 'indemnitylimit')">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" v-if="form.hastheftinsurance">
                        <el-form-item label="万网盗抢险服务费" prop="busiVehicleinfo.priceInsucorp">
                            <el-input type="text" placeholder="万网盗抢险服务费" v-model="form.busiVehicleinfo.priceInsucorp"
                                      @change="checkNum(form.busiVehicleinfo.priceInsucorp, form.busiVehicleinfo, 'priceInsucorp')">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="16">
                        <el-form-item label="联系地址" prop="busiVehicleinfo.addresshome">
                            <el-input placeholder="请输入联系地址" v-model="form.busiVehicleinfo.addresshome"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20" v-if="form.hastheftinsurance">
                    <el-col :span="24">
                        <el-form label-position="top">
                            <el-form-item label="保险出单所需图片上传">
                                <el-col class="photosh sgphtosh" v-for="item in form.busiPictures" v-if="item.pictype === 'INSU'">
                                    <el-card :body-style="{ padding: '0px !important' }" class="devptosty">
                                        <el-upload name="file" class="avatar-uploader" action="/admin/atta/upload/picture"
                                                   :show-file-list="false"
                                                   :headers="{Authorization: 'Bearer '+ token}"
                                                   :accept="accept" :before-upload="util.beforeAvatarUpload" :on-success="uploadSuccess">
                                            <img v-if="item.piclink"
                                                 :src="$store.state.IMG_URL+item.piclink" class="avatar">
                                            <i v-else class="el-icon-plus avatar-uploader-icon" @click="clickUpload(item)"></i>
                                        </el-upload>
                                        <div class="btsty">
                                            <span class="fl">{{item.picdesc}}</span>
                                            <div class="bottom clearfix text_al fr" v-if="item.piclink">
                                                <i title="删除照片" class="iconfont icon-p-delet operate operate-p-delet"
                                                   @click="removePic(item)"></i>
                                            </div>
                                        </div>
                                    </el-card>
                                </el-col>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
            </el-collapse-item>
            <install-info :form="form" :baseGroupList="baseGroupList"></install-info>
            <el-row :gutter="20" style="height: 100px;">
                <el-button type="primary" style="float: right; margin: 10px;" @click="submit" v-if="!$route.query.isEdit">
                    <span v-if="flow === '2'">转派订单</span>
                    <span v-else>提交派单</span>
                </el-button>
                <el-button type="primary" style="float: right; margin: 10px;" v-else @click="save">
                    保存
                </el-button>
            </el-row>
        </el-collapse>
    </el-form>
</template>

<script src="./index.js">

</script>

<style scoped>

    .install-list {
        margin: 30px 0 0 20px;
        list-style-type: square;
    }

    .alert-warning {
        color: #4d8fff;
    }

</style>