import { mapState } from 'vuex'
import { addWarehouseProd, facilityFormRules, getDeliveryCorps, getProdByBatchno, returnFactoryProd } from '../service'
import { getStorageInfoSelect } from '../../basicSetting/storeHouseList/service'
import { getSIMModelList } from "../../basicSetting/simList/service";
import { getProdModelList } from "../../basicSetting/equipmentList/service";
import { getEmployeeInfoList } from "@/views/basicManage/employeeManage/service";
import { get as getFactory } from '../../returnFactory/service'
import { getSupplierList } from "../../basicSetting/supplierList/service";

export default {
    name: "invoice-detail",
    data () {
        return {
            getOutInvoices: [],
            facilities: [],
            selectInvoice: [],
            selectFacilities: [],
            invoicePagination: {
                limit: 10,
                page: 1,
                total: 0
            },
            getOutVisible: false,
            chooseFacilityVisible: false,
            scanNumberVisible: false,
            devNum: '',
            devNumList: [],
            inTypes: [{
                value: 'IN_PURCHASE',
                label: '采购入库'
            }, {
                value: 'IN_RETURN',
                label: '返厂入库'
            }],
            facilityForm: null,
            facilityFormRules: facilityFormRules,
            storageList: [],
            simTypeList: [],
            equipmentModelList: [],
            selectLoading: false,
            employeeInfoLis: [],
            deliveryCorps: [],
            submitLoading: false,
            currentBatchno: '',
            supplierList: []
        }
    },
    props: {
        itemInvoice: {
            default: function () {
                return {}
            },
            type: Object
        },
        storageInvoice: {
            default: function () {
                return {}
            },
            type: Object
        }
    },
    computed: {
        ...mapState({
            user: state => {
                return state.user
            }
        }),
        isProcurement () {
            return this.storageInvoice.intype === 'IN_PURCHASE'
        },
        isExcel () {
            return this.storageInvoice.isExcel
        },
        isView () {
            return this.storageInvoice.isView
        }
    },
    methods: {
        // ...mapActions(['setPutInData']),
        init () {
            if (!this.itemInvoice.stoStorageDto) {
                this.itemInvoice.stoStorageDto = {}
            }

            if (!this.itemInvoice.listUpload) {
                this.itemInvoice.listUpload = []
            }

            this.facilityForm = Object.assign(_.cloneDeep(this.itemInvoice), {
                username: this.itemInvoice.operator || this.user.name,
                userid: this.itemInvoice.operator || this.user.userid,
                actiontype: this.storageInvoice.intype,
                receiptno: this.storageInvoice.batchno,
                purchaseDate: new Date().format('yyyy-MM-dd'),
                createDate: new Date().format('yyyy-MM-dd'),
                storageid: this.itemInvoice.stoStorageDto.id,
                purchaseid: this.storageInvoice.stoPurchase.id,
                batchno: this.itemInvoice.receiptno,
                attachurl: this.storageInvoice.attachurl || '',
                contractno: this.storageInvoice.stoPurchase.contractno, //采购合同
                suppliername: this.storageInvoice.stoPurchase.suppliername, //供应商
                supplierid: this.storageInvoice.stoPurchase.supplierid, //供应商Id
                stoDelivery: this.itemInvoice.stoDelivery || {
                    deliverytype: '1'
                }
            })

            if (this.itemInvoice.stoDelivery) {
                this.facilityForm.stoDelivery.deliverycorp = this.itemInvoice.stoDelivery.deliverycorpname
            }

            JsBarcode(this.$refs['invoice-bar-code'], this.itemInvoice.receiptno,  {width: 1, height: 40});
        },
        changeUser (item) {
            if (!item.userid) {
                this.$message.warning('该用户userid为空!请重新选择')
                this.facilityForm.username = ''
                this.facilityForm.userid = ''
                return
            }
            this.facilityForm.username = item.employeename
            this.facilityForm.userid = item.userid
        },
        remove (index) {
            this.facilityForm.listUpload.splice(index, 1)
        },
        // 手动添加设备
        addFacility (boolean) {
            if (boolean) {
                this.facilityForm.listUpload.push({
                    isEdit: true
                })
            } else {
                this.devNumList = []
                this.scanNumberVisible = true
            }
        },
        chooseInvoices () {
            if (!this.facilityForm.supplierid) {
                this.$message.warning('请选择供应商')
                return
            }
            this.getOutVisible = true
            this.selectInvoice = []
            this.getOutInvoiceList()
        },
        // 行点击事件
        rowClick (row) {
            if (!this.isView) {
                _.forEach(this.facilityForm.listUpload, item => {
                    item.isEdit = false
                })
                row.isEdit = true
            }
        },
        handleSizeChange () {

        },
        handleCurrentChange () {

        },
        // 扫码添加设备
        keyUpDevice () {
            const arr = _.map(this.devNumList, 'equipmentnum')
            if (this.devNum && !arr.includes(this.devNum)) {
                this.devNumList.push({
                    equipmentnum: this.devNum
                })
                this.devNum = ''
            } else {
                this.$message.warning('已存在编号')
            }
        },
        // 删除扫码设备
        deleteSavDeviceNum (index) {
            this.devNumList.splice(index, 1)
        },
        // 扫码添加设备
        checkScanNumber () {
            this.scanNumberVisible = false
            this.facilityForm.listUpload = this.facilityForm.listUpload.concat(this.devNumList);
        },
        // 提交数据
        submit () {
            this.$refs.facilityForm.validate(async valid => {
                if (valid) {
                    this.submitLoading = true
                    try {
                        if (this.isProcurement) {
                            await addWarehouseProd(this.facilityForm)
                        } else {
                            await returnFactoryProd(this.facilityForm)
                        }
                        this.submitLoading = false
                        this.$emit('submit')
                        this.$message.success('提交成功')
                    } catch (e) {
                        this.submitLoading = false
                    }
                    return
                }
                this.$message.warning('请检查表单完善信息')
            })
        },
        // 获取供应商列表
        async getSupplierList () {
            try {
                const params = {
                    limit: 1000,
                    page: 1
                }
                const {data} = await getSupplierList(params)
                this.supplierList = data.data.records
            } catch (e) {
                console.log(e)
            }
        },
        // 选择供应商显示联系人和地址
        changeSupplier (supplier) {
            this.facilityForm.supplierid = supplier.id
            this.facilityForm.suppliername = supplier.suppliername
        },
        // 获取库房
        async getStorage () {
            try {
                const params = {
                    limit: 1000,
                    page: 1
                }
                const {data} = await getStorageInfoSelect(params)
                this.storageList = data.data.records
            } catch (e) {

            }
        },
        // 选择仓库获取电话地址
        changeStorage (storageId) {
            const storage = _.find(this.storageList, {id: storageId})
            this.facilityForm.storageid = storageId
            this.facilityForm.stoStorageDto.managermobile = storage.managermobile
            this.facilityForm.stoStorageDto.storageaddress = storage.storageaddress
            this.facilityForm.stoStorageDto.managername = storage.managername
        },
        // 获取sim类型列表
        async getSIMModelList () {
            try {
                const params = {
                    limit: 1000,
                    page: 1,
                    isactive: 1
                }
                const {data} = await getSIMModelList(params)
                this.simTypeList = data.data.records
            } catch (e) {

            }
        },
        // 获取设备型号列表
        async getEquipmentModelList () {
            try {
                const params = {
                    limit: 1000,
                    page: 1,
                    isactive: 1
                }
                const {data} = await getProdModelList(params)
                this.equipmentModelList = data.data.records
            } catch (e) {

            }
        },
        // 搜索员工
        remoteMethod (query) {
            let para = {
                page: this.currentPage,
                limit: this.pageSize,
                isactive: '1',
                domSearch: [{
                    select: ['employeename'],
                    content: query
                }],
            };
            this.selectLoading = true;
            getEmployeeInfoList(para).then(({data}) => {
                this.selectLoading = false
                this.employeeInfoLis = data.data.records
            })
        },
        // 经办人下拉
        userChange (r) {
            this.selectLoading = true;
            getEmployeeInfoList({limit: 1000, isactive: 1}).then((res) => {
                this.employeeInfoLis = res.data.data.records;
                this.selectLoading = false;
            });
        },
        async getOutInvoiceList () {
            try {
                const params = {
                    page: this.invoicePagination.page,
                    limit: this.invoicePagination.limit,
                    actionstatus: 'COMPLETE',
                    supplierid: this.facilityForm.supplierid
                }
                const {data} = await getFactory(params)
                this.getOutInvoices = data.data.records
                this.invoicePagination.total = data.data.total
            } catch (e) {
                console.log(e)
            }
        },
        dateFormatter (row) {
            return new Date(row.actiondate).format('yyyy-MM-dd')
        },
        selectInvoiceFn (selection) {
            this.selectInvoice = selection
        },
        selectFacility (selection) {
            this.selectFacilities = selection
        },
        chooseFacilityFn () {
            this.currentBatchno = this.selectInvoice[0].batchno
            this.chooseFacilityVisible = true
            this.selectFacilities = []
            this.getProdByBatchno()
        },
        async getProdByBatchno () {
            try {
                const {data} = await getProdByBatchno(this.currentBatchno)
                this.facilities = data.data.records
            } catch (e) {
                console.log(e)
            }
        },
        confirmFacility () {
            let obj = {},
                arr = [],
                flag = false
            _.forEach(this.facilityForm.listUpload, item => {
                obj[item.equipmentnum] = 1
            })
            _.forEach(this.selectFacilities, item => {
                if (obj[item.equipmentnum]) {
                    flag = true
                    arr.push(item.equipmentnum)
                }
            })
            if (flag) {
                this.$message.warning(`以下 ${arr.join(',')} 设备型号重复添加!`)
                return
            }
            this.chooseFacilityVisible = false;
            this.getOutVisible = false
            this.facilityForm.listUpload = this.facilityForm.listUpload.concat(this.selectFacilities);
        },
        async getDeliveryCorps () {
            try {
                const params = {
                    dictvalue: 'ExpressCompany',
                    limit: 1000,
                    page: 1
                }
                const {data} = await getDeliveryCorps(params)
                this.deliveryCorps = data.data.records
            } catch (e) {

            }
        },
        changeEquipmentModel (value, index) {
            const equipmentModel = _.find(this.equipmentModelList, {modelitem: value})
            if (equipmentModel) {
                this.facilityForm.listUpload[index].modelname = equipmentModel.modelname
                return
            }
            this.facilityForm.listUpload[index].modelname = ''
        },
        changeSimMode (value, index) {
            const cardModel = _.find(this.simTypeList, {modelitem: value})
            if (cardModel) {
                this.facilityForm.listUpload[index].cardmodelname = cardModel.modelname
                return
            }
            this.facilityForm.listUpload[index].cardmodelname = ''
        }
    },
    mounted () {
        this.getEquipmentModelList()
        this.getSIMModelList()
        this.init()
    }
}