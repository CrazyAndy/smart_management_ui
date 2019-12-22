import request from '@/utils/request'

// 获取资讯列表
export function getArticleList(data) {
  const { pageNum, size } = data
  return request({
    url: '//dongwuzhijia.com/bms/v1/information',
    method: 'GET',
    params: {
      pageNum,
      size
    }
  })
}

// 创建资讯
export function createArticle(data) {
  return request({
    url: '//dongwuzhijia.com/bms/v1/information',
    method: 'POST',
    data
  })
}

