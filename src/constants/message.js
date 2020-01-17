/** 消息提示 */
export default function install(_Vue) {
    _Vue.prototype.CHECK_EMAIL_PASSWORD = '请输入正确的邮箱和密码';
    _Vue.prototype.EMAIL_USED = '邮箱已存在，请登录';
    _Vue.prototype.EMAIL_ERROR = '邮箱格式不对或邮箱已存在，请更改';

    _Vue.prototype.SIGN_UP_SUCCESS = '注册成功, 请登录邮箱激活！若收件箱中无激活邮件，可能拦截到垃圾邮件中，请前往查看';

    _Vue.prototype.ADD_LOVE_ERROR = '收藏链接, 请先登录';

    _Vue.prototype.NO_EMPTY_EMAIL = "邮箱不可为空";
    _Vue.prototype.NO_EMPTY_DOMAIN = "域名不可为空";
    _Vue.prototype.NO_EMPTY_PASSWORD = "密码不可为空";
    _Vue.prototype.NO_EMPTY_NAME = "用户名不可为空";

}