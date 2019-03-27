import insuranceCountChart from '@/components/insuranceCountChart'
import { getInsuranceDataCount, getPolicyno } from './service'
import { mapState } from 'vuex'
import { getThisCorpList } from '@/views/sysManage/userCenter/service'

export default {
    name: "insuranceCount",
    data () {
        return {
            policynos: [],
            policyno: '',
            countData: {},
            corpList: [],
            corpId: ''
        }
    },
    components: {
        insuranceCountChart
    },
    computed: {
        ...mapState({
            corporateinfo: state => {
                return state.user.corporateinfo
            },
            userid: state => {
                return state.user.userid
            },
            permissions: state => {
                return state.user.permissions
            },
            isEmployee: state => {
                return state.user.isEmployee
            }
        }),
    },
    methods: {
        async getInsuranceDataCount () {
            try {
                const params = {
                    insurancecorpid: this.corpId,
                    policyno: this.policyno
                }
                const {data} = await getInsuranceDataCount(params)
                this.countData = data.data
            } catch (e) {

            }
        },
        async getPolicyno () {
            try {
                const params = {
                    insurancecorpid: this.corpId
                }
                const {data} = await getPolicyno(params)
                this.policynos = data.data
            } catch (e) {

            }
        },
        jump (name, boolean) {
            if (!boolean) {
                this.$message.warning('该账号无权限进入详情页面，请联系管理员!')
                return
            }
            this.$router.push({
                name,
                params: {
                    policyno: this.policyno
                }
            })
        },
        isJump (page) {
            return this.permissions.includes(page)
        },
        async getThisCorpList () {
            try {
                let para = {
                    userid: this.userid,
                    system: 'A',
                    showCount: 1000,
                    corpcategory: 'INSURANCE'
                };
                const {data} = await getThisCorpList(para)
                this.corpList = data.data
                if (this.corpList.length) {
                    this.corpId = this.corpList[0].corporateid
                    if (this.isEmployee) {
                        this.corpId = ''
                    }
                    this.getInsuranceDataCount();
                    this.getPolicyno();
                }
            } catch (e) {

            }
        },
        initPolicyno () {
            this.getPolicyno()
            this.policyno = ''
            this.getInsuranceDataCount()
        }
    },
    mounted () {
        this.getThisCorpList();
    }
}