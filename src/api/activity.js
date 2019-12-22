import request from '@/utils/request'

// 创建活动
export function createActivity(data) {
  return request({
    url: '//dongwuzhijia.com/bms/v1/activities',
    method: 'POST',
    data
  })
}
