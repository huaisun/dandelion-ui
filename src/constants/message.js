/** 消息提示 */
export default function install(_Vue) {
    /**提示信息 */
    _Vue.prototype.CHECK_EMAIL_PASSWORD = '请输入正确的邮箱和密码';
    _Vue.prototype.EMAIL_USED = '邮箱已存在，请登录';
    _Vue.prototype.EMAIL_ERROR = '邮箱格式不对或邮箱已存在，请更改';
    _Vue.prototype.SNED_SUCCESS = '验证码已发送，请登录邮箱查收';

    _Vue.prototype.SIGN_UP_SUCCESS = '恭喜您！注册成功!';
    _Vue.prototype.ADD_LOVE_ERROR = '收藏链接, 请先登录';

    _Vue.prototype.NO_EMPTY_EMAIL = "请填入邮箱";
    _Vue.prototype.NO_EMPTY_DOMAIN = "请填入用户名";
    _Vue.prototype.NO_EMPTY_PASSWORD = "请填入密码";
    _Vue.prototype.NO_EMPTY_CODE = "请填入验证码";
    _Vue.prototype.NO_EMPTY_CATEGORY = "请填入分类名称";
    _Vue.prototype.NO_EMPTY_FORMAT = "请选择浏览器的格式";
    _Vue.prototype.NO_EMPTY_FILE = "请上传文件";

    _Vue.prototype.INCORRECT_DOMAIN = "用户名不能含有特殊字符";
    _Vue.prototype.INCORRECT_EMAIL = "邮箱格式不正确";
    _Vue.prototype.INCORRECT_PASSWORD = "密码不一致";

    _Vue.prototype.INCORRECT_LINK = "链接需要加入http或者https网络协议";

    _Vue.prototype.COLLECT_SUCCESS = "收藏成功";
    _Vue.prototype.ALREADY_COLLECT = "已经收藏";

    _Vue.prototype.DELETE_COLLECT_SUCCESS = "取消收藏成功";

    _Vue.prototype.HANDLE_ERROR = "程序错误";
}