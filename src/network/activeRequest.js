import {requestAxios} from './index'

export function requestActiveList(page, count){
  // 请求活动列表
  return requestAxios({
    url:"/getActiveList",
    method: 'GET',
    params: {
      page, count
    }
  })
}