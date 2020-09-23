import {request} from "@/plugins/request";

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
    // headers: {
    //   Authorization: `Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTE1NzkzLCJ1c2VybmFtZSI6ImNjd3luIiwiZXhwIjoxNjA2MDExOTU3fQ.YHLQUlzMkl8BddaoE9zVXEMO_wUfe89dvbkyr9keudI`,
    // },
  });
};

export const addFavorite = (slug) => {
  return request({
    method: "POST",
    url: `/api/articles/${slug}/favorite`,

  });
};
export const deleteFavorite = (slug) => {
  return request({
    method: "DELETE",
    url: `/api/articles/${slug}/favorite`,
  });
};
export const getArticle = (slug) => {
  return request({
    method: "GET",
    url: `/api/articles/${slug}`,

  });
};
export const getComments = (slug) => {
  return request({
    method: "GET",
    url: `/api/articles/${slug}/comments`,

  });
};