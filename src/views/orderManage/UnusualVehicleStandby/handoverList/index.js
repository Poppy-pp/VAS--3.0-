import newLabel from '../newLabel/index.vue';
import alarmComponent from '../alarmComponent/index.vue';
export default{
    name:'handoverList',
    props: ['windowOutHeight'],
    components:{
        newLabel,
        alarmComponent
    },
    data(){
        return {
            options: [{
                value: '1',
                label: '小智（夜班）'
                }, {
                value: '2',
                label: '小明'
                }, {
                value: '3',
                label: '小李'
            }],
            handoverPerson: '',//交接人
            listData: [{
                index:1,
                toDoNum:'YC2018122800005',
                AbnormalCauses:'2018-12-27 10:30，停车超时（8天12小时25分钟）',
                generationtime:'2018-12-28 10:30:35',
                AffiliatedCompany:'中厚公司',
                VehicleLabels:['有保险','已结清'],
                jurisdiction:true,
                handoverInfo:'交接说明',
                LatestProcessingDetails:"【小智-派单维护】2018/12/28 09:50:25已派单-维修"
            }],
            tags: [
                { name: '有保险', type: '' },
                { name: '已扣车', type: 'success' },
                { name: '已逾期', type: 'info' },
                { name: '已垫款', type: 'warning' },
                { name: '已结清', type: 'success' },
                { name: '疑似风险', type: 'danger' }
            ],
            AddOtherLabels:'',
            total: 0,
            currentPage: 1,
            pageSize: 15,
            listLoading: false,
            multipleSelection:[],
            //更多
            openMore:false,
        }
    },
    methods:{
        // 有效无效颜色切换
        tableRowClassName(row, index) {
            if (row.isdelete == 1) {
                return 'warning-row';
            }
            return '';
        },
        // 排序
        sortChange(col, prop, order) {
            let para = {
                prop: col.prop,
                order: col.order.substring(0, col.order.length - 6),
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        //切换当前页
        handleCurrentChange(val) {
            this.currentPage = val;
            this.handleQuerySelect();
            // this.GetPositions();
        },
        //切换每页显示数量
        handleSizeChange(val) {
            this.pageSize = val;
            this.GetPositions();
        },
        //获取列表
        GetPositions() {
            let para = {
                page: this.currentPage,
                limit: this.pageSize,
                // isdelete:this.filters.isdelete,
            };
            this.listLoading = true;
            // getVehTypeList(para).then((res) => {
            //     this.total = res.data.data.total;
            //     this.listData = res.data.data.records;
            //     this.listLoading = false;
            // }).catch((error) => {
            //     this.listLoading = false;
            // });
        },
        //搜索按钮——模糊查询
        handleQuerySelect() {
            let para = {
                page: this.currentPage,
                limit: this.pageSize,
                domSearch: this.filters.domSearch,
            };
            if (this.filters.domSearch[0].select.length == 0) {
                this.$message.error('请选择查询条件！');
                return;
            }
            this.listLoading = true;
            // getVehTypeListSelect(para).then((res) => {
            //     this.total = res.data.data.total;
            //     this.listData = res.data.data.records;
            //     this.listLoading = false;
            // }).catch((error) => {
            //     this.listLoading = false;
            // });
        },
    }
}