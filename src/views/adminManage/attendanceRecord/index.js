import util from 'utils/tools.js'
	//import NProgress from 'nprogress'
	import { 
                getAttdrecordList, 
                addAttdrecord, 
                modifyAttdrecord, 
                removeAttdrecord 
           } from './service.js';

	export default {
		props: ['windowOutHeight'],
		data() {
			return {
				filters: {
					employeename: ''
				},
				listData: [],
				customers: [],
				total: 0,
				currentPage: 1,
				pageSize: 15,
				listLoading: false,
				sels: [], //列表选中列
				editFormVisible: false, //编辑界面是否显示
				editLoading: false,
				editFormRules: {},
				//编辑界面数据
				editForm: {
					id: 0,
					employeename: 0,
					attendtype: '',
					attendtime: '2017-01-05',
					attendarea: '',
					attendaddress: '',
					attendsource: '',
					attendruleid: 0,
					attendresult: '',
					remarks: '',
				},

				addFormVisible: false, //新增界面是否显示
				addLoading: false,
				addFormRules: {
				},
				//新增界面数据
				addForm: {
					employeename: 0,
					attendtype: '',
					attendtime: '2017-01-05',
					attendarea: '',
					attendaddress: '',
					attendsource: '',
					attendruleid: 0,
					attendresult: '',
					remarks: '',
				},
			}
		},
		methods: {
			//时间转换1
			dateFormatter: function(row, col) {
				if(row.attendtime == "" || row.attendtime == undefined) return;
				return util.formatDate.format(new Date(row.attendtime), 'yyyy-MM-dd hh:mm:ss');
			},
			// 签入签出状态转换
			typeFormatter: function(row, col) {
				return row.attendtype == 'IN' ? '签入' : row.attendtype == 'OUT' ? '签出' : '';
			},
			//切换每页显示数量
			handleSizeChange(val) {
				this.pageSize = val;
				this.handleQuery();
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.handleQuery();
			},
			//搜索按钮——模糊查询
			handleQuerySelect() {
				let para = {
					page: 1,
					limit: this.pageSize,
					employeename: this.filters.employeename
				};
				this.listLoading = true;
				getAttdrecordList(para).then((res) => {
					this.total = res.data.data.total;
					this.listData = res.data.data.records;
					this.listLoading = false;
				}).catch((error) => {
					this.listLoading = false;
				});
			},
			//获取保单列表
			handleQuery() {
				let para = {
					page: this.currentPage,
					limit: this.pageSize,
					employeename: this.filters.employeename
				};
				this.listLoading = true;
				//NProgress.start();
				getAttdrecordList(para).then((res) => {
					this.total = res.data.data.total;
					this.listData = res.data.data.records;
					this.listLoading = false;
				});
			},

			//删除
			handleDel(index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					let para = {
						ids: row.id,
						method: "delete"
					};
					removeAttdrecord(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.handleQuerySelect();
					});
				}).catch(() => {

				});
			},
			//显示编辑界面
			handleEdit(index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
				this.GetCustomers();
			},
			//显示新增界面
			handleAdd() {
				this.addFormVisible = true;
				this.addForm = {
					employeename: 0,
					attendtype: '',
					attendtime: '2017-01-05',
					attendarea: '',
					attendaddress: '',
					attendsource: '',
					attendruleid: 0,
					attendresult: '',
					remarks: '',
				};
				this.GetCustomers();

			},
			//编辑
			editSubmit() {
				this.$refs.editForm.validate((valid) => {
					if(valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.editForm);
							modifyAttdrecord(para).then((res) => {
								this.editLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.handleQuery();
							});
						});
					}
				});
			},
			//新增
			addSubmit() {
				this.$refs.addForm.validate((valid) => {
					if(valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.addForm);
							addAttdrecord(para).then((res) => {
								this.addLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.handleQuery();
							});
						});
					}
				});
			},
			selsChange(sels) {
				this.sels = sels;
			},
		},
		created() {
			this.handleQuery();
		}
	}