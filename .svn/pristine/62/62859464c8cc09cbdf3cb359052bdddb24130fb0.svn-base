import axios from 'axios';

// 操作记录查询
const getOperationRecordList = params => {
    return axios.get(`admin/syslog/query`, {params: params})
};
// 详情
const getOperationRecordDetails = params => {
    return axios.get(`admin/syslog/query/detail/` + params.id, params)
};

export {
    getOperationRecordList,
    getOperationRecordDetails
}