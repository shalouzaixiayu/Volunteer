import {
  requestAxios
} from './index'
/**
 *
 *
 * @export 追加头像-formdata:keys="image",_id用户id，很长的哪个
 * @param {*} file
 * @param {*} _id
 */
export function addHeadImgBysId(file, _id){
  return requestAxios({
    url:`/addHeadImg-${_id}`,
    method: 'post',
    data: file,
    headers:{'Content-Type':'multipart/form-data'}
  })
}

/**
 *
 *
 * @export 通过id查找给这个人加减分
 * @param {*} _id  学号id
 * @param {*} point 分数
 */
export function addPointById(_id, point){
  return requestAxios({
    url:"/me/addPoint",
    method:"GET",
    params:{
      _id, point,
    }
  })
}



export function requestAllPeople() {
  return requestAxios({
    url: '/allPeople',
    method: 'GET',
  })
}

/**
 *
 *
 * @export
 * @param {*} _id  people  表 id
 * @returns
 */
export function requestPeopleById(_id) {
  return requestAxios({
    url: '/onePeople',
    method: 'GET',
    params: {
      _id,
    }
  })
}
/**
 *
 *
 * @export
 * @param {*} obj  学号 sId  && password
 * @returns
 */
export function login(obj) {
  return requestAxios({
    url: "/login",
    method: "POST",
    data: {   // post请求
      obj
    }
  })
}
/**
 *
 *
 * @export
 * @param {*} obj {name, sId, class, faculty, password }
 *
 */
export function register(obj) {
  return requestAxios({
    url: '/register',
    method: 'POST',
    data: {
      obj
    }
  })
}

// 下面是一个对象， 都是一样的功能 直接浓缩
// const findType = {
//   autograph: '/bind/1', // 个性签名
//   point: '/bind/2', // 积分
//   image: '/bind/3', // 图片
//   comment: '/bind/4', // 评论
//   study: '/bind/5', //学习记录
//   phone: '/bind/6', // 绑定手机
// }

// 使用 this.$findType  调用对象对应的玩意
/**
 *
 *
 * @export
 * @param {*} findType  根据 功能返回对应的 this.$findType 的路由映射
 * @param {*} id     待修改的 id
 * @param {*} payload   待修改的新值  负载
 * @returns
 */
export function bindTypeAndGet(findType, id, payload){
  return requestAxios({
    url: `${findType}/${id}`,
    method: 'GET',
    params: {
      payload
    }
  })
}


export function deletePeople(_id){
  return requestAxios({
    url:"deletePeople",
    method:'GET',
    params: {
      _id,
    }
  })
}
export function updatePeople(_id, newObj){
  return requestAxios({
    url:"updatePeople",
    method:'GET',
    params: {
      _id,
      newObj
    }
  })
}
