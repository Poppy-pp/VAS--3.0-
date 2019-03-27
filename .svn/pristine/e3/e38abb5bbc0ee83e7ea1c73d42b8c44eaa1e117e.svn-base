import axios from 'axios';
import Qs from 'qs';

let base = '/vasms-web';
let api = '/api';


//获取列表
const getAttdCenterList = params => {
	return axios.get(`/admindept/attdCenter/byname/`, {
		params: params
	})
};
//新增
const addAttdCenter = params => {
	return axios.post(`/admindept/attdCenter/`, params)
};
//修改
const modifyAttdCenter = params => {
	return axios.put(`/admindept/attdCenter/` , params)
};
//删除
const removeAttdCenter = params => {
	return axios.delete(`/admindept/attdCenter/`+ params.id)
};

export{
        getAttdCenterList, 
        addAttdCenter, 
        modifyAttdCenter, 
        removeAttdCenter
}