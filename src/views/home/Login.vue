<template>
  <v-card class="login-card">
    <v-card-title>
      <v-btn style="padding: 0; margin-right: 50px; height: 48px" text>
        <img style="height: 36px" src="../../assets/photos/lch.png" />
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-text-field v-model="domain" label="用户名/邮箱" required></v-text-field>

        <v-text-field v-model="password" :type="passwordType" label="密码" required>
          <v-icon slot="append" color="grey" @click="changePasswordType">remove_red_eye</v-icon>
        </v-text-field>

        <v-row>
          <v-col>
            <v-btn dark color="#03A9F4" width="100%" @click="loginClick">登录</v-btn>
          </v-col>
          <v-col>
            <v-btn text width="100%" @click="$router.push({ name: 'register' })">注册</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { login } from "@/api/home/sign.api.js";
import { mapActions } from "vuex";

export default {
  name: "Login",
  data: () => ({
    domain: "",
    password: "",
    passwordType: "password",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ]
  }),
  methods: {
    ...mapActions(["putUser"]),
    /**更换密码显示类型 */
    changePasswordType() {
      if (this.passwordType === "password") {
        this.passwordType = "text";
      } else {
        this.passwordType = "password";
      }
    },
    /**进行登录操作 */
    loginClick() {
      if (this.isStringEmpty(this.domain)) {
        this.$snackbar.error(this.NO_EMPTY_DOMAIN);
      } else if (this.isStringEmpty(this.password)) {
        this.$snackbar.error(this.NO_EMPTY_PASSWORD);
      } else {
        login({ domain: this.domain, password: this.password }).then(res => {
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

<style scoped>
.login-card {
  width: 450px;
  margin: 70px auto;
}
</style>