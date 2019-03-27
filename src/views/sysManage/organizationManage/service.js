import axios from 'axios';

let base = '/vasms-web';
let admin = '/admin';

// 更新
const update = params => {
    return axios.put(`${admin}/corporateinfo`, params)
}

// 创建
const create = params => {
    return axios.post(`${admin}/corporateinfo`, params)
}

// 获取父级公司名称列表
const getParentInfoList = params => {
    return axios.get(`${admin}/corporateinfo/page`, {
        params: params
    });
};

// 获取树
const getCorporateInfo = params => {
    return axios.get(`${admin}/corporateinfo/corporateTree`, {
        params
    });
};

// 通过id查询组织
const getCorporateById = id => {
    return axios.get(`${admin}/corporateinfo/${id}`);
};

// 删除
const remove = id => {
    return axios.delete(`${admin}/corporateinfo/${id}`);
};

export {
    getCorporateInfo,
    getParentInfoList,
    update,
    create,
    remove,
    getCorporateById
}