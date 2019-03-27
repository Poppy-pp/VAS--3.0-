import axios from 'axios';
import Qs from 'qs';

export const getStoPurchaseList = params => {
	return axios.get(`/sto/stoPurchase/page`, {params: params})
};

export const addStoPurchase = params => {
	return axios.post(`/sto/stoPurchase`, params)
};

// 详情
export const getStoPurchaseDetails = params => {
    return axios.get(`/sto/stoPurchase/`+ params.id )
};
// 供应商列表
export const getSupplierList = params => {
    return axios.get(`/sto/stoSupplier/page`, {params: params})
};
// 采购类型级联
export const getPurchaseCascader = params => {
    return axios.get(`/sto/stoModel/purchase/cascader`, {params: params})
};
// 获取采购合同编号
export const getBarcodeCGHT = params => {
    return axios.get(`/sto/qrcode/serialnumber/CGHT`, {params: params})
};
// 入库单详情
export const getDetails = params => {
    return axios.get(`/sto/stoPurchase/instockDetails`,{ params })
};

