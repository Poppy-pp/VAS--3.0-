import axios from 'axios';
import Qs from 'qs';

let base = '/vasms-web';
let api = '/api';


/* 接口管理模糊查询接口*/
const getSelectInterfaceList = params => {
    return axios.get(`admin/interfacesInfo/query/like`,{
        params: params
    });
};





//获取接口列表
const getInterfaceList = params => {
    return axios.get(`/admin/interfacesInfo/query/`, {
        params: params
    })
};

//新增
const addInterface = params => {
    return axios.post(`admin/interfacesInfo/add`, params)
};

//修改
const modifyInterface = params => {
    return axios.put(`admin/interfacesInfo/mod`, params)
};

//删除
const removeInterface = params => {
    return axios.delete(`admin/interfacesInfo/del?${Qs.stringify(params)}`)
};

// 参数接口
const getInterfaceParaList = params => {
    return axios.get(`admin/interfacesInfo/query/` + params.interfaceid)
};



export {
    getInterfaceList,
    addInterface,
    modifyInterface,
    removeInterface,
    getSelectInterfaceList,
    getInterfaceParaList
}