<template>
  <v-app>
    <div>
      <v-app-bar fixed>
        <div id="app-bar" class="mx-auto">
          <div style="display: inline;">
            <v-btn style="padding: 0; margin-right: 50px; height: 48px" text>
              <img class="img-lch" src="../../assets/photos/lch.png" />
            </v-btn>
          </div>
          <div style="display: inline; width: 900px">
            <v-tabs v-model="tab">
              <v-tab
                v-for="(item, index) in items"
                v-show="item.show || $store.state.domain.authority.edit"
                :key="index"
                v-text="item.title"
                :href="'#' + item.id"
              ></v-tab>
            </v-tabs>
          </div>
          <div style="display: inline-block; float: right">
            <v-btn @click="logoutClick" title="退出登录" v-if="$store.state.domain.authority.edit" icon>
              <v-icon>exit_to_app</v-icon>
            </v-btn>
            <v-btn v-else>登录</v-btn>
          </div>
        </div>
      </v-app-bar>
    </div>
    <v-content>
      <div class="main-content mx-auto">
        <v-tabs-items class="tab-item-background" v-model="tab">
          <v-tab-item value="mine">
            <Mine ref="mine" @refreshCollect="refreshCollect"></Mine>
          </v-tab-item>
          <v-tab-item value="collect">
            <Collect ref="collect"></Collect>
          </v-tab-item>
          <v-tab-item value="local">
            <Local @refreshMineCategory="refreshMineCategory"></Local>
          </v-tab-item>
        </v-tabs-items>
      </div>
    </v-content>
  </v-app>
</template>
<script>
import Mine from "./mine/Mine";
import Collect from "./collect/Collect";
import Local from "./local/Local";
import { mapActions } from "vuex";

export default {
  name: "Entrance",
  components: {
    Mine,
    Collect,
    Local
  },
  data: () => ({
    domain: "",
    tab: null,
    items: [
      { title: "我的", id: "mine", show: true },
      { title: "收藏", id: "collect", show: false },
      { title: "本地导入", id: "local", show: false }
    ]
  }),
  created() {
    // 配置网页域名规则
    this.loadLocalStoryUser();
  },
  methods: {
    ...mapActions("domain", ["putAuthorityEdit"]),
    loadLocalStoryUser() {
      let user = JSON.parse(localStorage.getItem("user"));
      if (user == null) {
        this.putAuthorityEdit(false);
      }
    },
    refreshCollect() {
      this.$refs.collect.loadCollectCategorys();
    },
    refreshMineCategory() {
      this.$refs.mine.refreshCategory();
    },
    /**登出操作 */
    logoutClick() {
      localStorage.clear();
      this.$router.push({ name: "login" });
    }
  }
};
</script>

<style scoped>
#app-bar {
  max-width: 935px;
  display: flex;
}

.img-lch {
  height: 36px;
}

.main-content {
  padding-top: 100px;
  max-width: 935px;
}

.tab-item-background {
  background-color: transparent !important;
}
</style>