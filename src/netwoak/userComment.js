import {request} from './request'

export function getComment() {
  return request({
    method: 'get',
    url: '/user/getComment',
  })
}
export function addComment(obj) {
  return request({
    method: 'post',
    url: '/user/addComment',
    data: obj
  })
}