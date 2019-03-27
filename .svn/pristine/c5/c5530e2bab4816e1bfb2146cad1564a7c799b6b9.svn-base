import axios from 'axios';

//保单模板管理接口
const get = params => {
    return axios.get(`insurance/insuranceTemplate/page`, {
        params: params
    })
};

const add = params => {
    return axios.post(`insurance/insuranceTemplate`, params)
};

const update = params => {
    return axios.put(`insurance/insuranceTemplate`, params)
};

const remove = id => {
    return axios.remove(`insurance/insuranceTemplate/page/${id}`)
};

export {
    get,
    add,
    update,
    remove
}