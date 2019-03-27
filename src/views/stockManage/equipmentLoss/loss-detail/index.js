import {
    getProductInfoList,
    addProductLoss,
    getChooseProduct,
    getLossBatchno,
    getChooseProductDetails,
    getChooseProductDetailsAdd,
    removeProductLoss,
    addPartsLoss,
    getPurchaseCascader,
    addLoss,
    setFacilityFormRules,
    getChooseAll
} from '../service'
import { getUserInfo } from '@/api/login'
import { getToken } from '@/utils/auth'
import { getEmployeeInfoList } from "@/views/basicManage/employeeManage/service";


export default {
    name: "allocation-detail",
    data () {
        return {
            Dayjs: dayjs,
            addLoading:false,
            filtersProd: {
                domSearch: [{
                    select: ['prodnum'],
                    content: ''
                }], //查询框
                storagename:'',
            },
            facilities: [],//手动添加设备——选择设备列表
            chooseFacilityVisible: false,
            dtotal: 0,
            dcurrentPage: 1,
            dpageSize: 1000000,
            selectFacilities: [],
            facilityLoading: false,
            detailsLoading: false,
            facilityForm: {
                // 基础信息
                batchno:'',//单号
                damageDate: dayjs(new Date()).format('YYYY-MM-DD'),//调拨日期
                storageid:'',//库房
                userId: this.$store.getters.userInfo.userid,//经办人id
                username: this.$store.getters.userInfo.name,//经办人
                remarks:'',
            },
            qty:0,//报损数量
            createdate: dayjs(new Date()),//制单日期
            //设备信息
            listUpload: [],
            facilityFormRules: setFacilityFormRules,
            selectLoading: false,
            employeeInfoLis: [],//经办人
            chooseProdDetail: [],//设备详情列表
            modelOptions: [],//配件列表
            typeForm: {//添加配件
                batchno: '',
                storageid: '',
                storagename: '',
                modelcategoryname: '',
                modelcategory: 'A',
                modelname: '',
                modelnameArr: [],
                prodid: '',
                modelnameSpan: '',
                qty: '',
            },
            // storages: this.$store.getters.userInfo.employeeinfo.storages,//当前登录人的库房
            storages: [],//当前登录人的库房
            activeName: (this.$store.getters.userInfo.employeeinfo.storages[0].id).toString(),//当前默认库房tab页
            editable: false,//添加配件可编辑
            isView: false,
            isPurchasePlan: false,
            prodLoading:false,
            selectProds:[],//所有已选设备
        }
    },
    methods: {
        init () {
            // 初始化当前登陆人库房
            getUserInfo(getToken()).then((res) => {
                this.storages = res.data.storages;
            })

            //详情入口
            if (this.$route.query.id != undefined) {
                this.facilityForm = this.$route.query;//获取设备调拨页面传来数据
                this.listUpload = this.$route.query.counts;//设备信息
                this.facilityForm.damageDate = this.$route.query.actiondate;
                this.facilityForm.username = this.$route.query.createname;
                this.qty = this.$route.query.qty;
                this.isView = true;//禁用
                JsBarcode(this.$refs['invoice-bar-code'], this.$route.query.batchno, {width: 1, height: 40});
                return;
            }
            
            // 新增——生成单号
            getLossBatchno().then((res) => {
                this.facilityForm.batchno = res.data.data;
                JsBarcode(this.$refs['invoice-bar-code'], this.facilityForm.batchno, {width: 1, height: 40});
            });
        },
        // 经办人下拉
        userChange (r) {
            this.employeeInfoLis = [];
            if (!r || this.employeeInfoLis.length > 0) return;
            this.selectLoading = true;
            getEmployeeInfoList({limit: 1000, isactive: 1}).then((res) => {
                this.employeeInfoLis = res.data.data.records;
                this.selectLoading = false;
            });
        },
        // 经办人搜索
        remoteMethod (query) {
            let para = {
                limit: 1000,
                isactive: '1',
                domSearch: [{
                    select: ['employeename'],
                    content: query
                }],
            };
            this.selectLoading = true;
            getEmployeeInfoList(para).then(({data}) => {
                this.selectLoading = false
                this.employeeInfoLis = data.data.records
            })
        },
        // 选择经办人时
        chooseUser (val) {
            this.facilityForm.userId = val.userid;
            this.facilityForm.username = val.employeename;
        },
        

        // ------------------------------------------------------------手动添加设备---------------------------------------------------------------
        // 点击添加
        addFacility (boolean) {
            if (boolean) {                      //手动添加
                this.chooseFacilityVisible = true;
                this.filtersProd = {
                    domSearch: [{
                        select: ['prodnum'],
                        content: ''
                    }], //查询框
                    storagename:this.storages[0].id,
                },
                this.getChoose();//获取已选设备
                this.getDeciceListInfo();
            } else {                                //扫描添加
            }
        },
        //获取设备列表信息
        getDeciceListInfo () {
            this.prodLoading = true;
            let para = {
                limit: this.dpageSize,
                page: this.dcurrentPage,
                storageid: this.filtersProd.storagename,
                domSearch: this.filtersProd.domSearch, //查询框
            }
            getProductInfoList(para).then((res) => {
                this.prodLoading = false;
                this.dtotal = res.data.data.total;
                this.facilities = res.data.data.records;
            }).catch((err) =>{
                this.prodLoading = false;
                this.dtotal = 0;
                this.facilities = [];
                this.$message.error('请选择库房！');
            })
        },
        // 查询已选设备信息，匹配勾选
        getChoose(){
            let para = {
                batchno:this.facilityForm.batchno
            }
            getChooseAll(para).then((res) => {
                this.selectProds = res.data.data;
            })
        },        
        // 多选设备时
        selectFacility (selection) {
            this.selectFacilities = selection
        },
        //存储不同个页面勾选状态
        defaultSelectable(row, index) {
            // this.selectProds.forEach((item, index) => {
            //     if(item.prodid === row.row.id) {
            //         this.$refs.facilitiesTable.toggleRowSelection(row.row, true);
            //         return false;
            //     }
            // });
        },
        // 确定选择设备时
        confirmFacility () {
            if (this.selectFacilities.length == 0) {//当未选择设备点击确定时
                this.$message.warning('请先选择设备！');
                return;
            }
            this.chooseFacilityVisible = false;
            this.selectFacilities.forEach((item, index) => {
                item.batchno = this.facilityForm.batchno;
                item.prodid = item.id;
                item.storagename = item.storagename;
            });
            let para = Object.assign(this.selectFacilities)
            addProductLoss(para).then((res) => {
                this.facilityLoading = true;
                this.getChooseProdList();//查询已选设备列表
            })
        },
        // 查看所选设备列表
        getChooseProdList () {
            this.facilityLoading = true;
            getChooseProduct({batchno: this.facilityForm.batchno}).then((res) => {//刷新查询已添加设备
                this.facilityLoading = false;
                this.listUpload = res.data.data;
                this.calculateAll();//计算
            });
            
        },
        // 查看当前设备数量详情
        getDetails (row) {
            this.chooseProdDetail = [];//初始化
            if (this.$route.query.id !== undefined) {               //详情时
                let para = {
                    actionid:this.$route.query.id,
                    modelspec:row.modelspec,
                    modelcategory: row.modelcategory,
                    modelname: row.modelname,
                }
                getChooseProductDetails(para).then((res) => {
                    this.chooseProdDetail = res.data.data;
                })
            } else {                                                              //新增时
                this.detailsLoading = true;
                let para = {
                    batchno:row.batchno,
                    storageid:row.storageid,
                    modelcategory: row.modelcategory,
                    modelname: row.modelname || row.simmodelname,
                }
                getChooseProductDetailsAdd(para).then((res) => {
                    this.detailsLoading = false;
                    this.chooseProdDetail = res.data.data;
                })
            }
        },
        // 删除设备
        remove (index, row) {
            let para = {
                batchno: row.batchno,
                prodid: row.prodid,
                modelcategory: row.modelcategory,
            }
            removeProductLoss(para).then((res) => {
                this.$message.success('移除成功！');
                this.getChooseProdList();//设备已选列表更新
                this.getDetails(row);//数量详情更新
            })
        },
        // 选择库房时
        chooseStorageProd(val) {
            this.filtersProd.storagename = val;
            this.getDeciceListInfo();
        },




        // -----------------------------------------------------------计算总额---------------------------------------------------------------
        // 计算总额
        calculateAll(){
            this.qty = eval(this.listUpload.map(item => (item.qty)).join("+"));//采购数量 = 每个设备数量相加
        },




        // ------------------------------------------------------------添加配件---------------------------------------------------------------
        // 点击添加配件
        addParts () {
            this.typeForm = {
                batchno: this.facilityForm.batchno,
                storageid: '',
                storagename: '',
                modelcategoryname: '配件',
                modelcategory: 'A',
                modelname: '',
                modelnameArr: [],
                prodid: '',
                modelnameSpan: '',
                qty: '',
            }//清空输入框，初始化
            this.listUpload.push(this.typeForm);
            this.editable = true;
            this.modelOptions = [];
        },
        // 获取配件下拉信息
        modelCascader () {
            if (this.typeForm.storageid == '') {
                this.$message.warning('请先选择库房！');
                return;
            }
            getPurchaseCascader({storageid:this.typeForm.storageid}).then((res) => {
                this.modelOptions = res.data.data;
            });
        },
        // 级联选择器-选择配件时
        handleChange (val) {
            this.typeForm.prodid = val[val.length - 1];
            this.typeForm.modelname = this.$refs['cascader'].currentLabels[1];//传参-汉字
            this.typeForm.modelnameSpan = this.$refs['cascader'].currentLabels.toString();//选择时显示
        },
        // 选择库房时
        chooseStorageParts (val) {
            this.typeForm.storageid = val.id;
            this.typeForm.storagename = val.storagename;
            this.modelOptions = [];
            this.typeForm.modelnameArr = [];
        },
        // 确认添加配件
        confirmParts () {
            this.$refs.typeForm.validate((valid) => {
                if (valid) {
                    let para = Object.assign(this.typeForm)
                    addPartsLoss(para).then((res) => {
                        this.$message.success('添加配件成功！');
                        this.editable = false;
                        this.getChooseProdList();//查询已选设备列表
                    });
                }
            })
        },
        // 点击取消添加配件
        cancelParts () {
            this.editable = false;
            this.getChooseProdList();//查询已选设备列表
        },


// ------------------------------------------------------------确认，提交数据---------------------------------------------------------------
        submit () {
            this.$refs.facilityForm.validate(async valid => {
                if (valid) {
                    try {
                        if (this.listUpload.length == 0) {
                            this.$message.warning('请添加设备信息！');
                            return;
                        }
                        this.addLoading = true;
                        this.facilityForm.storageid = this.filtersProd.storagename || this.typeForm.storageid;
                        await addLoss(this.facilityForm)
                        this.$emit('submit');
                        this.addLoading = false;
                        this.$message.success('提交成功');
                        this.$router.push('/stockManage/equipmentLoss')
                    } catch (e) {
                        this.addLoading = false;
                    }
                    return
                }
                this.$message.warning('请检查表单完善信息！')
            })
        },

    },
    mounted () {
        this.init()
    }
}