let baseUrl = ""
if(process.env.NODE_ENV === 'development'){
	baseUrl = "/api"
}else{
	baseUrl = "https://api.apiopen.top"
}
export default baseUrl