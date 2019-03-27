import Vue from 'vue';
import util from 'utils/tools';
import { getVehicleSearchInfoList, searchCorpNameList, getModelListInfo1, getModelListInfo, getorderSupperDevice, cldeviceIsOnstate, getInstallPositionCode, addorderSupper, getPlatList, editorderSupperDevice, getCorpNameList, getCarPicLocation } from './service';
//自定义搜索组件模板样式
Vue.component('my-item-zh-model', {
    functional: true,
    render(h, ctx) {
        var item = ctx.props.item;
        return h('li', ctx.data, [
            h('div', {
                attrs: {
                    class: 'model'
                }
            }, [item.value]),
            h('span', {
                attrs: {
                    class: 'vin'
                }
            }, ["车品牌:", item.brand]),
            h('span', {
                attrs: {
                    class: 'vin'
                }
            }, ["车系:", item.serious]),
        ]);
    },
    props: {
        item: {
            type: Object,
            required: true
        }
    }
});


export default {
    props: ['windowOutHeight'],
    name: "index",
    data() {
        //验证车架号(只能输入数字和字母)
        var checkVin = (rule, value, callback) => {
            var reg = /^[a-zA-Z0-9]{6}$/g,
                reg1 = /^[a-zA-Z0-9]{8}$/g,
                reg2 = /^[a-zA-Z0-9]{17}$/g,
                flag = reg.test(value),
                flag1 = reg1.test(value),
                flag2 = reg2.test(value);
            if($.trim(value) == '') {
                callback();
                return;
            }
            if(!flag && !flag1 && !flag2) {
                return callback(new Error('车架号必须为6,8,17位的数字和字母组成'));
            } else {
                callback();
            }
        };
        //验证车牌号
        var checkVehicleNumber = (rule, value, callback) => {
            if ($.trim(value).length == 8){//新能源汽车
                // var reg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF])|([DF][A-HJ-NP-Z0-9][0-9]{4}))$/;
                var reg = /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{6}$/;
            }else{//普通汽车
                var reg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
            }

            var flag = reg.test(value);
            if($.trim(value) == '') {
                callback();
                return;
            }
            if(!flag) {
                return callback(new Error('车牌号格式不规范'));
            } else {
                callback();
            }
        };
        //验证车价(只能输入数字)
        var checkPrice = (rule, value, callback) => {
            var reg = /^\+?[1-9][0-9]*$/,
                flag = reg.test(value);
            if($.trim(value) == '') {
                callback();
                return;
            }
            if(!flag) {
                return callback(new Error('车价必须为整数'));
            } else {
                callback();
            }
        };
        //验证车主手机电话(只能输入11位数字，以1开头)
        var checkMobile = (rule, value, callback) => {
            var reg = /^[0-9]*$/g,
                flag = reg.test(value);
            if(!flag) {
                return callback(new Error('只能输入数字'));
            } else {
                callback();
            }
        };
        //验证车主身份整号(只能输入11位数字，以1开头)
        var checkIdcard = (rule, value, callback) => {
            var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/g,
                flag = reg.test(value);
            if($.trim(value) == '') {
                callback();
                return;
            }
            if(!flag) {
                return callback(new Error('身份证格式不合法'));
            } else {
                callback();
            }
        };
        //验证中文名字(只能输入中文不能大于四个子)
        var checkName = (rule, value, callback) => {
            var reg = /^[a-zA-Z\u4e00-\u9fa5]+$/g,
                flag = reg.test(value);
            if($.trim(value) == '') {
                callback();
                return;
            }
            if(!flag) {
                return callback(new Error('只能输入中文或英文'));
            } else {
                callback();
            }
        };
        return {
            util: util,
            deviceDialogVisible: false,
            platLoading: false,
            realTimeRefreshLoading: false,
            isEditProFlag: false,
            codeloading: false,
            accept: '.jpg,.png',
            salerData: [],
            deviceCurData: [],
            radio: '1',
            ruleForm: { //启动报单提交表单信息
                model: '',
                color: '',
                vin: '',
                corpid: '',
                corpname: '',
                name: '',
                mobile: '',
                installapplydate:'',
                idcard: '',
                price: '',
                receivingbankid: '',
                receivingbankname: '',
                pictures: [{
                    picdesc: "车架号",
                    piclink: ""
                },
                    {
                        picdesc: "车牌号",
                        piclink: ""
                    },
                    {
                        picdesc: "铭牌号",
                        piclink: ""
                    },
                    {
                        picdesc: "其它部分照片",
                        piclink: ""
                    }
                ],
                hasPlat: '1',
                platip: '',
                platnameId: '',
                licenseplatenum: '',
                installDetails: [],
                platid: '',
                remark: ''
            },
            //是否过了审核阶段的单子
            isNew: false,
            editId: '',
            dcurrentPage: 1,
            dpageSize: 10,
            dtotal: 0,
            isVinFlag: false,
            uplodVueComponent: '',
            InstallPositionArray: [],
            rules: { //启动报单表单验证信息
                name: [{
                    validator: checkName,
                    trigger: 'blur'
                }],
                vin: [{
                    required: true,
                    message: "请输入车架号",
                    trigger: 'blur'
                },
                    {
                        validator: checkVin,
                        trigger: 'blur'
                    }
                ],
                licenseplatenum: [{
                    validator: checkVehicleNumber,
                    trigger: 'blur'
                }],
                model: [{
                    message: "请选择车辆型号",
                    trigger: 'change'
                }],
                price: [{
                    validator: checkPrice,
                    trigger: 'blur'
                }],
                mobile: [{
                    validator: checkMobile,
                    trigger: 'blur'
                }],
                idcard: [{
                    validator: checkIdcard,
                    trigger: 'blur'
                }],
                platid: [{
                    required: true,
                    message: "请选择接入平台",
                    trigger: 'blur'
                }],
                installapplydate: [{
                    required: true,
                    message: "请选择安装日期",
                    trigger: 'blur'
                }],
            },
            activeNames: ['2', '3', '4', '5'],
            activeName: ['1'],
            addLoading: false,
            receLoading: false,
            isEditPro: false,
            carModelList: [],
            modelListData: [],
            modelLoading: false,
            carColor: [],
            deviceData: [],
            tempvin: '',
            carPicLoading: false,
            carPicList: [], //车辆照片位置
            carCurIndex: 0,
            curIndex: 0,
            tempModel: '',
            visible: false,
            props: {
                value: 'value',
                label: 'label',
                children: 'children'
            },
            installUserId: '',
            profilters: {
                search_key: ''
            },
            platlist: [],
            listLoading: false,
            citem: '',
            cindex: '',
            copName: [],
            copLoading: false,
            tabPosition: 'left',
            active: '1'
        };
    },
    methods: {
        //地址类型显示转换
        statusFormat(row, col) {
            let str = '';
            if(row.E_STATUS == 'INSTO'){
                str = '在库';
            }
            if(row.E_STATUS == 'ONWAY'){
                str = '在途';
            }
            if(row.E_STATUS == 'INSTALL'){
                str = '已安装';
            }
            if(row.E_STATUS == 'LOST'){
                str = '报失';
            }
            if(row.E_STATUS == 'REPAIR'){
                str = '维修';
            }
            if(row.E_STATUS == 'DAMAGE'){
                str = '报废';
            }
            return str;
        },
        //设备删除
        delDevice(item, index) {
            this.deviceCurData.splice(index, 1);
            this.ruleForm.installDetails.splice(index, 1);
        },
        //操作公司下拉查询
        changeCop(r) {
            if(!r || this.copName.length > 0) return;
            this.copLoading = true;
            let para = {
                showCount: 1000
            }
            getCorpNameList(para).then((res) => {
                this.copName = res.data.data.records;
                this.copLoading = false;
            });
        },
        //替换设备 并 删除之前的设备
        replaceDeviceClickHandle(row, event, column) {
            this.deviceCurData.splice(this.cindex, 1, row);
            this.ruleForm.installDetails.splice(this.cindex, 1, {
                installpositioncode: null,
                packid: row.ID,
                E_PRODMODEL: row.E_PRODMODEL,
                E_PRODUNUM: row.E_PRODUNUM,
                pictures: [{
                    picdesc: "设备走线照片",
                    piclink: ""
                },
                    {
                        picdesc: "设备照片",
                        piclink: ""
                    },
                    {
                        picdesc: "设备号照片",
                        piclink: ""
                    },
                    {
                        picdesc: "其它部分照片",
                        piclink: ""
                    }
                ],
                onlinestatus: 0,
                remark: null
            });
            this.deviceDialogVisible = false;
        },
        //替换设备窗口打开
        replaceDevice(item, index) {
            this.cindex = index;
            this.deviceDialogVisible = true;
            this.searchDevceinfo();
        },
        /*平台——下拉*/
        platChange(r) {
            if(r == 1) {
                this.platLoading = true;
                getPlatList().then((res) => {
                    this.platLoading = false;
                    if(res.data.result.code == 0) {
                        this.platlist = res.data.data.records;
                        // this.ruleForm.platid = this.platlist[0].ID;
                        // this.ruleForm.platip = this.platlist[0].platip;
                    }
                });
            } else {
                if(!r || this.platlist.length > 0) return;
                this.platLoading = true;
                getPlatList().then((res) => {
                    this.platLoading = false;
                    if(res.data.result.code == 0) {
                        this.platlist = res.data.data.records;
                    }
                });
            }
        },
        //新增—— 平台名称选中时自动获取平台ip
        getIpAdd() {
            for(var i = 0, len = this.platlist.length; i < len; i++) {
                if(this.platlist[i].ID == this.ruleForm.platid) {
                    this.ruleForm.platip = this.platlist[i].platip;
                }
            }
        },
        //切换当前页
        dhandleCurrentChange(val) {
            this.dcurrentPage = val;
            this.searchDevceinfo();
        },
        //切换每页显示数量
        dhandleSizeChange(val) {
            this.dpageSize = val;
            this.searchDevceinfo();
        },
        //点击设备添加设备编辑
        deviceClickHandle(row, event, column) {
            this.deviceCurData.push(row);
            //添加设备信息
            this.ruleForm.installDetails.push({
                installpositioncode: null,
                packid: row.ID,
                E_PRODMODEL: row.E_PRODMODEL,
                E_PRODUNUM: row.E_PRODUNUM,
                pictures: [{
                    picdesc: "设备走线照片",
                    piclink: ""
                },
                    {
                        picdesc: "设备照片",
                        piclink: ""
                    },
                    {
                        picdesc: "设备号照片",
                        piclink: ""
                    },
                    {
                        picdesc: "其它部分照片",
                        piclink: ""
                    }
                ],
                onlinestatus: 0,
                installremark: null
            });
            this.visible = false;
            this.cldeviceIsOnstate(row.E_PRODUNUM, this.deviceCurData.length - 1);
        },
        cldeviceIsOnstate(cnum, index) {
            let para = {
                id: cnum
            };
            this.realTimeRefreshLoading = true;
            //添加设备自动识别是否在线
            cldeviceIsOnstate(para).then((res) => {
                this.realTimeRefreshLoading = false;
                if(res.data.result.code == 0){
                    if(res.data.data)
                        this.ruleForm.installDetails[index].onlinestatus = res.data.data.realdata.istate != 1 ? 1 : 0;
                }

            });
        },
        //判断当前数组中是否存在某个属性
        findElem(arrayToSearch, attr, val) {
            for(var i = 0; i < arrayToSearch.length; i++) {
                if(arrayToSearch[i][attr] == val) {
                    return false;
                }
            }
            return true;
        },
        // 是否已经选择该设备
        tableRowClassName(row, index) {
            let vflag = this.findElem(this.deviceCurData, "ID", row.row.ID);
            if(!vflag) {
                return 'warning-row';
            }
            return '';
        },
        //查询设备信息
        searchDevceinfo() {
            let para = {
                currentPage: this.dcurrentPage,
                showCount:this.dpageSize,
                search_key: this.profilters.search_key
            };
            this.listLoading = true;
            getorderSupperDevice(para).then((res) => {
                this.listLoading = false;
                if(res.data.result.code == 0) {
                    this.deviceData = res.data.data.records;
                    this.dtotal = res.data.data.totalResult;
                } else {
                    this.deviceData = [];
                    this.dtotal = 0;
                }
            }).catch((error) => {
                this.listLoading = false;
            });
        },
        //记录上传控件
        deviceHandleMouseover(index, uploadname) {
            this.curIndex = index;
            this.uplodVueComponent = this.$refs[uploadname][0];
        },
        showDeviceXz() {
            this.searchDevceinfo();
        },
        //车架号
        vinHandleAvatarSuccess(response, file, fileList) {
            this.installPic(response, file, fileList, 4);
        },
        //车牌号
        carNumHandleAvatarSuccess(response, file, fileList) {
            this.installPic(response, file, fileList, 5);
        },
        //铭牌
        carMpHandleAvatarSuccess(response, file, fileList) {
            this.installPic(response, file, fileList, 6);
        },
        //车上传照片成功
        carHandleSuccess(response, file, fileList) {
            this.installPic(response, file, fileList, 1);
        },
        deviveZxHandleAvatarSuccess(response, file, fileList) {
            this.installPic(response, file, fileList, 7);
        },
        deviveSbhHandleAvatarSuccess(response, file, fileList) {
            this.installPic(response, file, fileList, 8);
        },
        deviveSbHandleAvatarSuccess(response, file, fileList) {
            this.installPic(response, file, fileList, 9);
        },
        //记录车上传控件
        carHandleMouseover(index) {
            this.carCurIndex = index;
        },
        //上传成功后的设备照片
        deviceHandleSuccess(response, file, fileList) {
            this.installPic(response, file, fileList, 2);
        },
        //删除订单图片
        removeBusiPicture(index) {
            this.$confirm('确认删除当前车辆照片吗?', '提示', {
                type: 'error'
            }).then(() => {
                this.ruleForm.pictures.splice(index, 1);
            });
        },
        //安装位置初始化
        changeInstallDecode(r) {
            if(!r || this.InstallPositionArray.length > 0) return;
            this.codeloading = true;
            getInstallPositionCode().then((res) => {
                this.InstallPositionArray = res.data.data.records;
                this.codeloading = false;
            });
        },
        //复制当前添加的 1车子 2设备照片 3删除对应设备照片 4车架号照片 5车牌号照片 6铭牌照片 7设备走线照片 8设备号 9设备照片
        installPic(response, file, fileList, type) {
            //安装车照片
            if(type == 1 && file.status == "success") {
                let carPictures = this.ruleForm.pictures;
                if(carPictures[this.carCurIndex].piclink == '') {
                    carPictures.push({
                        picdesc: "其它部分照片",
                        piclink: ""
                    });
                }
                carPictures.splice(this.carCurIndex, 1, {
                    picdesc: carPictures[this.carCurIndex].picdesc,
                    piclink: response
                });
            }
            if(type == 4 && file.status == "success") {
                this.ruleForm.pictures.splice(0, 1, {
                    picdesc: "车架号",
                    piclink: response
                });
            }
            if(type == 5 && file.status == "success") {
                this.ruleForm.pictures.splice(1, 1, {
                    picdesc: "车牌号",
                    piclink: response
                });
            }
            if(type == 6 && file.status == "success") {
                this.ruleForm.pictures.splice(2, 1, {
                    picdesc: "铭牌号",
                    piclink: response
                });
            }

            //设备前三张
            if(type == 7 && file.status == "success") {
                var index = this.uplodVueComponent.data.ind,
                    pic;
                pic = {
                    picdesc: "设备走线照片",
                    piclink: response
                }
                this.ruleForm.installDetails[index].pictures.splice(this.curIndex, 1, pic);
            }
            if(type == 8 && file.status == "success") {
                var index = this.uplodVueComponent.data.ind,
                    pic;
                pic = {
                    picdesc: "设备号照片",
                    piclink: response
                }
                this.ruleForm.installDetails[index].pictures.splice(this.curIndex, 1, pic);
            }
            if(type == 9 && file.status == "success") {
                var index = this.uplodVueComponent.data.ind,
                    pic;
                pic = {
                    picdesc: "设备照片",
                    piclink: response
                }
                this.ruleForm.installDetails[index].pictures.splice(this.curIndex, 1, pic);
            }
            //新增设备照片
            if(type == 2) {
                var index = this.uplodVueComponent.data.ind,
                    pic;
                pic = {
                    picdesc: this.ruleForm.installDetails[index].pictures[this.curIndex].picdesc,
                    piclink: response
                }
                if(this.ruleForm.installDetails[index].pictures[this.curIndex].piclink == '') {
                    this.ruleForm.installDetails[index].pictures.push({
                        picdesc: "其它部分照片",
                        piclink: ""
                    });
                }
                this.ruleForm.installDetails[index].pictures.splice(this.curIndex, 1, pic);
            }
        },
        //设备删除设备照片
        deviceRemoveBusiPicture(pind, cind, piclink) {
            this.$confirm('确认删除当前设备照片吗?', '提示', {
                type: 'error'
            }).then(() => {
                this.ruleForm.installDetails[pind].pictures.splice(cind, 1);
            });
        },
        //获取车辆上传照片位置
        changeCarPicLac(r) {
            if(!r || this.carPicList.length > 0) return;
            this.carPicLoading = true;
            let para = {
                showCount: 1000
            }
            getCarPicLocation(para).then((res) => {
                this.carPicLoading = false;
                if(res.data.result.code == 0) {
                    this.carPicList = res.data.data.records;
                }
            });
        },
        //判断车架号是否已经输入17位 如果大于17位就默认不能输入了
        vinCheckJ() {
            if(this.ruleForm.vin.length > 17) {
                this.ruleForm.vin = this.tempvin;
                return;
            }
            this.tempvin = this.ruleForm.vin
        },
        //选择车型查询颜色
        handleSelectModel(v) {
            this.tempModel = v.value;
            this.ruleForm.model = v.value;
            this.ruleForm.color = '';
            let para = {
                _viewName: "VW_VAS_WEB_VAS_VEHICLE_COLOR",
                showCount: 100,
                brand: v.brand,
                serious: v.serious,
                model: v.value
            };
            getModelListInfo(para).then((res) => {
                let carModelList = [];
                res.data.data.records.forEach((res, index) => {
                    if(res.color) {
                        res.color.split(";").forEach((color, index) => {
                            carModelList.push({
                                color: color,
                                color_rgb: res.color_rgb.split(";")[index]
                            });
                        });
                    }
                });
                this.carColor = carModelList;
            });
        },
        //初始化车品牌
        initModelBrand() {
            let para = {
                _viewName: "VW_VAS_WEB_VAS_VEHICLE_BRAND",
                showCount: 1000
            };
            getModelListInfo(para).then((res) => {
                res.data.data.records.forEach((res, index) => {
                    this.carModelList.push({
                        label: res.brand,
                        value: {
                            type: 'brand',
                            value: res.brand,
                            paraentIndex: 0,
                            index: index
                        },
                        children: []
                    });
                });
            });
        },
        //车型选择
        handleItemChange(queryString, cb) {
            let para = {
                    _viewName: "VW_VAS_WEB_VAS_VEHICLE_MODEL",
                    showCount: 30,
                    model: queryString
                },
                ownerArray = [];
            getModelListInfo1(para).then((res) => {
                res.data.data.records.forEach(function(item, index) {
                    ownerArray.push({
                        value: item.model,
                        brand: item.brand,
                        serious: item.serious
                    });
                });
                cb(ownerArray);
            });
        },
        //拖拽地图小点返回的地址
        draggerMapMarker(address, lnglatXY, type) {
            if(!this.$store.state.formObj) this.ruleForm.installaddress = address;
        },
        //地址改变刷新地图坐标
        refmap() {
            this.$refs.vueAmap.geocoder(this.ruleForm.installaddress, (res) => {
                this.ruleForm.lng = res.location.lng;
                this.ruleForm.lat = res.location.lat;
            });
        },
        //地址选择刷新地图坐标
        addressChanges(resw) {
            this.$refs.vueAmap.geocoder(resw.join(""), (res) => {
                this.ruleForm.lng = res.location.lng;
                this.ruleForm.lat = res.location.lat;
                this.ruleForm.installaddress = resw.join("");
            });
        },
        radioChange(res) {
            this.ruleForm.installapplyinsu = res;
        },
        //查询车架号 是否存在
        querySearchVin() {
            let para = {
                vin: $.trim(this.ruleForm.vin.toUpperCase())
            };
            if($.trim(this.ruleForm.vin) == '') return;
            getVehicleSearchInfoList(para).then((res) => {
                let car = res.data.data.records;
                if(car.length > 0) {
                    this.$confirm('此车架号已存在, 是否为该车添加新设备?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        closeOnClickModal: false,
                        type: 'warning'
                    }).then(() => {
                        this.ruleForm.vin = car[0].vin;
                        this.ruleForm.model = car[0].model;
                        this.ruleForm.price = car[0].price + '';
                        this.ruleForm.color = car[0].color;
                        this.ruleForm.name = car[0].ownerInfo.name;
                        this.ruleForm.mobile = car[0].ownerInfo.mobile;
                        this.ruleForm.idcard = car[0].ownerInfo.idcard;
                        this.ruleForm.licenseplatenum = car[0].licenseplatenum;
                        this.isVinFlag = true;
                    }).catch(() => {
                        this.ruleForm.vin = '';
                        this.ruleForm.model = '';
                        this.ruleForm.price = '';
                        this.ruleForm.color = '';
                        this.ruleForm.name = '';
                        this.ruleForm.mobile = '';
                        this.ruleForm.idcard = '';
                        this.ruleForm.licenseplatenum = '';
                        this.isVinFlag = false;
                    });
                } else {
                    this.isVinFlag = false;
                }
            });
        },
        //受理银行列表
        receivinList(r) {
            if(!r || this.salerData.length > 0) return;
            let para = {
                corptype: 'BANK',
                showCount: 1000
            };
            this.receLoading = true;
            searchCorpNameList(para).then((res) => {
                this.receLoading = false;
                if(res.data.result.code == 0) {
                    this.salerData = res.data.data.records;
                }
            });
        },
        //如果照片上传link为空阻止上传
        picturesBuff(list) {
            let temp = [];
            for(var i = 0, len = list.length; i < len; i++) {
                if(list[i].piclink != '') {
                    temp.push(list[i]);
                }
            }
            return temp;
        },
        /* 提交表单数据 */
        submitForm(formName) {
            if(this.tempModel != this.ruleForm.model) {
                this.$message({
                    message: '车型名称必须选择',
                    type: 'error'
                });
                return;
            }
            this.$refs[formName].validate((valid) => {
                if(valid) {
                    let _this = this,flag = true,
                        para;
                    if(this.isEditPro) {//编辑——替换设备
                        if(this.isNew) {//过了审核阶段的单子
                            para = { //拼接启动流程所需数据
                                id: this.editId,
                                vehicleInfo: {
                                    ownerInfo: {
                                        idcard: _this.ruleForm.idcard,
                                        name: _this.ruleForm.name,
                                        mobile: _this.ruleForm.mobile,
                                    },
                                    model: _this.ruleForm.model,
                                    licenseplatenum: _this.ruleForm.licenseplatenum,
                                    color: _this.ruleForm.color,
                                    vin: _this.ruleForm.vin ? _this.ruleForm.vin.toUpperCase() : _this.ruleForm.vin,
                                    price: _this.ruleForm.price
                                },
                                installapplydate: util.formatDate.format(new Date(_this.ruleForm.installapplydate), 'yyyy-MM-dd hh:mm:ss'),
                                clerkremarks: _this.ruleForm.remark
                            };
                        } else {//未过审核阶段的单子
                            para = { //拼接启动流程所需数据
                                id: this.editId,
                                corpid: !isNaN(Number(_this.ruleForm.corpid)) ? _this.ruleForm.corpid : _this.ruleForm.corpname,
                                vehicleInfo: {
                                    ownerInfo: {
                                        idcard: _this.ruleForm.idcard,
                                        name: _this.ruleForm.name,
                                        mobile: _this.ruleForm.mobile,
                                    },
                                    model: _this.ruleForm.model,
                                    licenseplatenum: _this.ruleForm.licenseplatenum,
                                    color: _this.ruleForm.color,
                                    receivingbankid: !isNaN(Number(_this.ruleForm.receivingbankid)) ? _this.ruleForm.receivingbankid : null,
                                    vin: _this.ruleForm.vin ? _this.ruleForm.vin.toUpperCase() : _this.ruleForm.vin,
                                    price: _this.ruleForm.price
                                },
                                installDetails: [],
                                installapplydate: util.formatDate.format(new Date(_this.ruleForm.installapplydate), 'yyyy-MM-dd hh:mm:ss'),
                                pictures: this.picturesBuff(_this.ruleForm.pictures),
                                platid: _this.ruleForm.platid ? _this.ruleForm.platid : null,
                                clerkremarks: _this.ruleForm.remark
                            };
                            // 是否选择平台
                            if (this.ruleForm.hasPlat == 1) {//接入平台时
                                if (para.platid == null ) {//未选择平台名称时
                                    this.$message({
                                        message: '请选择接入平台名称！',
                                        type: 'warning'
                                    });
                                    return;
                                }
                            }else if (this.ruleForm.hasPlat == 0) {//不接入平台时
                                para.platid = -1;
                            }
                            // 设备信息
                            if (_this.ruleForm.installDetails.length == 0) {//未上传设备信息时
                                this.$message({
                                    message: '请添加安装设备信息！',
                                    type: 'warning'
                                });
                                return;
                            }else{//已上传设备时
                                _this.ruleForm.installDetails.forEach((item, index) => {
                                    let pics = item.pictures,tmp = [];
                                    if(!item.installpositioncode) {
                                        this.$message({
                                            showClose: true,
                                            message: '设备(' + item.E_PRODMODEL + item.E_PRODUNUM + ')没有选择安装位置',
                                            type: 'warning'
                                        });
                                        flag = false;
                                        return false;
                                    }
                                    pics.forEach((pic, index) => {
                                        if(pic.piclink != '') {
                                            tmp.push({
                                                picdesc: pic.picdesc,
                                                piclink: pic.piclink
                                            });
                                        }
                                    });
                                    if(tmp.length < 3) {
                                        this.$message({
                                            showClose: true,
                                            message: '设备(' + item.E_PRODMODEL + item.E_PRODUNUM + ')的照片必须上传三张',
                                            duration: 5000,
                                            type: 'warning'
                                        });
                                        flag = false;
                                        return false;
                                    }
                                    para.installDetails.push({
                                        installpositioncode: !isNaN(Number(item.installpositioncode)) ? item.installpositioncode : null,
                                        packid: item.packid,
                                        E_PRODMODEL: item.E_PRODMODEL,
                                        E_PRODUNUM: item.E_PRODUNUM,
                                        pictures: this.picturesBuff(item.pictures),
                                        onlinestatus: item.onlinestatus ? 1 : 0,
                                        remark: item.remark
                                    });
                                });
                            }
                        }
                        if(!flag) return;
                        // return;
                        this.addLoading = true;
                        editorderSupperDevice(para).then((res) => {
                            this.addLoading = false;
                            if(res.data.result.code == 0) {
                                this.$message({
                                    message: "修改新装登记成功！",
                                    type: 'success'
                                });
                                this.resetForm();
                                this.$router.back(-1);
                            }
                        });
                    } else {//新建——添加设备
                        let _this = this,falg = true,
                            para = { //拼接启动流程所需数据
                                vehicleInfo: {
                                    ownerInfo: {
                                        idcard: _this.ruleForm.idcard,
                                        name: _this.ruleForm.name,
                                        mobile: _this.ruleForm.mobile,
                                    },
                                    model: _this.ruleForm.model,
                                    licenseplatenum: _this.ruleForm.licenseplatenum,
                                    color: _this.ruleForm.color,
                                    receivingbankid: _this.ruleForm.receivingbankid,
                                    vin: _this.ruleForm.vin ? _this.ruleForm.vin.toUpperCase() : _this.ruleForm.vin,
                                    price: _this.ruleForm.price
                                },
                                corpid: !isNaN(Number(_this.ruleForm.corpid)) ? _this.ruleForm.corpid : _this.ruleForm.corpname,
                                installDetails: _this.ruleForm.installDetails,
                                pictures: this.picturesBuff(_this.ruleForm.pictures),
                                platid: _this.ruleForm.platid ? _this.ruleForm.platid : null,
                                clerkremarks: _this.ruleForm.remark,
                                installapplydate: util.formatDate.format(new Date(_this.ruleForm.installapplydate), 'yyyy-MM-dd hh:mm:ss'),
                            };
                        console.log(para)
                        // 是否选择平台
                        if (this.ruleForm.hasPlat == 1) {//接入平台时
                            if (para.platid == null ) {//未选择平台名称时
                                this.$message({
                                    message: '请选择接入平台名称！',
                                    type: 'warning'
                                });
                                return;
                            }
                        }
                        //设备信息
                        if (_this.ruleForm.installDetails.length == 0) {//未上传设备信息时
                            this.$message({
                                message: '请添加安装设备信息！',
                                type: 'warning'
                            });
                            return;
                        }else{//已上传设备时
                            _this.ruleForm.installDetails.forEach((item, index) => {
                                let pics = item.pictures,tmp = [];
                                if(!item.installpositioncode) {
                                    this.$message({
                                        showClose: true,
                                        message: '设备(' + item.E_PRODMODEL + item.E_PRODUNUM + ')没有选择安装位置',
                                        type: 'warning'
                                    });
                                    flag = false;
                                    return false;
                                }
                                pics.forEach((pic, index) => {
                                    if(pic.piclink != '') {
                                        tmp.push({
                                            picdesc: pic.picdesc,
                                            piclink: pic.piclink
                                        });
                                    }
                                });
                                if(tmp.length < 3) {
                                    this.$message({
                                        showClose: true,
                                        message: '设备(' + item.E_PRODMODEL + item.E_PRODUNUM + ')的照片必须上传三张',
                                        duration: 5000,
                                        type: 'warning'
                                    });
                                    flag = false;
                                    return false;
                                }
                            });
                        }

                        if(!flag) return;
                        this.addLoading = true;
                        addorderSupper(para).then((res) => {
                            this.addLoading = false;
                            if(res.data.result.code == 0) {
                                this.$message({
                                    message: "新装登记提交成功！",
                                    type: 'success'
                                });
                                //初始化待办数量
                                this.$store.dispatch('initFormNum');
                                this.resetForm();
                            }
                        });
                    }
                } else {
                    this.activeNames = ['2', '3', '4', '5'];
                    return false;
                }
            });
        },
        /* 重置表单数据 */
        resetForm() {
            this.ruleForm = { //启动报单提交表单信息
                model: '',
                color: '',
                vin: '',
                licenseplatenum: '',
                name: '',
                mobile: '',
                corpid: '',
                idcard: '',
                price: '',
                receivingbankid: '',
                receivingbankname: '',
                pictures: [{
                    picdesc: "车架号",
                    piclink: ""
                },
                    {
                        picdesc: "车牌号",
                        piclink: ""
                    },
                    {
                        picdesc: "铭牌号",
                        piclink: ""
                    },
                    {
                        picdesc: "其它部分照片",
                        piclink: ""
                    }
                ],
                hasPlat: '1',
                platip: '',
                platnameId: '',
                installapplydate: '',
                installDetails: [],
                platid: '',
                remark: ''
            };
            this.deviceCurData = [];
            this.$store.state.orderSupplement = "";
            this.isEditPro = false;
            this.isNew = false;
        },
        //初始化编辑新装补登数据
        initEditInstalls() {

            let res = this.$store.state.orderSupplement,
                user = this.$store.getters.userInfo;
            if(res) {
                this.isEditPro = true;
                //如果isNew等于true就只能修改车主和车
                if(res.reviewby == res.empid) {
                    this.isNew = false;
                } else {
                    this.isNew = true;
                }
                if(res.pictures.length == 0) {
                    res.pictures = [{
                        picdesc: "车架号",
                        piclink: ""
                    },
                        {
                            picdesc: "车牌号",
                            piclink: ""
                        },
                        {
                            picdesc: "铭牌号",
                            piclink: ""
                        },
                        {
                            picdesc: "其它部分照片",
                            piclink: ""
                        }
                    ];
                } else {
                    res.pictures.push({
                        picdesc: "其它部分照片",
                        piclink: ""
                    });
                }
                this.editId = res.id;
                this.ruleForm.pictures = res.pictures;
                this.ruleForm.remark = res.clerkremarks;
                this.ruleForm.corpid = res.corpname;
                this.ruleForm.corpname = res.corpid;
                this.ruleForm.installapplydate = new Date(res.installapplydate);
                //平台信息
                if(res.plat) {
                    this.ruleForm.platid = res.plat.id;
                    this.ruleForm.platip = res.plat.platip;
                    this.platChange(1, res.plat);
                }else{
                    this.ruleForm.hasPlat = '0';
                }
                if(res.vehicleInfo) {
                    this.tempModel = res.vehicleInfo.model;
                    //车辆信息
                    this.ruleForm.model = res.vehicleInfo.model;
                    this.ruleForm.licenseplatenum = res.vehicleInfo.licenseplatenum;
                    this.ruleForm.color = res.vehicleInfo.color;
                    if(res.vehicleInfo.receivingbank)
                        this.ruleForm.receivingbankid = res.vehicleInfo.receivingbank.corpname;
                    this.ruleForm.vin = res.vehicleInfo.vin;
                    this.ruleForm.price = res.vehicleInfo.price + '';
                    //车主信息
                    if(res.vehicleInfo.ownerInfo) {
                        this.ruleForm.mobile = res.vehicleInfo.ownerInfo.mobile;
                        this.ruleForm.name = res.vehicleInfo.ownerInfo.name;
                        this.ruleForm.idcard = res.vehicleInfo.ownerInfo.idcard;
                    }
                    if(!this.isNew) {
                        if(res.vehicleInfo.prodInfos)
                        //设备信息
                            res.vehicleInfo.prodInfos.forEach((item, index) => {
                                let pictures = [];
                                if(res.installDetails.length > 0) {
                                    pictures = res.installDetails[index].pictures;
                                }
                                item.installid = item.id;
                                this.deviceCurData.push(item);
                                if(pictures.length == 0) {
                                    pictures = [{
                                        picdesc: "设备走线照片",
                                        piclink: ""
                                    },
                                        {
                                            picdesc: "设备照片",
                                            piclink: ""
                                        },
                                        {
                                            picdesc: "设备号照片",
                                            piclink: ""
                                        },
                                        {
                                            picdesc: "其它部分照片",
                                            piclink: ""
                                        }
                                    ];
                                } else {
                                    if(pictures.length == 1){
                                        pictures.push({
                                            picdesc: "设备照片",
                                            piclink: ""
                                        });
                                        pictures.push({
                                            picdesc: "设备号照片",
                                            piclink: ""
                                        });
                                    }
                                    if(pictures.length == 2){
                                        pictures.push({
                                            picdesc: "设备号照片",
                                            piclink: ""
                                        });
                                    }
                                    pictures.push({
                                        picdesc: "其它部分照片",
                                        piclink: ""
                                    });
                                }
                                //添加设备安装信息
                                this.ruleForm.installDetails.push({
                                    installpositioncode: res.installDetails[index].installpositioncode,
                                    packid: item.ID,
                                    E_PRODMODEL: item.E_PRODMODEL,
                                    E_PRODUNUM: item.E_PRODUNUM,
                                    pictures: pictures,
                                    onlinestatus: res.installDetails[index].onlinestatus ? 1 : 0,
                                    remark: res.installDetails[index].remark
                                });
                            });
                    }
                }
            } else {
                //新报补登 默认初始化平台
                this.platChange(1);
            }

        }
    },
    /*初始化页面数据*/
    created() {
        this.initEditInstalls();
    }
}