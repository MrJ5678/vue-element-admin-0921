import request from '@/utils/request'

export function getcredentials() {
  return request({
    url: '/getcredentials',
    method: 'get',
    params: {}
  })
}

export function setcredentials(datas) {
  return request({
    url: '/setcredentials',
    method: 'post',
    data: datas
  })
}

export function getinvoice() {
  return request({
    url: '/getinvoice',
    method: 'get',
    params: {}
  })
}

export function setinvoice(datas) {
  return request({
    url: '/setinvoice',
    method: 'post',
    data: datas
  })
}

export function getmcninfo() {
  return request({
    url: '/getmcninfo',
    method: 'get',
    params: {}
  })
}

export function savemcninfo(datas) {
  return request({
    url: '/savemcninfo',
    method: 'post',
    data: datas
  })
}

export function editmcnpass(datas) {
  return request({
    url: '/editmcnpass',
    method: 'post',
    data: datas
  })
}
