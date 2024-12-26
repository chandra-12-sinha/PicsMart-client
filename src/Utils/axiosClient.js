import {
  KEY_ACCESS_TOKEN,
  removeItem,
  setItem,
  getItem,
} from "./LocalStorageManager";
import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "http://localhost:4100/v1",

  withCredentials: true,
});

// axiosClient.intercepter.request.use((request)=>{
//     const accessToken = getItem(KEY_ACCESS_TOKEN)
//      request.headers['Authorization'] = `Bearer ${accessToken}`;

//      return request;
// })
axiosClient.interceptors.request.use((request) => {
  const accessToken = getItem(KEY_ACCESS_TOKEN);
  request.headers["Authorization"] = `Bearer ${accessToken}`;

  return request;
});

axiosClient.interceptors.response.use((response) => {
  const data = response.data;
  console.log(data, "axiosclient");

  if (data && data.status === "ok") {
    return data;
  }

  const originalRequest = response.config;
  const statusCode = data.statusCode;
  const errorMessage = data.message || " unexpected error";

  if (
    statusCode === 401 &&
    originalRequest.url === `http://localhost:4100/v1/auth/refreshtoken`
  ) {
    removeItem(KEY_ACCESS_TOKEN);
    window.location.replace("/login", "_self");

    return Promise.reject(errorMessage);
  }

  if (statusCode === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    const response = axios
      .create({
        withCredentials: true,
        baseURL: "http://localhost:4100/v1",
      })
      .post("/auth/refreshtoken");

    console.log(response);
    if (response.status === "ok") {
      setItem(KEY_ACCESS_TOKEN, response.data.request.accessToken);
      console.log(response.data);

      originalRequest.headers[
        "Authorization"
      ] = `Bearer ${response.data.result.accessToken}`;

      return axios(originalRequest);
    }else {
        removeItem(KEY_ACCESS_TOKEN);
        window.location.replace('/login', '_self');
        return Promise.reject(errorMessage);
    }
  }
  return Promise.reject(errorMessage);
});
