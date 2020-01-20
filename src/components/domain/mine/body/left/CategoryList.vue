<template>
  <v-card dark width="100%" max-width="544px" class="mx-auto" color="#385F73">
    <v-card-title>
      <v-icon large left>dashboard</v-icon>
      <span class="title font-weight-light">分类 列表</span>
    </v-card-title>

    <v-card-text>
      <v-list dense color="#385F73">
        <div v-for="(item, index) in categorys" :key="index">
          <v-list-item @click="loadDetail(item)">
            <v-list-item-icon v-text="item.name.slice(0,1)" style="font-size: 18px;"></v-list-item-icon>
            <v-list-item-content>
              <h3 v-text="item.name"></h3>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
        </div>
      </v-list>
    </v-card-text>
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
    /**加载分类列表 */
    loadCategory() {
      getCategoryByDomain({
        domain: this.$store.state.domain.user.domain
      }).then(res => {
        if (res.data.code === 0) {
          this.categorys = res.data.data;
          if (this.categorys != null && this.categorys.length > 0) {
            this.loadDetail(res.data.data[0]);
          }
        } else {
          this.$snackbar.error(res.data.message);
        }
      });
    },
    /**加载分类详情 */
    loadDetail(data) {
      this.$emit("loadDetail", data);
    }
  }
};
</script>