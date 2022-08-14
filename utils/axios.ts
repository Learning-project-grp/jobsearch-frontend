import Router from 'next/router';
import axios from 'axios'

const Axios = axios.create({
  baseURL: 'https://protected-peak-29338.herokuapp.com/api',
})

// Add a request interceptor
Axios.interceptors.request.use(
  function (config) {
    if (config.headers && localStorage.getItem('jwt')) {
      config.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
Axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if(response.data) {
      if (response.data.code === '401') {
        localStorage.removeItem('jwt')
        return Router.push('/login')
      }
      return response.data
    }
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)

export default Axios