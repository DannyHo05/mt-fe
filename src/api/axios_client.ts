import { MyCustomError } from "@/utils/models";
import axios from "axios";
import { Cookies } from "react-cookie";


const axiosClient = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    Accept:"application/json"
  }
})

axiosClient.interceptors.request.use(

  async (config) => {
    const cookies = new Cookies()
    config.headers.Authorization = `Bearer ${cookies.get('auth')}` 
    return config;
  },
  (error) => {
    // Do something with request error

    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    // Do something with response data
    return response.data;
  },
  (error) => {
    let errorMessage
    // Do something with response error
    if (error.response) {
      const errorData = error.response.data;
      if (error.response.status === 401) {
        // signOut() 
      }
      // throw new MyCustomError(errorData.statusCode, errorData.message, errorData.error)
      console.log(error)
      return Promise.reject(new MyCustomError(errorData.statusCode, errorData.message, errorData.error))
    } else {
      errorMessage = error;
      console.log(error)
    }
  }
);

export default axiosClient
