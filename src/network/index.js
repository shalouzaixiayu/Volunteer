import axios from 'axios'

export function requestAxios(config){
  const instance = axios.create({
    baseURL:'http://localhost:3000',
    timeout:5000
  })
  return instance(config)
}