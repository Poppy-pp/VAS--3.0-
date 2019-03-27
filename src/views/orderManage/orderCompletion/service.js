import axios from 'axios'

export const reviewOrder = (url, params) => {
    return axios.put(url, params)
}