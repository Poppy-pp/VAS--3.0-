import util from '../../../utils/tools.js'
import { getOperationRecordList, getOperationRecordDetails } from './service';

export default {
    props: ['windowOutHeight'],
    data () {
        return {
            filters: {
                startDate: '',
                vin: '',
                employeename: ''
            },
            recordFormVisible: false,
            listData: [],//操作记录
            total: 0,
            currentPage: 1,
            pageSize: 15,
            listLoading: false,
            dlistData: [],
            dlistLoading: false,
        }
    },
    methods: {
        //查看日志记录详情
        showDetails (index, row) {
            let para = {
                id: row.id
            };
            this.recordFormVisible = true;
            this.dlistLoading = true;
            getOperationRecordDetails(para).then((res) => {
                this.dlistLoading = false;
                this.dlistData = res.data.data;
            });
        },
        //格式化后台传来的时间戳
        dateFormatter (row, col) {
            return util.formatDate.format(new Date(row.logtime), 'yyyy-MM-dd hh:mm:ss');
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
        //获取操作记录列表
        handleQuery () {
            let para = {
                page: this.currentPage,
                limit: this.pageSize,
                employeename: this.filters.employeename,
                startTime: this.filters.startDate ? (this.filters.startDate[0] ? util.formatDate.format(new Date(this.filters.startDate[0]), 'yyyy-MM-dd hh:mm:ss') : '') : '',
                endTime: this.filters.startDate ? (this.filters.startDate[1] ? util.formatDate.format(new Date(this.filters.startDate[1]), 'yyyy-MM-dd hh:mm:ss') : '') : ''
            };
            this.listLoading = true;
            getOperationRecordList(para).then((res) => {
                this.listLoading = false;
                this.total = res.data.data.total;
                this.listData = res.data.data.records;
            });
        },
    },
    created () {
        this.handleQuery();
    }
}