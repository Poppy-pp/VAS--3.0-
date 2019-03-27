import util from 'utils/tools.js'
import { getTodoInfoList, getAssignee } from './service';

export default {
    props: ['windowOutHeight'],
    data () {
        return {
            bxDialogVisible: false,
            filters: {
                domSearch: [{
                    select: ['vehicleowner'],
                    content: ''
                }], //查询框
            },
            flowData: '',
            listLoading: false,
            todo: [],
            total: 0,
            currentPage: 1,
            pageSize: 15,
        }
    },
    methods: {
        //获取待办列表
        getTodo () {
            let empid = this.$store.state.user.employeeinfo.employeeInfo ? this.$store.state.user.employeeinfo.employeeInfo.id : ''
            let para = {
                page: this.currentPage,
                limit: this.pageSize,
                domSearch: this.filters.domSearch,
                empid: empid,//当前登陆员工id
            };
            this.listLoading = true;
            getTodoInfoList(para).then((res) => {
                this.listLoading = false;
                this.total = res.data.data.total;
                this.todo = res.data.data.records;
            }).catch((error) => {
                this.listLoading = false;
            });
        },
        //出单
        issueIns (index, row) {
            this.$router.push('/insuranceManage/issuingPolicy/' + row.id);//跳转，带上订单id
        },
        //切换当前页
        handleCurrentChange (val) {
            this.currentPage = val;
            this.getTodo();
        },
        //切换每页显示数量
        handleSizeChange (val) {
            this.pageSize = val;
            this.getTodo();
        },
        // 重置
        resetForm () {
            this.filters.domSearch = [{
                select: ['vehicleowner'],
                content: ''
            }]
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
        //时间转换1
        dateFormatter (row, col) {
            if (row.createdate == "" || row.createdate == undefined) return '--';
            return util.formatDate.format(new Date(row.createdate), 'yyyy-MM-dd hh:mm:ss');
        },

    },
    //初始化数据
    created () {
        this.getTodo();
    }
}