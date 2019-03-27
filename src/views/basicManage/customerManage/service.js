import axios from 'axios';
// import Qs from 'qs';

// let base = '/vasms-web';
let admin = '/admin';
// let api = '/api';

const getEmployeeInfoList = params => {
	return axios.get(`${admin}/customerinfo/query/like`, {
		params: params
	});
};

const addEmployeeInfo = params => {
	return axios.post(`${admin}/customerinfo`, params);
};

const modifyEmployeeInfo = params => {
	return axios.put(`${admin}/customerinfo`, params);
};

export{
    getEmployeeInfoList, 
    addEmployeeInfo, 
    modifyEmployeeInfo
}