import axios from 'axios';
// import Nprogress from 'nprogress';

const instance = axios.create({
  timeout: 5000,
  baseURL: 'https://api.cat-shop.penkuoer.com', // 默认域名,为所有的ajax请求设置默认的请求域名
});

// 全局请求拦截
instance.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    console.log('发送网络请求之前执行');
    // Nprogress.start();
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// 全局响应拦截
instance.interceptors.response.use(
  function(response) {
    console.log('网络请求完成');
    // setTimeout(function() {
    //   Nprogress.done();
    // }, 500000);

    // Do something with response data
    console.log(response);
    return response;
  },
  function(error) {
    // Do something with response error
    // console.dir(error);
    // 401未授权 跳转登录页
    if (error.response.status == 401) {
      window.location.href = '/#/login';
    }
    return Promise.reject(error);
  }
);

export function get(url, params) {
  return instance.get(url, { params });
}

// export const post = (url, data) => axios.post(url, data);

export function post(url, data) {
  return instance.post(url, data);
}
