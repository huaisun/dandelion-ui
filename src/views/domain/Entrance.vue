<template>
  <v-app>
    <div>
      <v-app-bar fixed>
        <div id="app-bar" class="mx-auto">
          <div style="display: inline;">
            <v-btn x-large icon>
              <v-icon color="#000">pets</v-icon>
            </v-btn>
            <v-btn style="padding: 0; margin-right: 50px;" text>
              <img class="img-lch" src="../../assets/photos/lch.png" />
            </v-btn>
          </div>
          <div style="display: inline;">
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
        <v-tabs-items v-model="tab">
          <v-tab-item value="mine">
            <v-card flat>
              <Mine></Mine>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </div>
    </v-content>
  </v-app>
</template>
<script>
import Mine from "./mine/Mine";

export default {
  name: "Entrance",
  components: {
    Mine
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
  methods: {}
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
</style>