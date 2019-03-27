import alarmComponent from '../UnusualVehicleStandby/alarmComponent/index.vue';
export default {
    name:'abnormalVehicleQuery',
    props: ['windowOutHeight'],
    components:{
        alarmComponent
    },
    data(){
        return {
            listData: [{
                index:1,
                toDoNum:'YC2018122800005',
                AbnormalCauses:'2018-12-27 10:30，停车超时（8天12小时25分钟）',
                currentState:'2018-12-28 10:30:35，离线（5天12小时25分钟）',
                generationtime:'2018-12-28 10:30:35',
                AffiliatedCompany:'中厚公司',
                VehicleLabels:['有保险','已结清'],
                Handler:'小明',
                LatestProcessingDetails:"【小智-派单维护】2018/12/28 09:50:25已派单-维修",
                handlerTime:'2019-03-25 10:00:00',
                handlerType:'待办关闭'
            }],//列表数据
            filters: {
                domSearch: [{
                    select: ['toDoNum'],
                    content: '',
                    startDate: '',
                }], //查询框
                isdelete: '0',
            },
            options: [{
                value: '0',
                label: '异常车辆查询'
              }, {
                value: '1',
                label: '已处理车辆查询'
              }
            ],
            selectValue:'异常车辆查询',
            listLoading: false,
            isShow:false,//已处理车辆查询时  显示处理时间及处理方式
            //更多
            openMore:false,
            //详情
            formDialogTableVisible:false,
            tags: [
                { name: '有保险', type: 'info' },
                { name: '已扣车', type: 'success' },
                { name: '已逾期', type: 'success' },
                { name: '已垫款', type: 'success' },
                { name: '已结清', type: 'success' },
                { name: '疑似风险', type: 'danger' }
            ],
            //
            feedbackVisible: false

        }
    },
    methods:{
        // 添加查询条件
        addSelect() {
            this.filters.domSearch.push({
                select: [],
                content: ''
            });
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
        //反馈回复
        feedback(row,index){
            console.log(row,index)

        },
        //信号检测
        signalDetection(){

        },
        //下拉选择
        selectBox(index){
           if(index==1){
              this.isShow=true;
           }else{
              this.isShow=false;
           }
        },
        //展开详情
        formDetailHandle(index){
            this.formDialogTableVisible=true;
        },
        handleClose(index){
            this.tags.splice(index,1)
        },
        feedbackClose(done) {
            this.feedbackVisible=false;
        }

    },
    created(){

    }
}