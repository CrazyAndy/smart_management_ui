import request from '@/utils/request'

// 获取所有积分商品列表
export function getScoreList(data) {
  const { pageNum, size } = data
  return request({
    url: '//dongwuzhijia.com/bms/v1/score/scoreGoods',
    method: 'GET',
    params: {
      pageNum,
      size
    }
  })
}
