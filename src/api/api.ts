import axios from "axios";

export const instance = axios.create({
    withCredentials: false,
    baseURL: 'https://reqres.in/api',
    timeout: 1000,
});

export const fetching_API = {
    getData: async function (per_page: number, page: number) {   // variable param for more functionality
       return await instance.get(`/products?per_page=${per_page}&page=${page}`)
            .then(response => response.data)
    }
}