
import request from '@/utils/request'

export const getTags = params => {
  return request({
    method: "GET",
    url: "/api/tags",
    params,
  })
}

