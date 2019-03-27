import { viewDistribution } from '../putInStorage/service'
import { get, receiptConfirm } from './service'
import { mapActions } from 'vuex'
import { getAllocationDetails } from "../equipmentAllocation/service";

export default {
    name: "returnFactory",
    data () {
        return {
            filters: {
                domSearch: [{
                    select: ['batchno'],
                    content: ''
                }], //查询框
            },
            putInList: [],
            loading: false,
            pagination: {
                limit: 15,
                total: 0,
                page: 1
            },
            inTypes: [{
                value: 'IN_PURCHASE',
                label: '采购入库'
            }, {
                value: 'IN_RETURN',
                label: '返厂入库'
            }],
            distributionVisible: false,
            expandLoading: false,
            logisticsList: [],
            notext: '',
            receivingVisible: false,
            multipleSelection: []
        }
    },
    props: ['windowOutHeight'],
    methods: {
        ...mapActions(['setPutInData']),
        resetForm () {
            this.filters = {
                domSearch: [{
                    select: [],
                    content: ''
                }]
            }
        },
        handleSizeChange (limit) {
            this.pagination.limit = limit
            this.get()
        },
        handleCurrentChange (page) {
            this.pagination.page = page
            this.get()
        },
        addSelect () {
            this.filters.domSearch.push({
                select: [],
                content: ''
            });
        },
        removeSelect (index) {
            this.filters.domSearch.splice(index, 1); //从当前index位置开始，删除一项
        },
        async get () {
            const params = {
                page: this.pagination.page,
                limit: this.pagination.limit,
                domSearch: this.filters.domSearch,
            }
            this.loading = true
            try {
                const {data} = await get(params)
                this.putInList = data.data.records
                this.pagination.total = data.data.total
                this.loading = false
            } catch (e) {
                console.log(e)
                this.loading = false
            }
        },
        dateFormatter (row) {
            return new Date(row.actiondate).format('yyyy-MM-dd')
        },
        typeFormatter (row) {
            const data = _.find(this.inTypes, {value: row.actiontype})
            return data.label || '未知'
        },
        viewDetails (row) {
            let para = {id: row.id}
            getAllocationDetails(para).then((res) => {
                this.$router.push({
                    name: `returnFactoryInvoice`,
                    query: res.data.data
                })
            })
        },
        // 查看物流
        async viewDistribution (row) {
            this.distributionVisible = true
            this.expandLoading = true
            this.logisticsList = []
            this.notext = ''
            try {
                const params = {
                    id: row.deliveryid
                }
                const {data} = await viewDistribution(params)
                this.expandLoading = false
                this.logisticsList = data.data.traces.reverse();//倒叙
                this.logisticsList.logisticName = data.data.logisticName;
                this.logisticsList.logisticCode = data.data.logisticCode;
            } catch (e) {
                this.expandLoading = false
                this.notext = '抱歉！该订单暂不支持查询！'
                if (e && e.data && e.data.msg) {
                    this.notext = e.data.msg
                }
            }
        },
        handleSelectionChange (val) {
            this.multipleSelection = val;
        },
        // 供应商收货
        async receiptConfirm () {
            const arr = _.chain(this.multipleSelection)
                .filter(item => item.actionstatus === 'COMPLETE')
                .map(item => item.batchno)
                .value()
            if (arr.length) {
                this.$message.warning(`已经收货的单号不允许在收货：${arr.join(',')}`)
                return
            }
            try {
                const params = {
                    actionids: _.map(this.multipleSelection, item => item.id)
                }
                await receiptConfirm(params)
                this.$message.success('操作成功')
                this.receivingVisible = false
                this.get()
            } catch (e) {
                console.log(e)
            }
        }
    },
    mounted () {
        this.get()
    }
}