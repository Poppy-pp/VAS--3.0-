import axios from 'axios';


export const getSupplierList = params => {
    return axios.get(`/sto/stoSupplier/page`, {params: params})
};

export const addSupplier = params => {
    return axios.post(`/sto/stoSupplier`, params)
};

export const modifySupplier = params => {
    return axios.put(`/sto/stoSupplier`, params)
};

export const removeSupplier = params => {
    return axios.post(`/sto/stoSupplier/`+ params.id )
};
// 详情
export const getSupplierDetails = params => {
    return axios.get(`/sto/stoSupplier/`+ params.id )
};
// 模糊查询
export const getSupplierInfoSelect = params => {
    return axios.get(`/sto/stoSupplier/query/like`, {params: params})
};
// 供应商类别
export const getSupplierType = params => {
    return axios.get(`/admin/sysDictionaryData/query?dictvalue=SupplierType`, {params: params})
};