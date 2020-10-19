import request from '@/utils/request'

export function login(datas) {
  // const data = new FormData()
  // data.append('username', '15636561196')
  // data.append('password', 'txc196')
  return request({
    url: '/login',
    // url: 'http://txccs.fractaltest.cn/api/login',
    method: 'post',
    data: datas
  })
}

export function getInfo(token) {
  return request({
    // url: '/user/info',
    url: '/getmenu',
    method: 'get',
    params: { }
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}
