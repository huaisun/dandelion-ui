<template>
  <div class="signup">
    <h2 class="form-title" id="signup" @click="signUp">
      <span>或</span>加入 我们
    </h2>
    <div class="form-holder">
      <input type="text" class="input" placeholder="账户名" />
      <input type="email" class="input" placeholder="邮箱" />
      <input type="password" class="input" placeholder="密码" />
    </div>
    <button class="submit-btn">一键 注册</button>
  </div>
</template>
<script>
export default {
  name: "SignIn",
  data: () => ({
    loginBtn: document.getElementById("login")
  }),
  mounted() {
    this.loginBtn = document.getElementById("login");
  },
  methods: {
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