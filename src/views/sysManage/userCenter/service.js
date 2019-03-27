import axios from 'axios';
import Qs from 'qs';

let base = '/vasms-web';
let api = '/api';

// 查询所有组织接口
const getCorpAllList = params => {
    return axios.get(`${base}/api/v1/org/corporateInfo/query/level`, {
        params: params
    })
};

// 组织权限编辑
const editCorpRole = params => {
    return axios.put(`/admin/sysUsercorporate/mod`, params)
};

// 查询当前用户已选组织 接口
const getThisCorpList = params => {
    return axios.get(`/admin/sysUsercorporate/query/` + params.userid, {
        params
    })
};

const getCheckoutOfUser = params => {
    return axios.get(`${base}/api/v1/sys/sysUserInfo/checkout/` + params.para + '/' + params.value);
};

const getSelectListVehnotTag = params => {
    return axios.get(`${base}/api/v1/car/vehicleInfo/query/notTag`, {
        params: params
    });
};

// 车辆权限——查询组织已有车辆
const getHaveVehList = params => {
    return axios.get(`${base}/api/v1/sys/shareVehicleInfo/query/vehicleInfos/` + params.usercorpid, params);
};

// 车辆权限——编辑组织已有车辆
const modifyHaveVehList = params => {
    return axios.post(`${base}/api/v1/sys/shareVehicleInfo/modify/corp/vehicles`, params);
};

// 查询所有分组接口
const getGroupAllList = params => {
    return axios.get(`${base}/api/v1/org/groupInfo/query/level/1`, {
        params: params
    })
};

// 查询已有分组
const getGroupThisList = params => {
    return axios.get(`${base}/api/v1/sys/sysUserInfo/groups/query/` + params.id, {
        params: params
    })
};

// 分组权限编辑
const editGroupRole = params => {
    return axios.put(`${base}/api/v1/sys/sysUserInfo/groups`, params)
};

// 标签查询
const corporatelevel_authority = params => {
    return axios.get(`${base}/api/v1/tag/corporatelevel/authority`, {
        params: params
    });
};

const corporatevehicle_vehicles = params => {
    return axios.get(`${base}/api/v1/tag/corporatevehicle/vehicles`, {params: params});
};

const getSelectListVehnotAuthority = params => {
    return axios.get(`${base}/api/v1/sys/shareVehicleInfo/authority/` + params.usercorpid + `/` + params.tagid, params);
};



// 查询用户列表
const getSysUserList = params => {
    return axios.get(`/admin/user/userPage`, {
        params:params
    });
};  

//编辑用户
const modifySysUserInfo = params => {
    return axios.put(`admin/user/`, params);
};


//角色权限列表
const getSysRoleInfoList = params => {
    return axios.get(`admin/role/rolePage`, {
        params: params
    });
};

//获取用户已有的角色
const getUserRole = params => {
    return axios.get(`admin/user/userrole/`, {
        params: params
    })
}
//用户资源编辑提交
const editUserRole = params => {
    return axios.put('admin/user/', params);
}

//删除用户
const removeSysUserInfo = params => {
    return axios.delete(`admin/user/`+ params.ids);
};
export {
    modifySysUserInfo,
    removeSysUserInfo,
    getSysRoleInfoList,
    editUserRole,
    getUserRole,
    getSysUserList,
    getCorpAllList,
    editCorpRole,
    getThisCorpList,
    getCheckoutOfUser,
    getSelectListVehnotTag,
    getHaveVehList,
    modifyHaveVehList,
    getGroupAllList,
    getGroupThisList,
    editGroupRole,
    corporatelevel_authority,
    corporatevehicle_vehicles,
    getSelectListVehnotAuthority
}