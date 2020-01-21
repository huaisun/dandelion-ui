<template>
  <v-app id="app">
    <!-- 导航栏 -->
    <!-- <NavigationDrawers></NavigationDrawers> -->
    <!-- 内容 -->
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>
<script>
// import NavigationDrawers from "@/components/domain/NavigationDrawers";

export default {
  name: "Entrance",
  components: {
    // NavigationDrawers
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
</style>