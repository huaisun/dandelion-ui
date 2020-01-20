<template>
  <v-card dark width="100%" max-width="544px" class="mx-auto" color="#385F73">
    <v-card-title>
      <v-icon large left>dashboard</v-icon>
      <span class="title font-weight-light">分类 列表</span>
    </v-card-title>

    <v-card-text>
      <v-list dense color="#385F73">
        <div v-for="(item, index) in categorys" :key="index">
          <v-list-item @click="categoryClick">
            <v-list-item-icon v-text="item.name.slice(0,1)" style="font-size: 18px;"></v-list-item-icon>
            <v-list-item-content>
              <h3 v-text="item.name"></h3>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
        </div>
      </v-list>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { getCategoryByDomain } from "@/api/domain/mine.api.js";

export default {
  name: "CategoryList",
  data: () => ({
    categorys: []
  }),
  created() {
    this.loadCategory();
  },
  methods: {
    /**分类点击 */
    categoryClick() {},

    /**加载分类列表 */
    loadCategory() {
      getCategoryByDomain({
        domain: this.$store.state.domain.user.domain
      }).then(res => {
        if (res.data.code === 0) {
          this.categorys = res.data.data;
        } else {
          this.$snackbar.error(res.data.message);
        }
      });
    }
  }
};
</script>