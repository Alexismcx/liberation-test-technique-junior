import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = "Bearer " + process.env.API_KEY_MOVIEDB;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;