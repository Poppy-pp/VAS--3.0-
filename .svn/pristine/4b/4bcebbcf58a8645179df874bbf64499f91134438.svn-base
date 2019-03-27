import axios from 'axios';
import Qs from 'qs';

let base = '/vasms-web';
let api = '/api';

//首页四个bar的数据
export const getIndexBoxInfo = params => {
    return axios.get(`${base}/api/v1/sys/fpDataInfo/oiv/dt`);
};

//文章管理接口
export const getArtcileList = params => {
    return axios.get(`${base}/api/v1/cms/artcile/`, {
        params: params
    })
};

// 详情——包含内容content
export const getArtcileListItem = params => {
    return axios.get(`${base}/api/v1/cms/artcile/` + params.id)
};