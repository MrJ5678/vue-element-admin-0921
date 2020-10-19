import request from '@/utils/request'

export function branch_task_list(datas) {
  return request({
    url: '/branch_task_list',
    method: 'post',
    data: datas
  })
}

export function branchtaskinfo(datas) {
  return request({
    url: '/branchtaskinfo',
    method: 'post',
    data: datas
  })
}

export function surerelease(datas) {
  return request({
    url: '/surerelease',
    method: 'post',
    data: datas
  })
}

export function branchtaskrelease(datas) {
  return request({
    url: '/branchtaskrelease',
    method: 'post',
    data: datas
  })
}
