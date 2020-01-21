<template>
  <div class="signup">
    <h2 class="form-title" id="signup" @click="signUp">
      <span>或</span>加入 我们
    </h2>
    <div class="form-holder">
      <input
        type="text"
        v-model="form.domain"
        class="input"
        :class="{'error-input': rules.domain}"
        placeholder="账户名(3-12位英文)"
        @blur="checkDomain"
      />
      <input
        type="email"
        v-model="form.email"
        class="input"
        :class="{'error-input': rules.email}"
        placeholder="邮箱"
        @blur="checkEmail"
      />
      <button class="send-verification" @click="sendVerification">发送验证码</button>
      <input type="text" maxlength="4" v-model="form.code" class="input" placeholder="验证码" />
      <input type="password" v-model="form.password" class="input" placeholder="密码" />
      <input
        type="password"
        v-model="form.repassword"
        class="input"
        :class="{'error-input': rules.password}"
        placeholder="验证密码"
        @change="checkPassword"
      />
    </div>
    <button class="submit-btn" @click="submit">一键 注册</button>
  </div>
</template>
<script>
import {
  getDomain,
  getEmail,
  addUser,
  sendVerification
} from "@/api/home/sign.api.js";

export default {
  name: "SignIn",
  data: () => ({
    loginBtn: document.getElementById("login"),
    form: {
      domain: "",
      email: "",
      code: "",
      password: "",
      repassword: ""
    },
    rules: {
      domain: false,
      email: false,
      password: false
    },
    message: {
      domain: "",
      email: "",
      password: ""
    }
  }),
  mounted() {
    this.loginBtn = document.getElementById("login");
  },
  methods: {
    /**进行注册码发送 */
    sendVerification() {
      if (this.rules.email) {
        this.$snackbar.error(this.message.email);
      } else {
        sendVerification({ email: this.form.email }).then(res => {
          console.log(res);
        });
      }
    },
    /**响应注册点击 */
    signUp(e) {
      let parent = e.target.parentNode;
      Array.from(e.target.parentNode.classList).find(element => {
        if (element !== "slide-up") {
          parent.classList.add("slide-up");
        } else {
          this.loginBtn.parentNode.parentNode.classList.add("slide-up");
          parent.classList.remove("slide-up");
        }
      });
    },
    /**检查用户名是否重复以及格式 */
    checkDomain() {
      let regex = this.$store.state.regex.domain;
      if (this.form.domain.trim() === "") {
        this.rules.domain = true;
        this.message.domain = this.NO_EMPTY_DOMAIN;
      } else if (regex.test(this.form.domain)) {
        getDomain({ domain: this.form.domain }).then(res => {
          if (res.data.code === 400) {
            this.rules.domain = false;
          } else {
            this.rules.domain = true;
            this.message.domain = res.data.message;
          }
        });
      } else {
        this.rules.domain = true;
        this.message.domain = this.INCORRECT_DOMAIN;
      }
    },
    /**检查密码是否一致 */
    checkPassword() {
      if (this.form.repassword !== this.form.password) {
        this.rules.password = true;
        this.message.password = this.INCORRECT_PASSWORD;
      } else {
        this.rules.password = false;
      }
    },
    /**检查邮箱是否重复以及格式 */
    async checkEmail() {
      let regex = this.$store.state.regex.email;
      if (this.form.email.trim() === "") {
        this.rules.email = true;
        this.message.email = this.NO_EMPTY_EMAIL;
      } else if (regex.test(this.form.email)) {
        await getEmail({ email: this.form.email }).then(res => {
          if (res.data.code === 100) {
            this.rules.email = false;
          } else {
            this.rules.email = true;
            this.message.email = res.data.message;
          }
        });
      } else {
        this.rules.email = true;
        this.message.email = this.INCORRECT_EMAIL;
      }
    },
    /**提交注册 */
    submit() {
      if (this.isStringEmpty(this.form.domain)) {
        this.$snackbar.error(this.NO_EMPTY_DOMAIN);
      } else if (this.isStringEmpty(this.form.email)) {
        this.$snackbar.error(this.NO_EMPTY_EMAIL);
      } else if (this.isStringEmpty(this.form.password)) {
        this.$snackbar.error(this.NO_EMPTY_PASSWORD);
      } else if (this.isStringEmpty(this.form.code)) {
        this.$snackbar.error(this.NO_EMPTY_CODE);
      } else {
        if (!this.rules.domain && !this.rules.email) {
          // 进行注册业务
          addUser(this.form).then(res => {
            if (res.data.code === 0) {
              this.$snackbar.success(this.SIGN_UP_SUCCESS);
            } else {
              this.$snackbar.error(res.data.message);
            }
          });
        } else if (this.rules.domain) {
          this.$snackbar.error(this.message.domain);
        } else if (this.rules.email) {
          this.$snackbar.error(this.message.email);
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.signup {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  width: 72%;
  z-index: 5;
  -webkit-transition: all 0.3s ease;

  &.slide-up {
    top: 5%;
    transform: translate(-50%, 0%);
    transition: all 0.3s ease;
  }

  &.slide-up .form-holder,
  &.slide-up .submit-btn {
    opacity: 0;
    visibility: hidden;
  }

  &.slide-up .form-title {
    font-size: 1em;
    cursor: pointer;
  }

  &.slide-up .form-title span {
    margin-right: 5px;
    opacity: 1;
    visibility: visible;
    transition: all 0.3s ease;
  }

  .form-title {
    color: #fff;
    font-size: 1.7em;
    text-align: center;

    span {
      color: rgba(0, 0, 0, 0.4);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
    }
  }

  .form-holder {
    border-radius: 15px;
    background-color: #fff;
    overflow: hidden;
    margin-top: 50px;
    opacity: 1;
    visibility: visible;
    -webkit-transition: all 0.3s ease;
    .send-verification {
      position: fixed;
      background-color: #2196f3;
      border-color: #2196f3;
      border-radius: 4px;
      padding: 0 9px;
      margin: 3px 0;
      height: 30px;
      color: white;
      left: 150px;
      font-size: 14px;
    }

    .input {
      border: 0;
      outline: none;
      box-shadow: none;
      display: block;
      height: 38px;
      line-height: 30px;
      padding: 8px 15px;
      border-bottom: 1px solid #eee;
      width: 100%;
      font-size: 14px;

      &:last-child {
        border-bottom: 0;
      }
      &::-webkit-input-placeholder {
        color: rgba(0, 0, 0, 0.6);
      }
    }
    .error-input {
      border-color: red;
    }
  }

  .submit-btn {
    background-color: rgba(0, 0, 0, 0.4);
    color: rgba(256, 256, 256, 0.7);
    border: 0;
    border-radius: 15px;
    display: block;
    margin: 15px auto;
    padding: 15px 45px;
    width: 100%;
    font-size: 13px;
    font-weight: bold;
    cursor: pointer;
    opacity: 1;
    visibility: visible;
    -webkit-transition: all 0.3s ease;

    &:hover {
      transition: all 0.3s ease;
      background-color: rgba(0, 0, 0, 0.8);
    }
  }
}
</style>