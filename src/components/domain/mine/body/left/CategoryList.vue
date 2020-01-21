<template>
  <v-navigation-drawer class="category category-1" permanent>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">分类</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item v-for="item in categorys" :key="item.id" link @click="loadDetail(item)">
        <v-list-item-icon v-text="item.name.slice(0,1)" style="font-size: 18px;"></v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>
            <h3 v-text="item.name"></h3>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
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

<style scoped>
.category-1 {
  background-image: linear-gradient(
    to right,
    #a1c4fd 0%,
    #c2e9fb 51%,
    #a1c4fd 100%
  );
}
</style>