import {
  requestAxios
} from './index'

// 测试请求
export function test() {
  return requestAxios({
    url: '/aq',
    method: 'GET',
  })
}

export function requestAllPeople() {
  return requestAxios({
    url: '/allPeople',
    method: 'GET',
  })
}

export function requestPeople(_id, sId) {
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
 * @param {*} obj
 *  example : obj {
      sId, password
    }
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
 * @param {*} obj
 * obj : {name, sId, class, faculty, password }
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