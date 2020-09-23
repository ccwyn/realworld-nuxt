import request from "@/utils/request";

export const getArticles = (params) => {
  return request({
    method: "GET",
    url: "/api/articles",
    params,
  });
};

export const getYourFeddArticles = (params) => {
  return request({
    method: "GET",
    url: "/api/articles/feed",
    params,
    headers: {
      Authorization: `Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTE1NzkzLCJ1c2VybmFtZSI6ImNjd3luIiwiZXhwIjoxNjA2MDExOTU3fQ.YHLQUlzMkl8BddaoE9zVXEMO_wUfe89dvbkyr9keudI`,
    },
  });
};
