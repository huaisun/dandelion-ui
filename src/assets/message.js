/** 消息提示 */
export default function install(_Vue) {
    _Vue.prototype.CHECK_EMAIL_PASSWORD = '请输入正确的邮箱和密码';
    _Vue.prototype.EMAIL_USED = '邮箱已存在，请登录';
    _Vue.prototype.EMAIL_ERROR = '邮箱格式不对或邮箱已存在，请更改';

    _Vue.prototype.SIGN_UP_SUCCESS = '注册成功';
}