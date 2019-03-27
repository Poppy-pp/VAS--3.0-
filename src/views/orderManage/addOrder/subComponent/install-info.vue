<template>
    <el-collapse-item class="lefw10 wzpdt10" name="3">
        <template slot="title">
            预约{{orderTypeName}}信息
        </template>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-form-item :label="orderTypeName + '联系人'" prop="contactname">
                    <el-input type="text" placeholder="请输入安装联系人" v-model="form.contactname"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item :label="orderTypeName + '联系方式'" prop="contactmobile">
                    <el-input type="text" placeholder="请输入安装联系方式" v-model="form.contactmobile"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item :label="'预约'+ orderTypeName +'时间'" prop="impapplydate">
                    <el-date-picker
                            v-model="form.impapplydate"
                            type="datetime"
                            placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="8" v-if="form.ordertype === 'INSTALL'">
                <el-form-item label="车辆到达情况" prop="vehiclestatus">
                    <div style="overflow: hidden; width: 100%">
                        <el-radio-group v-model="form.vehiclestatus">
                            <el-radio-button :label="1">车已到</el-radio-button>
                            <el-radio-button :label="0">车未到</el-radio-button>
                        </el-radio-group>
                    </div>
                </el-form-item>
            </el-col>
            <el-col :span="16">
                <el-form-item :label="orderTypeName+'地址'" prop="impaddress">
                    <el-select
                            v-model="form.impaddress"
                            filterable
                            remote
                            reserve-keyword
                            placeholder="请输入关键词"
                            :remote-method="autoInput"
                            value-key="name"
                            @change="changeAdress"
                            @focus="autoInput(form.impaddress)"
                            :loading="loading">
                        <el-option
                                v-for="(item, index) in addressList"
                                :key="index"
                                :label="item.name + '-' + item.district"
                                :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <gdmap @draggerMapMarker="draggerMapMarker" ref="vueAmap"></gdmap>
        </el-row>
        <el-row :gutter="20" v-if="isEmployee && showGroup">
            <el-col :span="8">
                <el-form-item label="技术人员" prop="impby">
                    <el-cascader
                            :options="groupList"
                            v-model="groupArr"
                            :props="cascaderProp"
                            filterable
                            @focus="getGroupInfoList"
                            @change="changeGroup">
                    </el-cascader>
                </el-form-item>
            </el-col>
            <el-col :span="8" v-if="groupArr.length">
                <ul class="install-list">
                    <li>{{selectEmployee.employeename}} {{selectEmployee.mobile}}</li>
                    <li>{{addressDetail}}</li>
                </ul>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="24">
                <el-form-item label="备注" prop="vehicleenginenum">
                    <el-input type="textarea" :rows="2" placeholder="请输入派单备注" v-model="form.declareremark"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
    </el-collapse-item>
</template>

<script>
    import { getGroupInfoList } from '@/views/sysManage/group/service'
    import gdmap from '@/views/map/gdmap';
    import { mapState } from 'vuex'
    import { orderTypeKeyValue } from '@/utils/constants'

    export default {
        name: "install-info",
        props: {
            form: {
                type: Object,
                // 对象或数组默认值必须从一个工厂函数获取
                default: function () {
                    return {}
                }
            },
            showGroup: {
                type: Boolean,
                default: true
            },
            baseGroupList: {
                type: Array,
                default: []
            }
        },
        watch: {
            baseGroupList (newValue) {
                if (newValue) {
                    this.getGroupInfoList().then(() => {
                        this.groupArr = newValue
                        this.showGorpDetails()
                    })
                }
            }
        },
        components: {
            gdmap
        },
        data () {
            return {
                loading: false,
                cascaderProp: {
                    value: 'id',
                    label: 'name',
                },
                addressList: [],
                groupList: [],
                groupArr: [],
                addressDetail: '',
                selectEmployee: {},
                orderTypeKeyValue: orderTypeKeyValue
            }
        },
        computed: {
            ...mapState({
                isEmployee: state => state.user.isEmployee
            }),
            orderTypeName () {
                return this.orderTypeKeyValue[this.form.ordertype] || ''
            }
        },
        methods: {
            /**
             * 高德地图API autocomplete
             * @param query
             */
            autoInput (query) {
                if (query !== '') {
                    this.loading = true;
                    let autoComplete = new AMap.Autocomplete({
                        city: '全国'
                    });
                    autoComplete.search(query, (status, result) => {
                        // 搜索成功时，result即是对应的匹配数据
                        this.addressList = result.tips
                        this.loading = false
                    })
                } else {
                    this.addressList = [];
                }
            },
            /**
             * 选择地图
             * @param item
             */
            changeAdress (item) {
                const address = item.district + item.address + item.name
                this.$refs.vueAmap.geocoder(address, (res) => {
                    this.form.impaddresscode = res.adcode
                    this.form.impaddress = address
                    this.form.impaddresslng = res.location.lng
                    this.form.impaddresslat = res.location.lat
                });
            },
            /**
             * 选择安装人员
             * @param item
             */
            changeGroup (item) {
                this.form.impgroupid = this.groupArr[0]
                this.form.impby = this.groupArr[1]
                this.addressDetail = ''
                this.showGorpDetails()
            },
            showGorpDetails () {
                const data = _.find(this.groupBeanList, item => {
                    return item.id === this.groupArr[0]
                })

                if (data) {
                    this.selectEmployee = _.find(data.employeeInfos, item => {
                        return item.userid === this.groupArr[1]
                    })
                }

                /**
                 * lat: 30.629002
                 * lng: 104.142672
                 */
                this.$refs.vueAmap.getAddress([104.142672, 30.629002], (res) => {
                    this.addressDetail = res
                });
            },
            /**
             * 获取安装组&组员
             * @returns {Promise<void>}
             */
            async getGroupInfoList () {
                try {
                    const params = {
                        page: 1,
                        limit: 15,
                        isactive: 1,
                        grouptype: 'INSTALL'
                    }
                    const {data} = await getGroupInfoList(params)
                    this.groupBeanList = data.data.records
                    this.groupList = _.map(data.data.records, item => {
                        return {
                            id: item.id,
                            name: item.groupname,
                            children: _.map(item.employeeInfos, employee => {
                                return {
                                    id: employee.userid,
                                    name: employee.employeename,
                                }
                            })
                        }
                    })
                } catch (e) {
                    console.log(e)
                }
            },
            /**
             * 地图拖动事件
             * @param address
             * @param lnglatXY
             * @param type
             */
            draggerMapMarker (address, lnglatXY, type) {
                this.form.impaddress = address
                this.form.impaddresslng = lnglatXY[0]
                this.form.impaddresslat = lnglatXY[1]
            },
        },
        mounted () {
            if (this.baseGroupList.length) {
                this.getGroupInfoList().then(() => {
                    this.groupArr = this.baseGroupList
                    this.showGorpDetails()
                })
            }
        }
    }
</script>

<style scoped>
    .install-list {
        margin: 30px 0 0 20px;
        list-style-type: square;
    }
</style>