import {
  request
} from './request'

export function register(name, password) {
  return request({ //登录
    method: 'post', 
    url: '/admin/signIn',
    data: {
      name,
      password
    }

  })
}
export function tourists(from) {
  return request({ //注册
    method: 'post',
    url: '/admin/signUp',
    data: from
  })
}