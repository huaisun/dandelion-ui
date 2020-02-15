<template>
  <v-card class="register-card">
    <v-card-title>
      <v-btn style="padding: 0; margin-right: 50px; height: 48px" text>
        <img style="height: 36px" src="../../assets/photos/lch.png" />
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <v-text-field v-model="domain" label="用户名/邮箱" required></v-text-field>

        <v-text-field v-model="password" :type="passwordType" label="密码" required>
          <v-icon slot="append" color="grey" @click="changePasswordType">remove_red_eye</v-icon>
        </v-text-field>

        <v-row>
          <v-col>
            <v-btn dark color="#03A9F4" width="100%">登录</v-btn>
          </v-col>
          <v-col>
            <v-btn text width="100%">注册</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Register",
  data: () => ({
    valid: true,
    domain: "",
    email: "",
    password: "",
    rePassword: ""
  })
};
</script>
<style scoped>
.register-card {
  width: 450px;
  margin: 70px auto;
}
</style>