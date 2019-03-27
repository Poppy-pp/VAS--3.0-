import util from 'utils/tools';

import { 
    getStoPurchaseList,
    addStoPurchase,
    getPurchaseCascader,
    getStoPurchaseDetails,
    getSupplierList,
    getBarcodeCGHT,
    getDetails,
} from './service.js';
import { checkChinese } from '@/utils/formValidation'

export default {
    props: ['windowOutHeight'],
    data() {
        return {
            fmtdata: util,
            filters: {
                domSearch: [{
                    select: ['contractno'],
                    content: ''
                }], //查询框
                timeScope: '',
            },
            filtersSto: {
                domSearch: [{
                    select: ['batchno'],
                    content: ''
                }], //查询框
            },
            deviceListData: [], //入库量列表
            deviceFormVisible: false,
            devicelistLoading: false,
            dtotal: 0,
            dcurrentPage: 1,
            dpageSize: 15,
            pickerOptions: { //日期
            },
            empLoading:false,
            empOptions:[],//员工列表
            listData: [],
            total: 0,
            currentPage: 1,
            pageSize: 15,
            listLoading: false,
            contractThisList: [],//详情
            formDialogTableVisible: false,
            addFormVisible: false, //新增界面是否显示
            addLoading: false,
            addFormRules: {
                purchasedate: [{required: true,message: '请选择采购日期',trigger: 'blur'} ],
                contractname: [{required: true,message: '请选填写合同名称',trigger: 'blur'} ],
                suppliername: [{required: true,message: '请选择供应商',trigger: 'blur'} ],
            },
            //新增界面数据
            addForm: {
                contractno:'',
                contractname:'',
                purchaseamount: 0,
                purchasedate:'',
                purchaseqty:0,
                createby:'',
                createbyname:'',
                supplierid:'',
                suppliername:'',
                linkman:'',
                contactno:'',
                stoPurchasedetails:[],
            },
            supplierOptions:[],//供应商
            supplierLoading:false,
            // 类型设置
            typeListData:[],//设备型号数据
            typeListLoading:false,
            editable:false,//是否可编辑
            typeForm:{
                modelid:'',
                modelname:[],//cascader的v-model，选择时显示
                modelnameSpan:'',//span显示
                unitprice:'',
                qty:'',
                amount:'',
            },
            modelOptions:[],//类型级联选择
            purchaseid:'',//入库量详情当前合同id
        }
    },
    methods: {
        // 卡型号点击新增
        typeAddClick(){
            if (this.addForm.supplierid == '') {
                this.$message.error('请先选择供应商！');
                return;
            }
            this.typeForm = {
                modelid:'',
                modelname:[],
                modelnameSpan:'',
                unitprice:'',
                qty:'',
                amount:'',
            },//清空输入框，初始化
            this.typeListData.push(this.typeForm);
            this.editable = true;
        },
        // 确定新增
        typeAddConfirm(){
            this.$refs.typeForm.validate((valid) => {
                if (valid) {
                    this.typeListData.push(this.typeForm);
                    this.typeAddCancel();
                    this.calculateAll();//计算总额
                }
            })
        },
        // 取消新增
        typeAddCancel(){
            this.editable = false;//取消编辑
            this.typeListData.splice(this.typeListData.length-1, 1); //从当前index位置开始，删除一项
        },
        // 删除类型
        handleDel(index,row){
            if (this.editable) {
                this.$message.error( '请先进行当前【添加】操作！');
                return;
            };
            this.$confirm(' 确认删除该条采购信息吗?', '提示', {
                type: 'warning'
            }).then(() => {
                this.typeListData.splice(index, 1);
                this.calculateAll();//计算总额
            })
        },
        // 级联选择器-选择采购型号
        modelCascader(){
            getPurchaseCascader({supplierid:this.addForm.supplierid}).then((res) => {
                this.modelOptions = res.data.data;
            });
        },
        // 级联选择器-选择时
        handleChange(val) {
            this.typeForm.modelid = val[val.length-1];
            this.typeForm.modelnameSpan = this.$refs['cascader'].currentLabels.toString();
        },
        // 供应商下拉
        supplierChange(r) {
            if(!r || this.supplierOptions.length > 0) return;
            this.supplierLoading = true;
            getSupplierList({limit:1000,isactive:1}).then((res) => {
                this.supplierOptions = res.data.data.records;
                this.supplierLoading = false;
            });
        },
        // 改变供应商时，联动联系人联系方式，联动查询采购型号
        showLink(val){
            this.addForm.supplierid = val.id;
            this.addForm.suppliername = val.suppliername;
            this.addForm.linkman = val.linkman;
            this.addForm.contactno = val.contactno;
            this.typeListData = [];
            this.addForm.purchaseqty = 0;
            this.addForm.purchaseamount = 0;
        },
        // 关闭dialog
        closeDialog(){
            this.addFormVisible = false;
            this.typeAddCancel();
        },
        // 计算设备金额
        calculatePrice(){
            this.typeForm.amount = (this.typeForm.qty * this.typeForm.unitprice).toFixed(2);//设备金额 = 单价 * 数量
        },
        // 计算总额
        calculateAll(){
            this.addForm.purchaseqty = eval(this.typeListData.map(item => (item.qty)).join("+")).toFixed(0);//采购数量 = 每个设备数量相加
            this.addForm.purchaseamount = eval(this.typeListData.map(item => (item.amount)).join("+")).toFixed(2);//采购总金额 = 每个设备金额相加
            if (this.addForm.purchaseamount == undefined) this.addForm.purchaseamount = 0;
        },

        //详情查看
        formDetailHandle(rowid) {
            this.formDialogTableVisible = true;

            this.contractThisList = ''; //清空上条数据
            let para = { id: rowid  }
            getStoPurchaseDetails(para).then((res) => {
                this.contractThisList = res.data.data;
                //页面渲染完成，加载条形码
                this.$nextTick(() => {
                   JsBarcode("#barcode", this.contractThisList.contractno, {width:1,height: 40} );
                })
            });
        },
        // 添加查询条件
        addSelect() {
            this.filters.domSearch.push({
                select: [],
                content: ''
            });
        },
        // 移除查询条件
        removeSelect(index) {
            this.filters.domSearch.splice(index, 1); //从当前index位置开始，删除一项
        },
        
        //转换
        statusFormat(row, col) {
            // return row.storagelevel == 1 ? '总库' : row.storagelevel == 2 ? '地方库' : row.storagelevel == 3 ? '个人库' : '未知';
            return row.storagelevel + ' 级库';
        },
        dateFormatter: function(row, col) {
            if(row.instockdate == "" || row.instockdate == undefined) return '--';
            return util.formatDate.format(new Date(row.instockdate), 'yyyy-MM-dd hh:mm');
        },
        dateFormatterOne: function(row, col) {
            if(row.purchasedate == "" || row.purchasedate == undefined) return '--';
            return util.formatDate.format(new Date(row.purchasedate), 'yyyy-MM-dd');
        },

      
       // 入库单详情
        async toPutInStoDetails(rows){
            this.purchaseid = rows.id;
            this.deviceFormVisible = true;
            try {
                 const res = await getDetails({ purchaseid:rows.id });
                 this.deviceListData = res.data.data.records;
                 this.dtotal = res.data.data.total;
            } catch (e) {}
        },
        // 查询入库单
        async getDeciceListInfo(){
            let para = {
                    purchaseid:this.purchaseid,
                    page: this.dcurrentPage,
                    limit: this.dpageSize,
                    domSearch: this.filtersSto.domSearch,
            }
            const res = await getDetails(para);
            this.deviceListData = res.data.data.records;
        },
        //切换当前页
        dhandleCurrentChange(val) {
            this.dcurrentPage = val;
            this.getDeciceListInfo();
        },
        //切换每页显示数量
        dhandleSizeChange(val) {
            this.dpageSize = val;
            this.getDeciceListInfo();
        },

        //切换当前页
        handleCurrentChange(val) {
            this.currentPage = val;
            this.handleQuery();
        },
        //切换每页显示数量
        handleSizeChange(val) {
            this.pageSize = val;
            this.handleQuery();
        },
        //获取列表
        handleQuery() {
            let para = {
                page: this.currentPage,
                limit: this.pageSize,
                domSearch: this.filters.domSearch,
                startTime: this.filters.timeScope ? (this.filters.timeScope[0] ? util.formatDate.format(new Date(this.filters.timeScope[0]), 'yyyy-MM-dd') : '') : '',
                endTime: this.filters.timeScope ? (this.filters.timeScope[1] ? util.formatDate.format(new Date(this.filters.timeScope[1]), 'yyyy-MM-dd') : '') : '',
            };
            this.listLoading = true;
            getStoPurchaseList(para).then((res) => {
                this.total = res.data.data.total;
                this.listData = res.data.data.records;
                this.listLoading = false;
            }).catch((error) => {
                this.listLoading = false;
            });
        },
        
        //显示新增界面
        handleAdd() {
            this.addFormVisible = true;

            
            this.addForm = {
                contractno:'',
                contractname:'',
                purchaseamount: 0,
                purchasedate:'',
                purchaseqty:0,
                createby: this.$store.getters.userInfo.userid,
                createbyname: this.$store.getters.userInfo.name,
                supplierid:'',
                suppliername:'',
                linkman:'',
                contactno:'',
            };

            //获取合同号，加载条形码
            getBarcodeCGHT().then((res) => {
                this.addForm.contractno = res.data.data;
                JsBarcode("#barcode", this.addForm.contractno, {width:1,height: 40} );
            });

        },
        //新增
        addSubmit() {
            this.$refs.addForm.validate((valid) => {
                if(valid) {
                    if (!this.typeListData.length) {
                        this.$message.warning('您还没有添加设备信息，请添加设备信息')
                        return;
                    }
                    this.addLoading = true;
                    let para = {
                        stoPurchase:{
                            contractno:this.addForm.contractno,
                            contractname:this.addForm.contractname,
                            purchaseamount:this.addForm.purchaseamount,
                            purchasedate:this.addForm.purchasedate,
                            purchaseqty:this.addForm.purchaseqty,
                            createby:this.addForm.createby,
                            supplierid:this.addForm.supplierid,
                            suppliername:this.addForm.suppliername,
                            linkman:this.addForm.linkman,
                            contactno:this.addForm.contactno,
                        },
                        stoPurchasedetails:this.typeListData,
                    }
                    addStoPurchase(para).then((res) => {
                        if (res.data) {
                            this.addLoading = false;
                            this.$message.success( '新增成功！');
                            this.$refs['addForm'].resetFields();
                            this.addFormVisible = false;
                            this.handleQuery();
                        }
                    }).catch((e) =>{
                        this.addLoading = false;
                    });
                }
            });
        },
    },
    created() {
        this.handleQuery();
    }
}