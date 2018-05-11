import request from '@/utils/request'

export function login(username, password) { // 登陆
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) { // 获取用户信息token
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() { // 用户退出
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
