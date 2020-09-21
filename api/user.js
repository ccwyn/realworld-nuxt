import request from '@/utils/request'

export const login = data => {
  return request({
    method: "POST",
    url: "/api/users/login",
    data: data,
  })
}
export const register = data => {
  return request({
    method: "POST",
    url: "/api/users",
    data: data,
  })
}