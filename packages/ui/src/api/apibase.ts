import axios, { AxiosRequestConfig } from "axios";

const API_URL = ""; // process.env.BASE_API_URL;

export interface ResponseApi<T> {
  success: boolean;
  result: T;
  exceptions: any;
  status: number;
}

const service = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

// Request interceptors
service.interceptors.request.use(
  config => {
    // You can add custom headers here
    // config.headers['Bearer'] = ""
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    response.data = <ResponseApi<any>>{
      success: true,
      result: response.data,
      exceptions: "",
      status: response.status
    };
    return response;
  },
  error => {
    // if (error.response.status === 401) {
    //   store.dispatch('logout')
    //   window.location.reload()
    // } else {
    let errorResponse = <ResponseApi<any>>{
      success: false,
      result: null,
      exceptions: error.response.data.message,
      status: error.response.status
    };
    return Promise.reject(errorResponse);
    // }
  }
);

export const callApi = async (
  config: AxiosRequestConfig
): Promise<ResponseApi<any>> => {
  try {
    const response = await service(config);
    return response.data;
  } catch (e) {
    return e;
  }
};

export default service;
