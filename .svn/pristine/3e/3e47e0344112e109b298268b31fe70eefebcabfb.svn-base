/* 
 * @description: 后台数据接口配置中心 
 * @author: pl
 * @update: pl (2018-08-07 10:55) 
 */
import axios from 'axios';
import Qs from 'qs';

let base = '/vasms-web';
let api = '/api';


/*--------------------------------------------------首页-------------------------------------------------------*/
//饼图数据展示数据接口——今日订单量
export const getDeclareStatistics = params => {
	return axios.get(`${base}/api/v1/busi/declareStatistics`, {
		params: params
	});
};
//首页四个bar的数据
export const getIndexBoxInfo = params => {
	return axios.get(`${base}/api/v1/sys/fpDataInfo/oiv/dt`);
};
//echarts订单分析
export const getoaHomeBarStartList = params => {
	return axios.get(`${base}/api/v1/busi/declareStatistics`, {
		params: params
	});
};
//echarts订单分析
export const getoaHomeBarEndList = params => {
	return axios.get(`${base}/api/v1/busi/declareStatistics?type=new_build_end`, {
		params: params
	});
};
//提醒-待办数量统计
export const getFormCounts = params => {
	return axios.get(`${base}/api/v1/workflow/task/user/task/count`, {
		params: params
	})
};
