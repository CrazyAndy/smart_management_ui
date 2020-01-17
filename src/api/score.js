import request from '@/utils/request'

// 获取所有积分商品列表
export function getScoreList(data) {
  const { pageNum, size } = data
  return request({
    url: '/bms/v1/score/scoreGoods',
    method: 'GET',
    params: {
      pageNum,
      size
    }
  })
}

// 创建积分商品
export function createScoreGood(data) {
  return request({
    url: '/bms/v1/score/scoreGoods',
    method: 'POST',
    data
  })
}

// 删除积分商品
export function delScoreGood(id) {
  return request({
    url: '/bms/v1/score/scoreGoods/' + id,
    method: 'DELETE'
  })
}

// 积分商品详情
export function getScoreGood(id) {
  return request({
    url: '/bms/v1/score/scoreGoods/' + id,
    method: 'GET'
  })
}
