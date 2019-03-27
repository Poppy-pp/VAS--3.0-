import axios from 'axios';
import Qs from 'qs';

let base = '/vasms-web';
let api = '/api';








//获取列表
const getAttdRuleList = params => {
	return axios.get(`/admindept/attdRule/page/`, {
		params: params
	})
};
//新增
const addAttdRule = params => {
	return axios.post(`/admindept/attdRule/`, params)
};
//删除
const removeAttdRule = params => {
	return axios.delete(`/admindept/attdRule/`+ params.id)
};
//修改
const modifyAttdRule = params => {
	return axios.put(`/admindept/attdRule/`, params)
};
//模糊查询
const getSelectAttdRuleList = params => {
	return axios.get(`admindept/attdRule/query/like/`, {
		params: params
	});
};
//获取员工所属部门列表
const getDeptList = params => {
	return axios.get(`admin/departmentinfo/queryDepartmentDTO`, {
		params: params
	});
};
//分组信息管理接口
const getGroupInfoList = params => {
	return axios.get(`admin/groupinfo/page`, {
		params: params
	});
};

//区域管理接口
const getAttdCenterList = params => {
	return axios.get(`/admindept/attdCenter/byname/`, {
		params: params
	})
};

export{
    getAttdRuleList, 
    addAttdRule, 
    modifyAttdRule, 
    removeAttdRule, 
    getSelectAttdRuleList, 
    getGroupInfoList, 
    getDeptList, 
    getAttdCenterList 
}