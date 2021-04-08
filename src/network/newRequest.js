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
/**
 *
 *
 * @export    传递file对象和id
 * @param {*} file
 * @param {*} id
 * @returns
 */
export function uploadImage(file, id){
  
  return requestAxios({
    url: `/image${id}`,
    method: "POST",
    data: file,
    // 其他对象通过params 传播
    // 只能接受一个file对象
    headers:{'Content-Type':'multipart/form-data'}
  })
}

/**
 *
 *
 * @export  通过id去查找关于新的活动的信息
 * @param {*} id  活动id
 * @returns
 */
export function searchNewById(id){
  return requestAxios({
    url: '/searchById2',
    method: "GET",
    params: {
      id,
    }
  })
}
/**
 *
 *
 * @export  通过主题去查找关于新的活动的信息
 * @param {*} id  活动id
 * @returns
 */
export function searchNewByThema(thema){
  return requestAxios({
    url: '/searchByThema2',
    method: "GET",
    params: {
      thema,
    }
  })
}
/**
 *
 *
 * @export 参加活动,_id活动id，PId志愿id
 * @param {*} _id
 * @param {*} pId
 * @returns
 */
export function enterActive(_id, pId){
  return requestAxios({
    url: '/enterActive',
    method: "GET",
    params:{
      _id, pId
    }
  })
}

/**
 *
 *
 * @export 根据志愿id，在数据中进行匹配，拿到参加的各种状态的活动
 * @param {*} pId  志愿id
 * @returns
 */
export function compareMe(pId){
  return requestAxios({
    url:'/enterActive/me',
    method:"GET",
    params:{
      pId,
    }
  })
}
