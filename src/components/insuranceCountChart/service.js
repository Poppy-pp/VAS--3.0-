import axios from 'axios'

export const getCountChart = (url, params) => {
    return axios.get(`/insurance/insuranceinfo/query/${url}`, {
        params
    })
}