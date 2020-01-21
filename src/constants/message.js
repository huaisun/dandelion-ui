/** 消息提示 */
export default function install(_Vue) {
    _Vue.prototype.CHECK_EMAIL_PASSWORD = '请输入正确的邮箱和密码';
    _Vue.prototype.EMAIL_USED = '邮箱已存在，请登录';
    _Vue.prototype.EMAIL_ERROR = '邮箱格式不对或邮箱已存在，请更改';

    _Vue.prototype.SIGN_UP_SUCCESS = '注册成功, 请登录邮箱激活！若收件箱中无激活邮件，可能拦截到垃圾邮件中，请前往查看';

    _Vue.prototype.ADD_LOVE_ERROR = '收藏链接, 请先登录';

    _Vue.prototype.NO_EMPTY_EMAIL = "请填入邮箱";
    _Vue.prototype.NO_EMPTY_DOMAIN = "请填入用户名";
    _Vue.prototype.NO_EMPTY_PASSWORD = "请填入密码";
    _Vue.prototype.NO_EMPTY_CODE = "请填入验证码";

    _Vue.prototype.INCORRECT_DOMAIN = "用户名不能含有特殊字符";
    _Vue.prototype.INCORRECT_EMAIL = "邮箱格式不正确";
    _Vue.prototype.INCORRECT_PASSWORD = "密码不一致";
}