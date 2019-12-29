import request from '@/utils/request'

export function login(data) {
  return request({
    // url: '/user/login',
    url: '//dongwuzhijia.com/bms/v1/authority',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

// 查询所有居民
export function getAllUser(data) {
  const { pageNum, size } = data
  return request({
    url: '//dongwuzhijia.com/bms/v1/resident',
    method: 'GET',
    params: {
      pageNum,
      size
    }
  })
}

// 审核居民入住请求
export function auditUser(data) {
  return request({
    url: '//dongwuzhijia.com/bms/v1/resident/' + data.id,
    method: 'PUT',
    params: {
      isPass: 'true'
    }
  })
}
