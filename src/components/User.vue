<template>
  <!-- 用户自定义分类单 -->
  <v-card class="mx-auto">
    <v-card-title>
      {{ user == null || user === undefined ? '': user.email }}
      <div v-if="!(user == null || user=== undefined) && user.id">
        <v-btn icon @click="signOut">
          <v-icon>power_settings_new</v-icon>
        </v-btn>
        <v-btn icon color="#000000">
          <v-icon @click="updateIcon">update</v-icon>
        </v-btn>
        <v-btn outlined small color="#FF6F00" @click="addCategory">
          <v-icon>add</v-icon>添加分类
        </v-btn>
      </div>
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
          :category="item"
          @loadCategory="loadCategory"
          @refresh="refresh"
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
    <v-dialog v-model="addCategoryDialog" max-width="300" data-app="true">
      <AddCategory @closeDialog="closeCategoryDialog" @refresh="refreshCategory"></AddCategory>
    </v-dialog>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate color="#4CAF50"></v-progress-circular>
    </v-overlay>
  </v-card>
</template>

<script>
import LchCard from "@/components/common/LchCard";
import SureDialog from "@/components/dialog/SureDialog";
import AddCategory from "@/components/dialog/AddCategory";

export default {
  name: "User",
  components: {
    LchCard,
    SureDialog,
    AddCategory
  },
  props: ["fullscreenFlag"],
  data: () => ({
    // 遮罩层
    overlay: false,
    // 添加用户分类
    addCategoryDialog: false,
    // 登出提示框
    signOutDialog: false,
    signOutText: "确定要退出登陆吗？",
    user: JSON.parse(localStorage.getItem("user")),
    categorys: [],
    categoryHeight: "422px"
  }),
  created() {
    this.loadCategory();
  },
  mounted() {
    let height = document.getElementById("user-category").offsetHeight;
    if (height > 422) {
      this.categoryHeight = height + 20 + "px";
    }
  },
  methods: {
    /**获取用户创建的分类 */
    loadCategory() {
      let user = JSON.parse(localStorage.getItem("user"));
      if (user != null) {
        this.$axios
          .get("/lch/category/getCategoryByUserId", {
            params: { userId: user.id }
          })
          .then(res => {
            this.categorys = res.data.data;
          });
      }
    },
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
    /**确认登出 */
    sureSingOutDialog() {
      localStorage.removeItem("user");
      this.$router.push({ name: "login" });
      this.signOutDialog = false;
    },
    /**添加分类 */
    addCategory() {
      this.addCategoryDialog = true;
    },
    closeCategoryDialog() {
      this.addCategoryDialog = false;
    },
    // 刷新链接
    refresh() {
      this.loadCategory();
      this.$emit("refreshLoveLink");
    },
    // 刷新分类
    refreshCategory() {
      this.loadCategory();
      this.closeCategoryDialog();
    },
    // 更新链接的icon
    updateIcon() {
      let user = JSON.parse(localStorage.getItem("user"));
      this.overlay = true;
      this.$axios.post("/lch/user/updateIcon", user).then(() => {
        this.overlay = false;
      });
    }
  }
};
</script>