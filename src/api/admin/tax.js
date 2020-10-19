import request from '@/utils/request'

export function getTax() {
  return request({
    url: '/gettax',
    method: 'get',
    params: {}
  })
}

export function saveTax(datas) {
  return request({
    url: '/settax',
    method: 'post',
    data: datas
  })
}
