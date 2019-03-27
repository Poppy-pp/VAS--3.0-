//数据检测接口
import axios from "axios";

let base = '/vasms-web';
let admin = '/admin';

//分组信息管理接口
const getGroupInfoList = params => {
    return axios.get(`${admin}/groupinfo/query/like`, {
        params: params
    });
};

const addGroupInfo = params => {
    return axios.post(`${admin}/groupinfo`, params);
};

const modifyGroupInfo = params => {
    return axios.put(`${admin}/groupinfo`, params);
};

//设置分组信息无效
const SetStateGroupInfo = params => {
    // return axios.put(`${base}/api/v1/org/groupInfo/` + params.id, params);
    return axios.put(`${admin}/groupinfo/`, params);
};

export {
    getGroupInfoList,
    addGroupInfo,
    modifyGroupInfo,
    SetStateGroupInfo
}