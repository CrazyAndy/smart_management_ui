import request from '@/utils/request'

// 上传照片
export function upload(data) {
  return request({
    url: '/bms/v1/infra/image/uploadImage',
    method: 'POST',
    data
  })
}
