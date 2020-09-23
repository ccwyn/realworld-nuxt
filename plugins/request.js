import axios from "axios";

export const request = axios.create({
  baseURL: "https://conduit.productionready.io",
});
// 插件导出函数必须是默认成员
export default ({ store }) => {
  request.interceptors.request.use(
    (config) => {
      const { user } = store.state;
      if (user && user.token) {
        config.headers.Authorization = `Token ${user.token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // request.interceptors.response.use(
  //   (response) => {
  //     return response;
  //   },

  //   (error) => {
  //     return Promise.reject(error);
  //   }
  // );
};
