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
    url:"active/create",
    method:"POST",
    data:{
      obj
    }
  })
}