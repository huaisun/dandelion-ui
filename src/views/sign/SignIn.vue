<template>
  <div class="login slide-up">
    <div class="center">
      <h2 class="form-title" id="login" @click="loginClick">
        <span>或</span>登 录
      </h2>
      <div class="form-holder">
        <input type="text" class="input" v-model="form.domain" placeholder="用户名/邮箱" />
        <input type="password" class="input" v-model="form.password" placeholder="密码" />
      </div>
      <button class="submit-btn" @click="submit">登 入</button>
    </div>
  </div>
</template>
<script>
import { login } from "@/api/home/sign.api.js";
import { mapActions } from "vuex";

export default {
  name: "SignUp",
  props: ["sign"],
  data: () => ({
    signupBtn: document.getElementById("signup"),
    form: {
      domain: "",
      password: ""
    }
  }),
  mounted() {
    this.signupBtn = document.getElementById("signup");
    if (this.sign) {
      document.getElementById("login").click();
    }
  },
  methods: {
    // 进行store中的函数注入到本组件
    ...mapActions(["putUser"]),

    loginClick(e) {
      let parent = e.target.parentNode.parentNode;
      Array.from(e.target.parentNode.parentNode.classList).find(element => {
        if (element !== "slide-up") {
          parent.classList.add("slide-up");
        } else {
          this.signupBtn.parentNode.classList.add("slide-up");
          parent.classList.remove("slide-up");
        }
      });
    },

    /**登录操作 */
    submit() {
      if (this.isStringEmpty(this.form.domain)) {
        this.$snackbar.error(this.NO_EMPTY_NAME);
      } else if (this.isStringEmpty(this.form.password)) {
        this.$snackbar.error(this.NO_EMPTY_PASSWORD);
      } else {
        login(this.form).then(res => {
          console.log(res);
          if (res.data.code === 0) {
            this.putUser(res.data.data);
            localStorage.setItem("user", JSON.stringify(res.data.data));
            this.$router.push({ path: "/" + res.data.data.domain });
          } else {
            this.$snackbar.error(res.data.message);
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  position: absolute;
  top: 20%;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 5;
  -webkit-transition: all 0.3s ease;

  &::before {
    content: "";
    position: absolute;
    left: 50%;
    top: -20px;
    transform: translate(-50%, 0);
    background-color: #fff;
    width: 200%;
    height: 250px;
    border-radius: 50%;
    z-index: 4;
    transition: all 0.3s ease;
  }

  .center {
    position: absolute;
    top: calc(50% - 10%);
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    width: 72%;
    z-index: 5;
    -webkit-transition: all 0.3s ease;

    .form-title {
      color: #000;
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
      border: 1px solid #eee;
      overflow: hidden;
      margin-top: 50px;
      opacity: 1;
      visibility: visible;
      -webkit-transition: all 0.3s ease;

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
          color: rgba(0, 0, 0, 0.4);
        }
      }
    }

    .submit-btn {
      background-color: #6b92a4;
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

  &.slide-up {
    top: 90%;
    transition: all 0.3s ease;
  }

  &.slide-up .center {
    top: 10%;
    transform: translate(-50%, 0%);
    transition: all 0.3s ease;
  }

  &.slide-up .form-holder,
  &.slide-up .submit-btn {
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  }

  &.slide-up .form-title {
    font-size: 1em;
    margin: 0;
    padding: 0;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  &.slide-up .form-title span {
    margin-right: 5px;
    opacity: 1;
    visibility: visible;
    transition: all 0.3s ease;
  }
}
</style>