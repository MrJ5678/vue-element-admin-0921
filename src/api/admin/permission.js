import request from '@/utils/request'

export function getPower() {
  return request({
    url: '/getpower',
    method: 'get',
    params: {}
  })
}

export function getPermissionOfRole(params) {
  return request({
    url: '/editrole',
    method: 'get',
    params
  })
}
