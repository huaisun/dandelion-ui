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
                :key="index"
                v-text="item.title"
                :href="'#' + item.id"
              ></v-tab>
            </v-tabs>
          </div>
        </div>
      </v-app-bar>
    </div>
    <v-content>
      <div class="main-content mx-auto">
        <v-tabs-items class="tab-item-background" v-model="tab">
          <v-tab-item value="mine">
            <Mine @refreshCollect="refreshCollect"></Mine>
          </v-tab-item>
          <v-tab-item value="collect">
            <Collect ref="collect"></Collect>
          </v-tab-item>
          <v-tab-item value="local">
            <Local></Local>
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
      { title: "我的", id: "mine" },
      { title: "收藏", id: "collect" },
      { title: "本地导入", id: "local" }
    ]
  }),
  created() {
    // 配置网页域名规则
  },
  methods: {
    refreshCollect() {
      this.$refs.collect.loadCollectCategorys();
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