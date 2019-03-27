import axios from 'axios';

export const getdeliveryListAll = params => {
    return axios.get(`/sto/stoDelivery/page`, { params: params })
};
// 查看物流
export const getViewLogistics = params => {
    return axios.get(`/sto/stoDelivery/queryLogisticsInfo/`+ params.id)
};
// 退回库房
export const getStorageInfoSelect = params => {
    return axios.get(`/sto/stoStorage/query/like`, {params: params})
};
// 查看详情
export const getAllocationDetails = params => {
    return axios.get(`/sto/allocation/detail/`+ params.id )
};
// 确认收货
export const receiptDelivery = params => {
    return axios.put(`/sto/stoDelivery/receiptConfirm/`+ params.id)
};
//确认退回
export const returnDelivery = params => {
    return axios.post(`/sto/stoDelivery/returnGoods`, params )
};
// 查询物流公司
export const getDeliveryCorps = params => {
    return axios.get(`/admin/sysDictionaryData/query`, { params })
};
// 查询退回原因
export const getReturnReason = params => {
    return axios.get(`/admin/sysDictionaryData/query?dictvalue=ReturnReason`, {params: params});
};
// 查看详情
export const getDeliveryDetails = params => {
    return axios.get(`/sto/stoDelivery/queryDelivery/`+ params.id )
};


