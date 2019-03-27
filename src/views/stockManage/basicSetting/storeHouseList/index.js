import util from 'utils/tools';

import {
    getStorageInfoList,
    addStorageInfo,
    modifyStorageInfo,
    removeStorageInfo,
    getStorageDetails,
    getEmployeeInfoList,
    getStorageInfoSelect,
    getStorageParent,
    getCheckoutOfStoInfo,
    getEmployeeInfo
} from './service.js';
import gdmap from '@/views/map/gdmap';
import gdmap1 from '@/views/map/gdmap1';
import { checkChinese } from '@/utils/formValidation'

export default {
    props: ['windowOutHeight'],
    components: {
        gdmap,
        gdmap1
    },
    data () {
        return {
            fmtdata: util,
            prOptions: util.initProvince(),
            filters: {
                domSearch: [{
                    select: ['storagename'],
                    content: ''
                }], //查询框
                managerid:'',
            },
            value: '',
            pickerOptions: { //日期
            },
            empLoading: false,
            empOptions: [],//员工列表
            listData: [],
            parlist: [], //上级库房列表
            parLoading: false,
            noteDialogVisible: false,//删除弹窗
            noteForm: {
                rowstorageid: '',
                storagename: '',
                rowStoName: '',
            },
            customers: [],
            total: 0,
            currentPage: 1,
            pageSize: 15,
            listLoading: false,
            stoThisList: [],
            formDialogTableVisible: false,
            sels: [], //列表选中列
            checkoutDataT: true, //数据验证返回的布尔值true
            checkoutDataF: [], //数据验证组
            thisInput: '', //编辑时存入row验证的值
            editFormVisible: false, //编辑界面是否显示
            editLoading: false,
            editFormRules: {
                storagename: [{
                    required: true,
                    message: '请输入库房名称',
                    trigger: 'blur'
                },
                    {
                        validator: checkChinese,
                        trigger: 'blur'
                    }
                ],
                managername: [{
                    required: true,
                    message: '请输入库管名称',
                    trigger: 'blur'
                }],
                storagelevel: [{required: true, message: '请选择库房级别', trigger: 'blur'}],
                parentname: [{required: true, message: '请选择上级库房', trigger: 'blur'}],
                addressAll: [{required: true, message: '请选择库房区域', trigger: 'blur'}],
            },
            //编辑界面数据
            editForm: {
                act_id: '',
                storagecode: '',
                storagename: '',
                storagelevel: '',
                parentid: '',
                parentname: '',
                addressAll: '',
                storageaddress: '',
                managerid: '',
                managername: '',
                managermobile: '',
                remark: '',
            },
            editFormId: {
                parentid: '',
                storageid: '',
                value: '',
                managerid: '',
                managername: '',
            },
            addFormVisible: false, //新增界面是否显示
            addLoading: false,
            addFormRules: {
                storagename: [{
                    required: true,
                    message: '请输入库房名称',
                    trigger: 'blur'
                },
                    {
                        validator: checkChinese,
                        trigger: 'blur'
                    }
                ],
                managername: [{
                    required: true,
                    message: '请输入库管名称',
                    trigger: 'blur'
                }],
                storagelevel: [{required: true, message: '请选择库房级别', trigger: 'blur'}],
                parentname: [{required: true, message: '请选择上级库房', trigger: 'blur'}],
                parentid: [{required: true, message: '请选择上级库房', trigger: 'blur'}],
                addressAll: [{required: true, message: '请选择库房区域', trigger: 'blur'}],
            },
            //新增界面数据
            addForm: {
                storagecode: '',
                storagename: '',
                storagelevel: '',
                parentid: '',
                parentname: '',
                addressAll: '',
                storageaddress: '',
                managerid: '',
                managername: '',
                managermobile: '',
                remark: '',
            },
            stoOptions: [{
                value: '2',
                label: '2 级库'
            }, {
                value: '3',
                label: '3 级库'
            }],
            rowStoragename: '',//编辑行的库房,
            draggerAddr: '',
            managerOptions:[],
        }
    },
    methods: {
        // 上级库房——下拉
        parChange (r) {
            this.parlist = [];//初始化
            if (!r || this.parlist.length > 0) return;
            this.parLoading = true;
            let para = {
                storagelevel: ''
            }
            if (this.editFormVisible) {                       //编辑时
                para.storagelevel = this.editForm.storagelevel.substring(0, 1) - 1;
            } else if (this.addFormVisible) {               //新增时
                para.storagelevel = this.addForm.storagelevel - 1;
            } else if (this.noteDialogVisible) {            //删除时
                para.storagelevel = '1,2';
            }
            getStorageParent(para).then((res) => {
                this.parlist = res.data.data;
                this.parLoading = false;
                // 编辑时，判断当前库房与上级库房是否重复
                if (this.editFormVisible) {
                    this.parlist.forEach((item, index) => {
                        if (item.storagename == this.rowStoragename) {
                            this.parlist.splice(index, 1)
                        }
                    });
                }
            });
        },
        // 选择上级库房时
        chooseParent (val) {
            this.editForm.parentid = val;
        },
        // 选择级别清空库房
        intParentSto (val) {
            if (this.editFormVisible) {             //编辑时
                this.editForm.parentname = '';
            } else {                                      //新增时
                this.addForm.parentid = '';
            }
        },
        // 库管人员——查询
        empChangeSelect (r) {
            if (!r || this.managerOptions.length > 0) return;
            let para = {
                isactive: 1,
                hasstorage:'Y',
                limit: 10000
            }
            getEmployeeInfo(para).then((res) => {
                this.managerOptions = res.data.data.records;
            });
        },
        // 库管——搜索下拉
        empChange (r) {
            if (!r || this.empOptions.length > 0) return;
            this.empLoading = true;
            let para = {
                isactive: 1,
                limit: 10000
            }
            getEmployeeInfoList(para).then((res) => {
                this.empOptions = res.data.data.records;
                this.empLoading = false;
            });
        },
        handleSelectName (value) {
            this.editForm.managername = value.employeename;
            this.editForm.managerid = value.ID;
            this.editForm.managermobile = value.mobile;
            this.editForm.contactno = value.mobile;
            this.editForm.linkman = value.employeename;
            this.addForm.managername = value.employeename;
            this.addForm.managerid = value.ID;
            this.addForm.managermobile = value.mobile;
            this.addForm.contactno = value.mobile;
            this.addForm.linkman = value.employeename;
        },
        //详情查看
        formDetailHandle (stoid) {
            this.formDialogTableVisible = true;
            this.stoThisList = ''; //清空上条数据
            let para = {id: stoid}
            getStorageDetails(para).then((res) => {
                this.stoThisList = res.data.data;
            });
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

        //转换
        levelFormat (row, col) {
            return row.storagelevel + ' 级库';
        },


        //切换当前页
        handleCurrentChange (val) {
            this.currentPage = val;
            this.handleQuery();
        },
        //切换每页显示数量
        handleSizeChange (val) {
            this.pageSize = val;
            this.handleQuery();
        },
        //获取列表
        handleQuery () {
            let para = {
                page: this.currentPage,
                limit: this.pageSize,
                domSearch: this.filters.domSearch,
                managerid:this.filters.managerid
            };
            this.listLoading = true;
            getStorageInfoSelect(para).then((res) => {
                this.total = res.data.data.total;
                this.listData = res.data.data.records;
                this.listLoading = false;
            }).catch((error) => {
                this.listLoading = false;
            });
        },
        // 删除弹窗
        handleDel (index, row) {
            this.noteDialogVisible = true;
            this.noteForm.storagename = '';//初始化
            this.noteForm.rowStoName = row.storagename; //当前 库房名称，用于弹窗显示
            this.noteForm.rowstorageid = row.id; //库房 id
        },
        //删除
        deleteConfirm () {
            let para = {
                id: this.noteForm.rowstorageid,
                parentid: this.noteForm.storagename,
            };
            removeStorageInfo(para).then((res) => {
                this.$message.success('删除成功！');
                this.noteDialogVisible = false;
                this.handleQuery();
            });
        },
        //显示编辑界面
        handleEdit (index, row) {
            this.rowStoragename = row.storagename;//存储当前编辑行的库房
            this.editFormVisible = true;
            // 地址
            var addrVal = row.area;
            if (addrVal != null) {
                var addrArr = addrVal.split(",");
            } else {
                var addrArr = ["四川", "成都", "高新区"];
            }
            this.$nextTick(function(){
                this.$refs.vueAmap1.geocoder(this.editForm.storageaddress, (res) => {
                    this.editForm.addresslng = res.location.lng;
                    this.editForm.addresslat = res.location.lat;
                });
            });
            this.editForm = {
                id: row.id,
                storagecode: row.storagecode,
                storagename: row.storagename,
                storagelevel: row.storagelevel + ' 级库',
                parentid: row.parentid,
                parentname: row.parentname,
                addressAll: addrArr, //区域
                storageaddress: row.storageaddress,
                managerid: row.managerid,
                managername: row.managername,
                managermobile: row.managermobile,
                remark: row.remark,
            }
        },
        //显示新增界面
        handleAdd () {
            $(".is-error").removeClass('is-error'); //清空验证时的红框
            this.addFormVisible = true;
            this.addForm = {
                storagecode: '',
                storagename: '',
                storagelevel: '',
                parentid: '',
                parentname: '',
                addressAll: ["四川", "成都", "高新区"],
                storageaddress: this.draggerAddr,
                addresslng: '',
                addresslat: '',
                managerid: '',
                managername: '',
                managermobile: '',
                remark: '',
            };

        },
        //编辑
        editSubmit () {
            this.$refs.editForm.validate((valid) => {
                if (valid) {
                    this.editLoading = true;
                    let para = {
                        id: this.editForm.id,
                        storagename: this.editForm.storagename,
                        storagelevel: this.editForm.storagelevel.substring(0, 1),
                        parentid: this.editForm.parentid,
                        storagearea: this.editForm.addressAll.toString(),
                        storageaddress: this.editForm.storageaddress,
                        remark: this.editForm.remark,
                        managerid: this.editForm.managerid,
                        managername: this.editForm.managername,
                        managermobile: this.editForm.managermobile,
                        contactno: this.editForm.contactno,
                        linkman: this.editForm.linkman,
                        addresslng: this.editForm.addresslng,
                        addresslat: this.editForm.addresslat,
                    }
                    this.editLoading = false;
                    modifyStorageInfo(para).then((res) => {
                        if (res.data) {
                            this.$message({
                                message: '编辑成功！',
                                type: 'success'
                            });
                            this.$refs['editForm'].resetFields();
                            this.editFormVisible = false;
                            this.handleQuery();
                        }
                        this.editLoading = false;
                    });
                }
            });
        },
        //新增
        addSubmit () {
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    this.addLoading = true;
                    let para = {
                        storagename: this.addForm.storagename,
                        storagelevel: this.addForm.storagelevel,
                        parentid: this.addForm.parentid,
                        parentname: this.addForm.parentname,
                        storagearea: this.addForm.addressAll.toString(),
                        storageaddress: this.addForm.storageaddress,
                        remark: this.addForm.remark,
                        managerid: this.addForm.managerid,
                        managername: this.addForm.managername,
                        managermobile: this.addForm.managermobile,
                        contactno: this.addForm.contactno,
                        linkman: this.addForm.linkman,
                        addresslng: this.addForm.addresslng,
                        addresslat: this.addForm.addresslat,
                    }
                    addStorageInfo(para).then((res) => {
                        if (res.data) {
                            this.$message({
                                message: '新增成功！',
                                type: 'success'
                            });
                            this.$refs['addForm'].resetFields();
                            this.addFormVisible = false;
                            this.addLoading = false;
                            this.handleQuery();
                        }
                    }).catch((e) =>{
                        this.addLoading = false;
                    });
                }
            });
        },
        //拖拽地图小点返回的地址
        draggerMapMarker (address, lnglatXY, type) {
            this.draggerAddr = address;//存储地址
            if (this.addFormVisible) {
                this.addForm.storageaddress = address;
                this.addForm.addresslng = lnglatXY[0];
                this.addForm.addresslat = lnglatXY[1];
            }
            if(type == 2) {
                this.editForm.storageaddress = address;
                this.editForm.addresslng = lnglatXY[0];
                this.editForm.addresslat = lnglatXY[1];
            }
        },
        // 地图
        changeMapAdd () {
            this.$refs.vueAmap.geocoder(this.addForm.storageaddress, (res) => {
                this.addForm.addresslng = res.location.lng;
                this.addForm.addresslat = res.location.lat;
            });
        },
        changeMapEdit () {
            this.$refs.vueAmap1.geocoder(this.editForm.storageaddress, (res) => {
                this.editForm.addresslng = res.location.lng;
                this.editForm.addresslat = res.location.lat;
            });
        }
    },
    created () {
        this.handleQuery();
    }
}