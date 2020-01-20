<template>
  <div>
    <div v-if="active">
      成功激活，请
      <span class="login-active" @click="loginClick">登录</span>
    </div>

    <div v-else>404!........</div>
  </div>
</template>
<script>
export default {
  name: "Active",
  data: () => ({
    active: false,
  }),
  created() {
    let url = window.location.href;
    this.$axios
      .get("/lch/user/active" + url.substring(url.indexOf("?"), url.length))
      .then(res => {
        if (res.data.code === 0) {
          this.active = true;
        }
      });
  },
  methods: {
    loginClick() {
      this.$router.push({ name: 'login' });
    }
  }
};
</script>

<style scoped>
.login-active {
  text-decoration-color: blue;
  text-decoration-line: underline;
  cursor: pointer;
  color: blue;
}
</style>