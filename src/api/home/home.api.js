/** home的访问接口 */

import axios from 'axios'

// 获取用户最爱的链接
export const getLoveLinkByUserId = params => { return axios.get("/lch/link/getLoveLinkByUserId", { params: params }) }

// 删除用户最爱的链接
export const deleteLinkByUserId = params => { return axios.delete("lch/link/deleteLinkByUserId", { params: params }) }