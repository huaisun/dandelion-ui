<template>
  <!-- 用户自定义分类单 -->
  <v-card class="mx-auto">
    <v-card-title>
      {{ user == null || user === undefined ? '': user.email }}
      <v-btn v-if="!(user == null || user=== undefined) && user.id" icon @click="signOut">
        <v-icon>remove_circle_outline</v-icon>
      </v-btn>
      <div v-else>
        <v-btn text @click="signIn">登录</v-btn>
      </div>
    </v-card-title>
    <v-card-text
      class="card"
      id="user-card"
      :style="{ maxHeight: fullscreenFlag == 1 ? categoryHeight : '406px'}"
    >
      <div id="user-category" style="display: flex;flex-flow:row wrap;">
        <!-- // 用户的网站 -->
        <LchCard
          v-for="(item, index) in categorys"
          :key="index"
          :links="item.links"
          :title="item.title"
          :subtitle="item.subtitle"
        ></LchCard>
      </div>

      <v-btn
        v-if="fullscreenFlag == 1"
        icon
        style="position: absolute; right: 0; top: 0"
        @click="fullscreenExit"
      >
        <v-icon>fullscreen_exit</v-icon>
      </v-btn>

      <v-btn v-else icon style="position: absolute; right: 0; top: 0" @click="fullscreenClick">
        <v-icon>fullscreen</v-icon>
      </v-btn>
    </v-card-text>
    <v-dialog v-model="signOutDialog" max-width="300" data-app="true">
      <SureDialog
        :text="signOutText"
        @sureDialog="sureSingOutDialog"
        @closeDialog="closeSignOutDialog"
      ></SureDialog>
    </v-dialog>
  </v-card>
</template>

<script>
import LchCard from "@/components/common/LchCard";
import SureDialog from "@/components/dialog/SureDialog";

export default {
  name: "User",
  components: {
    LchCard,
    SureDialog
  },
  props: ["fullscreenFlag"],
  data: () => ({
    // 登出提示框
    signOutDialog: false,
    signOutText: "确定要退出登陆吗？",
    user: JSON.parse(localStorage.getItem("user")),
    categorys: [],
    categoryHeight: "422px"
  }),
  mounted() {
    let height = document.getElementById("user-category").offsetHeight;
    if (height > 422) {
      this.categoryHeight = height + 20 + "px";
    }
  },
  methods: {
    fullscreenClick() {
      this.$emit("fullscreenChange", 1);
    },
    fullscreenExit() {
      this.$emit("fullscreenChange", 0);
    },
    /**登录 */
    signIn() {
      this.$router.push({ name: "login" });
    },
    closeSignOutDialog() {
      this.signOutDialog = false;
    },
    /**登出 */
    signOut() {
      this.signOutDialog = true;
    },
    sureSingOutDialog() {
      localStorage.removeItem("user");
      this.$router.push({ name: "login" });
      this.signOutDialog = false;
    }
  }
};
</script>