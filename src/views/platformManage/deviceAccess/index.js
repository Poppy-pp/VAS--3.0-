import util from '@/utils/tools'
import {
    getPlatProdList,
    modifyPlatProd,
    removePlatProd,
    getSelectPlatProdList,
    getMoNameList,
    getPlatList,
    getProdList,
    addPlatProd
} from './service';

export default {
    name: 'deviceAccess',
    props: ['windowOutHeight'],
    data () {
        return {
            fmtdata: util,
            filters: {
                domSearch: [{
                    select: ['prodprodnum'],
                    content: ''
                }], //查询框
                isactive: '1',
            },
            listData: [],
            platProdList: {},
            appointsourceOptions: [{
                value: 'A',
                label: '人工添加'
            }, {
                value: 'D',
                label: '平台对接'
            }, {
                value: 'E',
                label: '其他'
            }],
            formDialogTableVisible: false,
            total: 0,
            currentPage: 1,
            pageSize: 15,
            listLoading: false,
            sels: [], //列表选中列
            editFormVisible: false, //编辑界面是否显示
            editLoading: false,
            moNamelist: [], //设备型号列表
            moNameLoading: false, //设备型号
            platlist: [], //绑定平台
            platLoading: false, //
            activeNames: ['1', '2'],
            editFormRules: {},
            //编辑界面数据
            editForm: {},
            addFormVisible: false, //新增界面是否显示
            addLoading: false,
            addFormRules: {
                modelname: [
                    {required: true, message: '请选择设备型号', trigger: 'change'}
                ],
                prodnum: [
                    {required: true, message: '请选择设备编号', trigger: 'change'}
                ],
                platid: [
                    {required: true, message: '请选择平台', trigger: 'change'}
                ],
            },
            //新增界面数据
            addForm: {}
        }
    },
    methods: {
        //查询清空
        clearAll () {
            this.filters.domSearch = [{
                select: [],
                content: ''
            }] //清空查询框;
        },
        /*平台——下拉*/
        platChange (r) {
            if (!r || this.platlist.length > 0) return;
            this.platLoading = true;
            const params = {
                page: 1,
                limit: 1000
            }
            getPlatList(params).then((res) => {
                this.platlist = res.data.data.records;
                this.platLoading = false;
            });
        },
        // 设备编号——下拉
        querySearchName (queryString, cb) {
            let para = {
                prodnum: queryString,
                modelid: this.addForm.modelid
            }
            const prodnumArray = []
            getProdList(para).then(({data}) => {
                data.data.records.forEach(function (item, index) {
                    prodnumArray.push(Object.assign(item, {
                        value: item.prodnum
                    }));
                });
                cb(prodnumArray);
            });
        },
        handleSelectName (item) {
            this.addForm.vin = item.vin;
            this.addForm.corpname = item.corpname;
            this.addForm.corporateid = item.corpId;
            this.addForm.productid = item.id;
            this.addForm.vehicleid = item.vehiId;
            this.addForm.licenseplatenum = item.licenseplatenum;
        },

        /*设备型号——下拉*/
        moNameChange (r) {
            if (!r || this.moNamelist.length > 0) return;
            this.moNameLoading = true;
            const params = {
                page: 1,
                limit: 10000
            }
            getMoNameList(params).then((res) => {
                this.moNamelist = res.data.data.records;
                this.moNameLoading = false;
            });
        },
        //新增—— 设备型号选中时自动获取设备分类，匹配相应的设备编号
        getNameAdd (val) {
            this.addForm.prodnum = ''; //清空对应型号的设备编号
            this.addForm.corpname = '';
            this.addForm.corporateid = '';
            this.addForm.vin = '';
            this.addForm.licenseplatenum = '';
            this.addForm.productid = '';
            this.addForm.vehicleid = '';
            this.addForm.protocolid = val.protocolid;
            this.addForm.modelid = val.id;
            this.addForm.modelname = val.modelname;
            this.addForm.prodspec = val.modelspecname;
            this.addForm.protocoltype = val.protocolname;
        },
        //新增—— 平台名称选中时自动获取平台ip
        getIpAdd (item) {
            this.addForm.platid = item.id
            this.addForm.platname = item.platname
            this.addForm.platip = item.platip
            this.editForm.platid = item.id
            this.editForm.platname = item.platname
            this.editForm.platip = item.platip

        },
        //格式化状态
        formatterStatus (row, col) {
            if (row.status == "INSTO") {
                return "在库";
            }
            if (row.status == "INSTALL") {
                return "已安装";
            }
            if (row.status == "LOST") {
                return "报失";
            }
            if (row.status == "REPAIR") {
                return "维修";
            }
            if (row.status == "DAMAGE") {
                return "报废";
            }
            if (row.status == "ONWAY") {
                return "在途";
            }
            return '';
        },
        //类型显示转换
        typeFormat: function (row, col) {
            return row.appointtype == 'I' ? '系统内' : row.appointtype == 'E' ? '系统外' : '';
        },
        // 设备来源
        fromFormat: function (row, col) {
            return row.appointsource == 'A' ? '人工添加' : row.appointsource == 'B' ? '订单添加' : row.appointsource == 'C' ? '批量导入' : row.appointsource == 'D' ? '平台对接' : row.appointsource == 'E' ? '其他' : '';
        },
        // 所属客户显示判断
        corpFormat: function (row, col) {
            return row.corpname == undefined ? row.orcorpname : row.corpname;
        },
        // 车牌号显示判断
        licenseplatenumFormat: function (row, col) {
            return row.licenseplatenum == undefined ? row.orlicenseplatenum : row.licenseplatenum;
        },
        // 主设备显示判断
        defaultflagFormat: function (row, col) {
            return row.defaultflag == 'Y' ? '是' : row.defaultflag == 'N' ? '否' : '';
        },
        //详情查看
        formDetailHandle (item) {
            this.formDialogTableVisible = true;
            this.platProdList = item

        },
        // 有效无效开关
        showData (i) {
            this.filters.isactive = i;
            this.handleQuerySelect();
        },
        // 有效无效颜色切换
        tableRowClassName (row, index) {
            if (row.isactive == 0) {
                return 'warning-row';
            }
            return '';
        },
        //切换当前页
        handleCurrentChange (val) {
            this.currentPage = val;
            this.handleQuerySelect();
        },
        //切换每页显示数量
        handleSizeChange (val) {
            this.pageSize = val;
            this.handleQuerySelect();
        },
        // 添加查询条件
        addSelect () {
            this.filters.domSearch.push({
                select: [],
                content: ''
            });
        },
        // 移除查询条件
        removeSelect (index) {
            this.filters.domSearch.splice(index, 1); //从当前index位置开始，删除一项
        },
        //搜索按钮——模糊查询
        handleQuerySelect () {
            let para = {
                page: this.currentPage,
                limit: this.pageSize,
                isactive: this.filters.isactive,
                domSearch: this.filters.domSearch,
            };
            this.listLoading = true;
            getSelectPlatProdList(para).then((res) => {
                this.total = res.data.data.total;
                this.listData = res.data.data.records;
                this.listLoading = false;
            }).catch((error) => {
                this.listLoading = false;
            });
        },
        //删除
        handleDel (index, row) {
            this.$confirm('确认删除该记录吗?', '提示', {
                type: 'warning'
            }).then(() => {
                this.listLoading = true;
                let para = {
                    id: row.ID
                };
                removePlatProd(para).then((res) => {
                    this.listLoading = false;
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.handleQuerySelect();
                });
            }).catch(() => {
                this.listLoading = false;
            });
        },

        // 新增切换两个tab时
        tabclick (item) {
            if (item.label == "自主平台") {
                this.addForm.appointtype = 'I';
            } else {
                this.addForm.appointtype = 'E';
            }
        },
        //显示编辑界面
        handleEdit (index, row) {
            this.editFormVisible = true;
            this.editForm = {
                id: row.ID,
                prodprodnum: row.prodprodnum,
                platid: row.platid,
                platname: row.platname,
                platip: row.platip,
            }
        },
        //显示新增界面
        handleAdd () {
            this.addFormVisible = true;
            this.addForm = {
                platid: '',
                platname: '',
                vehicleid: '',
                productid: '',
                licenseplatenum: '',
                vin: '',
                corporateid: '',
                appointsource: 'A',
                appointtype: 'I',
                prodnum: '',
                prodspec: '',
                platip: '',
                modelname: '',
                modelid: ''
            }
        },
        //编辑
        editSubmit () {
            this.$refs['editForm'].validate((valid) => {
                if (valid) {
                    this.editLoading = true;
                    modifyPlatProd(this.editForm).then((res) => {
                        this.editLoading = false;
                        this.$message({
                            message: '编辑成功',
                            type: 'success'
                        });
                        this.editFormVisible = false;
                        this.handleQuerySelect();
                    }).catch((error) => {
                        this.editLoading = false;
                    });
                }
            });
        },
        //新增
        addSubmit () {
            this.$refs['addForm'].validate(async (valid) => {
                if (valid) {
                    this.addLoading = true;
                    try {
                        await addPlatProd(this.addForm)
                        this.addLoading = false
                        this.addFormVisible = false
                        this.$message({
                            message: '接入设备成功',
                            type: 'success'
                        });
                        this.handleQuerySelect();
                    } catch (e) {
                        this.addLoading = false;
                        console.log(e)
                    }
                }
            });
        }
    },
    created () {
        this.handleQuerySelect();
    },
}