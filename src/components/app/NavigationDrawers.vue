<template>
  <v-navigation-drawer
    v-model="drawer"
    right
    expand-on-hover
    color="primary"
    src="../../assets/photos/bg-2.jpg"
    absolute
    dark
  >
    <v-list dense nav class="py-0">
      <v-list-item two-line>
        <v-list-item-avatar>
          <img src="https://randomuser.me/api/portraits/men/81.jpg" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>huaisun</v-list-item-title>
          <v-list-item-subtitle>420007900@qq.com</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item v-for="item in items" :key="item.title" link>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  name: "NavigationDrawers",
  data() {
    return {
      drawer: true,
      items: [
        { title: "我的", icon: "amp_stories" },
        { title: "收藏", icon: "move_to_inbox" },
        { title: "排行榜", icon: "trending_up" },
        { title: "本地导入", icon: "mdi-help-box" }
      ]
    };
  }
};
</script>

<style scoped>
.icon-margin {
  margin-right: 10px;
}
</style>