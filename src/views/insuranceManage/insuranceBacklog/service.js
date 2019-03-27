/* 
 * @description: 后台数据接口配置中心 
 */
import axios from 'axios';

//待办列表信息
export const getTodoInfoList = params => {
    return axios.get(`insurance/insuranceinfo/query/myAgent`, {params})
};

//获取有保险权限的文员
export const getAssignee = params => {
    return axios.get(`/admin/sysAssignment/getAssignee?assigntype=B3`, {params})
};