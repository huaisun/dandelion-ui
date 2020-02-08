<template>
  <v-navigation-drawer dark class="navigation-1" floating permanent>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">应用</v-list-item-title>
        <v-list-item-subtitle>选择不同的浏览器进行导入</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-list rounded>
      <v-list-item v-for="item in items" :key="item.title" link>
        <v-list-item-icon>
          <img style="height: 24px; width: 24px;" :src="item.icon" />
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import Chrome from '@/assets/photos/chrome.png'
import FireFox from '@/assets/photos/firefox.png'

export default {
  name: "LocalUpload",
  data: () => ({
    items: [
      { title: "谷歌浏览器", icon: Chrome },
      { title: "火狐浏览器", icon: FireFox }
    ]
  })
};
</script>

<style scoped>
.navigation-1 {
  background-image: linear-gradient(to bottom, #77a1d3, #79cbca);
}
</style>