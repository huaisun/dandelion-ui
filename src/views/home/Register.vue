<template>
  <v-card class="register-card category-2">
    <v-card-title>
      <v-btn style="padding: 0; margin-right: 50px; height: 48px" text>
        <img style="height: 36px" src="../../assets/photos/lch.png" />
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="domain"
          label="用户名"
          :error-messages="domainMessage"
          @blur="checkDomain"
          :rules="domainRules"
          required
          counter
        ></v-text-field>

        <v-text-field v-model="email" label="邮箱" :rules="emailRules" required></v-text-field>

        <v-text-field v-model="code" label="验证码" :rules="codeRules" required>
          <v-btn
            slot="append"
            :disabled="sendCode"
            text
            color="#A770EF"
            @click="sendVerification"
          >发送验证码{{ sendCode ? '(' + sendTime + ')' : '' }}</v-btn>
        </v-text-field>

        <v-text-field
          v-model="password"
          :type="passwordType"
          :rules="passwordRules"
          label="密码"
          required
        >
          <v-icon slot="append" color="grey" @click="changePasswordType">remove_red_eye</v-icon>
        </v-text-field>

        <v-row>
          <v-col>
            <v-btn text width="100%" @click="$router.push({ name: 'login' })">返回登录</v-btn>
          </v-col>
          <v-col>
            <v-btn dark color="#A770EF" text width="100%" @click="submit">确认注册</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import {
  getDomain,
  getEmail,
  addUser,
  sendVerification
} from "@/api/home/sign.api.js";
export default {
  name: "Register",
  data: () => ({
    valid: true,
    domain: "",
    domainRules: [
      v => !!v || "用户名不能为空",
      v => (v && /^[A-Za-z]{3,12}$/.test(v)) || "用户名限制3-12位英文"
    ],
    emailRules: [
      v => !!v || "邮箱不能为空",
      v => /.+@.+\..+/.test(v) || "邮箱格式不正确"
    ],
    codeRules: [v => !!v || "验证码不能为空"],
    passwordRules: [v => !!v || "密码不能为空"],
    email: "",
    password: "",
    passwordType: "password",
    code: "",
    sendCode: false,
    sendTime: 60,
    domainMessage: ""
  }),
  methods: {
    /**更换密码显示类型 */
    changePasswordType() {
      if (this.passwordType === "password") {
        this.passwordType = "text";
      } else {
        this.passwordType = "password";
      }
    },
    submit() {
      if (this.$refs.form.validate()) {
        // 进行注册业务
        addUser({
          domain: this.domain,
          email: this.email,
          code: this.code,
          password: this.password
        }).then(res => {
          if (res.data.code === 0) {
            this.$snackbar.success(this.SIGN_UP_SUCCESS);
            localStorage.setItem("user", JSON.stringify(res.data.data));
            this.$router.push({ path: "/" + res.data.data.domain });
          } else {
            this.$snackbar.error(res.data.message);
          }
        });
      }
    },
    /**进行注册码发送 */
    sendVerification() {
      if (this.email !== "" && /.+@.+\..+/.test(this.email)) {
        getEmail({ email: this.email }).then(res => {
          if (res.data.code === 100) {
            sendVerification({ email: this.email }).then(res => {
              if (res.data.code === 0) {
                this.$snackbar.success(this.SNED_SUCCESS);
                this.sendCode = true;
                this.sendTime = 60;
                let codeTime = setInterval(() => {
                  this.sendTime--;
                  if (this.sendTime === 0) {
                    this.sendCode = false;
                    clearInterval(codeTime);
                  }
                }, 1000);
              }
            });
          } else {
            this.$snackbar.error(res.data.message);
          }
        });
      } else {
        this.$snackbar.error("邮箱格式不正确");
      }
    },
    /**检查用户名是否重复以及格式 */
    checkDomain() {
      this.domainMessage = "";
      if (/^[A-Za-z]{3,12}$/.test(this.domain)) {
        getDomain({ domain: this.domain }).then(res => {
          if (res.data.code !== 400) {
            this.domainMessage = res.data.message;
          }
        });
      } else {
        this.domainMessage = "";
      }
    }
  }
};
</script>
<style scoped>
.register-card {
  width: 450px;
  margin: 70px auto;
}
</style>