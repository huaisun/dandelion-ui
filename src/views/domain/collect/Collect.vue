<template>
  <div id="collect">
    <v-card v-for="(item,index) in categorys" :key="index" class="d-inline-block category-collect">
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4" v-text="item.createUser"></div>
          <v-list-item-title class="headline mb-1" v-text="item.name"></v-list-item-title>
          <v-list-item-subtitle v-text="item.detailName"></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar tile size="80" color="black">
          <v-icon color="white" v-text="item.name.slice(0,1).toUpperCase()"></v-icon>
        </v-list-item-avatar>
      </v-list-item>

      <v-card-actions>
        <v-btn text>查看</v-btn>
        <v-dialog v-model="tipDialog" persistent max-width="390">
          <template v-slot:activator="{ on }">
            <v-btn text v-on="on">取消收藏</v-btn>
          </template>
          <v-card>
            <v-card-title class="headline">提示?</v-card-title>
            <v-card-text>确认取消收藏分类: {{ item.name }}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="tipDialog = false">否</v-btn>
              <v-btn color="green darken-1" text @click="deleteCollect(item)">是</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { getCollectCategory,deleteCollectCategory } from "@/api/collect/collect.api.js";

export default {
  name: "Collect",
  data: () => ({
    categorys: [],
    tipDialog: false
  }),
  created() {
    this.loadCollectCategorys();
  },
  methods: {
    /**加载收藏的分类 */
    loadCollectCategorys() {
      getCollectCategory({
        domain: this.$store.state.domain.user.domain
      }).then(res => {
        this.categorys = res.data.data;
      });
    },
    /**删除分类 */
    deleteCollect(data) {
      this.tipDialog = false;
      let user = JSON.parse(localStorage.getItem("user"));
      deleteCollectCategory({userId: user.id, categoryId: data.id}).then(res => {
        if(res.data.code === 0) {
          this.loadCollectCategorys();
          this.$snackbar.success(this.DELETE_COLLECT_SUCCESS);
        } else {
          this.$snackbar.error(this.res.data.message);
        }
      })
    }
  }
};
</script>
<style scoped>
#collect {
  height: 100%;
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
}
.category-collect {
  margin: 20px 0 0 20px;
}
</style>