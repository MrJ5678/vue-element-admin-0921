import request from '@/utils/request'

export function unprototaltask(datas) {
  return request({
    url: '/unprototaltask',
    method: 'get',
    params: datas
  })
}

export function adminsign(datas) {
  return request({
    url: '/adminsign',
    method: 'post',
    data: datas
  })
}
