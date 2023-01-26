import axios from "axios";

export const instance = axios.create({
    withCredentials: false,
    baseURL: 'https://reqres.in/api',
    timeout: 1000,
});

export const fetching_API = {
    getData: async function (per_page: number, page: number) {   // variable param for more functionality
        return await instance.get(`/products?per_page=${per_page}&page=${page}&`)
            .then(response => response.data)
            .catch(err => {
                let errType = err.response.status + '';
                if (errType[0] === '5') {
                    alert('Error 5XX handled by')
                    console.log('Error 5XX handled by', err)
                } else if (errType[0] === '4') {
                    alert('Error 4XX handled by')
                    console.log('Error 4XX handled by', err)
                } else {
                    console.log(err)
                }
            })
    },
    getFilteredData: async function (filter: number) {
        return await instance.get(`/products/${filter}`)
            .then(response => response.data)
            .catch(err => {
                let errType = err.response.status + '';
                if (errType[0] === '5') {
                    alert('Error 5XX handled by')
                    console.log('Error 5XX handled by', err)
                } else if (errType[0] === '4') {
                    alert('Error 4XX handled by')
                    console.log('Error 4XX handled by', err)
                } else {
                    console.log(err)
                }
            })
    },
}