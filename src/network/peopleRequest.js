import {
  requestAxios
} from './index'


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
 * @param {*} sId  people 学号 sId
 * @returns
 */
export function requestPeopleById(_id, sId) {
  return requestAxios({
    url: '/onePeople',
    method: 'GET',
    params: {
      _id,
      sId
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
    params: {
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
    params: {
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


