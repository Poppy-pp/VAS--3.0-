import axios from 'axios'
import { checkMobile, checkVehicleNumber } from '@/utils/formValidation'

export const addReturnFactory = params => {
    return axios.post('/sto/returnfactory/add', params)
}

export const getDeliveryaddress = params => {
    return axios.get(`/sto/stoDeliveryaddress/page`, {
        params
    })
};

export const getReceiptno = params => {
    return axios.get(`/sto/qrcode/serialnumber/FC`)
};

export const facilityFormRules = {
    suppliername: [
        {required: true, message: '请选择供应商', trigger: 'change'}
    ],
    actiondate: [
        {required: true, message: '请选择返厂日期"', trigger: 'change'}
    ],
    'delivery.deliverytype': [
        {required: true, message: '请选择发货方式', trigger: 'change'}
    ],
    'delivery.deliverydate': [
        {required: true, message: '请选择发货日期', trigger: 'change'}
    ],
    'delivery.deliveryno': [
        {required: true, message: '请输入物流号', trigger: 'blur'}
    ],
    'delivery.deliverycorp': [
        {required: true, message: '请选择物流公司', trigger: 'change'}
    ],
    'delivery.vehicleplate': [
        {required: true, message: '请输入车牌号', trigger: 'blur'},
        {validator: checkVehicleNumber, trigger: 'blur'}
    ],
    'delivery.contactno': [
        {required: true, message: '请输入联系电话', trigger: 'blur'},
        {validator: checkMobile, trigger: 'blur'}
    ],
    username: [
        {required: true, message: '请选择经办人', trigger: 'change'}
    ]
}

export const getDeliveryCorps = params => {
    return axios.get(`/admin/sysDictionaryData/query`, {
        params
    })
}