import request from '@/utils/request'

export function anchortask() {
  return request({
    url: '/anchortask',
    method: 'get',
    params: {}
  })
}
