import util from 'utils/tools';
import {
    getEmployeeInfoList,
    addEmployeeInfo,
    modifyEmployeeInfo
} from './service.js';

import { getDepartmentInfoList } from '@/views/sysManage/department/service'
import { getSysDictionaryDataList } from '@/views/sysManage/dictionaryManage/SysDictionaryData/service'
import { getSysRoleInfoList } from '@/views/sysManage/roleManage/service'
import { getParentInfoList } from '@/views/sysManage/organizationManage/service'
import { checkRepeat, getNamebyUserid } from '../employeeManage/service'
import { getUserRole, editUserRole } from '@/views/sysManage/userCenter/service'
import { getToken } from '@/utils/auth'

// 验证手机
var checkMobile = (rule, value, callback) => {
    var reg = /^1\d{10}$/g,
        flag = reg.test(value);
    if (!flag) {
        return callback(new Error('请输入11位的手机号码'));
    } else {
        callback();
    }
};
//验证中文名字(只能输入中文不能大于四个子)
var checkName = (rule, value, callback) => {
    var reg = /^[a-zA-Z\u4e00-\u9fa5]{1,10}$/g,
        flag = reg.test(value);
    if (!flag) {
        return callback(new Error('只能输入10个以内的汉字和字母'));
    } else {
        callback();
    }
}

export default {
    name: 'customerinfo',
    props: ['windowOutHeight'],
    data () {
        return {
            fmtdata: util,
            filters: {
                isactive: '1',
                domSearch: [{
                    select: ['custname'],
                    content: ''
                }] //查询框
            },
            radio: '1',
            editRoleInfoVisible: false,
            isIndeterminate: true,
            prOptions: util.initProvince(),
            listData: [],
            emptype: {
                I: '体系内',
                E: '体系外'
            }, //客户类型列表
            poslist: [], //客户职位列表
            posLoading: false,
            deptlist: [], //客户所属部门列表
            deptLoading: false,
            corplist: [], //所属公司
            corpLoading: false,
            grouplist: [], //所属分组
            createname: "",
            updatename: "",
            otherinfoData: [], //详情数据
            formDialogTableVisible: false, //是否显示订单详情弹出
            // etLoading: false,
            ptLoading: false,
            total: 0,
            checkoutDataT: true, //数据验证返回的布尔值true
            checkoutDataF: [], //数据验证组
            thisInput: '', //编辑时存入row验证的值
            currentPage: 1,
            pageSize: 15,
            listLoading: false,
            curUserId: '',
            cities: [],
            checkAll: true,
            nodeLoading: false,
            groupLoading: false, //
            imageUrl: '', //头像
            accept: '.jpg,.png,.jpeg',
            // headers:{token:JSON.parse(localStorage.getItem('user')).token},
            editFormVisible: false, //编辑界面是否显示
            editLoading: false,
            //编辑界面数据
            editForm: {},
            editFormId: {
                employeetype: '',
                // positionid: '',
                userid: '',
                corpid: '',
                corpname: '',
                groupid: '',
                positioncode: '',
                // groupname: '',
                positionname: '',
                deptname: '',
                deptid: '',
            },
            //新增界面数据
            addForm: {},
            checkedCities: [],
            addFormVisible: false, //新增界面是否显示
            addLoading: false,
            addFormRules: {
                custname: [{
                    required: true,
                    message: "请输入客户姓名",
                    trigger: 'blur'
                },
                    {
                        validator: checkName,
                        trigger: 'blur'
                    }
                ],
                mobile: [{
                    required: true,
                    message: "请输入客户手机号码",
                    trigger: 'blur'
                },
                    {
                        validator: checkMobile,
                        trigger: 'blur'
                    }
                ],
                corpname: [{
                    required: true,
                    message: "请选择公司",
                    trigger: 'change'
                }],
                regionAll: [{
                    required: true,
                    message: "请选择所属区域",
                    trigger: 'blur'
                }], //区域验证
                custtype: [{
                    required: true,
                    message: "请选择客户类型",
                    trigger: 'change'
                }],
                positionname: [{
                    required: true,
                    message: "请选择客户岗位",
                    trigger: 'change'
                }]
            },
            token: getToken(),
            mobileErrMessage: ''
        };
    },
    methods: {
        custtypeFormatter (row) {
            return this.emptype[row.custtype] || ''
        },
        //新增时数据监测
        checkout (p, v, index) {
            // if (v == "") return;
            // if (this.thisInput == v) return; //编辑时 没改输入框值
            // this.checkoutDataT = true; //初始化
            // let paras = {
            //     para: p,
            //     value: v,
            // }
            // getCheckout(paras).then((res) => {
            //     let errorInput = res.data.data.param; //保存验证失败的字段
            //     if (!res.data.data.result) {
            //         this.$message({
            //             message: '信息输入重复！',
            //             type: 'warning'
            //         });
            //         this.$refs[errorInput].$el.className = "el-form-item is-error"; //输入框标红
            //         this.checkoutDataF[index] = false
            //     } else {
            //         this.$refs[errorInput].$el.className = "el-form-item"; //输入框恢复
            //         this.checkoutDataF[index] = true
            //     }
            // });
        },
        //查询清空
        clearAll () {
            this.filters.domSearch = [{
                select: [],
                content: ''
            }] //清空查询框;
        },
        // 角色编辑
        roleEditClose () {
            this.checkedCities = [];
        },
        //角色编辑
        roleEdit (index, row) {
            this.editRoleInfoVisible = true;
            this.curUserId = row.userid;

            //初始化角色
            let para = {
                page: 1,
                limit: 1000,
                delFlag: 0
            };
            getSysRoleInfoList(para).then(({data}) => {
                this.cities = data.data.records;
                let para = {
                    userid: this.curUserId,
                };
                getUserRole(para).then(({data}) => {
                    let carry = [];
                    data.data.forEach(function (obj) {
                        carry.push(obj.roleId);
                    });
                    this.checkedCities = carry;
                    this.checkAll = carry.length === this.cities.length;
                    this.isIndeterminate = carry.length > 0 && carry.length < this.cities.length;
                });
            });
        },
        handleNodeClick () {
            this.nodeLoading = true;
            let checkedNode = this.checkedCities,
                para = {
                    id: this.curUserId,
                    role: []
                }
            checkedNode.forEach(function (val) {
                para.role.push(val);
            });
            editUserRole(para).then((res) => {
                this.$message({
                    message: '编辑角色权限成功！',
                    type: 'success'
                });
                this.nodeLoading = false;
                this.editRoleInfoVisible = false;
            }, () => {
                this.nodeLoading = false;
            });
        },
        handleCheckAllChange (event) {
            let arry = [];
            this.cities.forEach(function (obj) {
                arry.push(obj.roleId);
            });
            this.checkedCities = event ? arry : [];
            this.isIndeterminate = false;
        },
        handleCheckedCitiesChange (value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.cities.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        },
        //详情查看
        formDetailHandle (data) {
            this.formDialogTableVisible = true;
            // let para = {
            //     id: empid,
            // }
            this.otherinfoData = data
            let paraThree = {
                createby: this.otherinfoData.createby == null ? 0 : this.otherinfoData.createby,
                updateby: this.otherinfoData.updateby == null ? 0 : this.otherinfoData.updateby,
            }
            if (paraThree.createby === paraThree.updateby) {
                getNamebyUserid(paraThree.createby).then(({data}) => {
                    this.createname = data.data && data.data.employeename;
                    this.updatename = data.data && data.data.employeename;
                });
            } else {
                getNamebyUserid(paraThree.createby).then(({data}) => {
                    this.updatename = data.data && data.data.employeename;
                });
                getNamebyUserid(paraThree.updateby).then(({data}) => {
                    this.updatename = data.data && data.data.employeename;
                });
            }
            // nanobar.go(70);
            // getEmployeeInfoList(para).then((res) => {
            //     this.otherinfoData = res.data.data.records[0];
            //     // nanobar.go(100);
            //
            //     let paraThree = {
            //         createby: this.otherinfoData.createby == null ? 0 : this.otherinfoData.createby,
            //         updateby: this.otherinfoData.updateby == null ? 0 : this.otherinfoData.updateby,
            //     }
            //     getNamebyUserid(paraThree).then((res) => {
            //         this.createname = res.data.data[0];
            //         this.updatename = res.data.data[1];
            //     });
            // });

        },
        // 有效无效开关
        showData (i) {
            this.filters.isactive = i;
            this.handleQuerySelect();
        },
        // 选择所属部门时，匹配分组，传deptid
        sendDeptIdData (val) {
            // this.addForm.groupname = ''; //清空所属分组
            // this.editForm.groupname = ''; //清空所属分组
            // let para = {
            //     deptid: val
            // }
            // if (typeof(para.deptid) == 'number') {
            // getGroupInfoList(para).then((res) => {
            //     this.grouplist = res.data.data.records;
            // });
            // }
        },
        corpChange (r) {
            if (!r) return;
            this.corpLoading = true;
            let corptype = 'EXTERNAL';
            if (this.addForm.custtype === 'I')
                corptype = 'INTERNAL'
            this.getParentInfoList(corptype)
        },
        corpEditChange (r) {
            if (!r) return;
            this.corpLoading = true;
            let corptype = 'EXTERNAL';
            if (this.editForm.custtype === 'I')
                corptype = 'INTERNAL'
            this.getParentInfoList(corptype)
        },
        getParentInfoList (corptype) {
            let param = {
                page: 1,
                limit: 10000,
                corptype: corptype
            }
            getParentInfoList(param).then(({data}) => {
                this.corplist = data.data.records;
                this.corpLoading = false;
            }, () => {
                this.corpLoading = false;
            });
        },
        //所属 部门——搜索下拉
        deptChange (r) {
            if (!r || this.deptlist.length > 0) return;
            this.deptLoading = true;
            let param = {
                page: 1,
                limit: 10000
            }
            getDepartmentInfoList(param).then(({data}) => {
                this.deptlist = data.data.records;//未选择公司时不获取部门信息
                this.deptLoading = false;
            }, () => {
                this.deptLoading = false;
            });
        },
        //所属 分组——搜索下拉
        // groupChange (r) {
        //     if (!r || this.grouplist.length > 0) return;
        //     this.groupLoading = true;
        //     let param = {
        //         page: 1,
        //         limit: 10000
        //     }
        //     getGroupInfoList().then(({data}) => {
        //         this.grouplist = data.data.records;//未选择公司时不获取部门信息
        //         this.groupLoading = false;
        //     }, () => {
        //         this.groupLoading = false;
        //     });
        // },
        // 客户岗位——搜索下拉
        posChange (r) {
            if (!r || this.poslist.length > 0) return;
            this.posLoading = true;
            let param = {
                dictvalue: 'POSITIONCODE_CUST',
                limit: 1000,
                page: 1
            }
            getSysDictionaryDataList(param).then(({data}) => {
                this.poslist = data.data.records;
                this.posLoading = false;
            }, () => {
                this.posLoading = false;
            });
        },
        //有效无效转换
        isenableFomat (row, col) {
            return row.isactive == 1 ? '是' : row.isactive != undefined ? '否' : '未知';
        },
        // 有效无效颜色切换
        tableRowClassName (row, index) {
            if (row.isactive == 0) {
                return 'warning-row';
            }
            return '';
        },
        // 有效按钮切换状态
        handleChange: function (index, row) {
            this.$confirm('确认设置该条记录的状态吗？', '提示', {
                type: 'warning'
            }).then(() => {
                let para = {
                    id: row.id,
                    // userid: row.userid,
                    isactive: row.isactive == 1 ? 0 : 1
                }
                modifyEmployeeInfo(para).then((res) => {
                    this.$message({
                        message: '设置成功',
                        type: 'success'
                    });
                    row.isactive = para.isactive;
                    this.handleQuerySelect();
                });
            });
        },
        // 有效 鼠标移入
        mouseoverChange (e) {
            if ($(e.target).hasClass('icon-duigou')) {
                $(e.target).addClass('operate-cha icon-cha').removeClass('operate-duigou icon-duigou');
            } else {
                $(e.target).addClass('operate-duigou icon-duigou').removeClass('operate-cha icon-cha');
            }
        },
        // 有效 鼠标移除
        mouseoutChange (e) {
            if ($(e.target).hasClass('icon-cha')) {
                $(e.target).addClass('operate-duigou icon-duigou').removeClass('operate-cha icon-cha');
            } else {
                $(e.target).addClass('operate-cha icon-cha').removeClass('operate-duigou icon-duigou');
            }
        },
        // 上传图片成功后
        headImgSuccess (res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            this.editForm.headiconpath = res.data;
            this.addForm.headiconpath = res.data;
        },
        // 客户类型
        // empChange (r) {
        //     if (!r || this.emptype.length > 0) return;
        //     this.etLoading = true;
        //     getEmpType().then((res) => {
        //         this.emptype = res.data.data.records;
        //         this.etLoading = false;
        //     });
        // },

        //切换当前页
        handleCurrentChange (val) {
            this.currentPage = val;
            // this.handleQuery();
            this.handleQuerySelect(); //查询分页
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
            getEmployeeInfoList(para).then((res) => {
                this.total = res.data.data.total;
                this.listData = res.data.data.records;
                this.listLoading = false;
            }).catch((error) => {
                this.listLoading = false;
            });
        },
        handleQuerySelectFn () {
            this.currentPage = 1;
            this.handleQuerySelect()
        },
        //获取客户
        // handleQuery () {
        //     let para = {
        //         page: this.currentPage,
        //         limit: this.pageSize,
        //         isactive: this.filters.isactive,
        //         content: this.filters.content,
        //         select: this.filters.select,
        //     };
        //     this.listLoading = true;
        //     getEmployeeInfoList(para).then(({data}) => {
        //         this.total = data.data.total;
        //         this.listData = data.data.records;
        //         this.listLoading = false;
        //     }).catch((error) => {
        //         this.listLoading = false;
        //     });
        // },
        //显示编辑界面
        handleEdit (index, row) {
            this.mobileErrMessage = ''
            // 查询公司部门分组
            // this.sendCorpIdData(row.corpid);
            // this.sendDeptIdData(row.deptid);

            $(".is-error").removeClass('is-error'); //清空验证时的红框
            this.editFormVisible = true;
            // 地址
            var addrVal = row.region;
            var addrArr;
            if (addrVal != null) {
                addrArr = addrVal.split(",");
            } else {
                addrArr = ["四川", "成都", "高新区"];
            }

            this.editForm = {
                id: row.id,
                headiconpath: row.headiconpath,
                custtype: row.custtype,
                // employeecode: row.employeecode,
                custname: row.custname,
                username: row.username,
                positionname: row.positionname,
                corpname: row.corpname,
                // groupname: row.groupname,
                deptname: row.deptname,
                mobile: row.mobile,
                isactive: parseInt(row.isactive),
                gender: row.gender,
                regionAll: addrArr,
                address: row.address,
                wechatid: row.wechatid,
                qq: row.qq,
                userid: row.userid,
            }

            this.editFormId = {
                employeetype: row.employeetype,
                custtype: row.custtype,
                positioncode: row.positioncode,
                positionname: row.positionname,
                deptid: row.deptid,
                deptname: row.deptname,
                corpid: row.corpid,
                corpname: row.corpname,
                groupid: row.groupid,
                mobile: row.mobile,
                // groupname: row.groupname,
            }
            this.thisInput = this.editForm.mobile; //将当前验证的字段 已获得的值存入
            // 设置编辑时获取头像方式
            if (this.editForm.headiconpath == undefined) {
                this.imageUrl = '';
            } else {
                this.imageUrl = this.$store.state.IMG_URL + row.headiconpath;
            }
        },
        //显示新增界面
        handleAdd () {
            this.mobileErrMessage = ''
            $(".is-error").removeClass('is-error'); //清空验证时的红框
            this.addFormVisible = true;
            this.addForm = {
                headiconpath: '', //头像路径
                custname: '',   //客户姓名
                username: '',   //
                custtype: '',   //客户类型
                // employeecode: '',
                // custname: '',
                positioncode: '',   //职位代码
                deptname: '',
                corpname: '',
                // groupname: '',
                mobile: '',
                isactive: 1,
                gender: 'M',
                regionAll: ["四川", "成都", "高新区"],
                region: '',
                address: '',
                wechatid: '',
                qq: '',
                deptid: '',
                groupid: '',
                // positionid: '',
            };
        },
        //编辑
        editSubmit () {
            if (this.mobileErrMessage)
                return
            this.$refs.editForm.validate((valid) => {
                if (valid) {
                    this.editLoading = true;
                    let para = {
                        id: this.editForm.id,
                        // employeecode: this.editForm.employeecode,
                        custname: this.editForm.custname,
                        username: this.editForm.username,
                        deptid: this.editForm.deptname,
                        positioncode: this.editForm.positionname,
                        // corpid: this.editForm.corpname,
                        // groupid: this.editForm.groupname,
                        mobile: this.editForm.mobile,
                        isactive: this.editForm.isactive,
                        headiconpath: this.editForm.headiconpath,
                        gender: this.editForm.gender,
                        region: this.editForm.regionAll.toString(),
                        address: this.editForm.address,
                        wechatid: this.editForm.wechatid,
                        qq: this.editForm.qq,
                        userid: this.editForm.userid,
                    }
                    if (this.editFormId.custtype == this.editForm.custtype) {
                        para.custtype = this.editFormId.employeetype;
                    } else {
                        para.custtype = this.editForm.custtype;
                    }
                    // if(this.editFormId.deptname == this.editForm.deptname) {
                    //     para.deptid = this.editFormId.deptid;
                    // }else{
                    //     para.deptid = this.editForm.deptid;
                    // }
                    if (this.editFormId.deptname == this.editForm.deptname) {
                        para.deptid = this.editFormId.deptid;
                    } else {
                        para.deptid = this.editForm.deptname;
                    }
                    // if (this.editFormId.groupname == this.editForm.groupname) {
                    //     para.groupid = this.editFormId.groupid;
                    // } else {
                    //     para.groupid = this.editForm.groupname;
                    // }
                    if (this.editFormId.positionname == this.editForm.positionname) {
                        para.positioncode = this.editFormId.positioncode;
                    } else {
                        para.positioncode = this.editForm.positionname;
                    }
                    if (this.editFormId.corpname == this.editForm.corpname) {
                        para.corpid = this.editFormId.corpid;
                    } else {
                        para.corpid = this.editForm.corpname;
                    }
                    // if (para.deptid == '') { //当选择了公司,未选择部门时
                    //     this.$message({
                    //         message: '请选择部门！',
                    //         type: 'warning'
                    //     });
                    //     this.editLoading = false;
                    //     return;
                    // } else {
                    modifyEmployeeInfo(para).then(({data}) => {
                        this.editLoading = false;
                        if (data.code === 0) {
                            this.$message({
                                message: '编辑成功！',
                                type: 'success'
                            });
                        }
                        // this.$refs['editForm'].resetFields(); //表单清空
                        this.editFormVisible = false;
                        this.handleQuerySelect();
                    }).catch((error) => {
                        this.editLoading = false;
                    });
                    // }

                }
            });
        },
        //新增
        addSubmit () {
            if (this.mobileErrMessage)
                return
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    this.addLoading = true;
                    let para = Object.assign({}, this.addForm)
                    para.deptid = para.deptname
                    para.corpid = para.corpname
                    para.positioncode = para.positionname
                    // para.groupid = para.groupname
                    para.region = para.regionAll.toString()
                    if (this.checkoutDataT) { //验证通过时(无重复时)
                        addEmployeeInfo(para).then(({data}) => {
                            this.addLoading = false;
                            if (data.code === 0) {
                                this.$message({
                                    message: '新增成功！',
                                    type: 'success'
                                });
                                // this.$refs['addForm'].resetFields();
                                this.addFormVisible = false;
                                this.handleQuerySelect();
                            }
                        }).catch((error) => {
                            this.addLoading = false;
                        });
                    } else {
                        this.addLoading = false;
                        this.$message({
                            message: '标红信息已存在！',
                            type: 'warning'
                        });
                    }
                }
            });
        },
        async checkEditMobile (value) {
            if (this.editFormId.mobile === value)
                return
            this.checkMobile(value)
        },
        async checkMobile (value) {
            this.mobileErrMessage = ''
            if (value) {
                try {
                    const {data} = await checkRepeat({content: value})
                    if (data.data) {
                        this.mobileErrMessage = '手机号已经存在'
                    }
                } catch (e) {

                }
            }
        },
    },
    mounted () {
        this.handleQuerySelect();
    }
}