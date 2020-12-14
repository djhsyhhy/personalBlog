import {request} from './request'

export function published(obj) { //评论发表
  return request({
    method: 'post',
    url: '/comment/new',
    data: obj
  })
}

export function replyComment(obj) {
  return request({
    method: 'post',
    url: '/comment/reply',
    data: obj
  })
}