/** local的访问接口 */

import axios from 'axios'

export const uploadLocalFile = params => { return axios.post("/lch/file/upload", params) }