/** collect的访问接口 */

import axios from 'axios'

// 获取收藏的分类
export const getCollectCategory = params => { return axios.get("/lch/category/getCollectCategory", { params }) }

// 取消收藏该分类
export const deleteCollectCategory = params => { return axios.delete("/lch/category/deleteCollectCategory", { params }) }