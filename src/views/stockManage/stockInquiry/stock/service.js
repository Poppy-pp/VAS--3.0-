import axios from 'axios'

// 库房树
export const getStorageTree = params => {
    return axios.get('sto/stoStat/query/storageTree')
}

// 库存查询列表
export const getStockNumList = params => {
    return axios.get('sto/stoStat/query/storageProductStatistics', {
        params
    })
}

// 获取预警默认值
export const getEarlyWarningList = params => {
    return axios.get(`sto/stoWarning/query?${params}`)
}

export const addEarlyWarning = params => {
    return axios.post('sto/stoWarning/add', params)
}