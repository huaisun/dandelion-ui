<template>
  <div class="page">
    <div class="container">
      <div class="left">
        <div class="login">
          {{ loginFlag ? '登录': '注册' }}
          <v-btn text @click="sign">{{ !loginFlag ? '登录': '注册' }}</v-btn>
        </div>
        <div class="eula">路漫漫其修远兮，吾将上下而求索。-- 屈原</div>
      </div>
      <div class="right">
        <svg viewBox="0 0 320 300">
          <defs>
            <linearGradient
              inkscape:collect="always"
              id="linearGradient"
              x1="13"
              y1="193.49992"
              x2="307"
              y2="193.49992"
              gradientUnits="userSpaceOnUse"
            >
              <stop style="stop-color:#ff00ff;" offset="0" id="stop876" />
              <stop style="stop-color:#ff0000;" offset="1" id="stop878" />
            </linearGradient>
          </defs>
          <path
            d="m 40,120.00016 239.99984,-3.2e-4 c 0,0 24.99263,0.79932 25.00016,35.00016 0.008,34.20084 -25.00016,35 -25.00016,35 h -239.99984 c 0,-0.0205 -25,4.01348 -25,38.5 0,34.48652 25,38.5 25,38.5 h 215 c 0,0 20,-0.99604 20,-25 0,-24.00396 -20,-25 -20,-25 h -190 c 0,0 -20,1.71033 -20,25 0,24.00396 20,25 20,25 h 168.57143"
          />
        </svg>
        <div class="form">
          <label for="email">邮箱</label>
          <input
            type="email"
            id="email"
            v-model="email"
            @blur="checkEmail"
            @focus="selectInput(0, '240 1386')"
          />
          <label for="password">密码</label>
          <input
            type="password"
            id="password"
            v-model="password"
            @focus="selectInput(-336, '240 1386')"
          />
          <input
            type="submit"
            id="submit"
            :value="loginFlag ? '登录': '一键注册'"
            @click="submit"
            @focus="selectInput(-730, '530 1386')"
          />
        </div>
        <!-- 消息提示 -->
        <v-snackbar :color="color" :timeout="timeout" v-model="snackbar">
          {{ text }}
          <v-btn text @click="snackbar = false">Close</v-btn>
        </v-snackbar>
      </div>
    </div>
  </div>
</template>

<script>
import anime from "animejs/lib/anime.es.js";

export default {
  name: "Login",
  data: () => ({
    loginFlag: true,
    current: null,
    email: "",
    password: "",

    // 消息条配置
    snackbar: false,
    text: "",
    timeout: 3000,
    color: "#00E5FF",

    signUpFlag: false
  }),
  methods: {
    selectInput(offsetValue, harrayValue) {
      if (this.current) this.current.pause();
      this.current = anime({
        targets: "path",
        strokeDashoffset: {
          value: offsetValue,
          duration: 700,
          easing: "easeOutQuart"
        },
        strokeDasharray: {
          value: harrayValue,
          duration: 700,
          easing: "easeOutQuart"
        }
      });
    },
    /** 登录、注册操作 */
    sign() {
      this.loginFlag = !this.loginFlag;
    },

    /** 提交操作 */
    submit() {
      if (this.loginFlag) {
        // 登录操作
        if (
          !this.isStringEmpty(this.email) &&
          !this.isStringEmpty(this.password)
        ) {
          // 进行登录操作
          this.$axios
            .post("/lch/user/login", {
              email: this.email,
              password: this.password
            })
            .then(res => {
              if (res.data.code === 0) {
                localStorage.setItem("user", JSON.stringify(res.data.data));
                this.$router.push({ name: "home" });
              } else {
                this.snackbar = true;
                this.text = res.data.message;
                this.color = this.COLOR_ERROR;
              }
            });
        } else {
          this.snackbar = true;
          this.text = this.CHECK_EMAIL_PASSWORD;
          this.color = this.COLOR_ERROR;
        }
      } else {
        // 注册操作
        if (this.signUpFlag) {
          this.$axios
            .post("/lch/user/addUser", {
              email: this.email,
              password: this.password
            })
            .then(res => {
              if (res.data.code === 0) {
                this.snackbar = true;
                this.text = this.SIGN_UP_SUCCESS;
                this.color = this.COLOR_SUCCESS;
                this.loginFlag = true;
              } else {
                this.snackbar = true;
                this.text = res.data.message;
                this.color = this.COLOR_ERROR;
              }
            });
        } else {
          this.snackbar = true;
          this.text = this.EMAIL_ERROR;
          this.color = this.COLOR_ERROR;
        }
      }
    },

    /** 检查邮箱是否已经存在。或者邮箱格式是否正确 */
    checkEmail() {
      if (!this.loginFlag) {
        this.$axios
          .get("/lch/user/checkEmail", { params: { email: this.email } })
          .then(res => {
            if (res.data.code === -101) {
              // 邮箱格式不正确
              this.snackbar = true;
              this.text = res.data.message;
              this.color = this.COLOR_ERROR;
              // 标记不可提交
              this.signUpFlag = false;
            } else if (res.data.code === 0) {
              // 邮箱已经存在
              this.snackbar = true;
              this.text = this.EMAIL_USED;
              this.color = this.COLOR_WARNING;
              // 标记不可提交
              this.signUpFlag = false;
            } else if (res.data.code === 100) {
              // 标记可提交 -- 未注册用户
              this.signUpFlag = true;
            }
          });
      }
    }
  }
};
</script>

<style scoped>
::selection {
  background: #2d2f36;
}
::-webkit-selection {
  background: #2d2f36;
}
::-moz-selection {
  background: #2d2f36;
}
.page {
  background: #e2e2e5;
  display: flex;
  flex-direction: column;
  height: calc(100% - 40px);
  position: absolute;
  place-content: center;
  width: calc(100% - 40px);
}
@media (max-width: 767px) {
  .page {
    height: auto;
    margin-bottom: 20px;
    padding-bottom: 20px;
  }
}
.container {
  display: flex;
  height: 320px;
  margin: 0 auto;
  width: 640px;
}
@media (max-width: 767px) {
  .container {
    flex-direction: column;
    height: 630px;
    width: 320px;
  }
}
.left {
  background: white;
  height: calc(100% - 40px);
  top: 20px;
  position: relative;
  width: 50%;
}
@media (max-width: 767px) {
  .left {
    height: 100%;
    left: 20px;
    width: calc(100% - 40px);
    max-height: 270px;
  }
}
.login {
  font-size: 50px;
  font-weight: 900;
  margin: 50px 40px 40px;
}
.eula {
  color: #999;
  font-size: 14px;
  line-height: 1.5;
  margin: 40px;
}
.right {
  background: #474a59;
  box-shadow: 0px 0px 40px 16px rgba(0, 0, 0, 0.22);
  color: #f1f1f2;
  position: relative;
  width: 50%;
}
@media (max-width: 767px) {
  .right {
    flex-shrink: 0;
    height: 100%;
    width: 100%;
    max-height: 350px;
  }
}
svg {
  position: absolute;
  width: 320px;
}
path {
  fill: none;
  stroke: url(#linearGradient);
  stroke-width: 4;
  stroke-dasharray: 240 1386;
}
.form {
  margin: 40px;
  position: absolute;
}
label {
  color: #c2c2c5;
  display: block;
  font-size: 14px;
  height: 16px;
  margin-top: 20px;
  margin-bottom: 5px;
}
input {
  background: transparent;
  border: 0;
  color: #f2f2f2;
  font-size: 20px;
  height: 30px;
  line-height: 30px;
  outline: none !important;
  width: 100%;
}
input::-moz-focus-inner {
  border: 0;
}
#submit {
  color: #707075;
  margin-top: 44px;
  transition: color 300ms;
}
#submit:focus {
  color: #f2f2f2;
}
#submit:active {
  color: #d0d0d2;
}
</style>