<template>
  <v-app>
    <!-- 导航栏 -->
    <NavigationDrawers></NavigationDrawers>
    <!-- 内容 -->
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>
<script>
import NavigationDrawers from "@/components/app/NavigationDrawers";

export default {
  name: "Entrance",
  components: {
    NavigationDrawers
  }
};
</script>