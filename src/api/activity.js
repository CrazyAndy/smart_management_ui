import request from '@/utils/request'

// 创建活动
export function createActivity(data) {
  return request({
    url: '//dongwuzhijia.com/bms/v1/activities',
    method: 'POST',
    data
  })
}

// 查询所有活动
export function getActivityList(data) {
  const { pageNum, size } = data
  return request({
    url: '//dongwuzhijia.com/front/v1/activities',
    method: 'GET',
    params: {
      pageNum,
      size
    }
  })
}
