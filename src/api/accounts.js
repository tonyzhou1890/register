import request from '@/utils/request'

// 获取账户列表
export function list(data) {
  return request({
    url: '/register/account/list',
    method: 'post',
    data
  })
}

// 更改账户权限
export function changePermission(data) {
  return request({
    url: '/register/account/updatePermission',
    method: 'post',
    data
  })
}