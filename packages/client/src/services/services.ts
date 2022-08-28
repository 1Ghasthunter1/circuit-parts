import axios from "axios";

axios.interceptors.response.use(function (error) {
  console.log(error.data);
  return Promise.reject(error);
});

export default axios;
