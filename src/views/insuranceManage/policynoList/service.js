import axios from 'axios';

//保单号管理
const getPolicyNumList = params => {
    return axios.get(`insurance/insurancePolicyno/query`, {params: params});
};
//保费记录
const getPremiumRecordList = params => {
    return axios.get(`insurance/insurancePremium/query`, {params: params});
};
//获取保险公司
const getInsuranceCompany = params => {
    return axios.get(`admin/corporateinfo/page`, {params: params});
};
//验证保单号是否重复
const IsPolicyNumRepeat = params => {
    return axios.get(`insurance/insurancePolicyno/query/policynoIsExist`, {params: params});
};
//增加保单号
const addPolicyno = params => {
    return axios.post(`insurance/insurancePolicyno/add`, params)
};
//增加保费
const addInsurancePremium = params => {
    return axios.post(`insurance/insurancePremium/add`, params)
};
//修改保单号
const modifyPolicyNo = params => {
    return axios.put(`insurance/insurancePolicyno/mod`, params)
};
//变更记录状态
// const changeRecordStatus = params => {
//     return axios.put(`insurance/insurancePolicyno/mod/isactive`, params)
// };

// const remove = id => {
//     return axios.remove(`insurance/insuranceTemplate/page/${id}`)
// };

const getAlertSetting = params => {
    return axios.get(`admin/sysParam/getByCodeType?paramtype=1`, {
        params
    })
};

const modifyAlertSetting = params => {
    return axios.put(`/admin/sysParam`, params)
};

export {
    getPolicyNumList,
    getPremiumRecordList,
    addPolicyno,
    getInsuranceCompany,
    IsPolicyNumRepeat,
    addInsurancePremium,
    modifyPolicyNo,
    // changeRecordStatus
    // remove,
    getAlertSetting,
    modifyAlertSetting
}