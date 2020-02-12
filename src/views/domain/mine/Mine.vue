<template>
  <div style="height: 100%">
    <div class="left">
      <MineCategory @refreshLoveLink="refreshLoveLink"></MineCategory>
    </div>
    <div class="right">
      <v-list dense nav class="py-0 avator-background">
        <v-list-item two-line>
          <v-list-item-avatar size="64">
            <img :src="userImage" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>huaisun</v-list-item-title>
            <v-list-item-subtitle>ruiguangsun</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <LoveLink ref="love_link_ref"></LoveLink>
    </div>
  </div>
</template>

<script>
import LoveLink from "@/components/domain/mine/right/LoveLink";
import MineCategory from "@/components/domain/mine/left/MineCategory";
import { mapActions } from "vuex";
import DefaultJpg from "@/assets/photos/default.jpg";

export default {
  name: "Mine",
  components: {
    LoveLink,
    MineCategory
  },
  data: () => ({
    userImage: DefaultJpg
  }),
  created() {
    this.checkDomain();
  },
  methods: {
    /**进行方法读写 */
    ...mapActions("domain", ["putAuthorityEdit", "putUserDomain"]),
    /**进行域名的检测。如果与当前登录的用户相同则赋予编辑权限。否之 */
    checkDomain() {
      let user = JSON.parse(localStorage.getItem("user"));
      let path = window.location.pathname;
      if (user != null && path.indexOf(user.domain) === 1) {
        this.putAuthorityEdit(true);
      } else {
        this.putAuthorityEdit(false);
      }

      // 进行 domain赋值
      let sPath = path.slice(1, path.length);
      if (sPath.indexOf("/") == -1) {
        this.putUserDomain(sPath);
      } else {
        this.putUserDomain(sPath.slice(0, sPath.indexOf("/")));
      }
    },
    /**刷新喜爱链接 */
    refreshLoveLink() {
      this.$refs.love_link_ref.loadLoveLink();
    }
  }
};
</script>

<style scoped>
.right {
  margin-bottom: 30px;
  padding: 0;
  max-width: 293px;
  position: absolute;
  right: 0;
  width: 100%;
}

.left {
  float: left;
  margin-right: 28px;
  max-width: 614px;
  width: 100%;
}

.avator-background {
  background-color: transparent !important;
}
</style>