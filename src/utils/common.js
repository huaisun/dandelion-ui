/**共同方法 */
export default function install(_Vue) {
    /** 判断字符串是否为空 */
    _Vue.prototype.isStringEmpty = function(value) {
        if (value == null || value === undefined || value === '') {
            return true;
        }
        return false;
    }

    _Vue.prototype.getImageBase64 = function(img, ext) {
        var canvas = document.createElement("canvas"); //创建canvas DOM元素，并设置其宽高和图片一样
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, img.width, img.height); //使用画布画图
        var dataURL = canvas.toDataURL("image/" + ext); //返回的是一串Base64编码的URL并指定格式
        canvas = null; //释放
        return dataURL;
    }
}