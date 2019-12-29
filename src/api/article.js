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

// 删除资讯
export function delArticle(id) {
  return request({
    url: '//dongwuzhijia.com/bms/v1/information/' + id,
    method: 'DELETE'
  })
}

// 获取文章详情
export function getArticleDetail(id) {
  return request({
    url: '//dongwuzhijia.com/bms/v1/information/' + id,
    method: 'GET'
  })
}
