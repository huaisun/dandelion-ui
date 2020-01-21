import axios from 'axios'

// 检查用户名是否重复
export const getDomain = params => { return axios.get("/lch/user/checkDomain", { params: params }) }

// 检查邮箱是否重复
export const getEmail = params => { return axios.get("/lch/user/checkEmail", { params: params }) }

// 注册用户
export const addUser = params => { return axios.post("/lch/user/addUser", params) }

// 登录
export const login = params => { return axios.post("/lch/user/login", params) }