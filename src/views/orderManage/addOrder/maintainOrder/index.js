// import { get as getVinInfo, getSearchVinNum } from '@/views/insuranceManage/addInsurance/service';
// import { get as getVinInfo } from '@/views/insuranceManage/addInsurance/service';
import { cldeviceIsOnstate } from '@/views/insuranceManage/addInsurance/service'
import {
    initMaintainOrderForm,
    initMaintainOrderRules,
    submitRemove,
    submitRepair,
    sendRemove,
    transformRemove,
    sendRepair,
    transformRepair,
    getHistoryOrder,
    getSearchVinNum,
    getVinInfo,
    saveOrder
} from '../service'
import { getSysDictionaryDataList } from '@/views/sysManage/dictionaryManage/SysDictionaryData/service'
import installInfo from '../subComponent/install-info'

export default {
    name: "maintainOrder",
    data () {
        return {
            activeNames: ['1', '2', '3'],
            form: initMaintainOrderForm(),
            rules: initMaintainOrderRules(),
            vehicleInfo: null,
            vehiclevin: '',
            options: [
                {
                    dictdataname: 'REPAIR',
                    dictdatavalue: '维修',
                    children: []
                }, {
                    dictdataname: 'REMOVE',
                    dictdatavalue: '拆除',
                    children: []
                }
            ],
            checked: false,
            addressList: [],
            signalLoading: false,
            installDetails: [],
            el: null,
            groupArr: [],
            groupList: [],//分组列表
            reasonProp: {
                value: 'dictdataname',
                label: 'dictdatavalue',
            },
            isShowHistory: false,
            signalInfo: {},
            selectReason: [], // 默认选中原因
            baseGroupList: [], // 默认选中组员
            historyOrders: []
        }
    },
    props: ['corpid', 'baseForm', 'flow'],
    components: {
        installInfo
    },
    methods: {
        /**
         * 根据车架号/车牌号查询车辆列表
         * @param queryString
         * @param cb
         */
        querySearchVins (queryString, cb) {
            let para = {
                vin: queryString,
                page: 1,
                limit: 15
            };
            getSearchVinNum(para).then((res) => {
                cb(res.data.data.records)
            });
        },
        //根据车架号/车牌号查询
        handleSelectVin (item) {
            this.form.vehicleid = item.vehicleInfo.id
            this.initForm(item.vehicleInfo)
            this.installDetails = []
            if (!item.packinfos) {
                return
            }

            _.forEach(item.packinfos, item => {
                item.checked = false
                item.isShow = false
            })
            this.installDetails = _.cloneDeep(item.packinfos)
            const filterList = _.filter(item.packinfos, item => {
                return !item.newDeclaration || item.newDeclaration.status === '6'
            })
            if (!filterList.length) {
                this.$message.warning('该车辆没有可以拆除的设备')
            }
        },
        /**
         * 根据车辆ID查询车辆详情
         * @param vehicleId
         * @returns {Promise<void>}
         */
        async getVinInfo (vehicleId) {
            try {
                const params = {
                    vehicleId
                }
                const {data} = await getVinInfo(params)
                const item = data.data
                this.initForm(item.vehicleInfo)
                this.installDetails = []
                if (!item.packinfos) {
                    return
                }
                _.forEach(item.packinfos, item => {
                    item.checked = false
                    item.isShow = false
                })
                this.installDetails = item.packinfos
            } catch (e) {
                console.log(e)
            }
        },
        /**
         * 初始化表单
         * @param res
         */
        initForm (res) {
            this.vehicleInfo = {
                vehicleowner: '',//车主姓名
                vehiclevin: '',//车架号
                vehicletype: '',//车辆类型
                licenseplatenum: '',//车牌号
                vehicleownermobile: '',//车主电话
                vehiclemodel: '',//厂牌型号
                vehiclecategory: '',//车辆分类
                vehiclecolor: ''//车辆颜色
            }


            this.vehicleInfo.vehicletype = '二手车'

            if (!res) {
                return
            }

            if (res.ownerInfo) {
                this.vehicleInfo.vehicleowner = res.ownerInfo.name
                this.vehicleInfo.vehicleownermobile = res.ownerInfo.mobile
            }

            this.vehicleInfo.vehiclevin = res.vin
            this.vehiclevin = res.vin
            this.vehicleInfo.licenseplatenum = res.licenseplatenum
            this.vehicleInfo.vehiclemodel = res.model
            this.vehicleInfo.vehiclecategory = res.vehiclecategoryname
            this.vehicleInfo.vehiclecolor = res.colorname


        },
        /**
         * 图片浏览器
         */
        initViewer () {
            if (this.viewer)
                this.viewer.destroy()
            // const el = this.$refs['rpShowimgDialog'].$el
            // const doc = document.getElementsByClassName('image')
            this.$nextTick(() => {
                this.viewer = new Viewer(this.el)
            });
        },
        viewImageList (dc) {
            this.el = document.getElementById(dc)
            this.initViewer()
        },
        async viewHistory () {
            try {
                const params = {
                    vehicleid: this.form.vehicleid
                }
                const {data} = await getHistoryOrder(params)
                this.historyOrders = data.data
                this.viewImageList('history-orders')
            } catch (e) {
                console.log(e)
            }
        },
        /**
         * 信号检测
         * @param productNum
         */
        async getSignalInfo (productNum) {
            try {
                this.signalLoading = true
                this.signalInfo = {
                    curonlinestatus: '',//设备实时状态
                    locationmode: '',//定位方式
                    gps_satellite_count: '',//卫星或基站数量
                    signalqulity: '',//卫星或基站信号强度
                    curaddress: '',//定位地址
                    onlineStatus: ''//上线质量
                }
                const params = {
                    id: productNum
                }
                const {data} = await cldeviceIsOnstate(params)
                const realdata = data.data.realdata
                let curonlinestatus = ''
                let signalqulity = ''
                let onlineStatus = ''
                switch (realdata.istate) {
                    case 0:
                        curonlinestatus = "行驶";
                        break;
                    case 1:
                        curonlinestatus = "离线";
                        break;
                    case 2:
                        curonlinestatus = "停车";
                        break;
                    case 3:
                        curonlinestatus = "报警";
                        break;
                    case 4:
                        curonlinestatus = "无效定位";
                        break;
                    case 5:
                        curonlinestatus = "未定位";
                        break;
                }

                switch (realdata.signalqulity) {
                    case 0:
                        signalqulity = "未知";
                        onlineStatus = '差'
                        break;
                    case 1:
                        signalqulity = "无信号";
                        onlineStatus = '差'
                        break;
                    case 2:
                        signalqulity = "信号较弱";
                        onlineStatus = '差'
                        break;
                    case 3:
                        signalqulity = "信号良好/中";
                        onlineStatus = '中'
                        break;
                    case 4:
                        signalqulity = "信号强";
                        onlineStatus = '优'
                        break;
                }
                this.signalInfo.curonlinestatus = curonlinestatus
                this.signalInfo.onlineStatus = onlineStatus
                this.signalInfo.locationmode = realdata.locationmode
                this.signalInfo.gps_satellite_count = realdata.gps_satellite_count
                this.signalInfo.signalqulity = signalqulity
                const geocoder = new AMap.Geocoder({
                    radius: 1000 //范围，默认：500
                });
                geocoder.getAddress([realdata.lng, realdata.lat], (status, result) => {
                    if (status === 'complete' && result.info === 'OK') {
                        //获得了有效的地址信息:
                        this.signalInfo.curaddress = result.regeocode.formattedAddress
                    } else {
                        //获取地址失败
                    }
                });
                this.signalLoading = false
            } catch (e) {
                this.signalLoading = false
                console.log(e)
            }
        },
        /**
         * 提交派单
         */
        submit () {
            this.$refs.form.validate(async valid => {
                if (valid) {
                    try {
                        const arr = _.filter(this.installDetails, item => {
                            return item.checked
                        })
                        this.form.corpid = this.corpid
                        if (!arr.length) {
                            this.$message.warning('请选择维护设备')
                            return
                        }
                        this.form.busiImpdetails = _.map(arr, item => {
                            return {
                                prodmodelid: item.promodelid,
                                installpositioncode: item.busiImpdetail ? item.busiImpdetail.installpositioncode : '',
                                packid: item.id,
                                onlinestatus: item.busiImpdetail ? item.busiImpdetail.onlinestatus : '',
                                id: item.taskId ? item.taskId : '',
                                orilmpid: item.busiImpdetail ? item.busiImpdetail.id : ''
                            }
                        })
                        if (this.form.ordertype === 'REMOVE') {
                            await this.submitRemove(this.form)
                        } else {
                            await this.submitRepair(this.form)
                        }
                        this.$message.success('提交派单成功')
                        this.$router.push('/orderManage/declarationManage')
                    } catch (e) {
                        console.log(e)
                    }
                } else {
                    this.$message.warning('请完善信息')
                }
            })
        },
        /**
         * 提交删除单
         * @returns {Promise<void>}
         */
        async submitRemove () {
            try {
                if (this.form.taskid && this.flow) {
                    if (this.flow === '1') {
                        await sendRemove(this.form)
                    } else {
                        await transformRemove(this.form)
                    }
                } else {
                    await submitRemove(this.form)
                }
            } catch (e) {
                throw Error(e)
            }
        },
        /**
         * 提交维修单
         * @returns {Promise<void>}
         */
        async submitRepair () {
            try {
                if (this.form.taskid && this.flow) {
                    if (this.flow === '1') {
                        await sendRepair(this.form)
                    } else {
                        await transformRepair(this.form)
                    }
                } else {
                    await submitRepair(this.form)
                }
            } catch (e) {
                throw Error(e)
            }
        },
        save () {
            this.$refs.form.validate(async valid => {
                if (valid) {
                    try {
                        const arr = _.filter(this.installDetails, item => {
                            return item.checked
                        })
                        this.form.corpid = this.corpid
                        if (!arr.length) {
                            this.$message.warning('请选择维护设备')
                            return
                        }
                        this.form.busiImpdetails = _.map(arr, item => {
                            return {
                                prodmodelid: item.promodelid,
                                installpositioncode: item.busiImpdetail ? item.busiImpdetail.installpositioncode : '',
                                packid: item.id,
                                onlinestatus: item.busiImpdetail ? item.busiImpdetail.onlinestatus : '',
                                id: item.taskId ? item.taskId : '',
                                orilmpid: item.busiImpdetail ? item.busiImpdetail.id : ''
                            }
                        })
                        await saveOrder(this.form)
                        this.$message.success('保存成功')
                        this.$router.push('/orderManage/declarationManage')
                    } catch (e) {
                        console.log(e)
                    }
                } else {
                    this.$message.warning('请完善信息')
                }
            })
        },
        /**
         * 获取拆除|维修原因列表
         * @returns {Promise<void>}
         */
        async getReason () {
            try {
                const RemoveParams = {
                    dictvalue: 'RemoveReason',
                    limit: 1000,
                    page: 1
                }
                const RepairParams = {
                    dictvalue: 'RepairReason',
                    limit: 1000,
                    page: 1
                }
                const removeReason = await getSysDictionaryDataList(RemoveParams)
                const repairReason = await getSysDictionaryDataList(RepairParams)
                this.options[0].children = repairReason.data.data.records
                this.options[1].children = removeReason.data.data.records
            } catch (e) {
                console.log(e)
            }
        },
        changeReason (val) {
            this.form.ordertype = val[0]
            this.form.rpFaultcode = val[1]
        }
    },
    mounted () {
        this.getReason()
        if (this.baseForm) {
            this.form = _.cloneDeep(this.baseForm)
            this.getVinInfo(this.form.vehicleid).then(() => {
                _.forEach(this.form.busiImpdetails, itemBean => {
                    _.forEach(this.installDetails, item => {
                        if (item.busiImpdetail && itemBean.packid === item.busiImpdetail.packid) {
                            item.checked = true
                            item.taskId = itemBean.id
                        }
                    })
                })
            })
            this.selectReason = [this.form.ordertype, this.form.rpFaultcode]
            this.baseGroupList = [this.form.impgroupid, this.form.impby]
        } else {
            this.form = initMaintainOrderForm()
            this.selectReason = []
            this.baseGroupList = []
        }
    }
}