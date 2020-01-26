<template>
  <v-app id="app">
    <!-- 导航栏 -->
    <NavigationDrawers></NavigationDrawers>
    <!-- 内容 -->
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>
<script>
import NavigationDrawers from "@/components/domain/NavigationDrawers";

export default {
  name: "Entrance",
  components: {
    NavigationDrawers
  },
  data: () => ({
    domain: ""
  }),
  created() {
    // 配置网页域名规则
  },
  methods: {}
};
</script>

<style scoped>
#app {
  margin: 0;
  height: 100%;
  overflow-x: hidden;
  font-family: "Raleway", "Roboto", "Helvetica", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-font-smoothing: antialiased;
  -ms-font-smoothing: antialiased;
  background: rgba(18, 18, 26, 1);
  background-image: url(../../assets/photos/home.png);
  background-blend-mode: overlay;
  background-size: 15%;
}
</style>