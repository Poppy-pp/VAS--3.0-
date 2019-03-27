import axios from 'axios'

export const getInsuranceDataCount = params => {
    return axios.get('/insurance/insuranceinfo/query/insuranceDataStatistic', {
        params
    })
}

export const getPolicyno = params => {
    return axios.get('/insurance/insurancePolicyno/query/queryAllPolicyno', {
        params
    })
}