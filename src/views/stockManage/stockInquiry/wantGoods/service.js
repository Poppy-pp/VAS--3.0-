import axios from 'axios'

export const submit = params => {
    return axios.post('sto/stoRequest/batchRequest', params)
}

export const getHistory = storageid => {
    return axios.get(`sto/stoRequest/getByStorageid/${storageid}`)
}

