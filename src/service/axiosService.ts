import { ILoginResponse } from "@/interfaces/response/ILogin";
import { getHashedLocalStorage } from "@/utils/helpers/hash.helper";
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
  Method,
} from "axios";
import { toast } from "react-toastify";
import { IAxiosOptions } from "../interfaces/IAxios";
import { IResponse } from "../interfaces/IGlobal";

export const apiService = async <T>({
  method,
  path,
  Option,
}: {
  path: string;
  method: Method;
  Option?: IAxiosOptions<any>;
}): Promise<IResponse<T>> => {
  const axiosInstance = axios.create();
  const token = getHashedLocalStorage<ILoginResponse>("TodoApp").token;
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse<IResponse<T>>) => {
      return response;
    },
    (error: AxiosError<IResponse<T>>) => {
      if (error.response?.status === 401) {
        window.location.href = "/auth/login";
        localStorage.removeItem("TodoApp");
      }

      if (error) {
        toast.error(error.response?.data.massage);
      }
      // net Error
      if (error.code === "ERR_NETWORK") {
        toast.error("خطای ارتباط با سرور");
      }
      return Promise.reject(error.response?.data);
    }
  );

  // Merging headers
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...(Option?.headers || {}), // Merge custom headers from Option
  };

  const response = await axiosInstance.request({
    baseURL: import.meta.env.VITE_BASE_URL,
    method: method,
    url: path,
    ...Option,
    headers,
  });

  return response.data;
};
