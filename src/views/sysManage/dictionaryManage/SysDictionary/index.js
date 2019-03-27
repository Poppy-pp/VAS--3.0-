import { getSysDictionaryList, addSysDictionary, modifySysDictionary, removeSysDictionary } from './service';

export default {
    props: ['windowOutHeight'],
    data () {
        return {
            filters: {
                model: ''
            },
            listData: [],
            customers: [],
            total: 0,
            currentPage: 0,
            pageSize: 15,
            listLoading: false,
            sels: [], //列表选中列
            editFormVisible: false, //编辑界面是否显示
            editLoading: false,
            editFormRules: {
                dictname: [
                    {required: true, message: '字典名称必填', trigger: 'blur'}
                ],
                dictvalue: [
                    {required: true, message: '字典值必填', trigger: 'blur'}
                ]
            },
            //编辑界面数据
            editForm: {
                id: 0,
                dictname: '',
                dictvalue: ''
            },

            addFormVisible: false, //新增界面是否显示
            addLoading: false,
            //新增界面数据
            addForm: {
                dictname: '',
                dictvalue: ''
            },
        }
    },
    methods: {
        //有效转换器
        formatIsactive (row, column) {
            return row.isactive == 1 ? '有效' : row.isactive == 0 ? '无效' : '未知';
        },
        //切换每页显示数量
        handleSizeChange (val) {
            this.pageSize = val;
            this.handleQuery();
        },
        handleCurrentChange (val) {
            this.currentPage = val;
            this.handleQuery();
        },
        //获取字典列表
        handleQuery () {
            let para = {
                page: this.currentPage,
                limit: this.pageSize
            };
            this.listLoading = true;
            getSysDictionaryList(para).then((res) => {
                if (res.data.data) {
                    this.total = res.data.data.total;
                    this.listData = res.data.data.records;
                }
                this.listLoading = false;
            }, () => {
                this.listLoading = false;
            });
        },
        //删除
        handleDel (index, row) {
            this.$confirm('确认删除该记录吗?', '提示', {
                type: 'warning'
            }).then(() => {
                // this.listLoading = true;
                //NProgress.start();
                let para = {
                    ids: row.id
                };
                // let para = new FormData();
                // para.append('ids', row.id);
                // para.append('method','delete');

                removeSysDictionary(para).then((res) => {
                    //NProgress.done();
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.handleQuery();
                });
            }).catch(() => {

            });
        },
        //显示编辑界面
        handleEdit (index, row) {
            this.editFormVisible = true;
            this.editForm = Object.assign({}, row);
        },
        //显示新增界面
        handleAdd () {
            this.addFormVisible = true;
            this.addForm = {
                dictname: '',
                dictvalue: ''
            };
        },
        //编辑
        editSubmit () {
            this.$refs.editForm.validate((valid) => {
                if (valid) {
                    // this.$confirm('确认提交吗？', '提示', {}).then(() => {
                    this.editLoading = true;
                    //NProgress.start();
                    let para = Object.assign({}, this.editForm);
                    modifySysDictionary(para).then((res) => {
                        this.editLoading = false;
                        //NProgress.done();
                        this.$message({
                            message: '提交成功',
                            type: 'success'
                        });
                        this.$refs['editForm'].resetFields();
                        this.editFormVisible = false;
                        this.handleQuery();
                    }, () => {
                        this.editLoading = false;
                    });
                    // });
                }
            });
        },
        //新增
        addSubmit () {
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    // this.$confirm('确认提交吗？', '提示', {}).then(() => {
                    this.addLoading = true;
                    //NProgress.start();
                    let para = Object.assign({}, this.addForm);
                    addSysDictionary(para).then((res) => {
                        this.addLoading = false;
                        //NProgress.done();
                        this.$message({
                            message: '提交成功',
                            type: 'success'
                        });
                        this.$refs['addForm'].resetFields();
                        this.addFormVisible = false;
                        this.handleQuery();
                    }, () => {
                        this.addLoading = false;
                    });
                    // });
                }
            });
        },
        selsChange (sels) {
            this.sels = sels;
        },
    },
    created () {
        this.handleQuery();
    }
}