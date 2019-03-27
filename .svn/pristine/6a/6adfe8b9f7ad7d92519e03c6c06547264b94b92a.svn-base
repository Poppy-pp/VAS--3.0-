import axios from 'axios';
import Qs from 'qs';

let base = '/vasms-web';
let admin = '/admin';
let api = '/api';

//字典管理接口
const getSysDictionaryList = params => {
    return axios.get(`${admin}/sysDictionary/query`, {
        params: params
    });
};

const addSysDictionary = params => {
    return axios.post(`${admin}/sysDictionary/add`, params);
};

const modifySysDictionary = params => {
    return axios.put(`${admin}/sysDictionary/mod`, params);
};

const removeSysDictionary = params => {
    // return axios.delete(`${admin}/sysDictionary/del`, Qs.stringify(params));
    return axios.delete(`${admin}/sysDictionary/del?${Qs.stringify(params)}`);
};

export {
    getSysDictionaryList,
    addSysDictionary,
    modifySysDictionary,
    removeSysDictionary
}   