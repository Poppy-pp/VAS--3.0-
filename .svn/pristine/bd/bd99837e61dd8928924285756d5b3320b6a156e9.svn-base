import axios from 'axios'

let base = '/vasms-web';
let admin = '/admin';

export const get = params => {
    // return new Promise((resolve) => {
    //     setTimeout(() => {
    //         resolve(data)
    //     }, 300)
    // })
    // return axios.get(`${base}/api/v1/workflow/new_build/declaration/${id}`)
    return axios.get(`${base}/gis/getHasInsuranceDeclaration`, {
        params: params
    })
}

//检查设备是否在线
export const cldeviceIsOnstate = params => {
    return axios.post(`/gisapiservice/Prod/proddetail`, params)
};

//提交保险信息
// export const addInsuranceDetail = params => {
//     return axios.post(`${base}/api/v2/commom_task/insu/` + params.taskId, params.properties)
// };

//出单
export const addInsuranceIssue = params => {
    return axios.put(`insurance/insuranceinfo/mod/issue`, params);
};

//人寿投保接口
export const addLifeIssue = params => {
    return axios.post(`insurance/insuranceinfo/life/insure`, params);
};

export const getInsurancePolicyno = params => {
    return axios.get(`insurance/insurancePolicyno/query/validInsuranceCorp`, {
        params
    })
}