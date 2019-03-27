const admin = '/admin'

import axios from 'axios'

/**
 * 获取资源树
 * @param query
 * @returns {AxiosPromise<any>}
 */
const fetchTree = query => {
    return axios.get(`${admin}/menu/allTree`)
}

/**
 * 更新数据
 * @param data
 * @returns {AxiosPromise<any>}
 */
const update = data => {
    return axios.put(`${admin}/menu/`, data)
}

/**
 * 创建资源
 * @param data
 * @returns {AxiosPromise<any>}
 */
const create = data => {
    return axios.post(`${admin}/menu/`, data)
}

/**
 * 删除资源
 * @param id
 * @returns {AxiosPromise}
 */
const remove = id => {
    return axios.delete(`${admin}/menu/${id}`)
}

export {
    fetchTree,
    update,
    create,
    remove
}