import axios  from 'axios'
let base = '/vasms-web';

//查询车架号
export const getVehicleSearchInfoList = params => {
    return axios.get(`${base}/api/v1/car/vehicleInfo/`, {
        params: params
    });
};

//获取公司列表
export const searchCorpNameList = params => {
    return axios.get(`${base}/api/v1/org/corporateInfo`, {
        params: params
    });
};

//车型查询
export const getModelListInfo1 = params => {
    return axios.get(`${base}/api/v1/unify/unify/like`, {
        params: params
    })
};

//车型查询
export const getModelListInfo = params => {
    return axios.get(`${base}/api/v1/unify/unify`, {
        params: params
    })
};

//新装补登
export const getorderSupperDevice = params => {
    return axios.get(`${base}/api/v1/device/packInfo/all/vw`, {
        params: params
    });
};

//检查设备是否在线
export const cldeviceIsOnstate = params => {
    return axios.post(`/gisapiservice/Prod/proddetail`, params)
};

//提交设备安装 安装位置信息
export const getInstallPositionCode = params => {
    return axios.get(`${base}/api/v1/sys/sysDictionaryData?dicvalue=InstallPositionCode`)
};

//新装补登 添加
export const addorderSupper = params => {
    return axios.post(`${base}/api/v1/busi/declaration/makeup/order`, params);
};

// 通讯平台接口
export const getPlatList = params => {
    return axios.get(`${base}/api/v1/instruct/Plat/query/vw`, {
        params: params
    });
};

//新装补登修改
export const editorderSupperDevice = params => {
    return axios.put(`${base}/api/v1/busi/declaration/update/self/order`, params);
};

//获取公司名称列表
export const getCorpNameList = params => {
    return axios.get(`${base}/api/v1/org/corporateInfo/getAllCorpName`, {
        params: params
    });
};

//获取车辆上传图片位置，设备图片上传位置
export const getCarPicLocation = params => {
    return axios.get(`${base}/api/v1/sys/sysDictionaryData?dicvalue=PicType`)
};
