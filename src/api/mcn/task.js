import request from '@/utils/request'

export function uploadPdf() {
  return request({
    url: '/user/token/get',
    method: 'post',
    data: { id: 1 }
  })
}

export function task() {
  return request({
    url: '/task',
    method: 'get',
    params: {}
  })
}

export function uptask(datas) {
  return request({
    url: '/task',
    method: 'post',
    data: datas
  })
}

export function getcontract(datas) {
  return request({
    url: '/getcontract',
    method: 'get',
    params: datas
  })
}

export function signcontract(datas) {
  return request({
    url: '/signcontract',
    method: 'post',
    data: datas
  })
}

export function submitcontract(datas) {
  return request({
    url: '/submitcontract',
    method: 'get',
    params: datas
  })
}

export function gettasklist(page, where) {
  const datas = {
    page: page.page,
    search_content: where.search_content,
    contract_type: where.contract_type,
    start_time: where.prepare_timer && where.prepare_timer[0],
    end_time: where.prepare_timer && where.prepare_timer[1]
  }
  return request({
    url: '/gettasklist',
    method: 'get',
    params: datas
  })
}

export function gettaskinfo(id) {
  return request({
    url: '/gettaskinfo',
    method: 'get',
    params: { id: id }
  })
}
