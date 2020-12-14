import {
  request
} from './request'

export function addArticle(obj) { //增加文章
  return request({
    method: 'post',
    url: '/admin/saveArticle',
    data: obj
  })
}

export function getArticle() {
  return request({ //获得所有的
    method: 'post',
    url: '/articleList',

  })
}
export function delectArticle(index, row) {
  return request({ //删除
    method: 'post',
    url: '/admin/deleteArticle',
    data: {
      _id: row._id
    }
  })
}
export function getNowArticle(id) {
  return request({ //编辑
    method: 'get',
    url: '/articleDetail/' + id,

  })
}


export function getAllUser() {
  return request({ //获得所偶用户
    method: 'post',
    url: '/User',

  })
}

export function delectUser(index, row) {
  return request({ //删除
    method: 'post',
    url: '/User/delect',
    data: {
      name: row.name
    }

  })
}
export function upLoadImg(obj) {
  return request({
    method: 'post',
    url: '/admin/updateUser',
    data: obj
  })
}

export function upImg(obj) {
  return request({
    method: 'post',
    url: '/upImg',
    data: obj,


  })
}
