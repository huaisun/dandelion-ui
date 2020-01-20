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
          <img :src="userImage" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ user != null ? user.domain : '默认用户'}}</v-list-item-title>
          <v-list-item-subtitle>{{ user != null ? user.email : "default@lch.com" }}</v-list-item-subtitle>
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
import DefaultJpg from "../../assets/photos/default.jpg";

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
      ],
      user: JSON.parse(localStorage.getItem("user")),
      userImage: DefaultJpg
    };
  },
  created() {
    // 加载用户图像
    this.loadImage();
  },
  methods: {
    // 加载用户图像
    loadImage() {
      if(this.user == null || this.user.img === null || this.user.img === undefined) {
        this.userImage = DefaultJpg;
      }
    }
  }
};
</script>

<style scoped>
.icon-margin {
  margin-right: 10px;
}
</style>