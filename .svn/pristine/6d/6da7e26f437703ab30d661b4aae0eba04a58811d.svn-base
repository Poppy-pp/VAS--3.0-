import axios from 'axios'
import Qs from 'qs'

// 库存统计
export const getStoProdCount = params => {
    return axios.get('/sto/stoStat/query/storageProductStatistics', {params})
}
// 库存统计——当前库房权限查询
export const getStorages = params => {
    return axios.get('/sto/stoStat/query/storageTree', {params})
}
// 预警统计
export const getWarningList = params => {
    return axios.get('/sto/stoStat/query/WarnStatistics', {
        params,
        paramsSerializer: function(params) {
            return Qs.stringify(params, {arrayFormat: 'repeat'})
        }
    })
}
// 预警统计——当前库房权限查询
export const getStoragesList = params => {
    return axios.get('/sto/stoStat/query/userStorages', {params})
}
// 出库统计
export const getOutStock = params => {
    return axios.get('/sto/stoStat/query/outstock/count', {params})
}
// 出入库趋势图
export const getInoutStock = params => {
    return axios.get('/sto/stoStat/query/inout', {params})
}


export const getPolicyno = params => {
    return axios.get('/insurance/insurancePolicyno/query/queryAllPolicyno', {
        params
    })
}