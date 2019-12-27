<template>
  <div>
    <div style="height: 100px; background-color: white; width: 100%;">
      <div
        style="position: fixed; width: calc(100% - 40px); z-index: 456;"
        :style="{ height: editFlag ? '100%': 'auto'}"
        :class="{ 'edit-main-link': editFlag }"
      >
        <div v-if="editFlag">
          <v-btn fixed text style="right: 80px;z-index: 456" @click="cancelEdit">取消</v-btn>
          <v-btn right fixed text style="z-index: 456" @click="successEdit">完成</v-btn>
        </div>
        <v-btn v-else icon right fixed style="z-index: 456" @click="editLoveLinks">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>

        <!-- 用户最喜爱的网站标题 -->
        <v-card fixed class="mx-auto" raised>
          <v-card-text>
            <v-chip-group multiple column active-class="primary--text">
              <v-chip v-for="tag in tags" :close="editFlag" :key="tag">{{ tag }}</v-chip>
            </v-chip-group>
          </v-card-text>
        </v-card>
      </div>
    </div>
    <div
      class="mx-auto out-card"
      :style="{ width: fullscreenFlag != 0 ? '100%' : 'calc(100% - 360px)'}"
    >
      <div v-if="fullscreenFlag == 0 || fullscreenFlag == 1" style="padding-bottom: 16px;">
        <User :fullscreenFlag="fullscreenFlag" @fullscreenChange="fullscreenChange"></User>
      </div>
      <div v-if="fullscreenFlag == 0 || fullscreenFlag == 2" style="padding-bottom: 16px;">
        <Love :fullscreenFlag="fullscreenFlag" @fullscreenChange="fullscreenChange"></Love>
      </div>
    </div>
    <div v-if="fullscreenFlag == 0" style="float: right;">
      <div style="padding-bottom: 16px;">
        <LinkRanks></LinkRanks>
      </div>
      <div>
        <CategoryRanks></CategoryRanks>
      </div>
    </div>
  </div>
</template>

<script>
import User from "@/components/User.vue";
import Love from "@/components/Love.vue";
import LinkRanks from "@/components/LinkRanks.vue";
import CategoryRanks from "@/components/CategoryRanks";

export default {
  name: "home",
  components: {
    User,
    Love,
    LinkRanks,
    CategoryRanks
  },
  data: () => ({
    editFlag: false, // 是否处于编辑状态
    fullscreenFlag: 0,
    time: 0,
    tags: [
      "Work",
      "Home Improvement",
      "Vacation",
      "Food",
      "Drawers",
      "Shopping",
      "Art",
      "Tech",
      "Creative Writing"
    ],
    iconPencial: "mdiPencil"
  }),
  created() {
    let id = localStorage.getItem("dandelion_id");
    if (id === undefined || id === null) {
      this.$router.push({ name: "login" });
    }
  },
  methods: {
    fullscreenChange(e) {
      this.fullscreenFlag = e;
    },
    /**
     * 编辑主要链接
     */
    editLoveLinks() {
      this.editFlag = true;
    },
    /**
     * 取消编辑
     */
    cancelEdit() {
      this.editFlag = false;
    },
    /**
     * 完成编辑
     */
    successEdit() {
      this.editFlag = false;
    }
  }
};
</script>

<style scoped>
.edit-main-link {
  height: 100%;
  background-color: #eee;
  opacity: 0.9;
}
</style>