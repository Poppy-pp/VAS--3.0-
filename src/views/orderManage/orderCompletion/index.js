import { getOrderById } from '../addOrder/service'
import { cldeviceIsOnstate } from "../issuingPolicy/service";
import util from 'utils/tools';
import { getToken } from '@/utils/auth'
import { orderTypeKeyValue } from '@/utils/constants'
import { reviewOrder } from './service'
import { getSysDictionaryDataList } from '@/views/sysManage/dictionaryManage/SysDictionaryData/service'
import { modifyVehInfo } from "../../basicManage/ownerVehicleManage/service";
import { getVehList } from "@/views/basicManage/ownerVehicleManage/service";
import { getVinInfo } from '../addOrder/service'

export default {
    name: "orderCompletion",
    data () {
        return {
            activeNames: ['1', '2', '3', '4', '5'],
            busiImpdetails: [],
            productList: [],
            installDetail: {
                ordertype: 'INSTALL'
            },
            busiPictures: [],
            vehicleInfo: {},
            remarkList: [],
            util: util,
            token: getToken(),
            selectVehicletype: '',
            selectLicenseplatenum: '',
            accept: '.jpg,.png',
            vehiclepowerList: {
                1: '汽油',
                2: '柴油',
                3: '纯电',
                4: '混动',
            },
            vehiclecategoryList: {
                1: '新车',
                2: '二手车',
                3: '资管追回',
            },
            currentUploadItem: null,
            positionArray: [],
            codeloading: false,
            vehlist: [],
            ordertypeKeyValue: orderTypeKeyValue,
            ordertypeUrl: {
                'INSTALL': '/business/orderNewBuild/reviewOrder',
                'REMOVE': '/business/orderVindicateRemove/reviewOrder',
                'REPAIR': '/business/orderVindicate/reviewOrder'
            },
            isOri: false,
            bindingPackInfo: []
        }
    },
    watch: {
        $route () {
            this.init()
        }
    },
    computed: {
        vehlistKeyValue () {
            const vehlistType = {}
            _.forEach(this.vehlist, item => {
                vehlistType[item.typecode] = item.typedesc
            })
            return vehlistType
        },
        ordertypename () {
            return this.ordertypeKeyValue[this.installDetail.ordertype]
        },
        differenceVehicletype () {
            return this.installDetail.impvehicletype && this.installDetail.impvehicletype != this.vehicleInfo.vehicletype
        },
        differenceLicenseplatenum () {
            return this.installDetail.impplate && this.installDetail.impplate !== this.vehicleInfo.licenseplatenum
        },
        isRemove () {
            return this.installDetail.ordertype === 'REMOVE'
        },
        isRepair () {
            return this.installDetail.ordertype === 'REPAIR'
        },
        isInstall () {
            return this.installDetail.ordertype === 'INSTALL'
        }
    },
    methods: {
        dateFormatter (date) {
            if (!date)
                return '-'
            return new Date(date).format('yyyy-MM-dd hh:mm:ss')
        },
        /**
         * 初始化
         */
        async init () {
            if (!this.$route.query.id)
                this.$message.error('没有找到该流程')

            this.vehChange()
            try {
                const {data} = await getOrderById({
                    id: this.$route.query.id
                })
                _.forEach(data.data.busiImpdetails, item => {
                    item.curonlinestatus = ''
                    item.recvtime = ''
                    item.curaddress = ''
                    item.pass = false
                    // item.stoPackinfoDtoOrg = Object.assign(_.clone(item.stoPackinfoDto), {
                    //     prodnum: '1231232'
                    // })
                    // item.currentStoPackinfoDto = _.clone(item.stoPackinfoDto)
                    item.currentStoPackinfoDto = item.stoPackinfoDto
                })
                this.busiImpdetails = data.data.busiImpdetails
                this.initInstallList(this.busiImpdetails)
                this.installDetail = data.data
                this.selectVehicletype = this.installDetail.impvehicletype
                this.selectLicenseplatenum = this.installDetail.impplate
                this.busiPictures = _.filter(data.data.busiPictures, item => item.pictype === "DC") //车辆照片
                if (data.data.cmsPackageDto) {
                    this.productList = [data.data.cmsPackageDto]
                }
                this.vehicleInfo = data.data.busiVehicleinfo
                this.initRemark(data.data)
                console.log(data.data)
            } catch (e) {
                console.log(e)
            }
        },
        /**
         * 拉取备注
         * @param data
         */
        initRemark (data) {
            this.remarkList = [
                {
                    remark: data.declareremark,
                    name: data.declarebyname,
                    date: this.dateFormatter(data.declaredate),
                    type: '报单',
                }, {
                    remark: data.assignremark,
                    name: data.declarebyname,
                    date: this.dateFormatter(data.declaredate),
                    type: '派单',
                }, {
                    remark: data.impremark,
                    name: data.declarebyname,
                    date: this.dateFormatter(data.declaredate),
                    type: '安装'
                }
            ]
        },
        initViewer () {
            if (this.viewer)
                this.viewer.destroy()
            const el = this.$refs['rpShowimgDialog'].$el
            this.$nextTick(() => {
                this.viewer = new Viewer(el)
            });
        },
        initInstallList (list) {
            _.forEach(list, item => {
                this.cldeviceIsOnstateItem(item)
            })

            this.initViewer()
        },
        // 设备状态
        async cldeviceIsOnstateItem (item) {
            const para = {
                id: item.prodnum || item.currentStoPackinfoDto.prodnum
            };

            item.curonlinestatus = "未定位";
            item.curaddress = '无定位';
            item.recvtime = ''

            if (!item.prodnum && !item.currentStoPackinfoDto.prodnum) {
                this.$message.warning('设备号为空')
                return
            }
            try {
                const {data} = await cldeviceIsOnstate(para)
                switch (data.data.realdata && data.data.realdata.istate) {
                    case 0:
                        item.curonlinestatus = "行驶";
                        break;
                    case 1:
                        item.curonlinestatus = "离线";
                        break;
                    case 2:
                        item.curonlinestatus = "停车";
                        break;
                    case 3:
                        item.curonlinestatus = "报警";
                        break;
                    case 4:
                        item.curonlinestatus = "无效定位";
                        break;
                    default:
                        item.curonlinestatus = "未定位";
                }

                    item.pass = data.data.realdata && data.data.realdata.signalqulity >= 3

                if (data.data.realdata) {
                    item.recvtime = data.data.realdata.recvtime
                    this.getAddress([data.data.realdata.lng, data.data.realdata.lat], para.id, (res) => {
                        item.curaddress = res
                    })
                }
            } catch (e) {
                console.log(e)
            }
        },
        /**
         * 切换维修设备
         */
        viewOriPackinfo () {
            _.forEach(this.busiImpdetails, item => {
                if (this.isOri) {
                    item.currentStoPackinfoDto = item.stoPackinfoDto
                } else {
                    item.currentStoPackinfoDto = item.stoPackinfoDtoOrg || {
                        promodelspecname: '',
                        promodelname: '',
                        prodnum: '',
                        installpositioncodename: ''
                    }
                }
            })
            this.isOri = !this.isOri
            this.initInstallList(this.busiImpdetails)
        },
        viewRemovePackinfo () {
            if(!this.isOri) {
                getVinInfo({
                    vehicleId: this.installDetail.vehicleid
                }).then(({data}) => {
                    _.forEach(data.data.packinfos, item => {
                        item.curonlinestatus = ''
                        item.recvtime = ''
                        item.curaddress = ''
                        item.pass = false
                    })
                    this.bindingPackInfo = data.data.packinfos
                    this.initInstallList()
                })
            }
            this.isOri = !this.isOri
            this.initViewer()
        },
        // initStoPackinfoDto (pack, packInfo) {
        //
        // },
        /**
         * 获取地址
         * @param lnglatXY
         * @param proname
         * @param callback
         */
        getAddress (lnglatXY, proname, callback) {
            var geocoder = new AMap.Geocoder({
                radius: 1000 //范围，默认：500
            });
            geocoder.getAddress(lnglatXY, (status, result) => {
                if (status === 'complete' && result.info === 'OK') {
                    //获得了有效的地址信息:
                    callback(result.regeocode.formattedAddress, 2);
                } else {
                    //获取地址失败
                }
            });
        },
        /**
         * 上传成功
         * @param res
         * @param file
         */
        uploadSuccess (res, file) {
            this.currentUploadItem.piclink = res.data
            this.initViewer()
        },
        clickUpload (item) {
            this.currentUploadItem = item
        },
        /**
         * 删除图片
         * @param item
         */
        removePic (item) {
            this.$confirm('确定删除图片？', '提示', {
                type: 'warning '
            }).then(() => {
                item.piclink = ''
                this.initViewer()
            }).catch(() => {

            })
        },
        /**
         * 订单信息保存
         * @returns {Promise<void>}
         */
        async reviewOrder () {
            try {
                const params = this.installDetail
                await reviewOrder(this.ordertypeUrl[params.ordertype], params)
                this.$message.success('保存成功')
                this.$router.push('/orderManage/declarationManage')
            } catch (e) {
                console.log(e)
            }
        },
        //安装位置初始化
        async changeInstallDecode (r) {
            try {
                this.codeloading = true;
                const params = {
                    limit: 1000,
                    page: 1,
                    dictvalue: 'InstallPositionCode'
                }
                const {data} = await getSysDictionaryDataList(params)
                this.positionArray = data.data.records;
                this.codeloading = false;
            } catch (e) {
                console.log(e)
            }
        },
        /**
         * 选择安装位置
         * @param item
         */
        changePosition (item) {
            item.installpositioncode = item.installpositioncodename.dictdataname
            item.installpositioncodename = item.installpositioncodename.dictdatavalue
        },
        /**
         * 更新车辆差异信息
         */
        async checkDifference () {
            try {
                const params = {
                    id: this.installDetail.vehicleid,
                    platecolorid: this.selectVehicletype,
                    licenseplatenum: this.selectLicenseplatenum
                }
                await modifyVehInfo(params)
                this.$message.success('保存车辆信息成功')
            } catch (e) {
                console.log(e)
            }
        },
        /**
         * 获取车辆类型
         * @param r
         */
        vehChange (r) {
            const params = {
                page: 1,
                limit: 10000,
                isactive: 1
            }
            getVehList(params).then((res) => {
                this.vehlist = res.data.data;
            });
        },
    },
    mounted () {
        this.init()
    }
}