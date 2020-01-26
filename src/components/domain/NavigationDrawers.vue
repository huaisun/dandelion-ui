<template>
  <v-navigation-drawer
    v-model="drawer"
    src="../../assets/photos/sign.jpg"
    right
    absolute
    expand-on-hover
    permanent
    dark
  >
    <v-list dense nav class="py-0">
      <v-list-item two-line>
        <v-list-item-avatar>
          <img :src="userImage" />
        </v-list-item-avatar>
        <v-list-item-content v-if="user == null">
          <v-row>
            <v-col cols="6">
              <v-btn color="primary" small @click="signIn">登录</v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn color="warning" small @click="signUp">注册</v-btn>
            </v-col>
          </v-row>
        </v-list-item-content>
        <v-list-item-content v-else>
          <v-list-item-title>{{ user.domain }}</v-list-item-title>
          <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item v-for="item in items" :key="item.title" link v-show="user != null || item.show">
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
        { title: "我的", icon: "face", show: false },
        { title: "收藏", icon: "cloud_download", show: false },
        { title: "排行榜", icon: "equalizer", show: true },
        { title: "本地导入", icon: "cloud_upload", show: false }
      ],
      user: JSON.parse(localStorage.getItem("user")),
      userImage: DefaultJpg,
      mini: false
    };
  },
  created() {
    // 加载用户图像
    this.loadImage();
  },
  methods: {
    // 加载用户图像
    loadImage() {
      if (
        this.user == null ||
        this.user.img === null ||
        this.user.img === undefined
      ) {
        this.userImage = DefaultJpg;
      }
    },
    // 登录
    signIn() {
      this.$router.push({ name: "Sign", params: { sign: true } });
    },
    // 注册
    signUp() {
      this.$router.push({ name: "Sign", params: { sign: false } });
    }
  }
};
</script>

<style scoped>
.icon-margin {
  margin-right: 10px;
}
</style>