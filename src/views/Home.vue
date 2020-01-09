<template>
  <div>
    <Header ref="header_ref"></Header>
    <div class="mx-auto out-card">
      <!-- :style="{ width: fullscreenFlag != 0 ? '100%' : 'calc(100% - 360px)'}" -->
      <div v-if="fullscreenFlag == 0 || fullscreenFlag == 1" style="padding-bottom: 16px;">
        <User
          :fullscreenFlag="fullscreenFlag"
          @fullscreenChange="fullscreenChange"
          @refreshLoveLink="refreshLoveLink"
        ></User>
      </div>
      <div
        v-if="false && (fullscreenFlag == 0 || fullscreenFlag == 2)"
        style="padding-bottom: 16px;"
      >
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
  </div>
</template>

<script>
import Header from "@/components/Header";
import User from "@/components/User";
import Love from "@/components/Love";
import LinkRanks from "@/components/LinkRanks";
import CategoryRanks from "@/components/CategoryRanks";

export default {
  name: "home",
  components: {
    User,
    Love,
    LinkRanks,
    CategoryRanks,
    Header
  },
  data: () => ({
    fullscreenFlag: 0
  }),
  created() {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user === null || user === undefined) {
      this.$router.push({ name: 'login' });
    }
  },
  methods: {
    fullscreenChange(e) {
      this.fullscreenFlag = e;
    },
    refreshLoveLink() {
      this.$refs.header_ref.loadLoveLink();
    }
  }
};
</script>