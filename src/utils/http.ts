import axios from "axios";

const API_URL = process.env.API_URL || ""; // only working on server

const httpInstance = axios.create({
  baseURL: API_URL,
  // headers: {
  //   "content-type": "application/json",
  // },
});

httpInstance.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => Promise.reject(error),
);

httpInstance.interceptors.response.use(
  (response) => {
    if (response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    console.log({ error });
    const err = (error.response && error.response.data && error.response.data) || error;

    return Promise.reject(err); // Propagate rejection back to caller
  },
);
export default httpInstance;
