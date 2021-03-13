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