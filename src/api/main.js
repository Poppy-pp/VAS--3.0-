/* 
 * @description: 后台数据接口配置中心 
 * @author: pl
 */
// form-data —— 'multipart/form-data'
// Qs.stringify ——'application/x-www-form-urlencoded' 处理成表单query格式
// params —— 以？key=value 形式拼接在url后面

import axios from 'axios';
import Qs from 'qs';

let base = '/vasms-web';


/*--------------------------------------------------登陆-------------------------------------------------------*/
//修改密码
export const editPassword = params => {
    return axios.put(`/admin/user/modifyUser`, params);
};
// 忘记密码——检查用户是否存在
export const checkMobileExit = params => {
    return axios.get(`/admin/user/isExit?content=` + params.tel);
};
//忘记密码——获取验证码
export const getMobileCode = params => {
    return axios.get(`/admin/smsCode/` + params.tel);
};
//忘记密码——提交修改
export const forgetPwd = params => {
    return axios.put(`/admin/user/resetUser`, Qs.stringify(params));
};
//提醒-待办数量统计
export const getFormCounts = params => {
    return axios.get(`${base}/api/v1/workflow/task/user/task/count`, {
        params: params
    })
};
