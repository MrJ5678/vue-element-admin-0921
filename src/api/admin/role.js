import request from '@/utils/request'

export function getRole() {
  return request({
    url: '/getrole',
    method: 'get',
    params: {}
  })
}

export function addRole(params) {
  return request({
    url: '/createrole',
    method: 'post',
    params
  })
}

export function editRole(params) {
  return request({
    url: '/editrole',
    method: 'post',
    params
  })
}

export function delRole(params) {
  return request({
    url: '/delrole',
    method: 'post',
    params
  })
}

export function setPermission(params) {
  return request({
    url: '/torole',
    method: 'post',
    params
  })
}
