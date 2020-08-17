import cryptoJS from 'crypto-js';

function routers(){
	let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
	let curRoute = routes[routes.length - 1].route //获取当前页面路由
	let curParam = routes[routes.length - 1].options; //获取路由参数
	// 拼接参数
	let arr = []
	for (let key in curParam) {
	    arr.push(key+'='+curParam[key])
	}
	let data = arr.join('&')
	let key = data === '' ? '':'?'+data
	let str = curRoute + key 
	str = str.split('pages')
	return '..'+ str[1]
	
}

function time(time) {//转换时间戳为xxxx年-xx月-xx日 XX:XX的格式
	// console.log(time+'长度')
	// console.log(JSON.stringify(time).length)
	var date = ''
	if(JSON.stringify(time).length == 10){
		 date = new Date(time * 1000); //如果date为10位不需要乘1000
	}else{
		 date = new Date(time);
	}
	
	var Y = date.getFullYear() + '年';
	var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月';
	var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + '日 ';
	var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
	var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) ;
	// var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
	return Y + M + D ;
}

function oldTiem(data){//计算年龄
	const time = data
	const date = new Date(time)
	const workTime = date.getTime()//计算现在工作了多久的毫秒
	const nowdate = new Date()
	const nowTimeRub = nowdate.getTime()//获取当前日期的毫秒
	const commonTime = nowTimeRub - workTime //将当前时间 - 工作的时间
	const num = parseInt(commonTime/31536000000) //除去一年总共的毫秒数取整
	return num
}

/**
 * 数据加密与编码
 * @param mixed [object|string] data 原始数据
 * @param string key 加密钥匙
 * @return mixed [boolean|string] 是否支持加密|加密数据
 */
function aesEncrypt(data, key) {
	// 处理原始数据
	const list = ['object', 'string'];
	const type = typeof data;
	if (!list.includes(type)) {
		return false;
	}
	if (type === 'object') {
		data = JSON.stringify(data);
	}

	// 用aes加密
	let result = cryptoJS.AES.encrypt(data, key);
	result = result.toString();

	// 用base64编码
	result = cryptoJS.enc.Utf8.parse(result);
	result = cryptoJS.enc.Base64.stringify(result);

	return result;
}

/**
 * 数据解码与解密
 * @param string data 已加密数据
 * @param string key 解密密匙
 * @return mixed [boolean|string|object] 是否支持解密|解密数据
 */
function aesDecrypt(data, key) {
	// 用base64解码
	const cryptoJS = require('crypto-js');
	let result = cryptoJS.enc.Base64.parse(data);
	result = result.toString(cryptoJS.enc.Utf8);
	// aes解密
	result = cryptoJS.AES.decrypt(result, key);
	result = result.toString(cryptoJS.enc.Utf8);
	return result;
}

function loginHeaders(){
	return { 
				'telo-origin-data': aesEncrypt({'name': 'kuaipin_admin'},'telo-origin') ,
				'telo-system-data': JSON.stringify({'name': 'kuaipin_admin'})
			}
}

function adminHeaders(){
	let cookie =  userCookie()
	return {
		'telo-origin-data': aesEncrypt({'name': 'kuaipin_admin'}, 'telo-origin'),
		'telo-auth-data': aesEncrypt(cookie, 'telo-auth')
	}
}

function aesPassWord(phone,pass){//手机，电话  加密传给后端
	const key = 'telo_'+ phone
	let thisPass = typeof pass == 'number' ? pass.toString():pass
	const password =  aesEncrypt(thisPass,key);
	return password
}

function userCookie(){
	let userId =  localStorage.getItem('userId')
	const seekerUnionId =  localStorage.getItem('seekerUnionId')
	userId = JSON.parse(userId)
	if(userId === null){
		return {union_id:'',token:'',admin_user_id:'', user_type: 'admin'}
	}
	let obj = {
	   union_id:typeof userId.id == 'string' ? Number(userId.id):userId.id, // 通行证编号
	   token: userId.token, // 通行证令牌
	   admin_user_id: typeof seekerUnionId == 'string'?Number(seekerUnionId):seekerUnionId,
	   user_type: 'admin'
	}
	return obj
}

function aesEncryptUrlData(val){
	let data = ''
	data = typeof val === 'number' ? val.toString() : val
	data =  aesEncrypt(data,'urlData')
	return data
}

function aesDecryptUrlData(val){
	let data = ''
	data =  aesDecrypt(val,'urlData')
	return data
}

export default{
	routers,//获取用户当前的路由
	time,//计算时间戳
	oldTiem,//计算年龄
	aesEncrypt,
	aesDecrypt,
	loginHeaders,//获取短信、登录的header
	aesPassWord,//登录的头
	userCookie,//用户的缓存
	aesEncryptUrlData,//通过路由传值时进行加密
	aesDecryptUrlData,//解密
	adminHeaders,//请求的头部
}