import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/register/account/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/register/account/detail',
    method: 'post'
  })
}

export function logout() {
  return request({
    url: '/register/account/logout',
    method: 'post'
  })
}

// 注册
export function register(data) {
  return request({
    url: '/register/account/register',
    method: 'post',
    data
  })
}
