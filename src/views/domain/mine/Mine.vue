<template>
  <div style="height: 100%">
    <LoveLink ref="love_link_ref"></LoveLink>
    <MineCategory @refreshLoveLink="refreshLoveLink"></MineCategory>
  </div>
</template>

<script>
import LoveLink from "@/components/domain/mine/top/LoveLink";
import MineCategory from "@/components/domain/mine/body/MineCategory";
import { mapActions } from "vuex";

export default {
  name: "Mine",
  components: {
    LoveLink,
    MineCategory
  },
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