<template>
  <v-row dense>
    <v-col cols="4" v-for="(item,index) in categorys" :key="index">
      <v-card @click="cardClick">
        <v-row>
          <v-col @click="showCategoryLinks(item)">
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4" color="primary" v-text="item.createUser"></div>
                <v-list-item-title class="headline mb-1" v-text="item.name"></v-list-item-title>
                <v-list-item-subtitle v-text="item.detailName"></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="auto" class="text-center pl-0">
            <v-row class="flex-column ma-0 fill-height" justify="center">
              <v-col class="px-0">
                <v-btn color="error" icon>
                  <v-icon @click="cancelCollect(item)">mdi-heart</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-dialog v-model="showDialog" width="600px">
      <LinksDialog
        :title="title"
        :links="links"
        @closeDialog="closeLinksDialog"
        @refreshLoveLink="refreshLoveLink"
      ></LinksDialog>
    </v-dialog>
    <v-dialog v-model="tipDialog" max-width="390">
      <v-card>
        <v-card-title class="headline">提示?</v-card-title>
        <v-card-text>确认取消收藏分类</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="tipDialog = false">否</v-btn>
          <v-btn color="green darken-1" text @click="deleteCollect">是</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import {
  getCollectCategory,
  deleteCollectCategory
} from "@/api/domain/collect.api.js";
import LinksDialog from "@/components/domain/collect/LinksDialog";

export default {
  name: "Collect",
  components: {
    LinksDialog
  },
  data: () => ({
    categorys: [],
    tipDialog: false,
    showDialog: false,
    title: "",
    links: [],
    category: null
  }),
  created() {
    this.loadCollectCategorys();
  },
  methods: {
    cancelCollect(data) {
      this.category = data;
      this.tipDialog = true;
    },
    cardClick() {},
    showCategoryLinks(data) {
      this.title = data.name;
      this.links = data.links;
      this.showDialog = true;
    },
    /**加载收藏的分类 */
    loadCollectCategorys() {
      let user = JSON.parse(localStorage.getItem("user"));
      getCollectCategory({
        domain: user.domain
      }).then(res => {
        this.categorys = res.data.data;
      });
    },
    /**删除分类 */
    deleteCollect() {
      this.tipDialog = false;
      let user = JSON.parse(localStorage.getItem("user"));
      deleteCollectCategory({
        userId: user.id,
        categoryId: this.category.id
      }).then(res => {
        if (res.data.code === 0) {
          this.loadCollectCategorys();
          this.$snackbar.success(this.DELETE_COLLECT_SUCCESS);
        } else {
          this.$snackbar.error(this.res.data.message);
        }
      });
    },
    /**关闭 */
    closeLinksDialog() {
      this.showDialog = false;
    },
    refreshLoveLink() {
      this.$emit('refreshLoveLink');
    }
  }
};
</script>
<style scoped>
</style>