import axios from 'axios';
// import Qs from 'qs';

// let base = '/vasms-web';
let admin = '/admin';
// let api = '/api';

const getEmployeeInfoList = params => {
	return axios.get(`${admin}/employee/query/like`, {
		params: params
	});
};

const addEmployeeInfo = params => {
	return axios.post(`${admin}/employee/add`, params);
};

const modifyEmployeeInfo = params => {
	return axios.put(`${admin}/employee/mod`, params);
};

//根据员工userid获取员工姓名
const getNamebyUserid = id => {
    return axios.get(`${admin}/employee/query/${id}`);
};

const checkRepeat = params => {
    return axios.get(`${admin}/user/isRepeat`, {
        params
    });
};


export{
    getEmployeeInfoList, 
    addEmployeeInfo, 
    modifyEmployeeInfo,
    getNamebyUserid,
    checkRepeat
}