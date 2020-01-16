import axios from 'axios'

// 检查用户名是否重复
export const checkUser = params => { return axios.get("/lch/user/checkDomain", { params: params }) }