import axios from 'axios'
let base = '/vasms-web';

//设备接入搜索模糊查询接口
export const getPlatProdList = params => {
    return axios.get(`/business/sysPlatappoint/queryAllPlatPoint`, {
        params: params
    });
};

export const addPlatProd = params => {
    return axios.post(`/business/sysPlatappoint`, params);
};

export const modifyPlatProd = params => {
    return axios.put(`/business/sysPlatappoint`, params);
};

export const removePlatProd = params => {
    return axios.delete(`/business/sysPlatappoint/${params.id}`, {
        params
    });
};

/* 设备接入搜索模糊查询接口*/
export const getSelectPlatProdList = params => {
    return axios.get(`/business/sysPlatappoint/queryAllPlatPoint`, {
        params: params
    });
};

//获取设备型号
export const getMoNameList = params => {
    return axios.get(`/sto/stoModel/product/page`, {
        params
    });
};
// 通讯平台接口
export const getPlatList = params => {
    return axios.get(`/business/sysPlat/page`, {
        params
    });
};

// 设备型号自动匹配设备编号
export const getProdList = params => {
    return axios.get(`/sto/stoProduct/prodComb`, {
        params: params
    });
};