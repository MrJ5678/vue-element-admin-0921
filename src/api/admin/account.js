import request from '@/utils/request'

export function mcnlist() {
  return request({
    url: '/mcnlist',
    method: 'get',
    params: {}
  })
}

export function anchorlist() {
  return request({
    url: '/anchorlist',
    method: 'get',
    params: {}
  })
}

export function editstate(datas) {
  return request({
    url: '/editstate',
    method: 'post',
    data: datas
  })
}

export function getanchorid() {
  return request({
    url: '/getanchorid',
    method: 'get',
    params: {}
  })
}

export function saveinfo(datas) {
  return request({
    url: '/saveinfo',
    method: 'post',
    data: datas
  })
}

export function autogener(datas) {
  return request({
    url: '/autogener',
    method: 'get',
    params: datas
  })
}

export function addanchor(datas) {
  return request({
    url: '/addanchor',
    method: 'post',
    data: datas
  })
}

export function addmcn(datas) {
  return request({
    url: '/addmcn',
    method: 'post',
    data: datas
  })
}
