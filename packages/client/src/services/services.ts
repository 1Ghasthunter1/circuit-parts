import axios from "axios";

axios.interceptors.response.use(function (error) {
  return Promise.reject(error);
});

export default axios;
