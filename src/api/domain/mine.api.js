/** home的访问接口 */

import axios from 'axios'

// 获取用户最爱的链接
export const getLoveLinkByDomain = params => { return axios.get("/lch/link/getLoveLinkByDomain", { params }) }

// 删除用户最爱的链接
export const deleteLinkByUserId = params => { return axios.delete("lch/link/deleteLinkByUserId", { params }) }

// 获取用户自身的分类
export const getCategoryByDomain = params => { return axios.get("/lch/category/getCategoryByDomain", { params }) }

// 保存用户的最喜爱链接
export const saveLoveLink = params => { return axios.post("/lch/link/addLoveLink", params) }