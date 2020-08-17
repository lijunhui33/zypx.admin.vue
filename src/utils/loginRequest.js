import axios from 'axios';
import cryptoJS from 'crypto-js'
import helper from './helper.js'
//
let configUrl = ''
const webtype = process.env.NODE_ENV === 'development' ? false:true//true为线上,fasle为线下环境
configUrl = webtype ? 'http://admin.zypx.com' : 'http://192.168.31.218:8000'

const request = {}

const instance = axios.create({
	timeout: 5000
})

//全局拦截
// 添加请求拦截器,所有的网络请求都会先走这个方法，我们可以在它里面为请求添加一些自定义的内容
instance.interceptors.request.use(
	function(config) {
		// console.group('全局请求拦截')
		// console.log(config)
		// console.groupEnd()
		// config.headers.token = '123456'
		return config
	},
	function(err) {
		return Promise.reject(err)
	}
)

//全局应拦截
//所有网络请求返回时都会执行此方法
//此处可以根据服务器的返回状态码做响应的处理
//404 404 500
instance.interceptors.response.use(
	function(config) {
		// console.group('全局响应拦截')
		// console.log(config)
		// console.groupEnd()
		return config
	},
	function(err) {
		return Promise.reject(err)
	}
)

let header = {
    encryptionKey: 'telo-origin', // 用来加密/解密来源数据的key
    encryptionKey2: 'telo-auth', //  用来加密/解密认证数据的key
    encrypt: 'telo-data-encrypt', // 返回的数据是否加密的头部
    timestamp: 'telo-time-param', // 返回的时间戳的头部
}

request.globalRequest = async (url, method, data, headers) => {
	let result = ''
	if(method === 'GET'){
		result = await instance.get(configUrl+url, {params: {...data},headers:{...headers}})
	}else if(method === 'POST'){
		result = await instance.post(configUrl+url,data,{headers:{...headers}})
	}else if(method === 'DELETE'){
		result = await instance.delete(configUrl+url,{params: {...data},headers:{...headers}})
	}else if(method === 'PUT'){
		result = await instance.put(configUrl+url,data,{headers:{...headers}})
	}
	let encrypt = result.headers[header.encrypt]
	let timestamp = result.headers[header.timestamp]
	let datas = result
	if(encrypt === 'true' && timestamp != ""){
			let key = header.timestamp + timestamp //对应的key+时间戳
		    result =  helper.aesDecrypt(datas.data.data, key) //将得到的key和数据进行解密
		    if (typeof result === "string") { //返回的是字符串则转换为json格式
		        result = JSON.parse(result)
		    }else{
				result = result.data
			}
	}else{
		result = result.data
	}
	return result
}
export default request
