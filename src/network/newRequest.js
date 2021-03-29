import {requestAxios} from './index';

// 测试案例
// export function test(){
//   return requestAxios({
//     url: "/new/active",
//     method: "GET",
//     params: {
//       msg:'你好啊'
//     }
//   })
// }

/**
 *
 * 调用函数， 管理员创建发布一个新的活动
 * @export
 * @param {*} obj  活动必备的参数
 * @return   Promise
 */
export function createNewActive(obj){
  return requestAxios({
    url:"/active/create",
    method:"POST",
    data:{
      obj
    }
  })
}

/**
 *
 *
 * @export  请求新的活动列表
 * @param {*} page 
 * @param {*} count
 * @returns  promise 
 */
 export function getAllNewActive(page, count){
  return requestAxios({
    url:"/getNewList",
    method: 'GET',
    params: {
      page, count
    }
  })
}

export function uploadImage(file){
  return requestAxios({
    url: '/image:123',
    method: "POST",
    data: file,
    // 其他对象通过params 传播
    // 只能接受一个file对象
    headers:{'Content-Type':'multipart/form-data'}
  })
}