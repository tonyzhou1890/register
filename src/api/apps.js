import request from '@/utils/request'

// 获取应用列表
export function list() {
  return request({
    url: '/register/apps/list',
    method: 'post'
  })
}
