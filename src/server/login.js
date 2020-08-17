//登录功能
import request from "../utils/loginRequest.js"
import constApi from "./loginUrl.js"

const http = {}

for(let key in constApi){
	let api = constApi[key]
	http[key] = async function(params,headers,type){
		let response = await request.globalRequest(api.url,api.method,params,headers)
		return response
	}
}
export default http