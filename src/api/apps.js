import request from '@/utils/request'

// 获取应用列表
export function list() {
  return request({
    url: '/register/apps/list',
    method: 'post'
  })
}

// 注册应用
export function create(data) {
  return request({
    url: '/register/apps/create',
    method: 'post',
    data
  })
}

// 更新应用
export function update(data) {
  return request({
    url: '/register/apps/update',
    method: 'post',
    data
  })
}