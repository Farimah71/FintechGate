import axios, {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from "axios";
import { API_URL } from "../configs/globals";

const httpService = axios.create({
  baseURL: API_URL,
});

httpService.interceptors.request.use((config) => {
  const token = localStorage.fintech__access_token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

httpService.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response) {
      throw error.response?.data;
    }
  }
);

const baseApi = async <T>(
  url: string,
  options?: AxiosRequestConfig
): Promise<T> => {
  const response: AxiosResponse = await httpService(url, options);
  return response?.data as T;
};

const readData = async <T>(
  url: string,
  headers?: AxiosRequestHeaders
): Promise<T> => {
  const options: AxiosRequestConfig = {
    method: "GET",
    headers: headers,
  };

  return await baseApi<T>(url, options);
};

const createData = async <TModel, TResult>(
  url: string,
  data: TModel,
  headers?: AxiosRequestHeaders,
  isMultipart?: boolean
): Promise<TResult> => {
  const contentType = isMultipart ? "multipart/form-data" : "application/json";
  const options: AxiosRequestConfig = {
    method: "POST",
    data: isMultipart ? data : JSON.stringify(data),
    headers: { ...headers, "Content-Type": contentType },
  };

  return await baseApi<TResult>(url, options);
};

const updateData = async <TModel, TResult>(
  url: string,
  data: TModel,
  headers?: AxiosRequestHeaders,
  isMultipart?: boolean
): Promise<TResult> => {
  const contentType = isMultipart ? "multipart/form-data" : "application/json";
  const options: AxiosRequestConfig = {
    method: "PUT",
    data: isMultipart ? data : JSON.stringify(data),
    headers: { ...headers, "Content-Type": contentType },
  };

  return await baseApi<TResult>(url, options);
};

const deleteData = async (
  url: string,
  headers?: AxiosRequestHeaders
): Promise<void> => {
  const options: AxiosRequestConfig = {
    method: "DELETE",
    headers: headers,
  };

  return await baseApi(url, options);
};

export { readData, updateData, createData, deleteData };
