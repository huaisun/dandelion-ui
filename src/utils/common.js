/**共同方法 */
export default function install(_Vue) {
    /** 判断字符串是否为空 */
    _Vue.prototype.isStringEmpty = function (value) {
        if (value == null || value === undefined || value === '') {
            return true;
        }
        return false;
    }
}