import axios from 'axios';
import Qs from 'qs';

let base = '/vasms-web';
let api = '/api';

const addAttdrecord = params => {
	return axios.post(`${base}/api/v1/att/attdrecord`, params)
};

const modifyAttdrecord = params => {
	return axios.put(`${base}/api/v1/att/attdrecord/` + params.id, params)
};

const removeAttdrecord = params => {
	return axios.post(`${base}/api/v1/att/attdrecord/batch`, Qs.stringify(params))
};




//获取列表
const getAttdrecordList = params => {
	return axios.get(`/admindept/attdRecord/bykey/`, {
		params: params
	})
};
export{
        getAttdrecordList, 
        addAttdrecord, 
        modifyAttdrecord, 
        removeAttdrecord 
}