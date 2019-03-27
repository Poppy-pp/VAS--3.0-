import http from '@/utils/http'
import axios from 'axios'
import Qs from 'qs'
// form-data —— 'multipart/form-data'
// Qs.stringify ——'application/x-www-form-urlencoded' 处理成表单query格式
// params —— 以？key=value 形式拼接在url后面

let baseVAS = '/vasms-web';

//登陆
export function loginbyUser (username, password, remember_me, grant_type) {
    return http({
        url: `/auth/oauth/token`,
        method: 'post',
        headers: {
            'Authorization': 'Basic dmFzbXM6dmFzbXM='//登录接口写死的请求头
        },
        params: {username, password, grant_type}
    })
}

// 退出登录
export function logout (accesstoken, refreshtoken) {
    return http({
        url: `/auth/authentication/removeToken`,
        method: 'post',
        params: {accesstoken, refreshtoken}
    })
}

//查询用户所有信息，存储导航树
export function getUserInfo (userToken) {
    return http({
        url: `/admin/user/userinfoAll`,
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + userToken
        },
    })
}

export function loginOldVas (username, password) {
    const formData = new FormData();
    formData.append('username', username)
    formData.append('password', password)
    formData.append('remember_me', 'true')
    return axios.post('/vasms-web/login', formData)
}

export function getUserMenu (token) {
    return axios.get('/admin/menu/userMenu', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
}