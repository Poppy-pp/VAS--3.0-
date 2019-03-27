import axios from 'axios';
import Qs from 'qs';

export const personalStandby = params =>{
  return axios.get('/business/order/flow/user/task', params)
}
