import axios, { AxiosInstance, AxiosRequestConfig, Canceler } from "axios";

export default class Request {
  api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      // withCredentials: false,
      baseURL: "http://127.0.0.1:5000",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  setToken = (token: string) => {
    this.api.defaults.headers.common.Authorization = token
      ? `Bearer ${token}`
      : "";
  };

  get = (url: string, config: AxiosRequestConfig = {}): any => {
    const apiConfig = {
      params: {
        ...config.params,
      },
    };
    const request = this.api
      .get(url, apiConfig)
      .then((res) => {
        return res.data?.data;
      })
      .catch((err) => console.log());
    return request;
  };

  post = <T = any>(
    url: string,
    body?: any,
    config: AxiosRequestConfig = {}
  ) => {
    const apiConfig = {
      params: {
        ...config.params,
      },
    };
    const request = this.api
      .post(url, body, apiConfig)
      .then((res) => {
        console.log(res);
        
        return res.data?.data;
      })
      .catch((err) => console.log(err));
    return request;
  };

  put = <T = any>(url: string, body?: any, config: AxiosRequestConfig = {}) => {
    let cancel: Canceler;
    const apiConfig = {
      params: {
        ...config.params,
      },
    };
    const request = this.api
      .put(url, body, apiConfig)
      .then((res) => {
        return res.data?.data;
      })
      .catch((err) => console.log());
    return request;
  };

  patch = <T = any>(
    url: string,
    body?: any,
    config: AxiosRequestConfig = {}
  ) => {
    let cancel: Canceler;
    const apiConfig = {
      params: {
        ...config.params,
      },
    };
    const request = this.api
      .patch(url, body, apiConfig)
      .then((res) => {
        return res.data?.data;
      })
      .catch((err) => console.log());
    return request;
  };

  delete = <T = any>(url: string, config: AxiosRequestConfig = {}) => {
    let cancel: Canceler;
    const apiConfig = {
      params: {
        ...config.params,
      },
    };
    const request = this.api
      .delete(url, apiConfig)
      .then((res) => {
        return res.data?.data;
      })
      .catch((err) => console.log());
    return request;
  };
}
