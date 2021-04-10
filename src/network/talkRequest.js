import {requestAxios} from 'index.js'

// 请求所有评论信息
export function getAllTalk(){
  return requestAxios({
    url:"/talk/getAll",
    method: "GET"
  })
}

// 发布一个新的评论信息  创建评论信息
// 发布的数据要完整
export function sendTalk(obj){
  return requestAxios({
    url:"/talk/createTalk",
    method: "GET",
    params:{
      obj
    }
  })
}

/**
 *
 *
 * @export  朋友圈评论图片-formdata的键依然为image
 * @param {*} file  图片信息  
 * @param {*} talkId  朋友圈的id
 * @returns
 */
export function sendTalkImg(file, talkId){
  return requestAxios({
    url:`/talk/imgTalk-${talkId}`,
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
 * @export 点赞或者取消
 * @param {*} _id 该评论信息id
 * @param {*} mode 模式  true 表示点赞   false 取消
 * @param {*} pId 人的id
 */
export function giveLikeOrCancel(_id, mode, pId){
  return requestAxios({
    url:"/talk/giveLike",
    method:"GET",
    params:{
      _id, mode, pId
    }
  })
}
/**
 *
 *
 * @export 评论信息
 * @param {*} _id 该评论信息id
 * @param {*} pId 人id
 * @param {*} content 评论的内容
 */
export function giveContent(_id, pId, content){
  return requestAxios({
    url:"/talk/giveContent",
    method:"GET",
    params:{
      _id, pId, content
    }
  })
}
