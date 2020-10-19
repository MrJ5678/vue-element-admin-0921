import request from '@/utils/request'

export function getimgverif() {
  return request({
    url: '/getimgverif',
    method: 'get',
    params: {}
  })
}

export function register(datas) {
  return request({
    url: '/register',
    method: 'post',
    data: datas
  })
}

