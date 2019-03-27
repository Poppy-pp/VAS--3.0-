import axios from 'axios';


export const getStorageInfoList = params => {
	return axios.get(`/sto/stoStorage/page`, {params: params})
};

export const addStorageInfo = params => {
	return axios.post(`/sto/stoStorage`, params)
};

export const modifyStorageInfo = params => {
	return axios.put(`/sto/stoStorage`, params)
};

export const removeStorageInfo = params => {
	return axios.delete(`/sto/stoStorage/`+ params.id + `?parentid=`+ params.parentid )
};

// 模糊查询
export const getStorageInfoSelect = params => {
    return axios.get(`/sto/stoStorage/query/like`, {params: params})
};

// 详情
export const getStorageDetails = params => {
	return axios.get(`/sto/stoStorage/`+ params.id  )
};
// 上级库房接口
export const getStorageParent = params => {
    return axios.get(`/sto/stoStorage/getByLevel?storagelevel=`+ params.storagelevel )
};
// 库管
export const getEmployeeInfoList = params => {
	return axios.get(`/admin/employee/query/like`, {
		params: params
	});
};
// 库管
export const getEmployeeInfo = params => {
	return axios.get(`/admin/employee/query`, {
		params: params
	});
};