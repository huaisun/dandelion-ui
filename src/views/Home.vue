<template>
  <div>
    <div style="height: 100px; background-color: white; width: 100%;">
      <!-- 添加 -->
      <v-btn color="#0091EA" icon class="button-fixed button-right-1 button-top-1" @click="addLove">
        <v-icon>add_circle_outline</v-icon>
      </v-btn>
      <!-- 用户最喜爱的网站标题 -->
      <v-card class="mx-auto" raised>
        <v-card-text>
          <v-chip-group multiple column active-class="primary--text">
            <v-chip
              v-for="tag in links"
              :close="editFlag"
              :key="tag.id"
              class="link-tag"
              @click="linkClik(tag)"
            >{{ tag.title }}</v-chip>
          </v-chip-group>
        </v-card-text>
      </v-card>
      <div v-if="editFlag">
        <v-btn
          color="#FFD600"
          text
          class="button-fixed button-right-2 button-top-2"
          @click="cancelEdit"
        >取消</v-btn>
        <v-btn
          color="#64DD17"
          text
          class="button-fixed button-right-1 button-top-2"
          @click="successEdit"
        >完成</v-btn>
      </div>
      <!-- 编辑 -->
      <v-btn
        v-else
        color="#B71C1C"
        icon
        class="button-fixed button-right-1 button-top-2"
        @click="editLoveLinks"
      >
        <v-icon>edit</v-icon>
      </v-btn>
    </div>

    <div class="mx-auto out-card">
      <!-- :style="{ width: fullscreenFlag != 0 ? '100%' : 'calc(100% - 360px)'}" -->
      <div v-if="fullscreenFlag == 0 || fullscreenFlag == 1" style="padding-bottom: 16px;">
        <User :fullscreenFlag="fullscreenFlag" @fullscreenChange="fullscreenChange"></User>
      </div>
      <div v-if="false && (fullscreenFlag == 0 || fullscreenFlag == 2)" style="padding-bottom: 16px;">
        <Love :fullscreenFlag="fullscreenFlag" @fullscreenChange="fullscreenChange"></Love>
      </div>
    </div>

    <div v-if="false" style="float: right;">
      <div style="padding-bottom: 16px;">
        <LinkRanks></LinkRanks>
      </div>
      <div>
        <CategoryRanks></CategoryRanks>
      </div>
    </div>

    <!-- 添加dialog -->
    <v-dialog v-model="addLinkDialog" max-width="600" data-app="true">
      <AddLink @closeDialog="closeLinkDialog"></AddLink>
    </v-dialog>
  </div>
</template>

<script>
import User from "@/components/User";
import Love from "@/components/Love";
import LinkRanks from "@/components/LinkRanks";
import CategoryRanks from "@/components/CategoryRanks";
import AddLink from "@/components/dialog/AddLink";

export default {
  name: "home",
  components: {
    User,
    Love,
    LinkRanks,
    CategoryRanks,
    AddLink
  },
  data: () => ({
    // 添加链接弹出框
    addLinkDialog: false,

    editFlag: false, // 是否处于编辑状态
    fullscreenFlag: 0,
    time: 0,
    links: [],
    iconPencial: "mdiPencil"
  }),
  created() {
    // 初始化加载用户收藏数据
    this.loadLoveLink();
  },
  methods: {
    fullscreenChange(e) {
      this.fullscreenFlag = e;
    },
    /**编辑主要链接 */
    editLoveLinks() {
      this.editFlag = true;
    },
    /**取消编辑 */
    cancelEdit() {
      this.editFlag = false;
    },
    /**完成编辑 */
    successEdit() {
      this.editFlag = false;
    },
    /**弹出表单框 */
    addLove() {
      this.addLinkDialog = true;
    },
    /**关闭弹出框 */
    closeLinkDialog() {
      this.loadLoveLink();
      this.addLinkDialog = false;
    },
    /**用户收藏加载 */
    loadLoveLink() {
      let user = JSON.parse(localStorage.getItem("user"));
      if (user != null && user != undefined) {
        this.$axios
          .get("/lch/link/getLoveLinkByUserId", {
            params: { id: user.id }
          })
          .then(res => {
            this.links = res.data.data;
          });
      }
    },
    /**跳转链接 */
    linkClik(data) {
      window.open(data.url);
    }
  }
};
</script>

<style scoped>
.button-fixed {
  position: absolute;
  z-index: 456;
}

.button-right-1 {
  right: 15px;
}

.button-right-2 {
  right: 80px;
}

.button-top-1 {
  top: 15px;
}

.button-top-2 {
  top: 60px;
}

.link-tag {
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>