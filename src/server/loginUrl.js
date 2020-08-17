const CONSTAPI = {
	getCode:{
		url:"/auth/login/captcha/sms",
		method:"GET"
	},
	register:{
		url:"/auth/register",
		method:"POST"
	},
	phoneLogin:{
		url:"/auth/login/type/password",
		method:"POST"
	}
}
export default CONSTAPI