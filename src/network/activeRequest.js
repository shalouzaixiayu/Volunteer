import {requestAxios} from './index'
/**
 *
 *
 * @export
 * @param {*} page 
 * @param {*} count
 * @returns  promise 
 */
export function requestActiveList(page, count){
  return requestAxios({
    url:"/getActiveList",
    method: 'GET',
    params: {
      page, count
    }
  })
}

/**
 *
 *
 * @export  
 * @param {*} reTitle  String title by re 
 * @param {*} maxCount  
 * @returns promise 
 */
export function searchActiveByTitle(reTitle, maxCount){
  return requestAxios({
    url:"/searchActive",
    method:"GET",
    params: {
      reTitle,
      maxCount
    }
  })
}
/**
 *
 *
 * @export 
 * @param {*} id active's id
 * @returns promise
 */
export function searchActiveById(id){
  return requestAxios({
    url:"/idSearch",
    method:"GET",
    params: {
      id,
    }
  })
}