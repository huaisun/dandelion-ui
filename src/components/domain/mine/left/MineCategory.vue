<template>
  <v-row dense>
    <v-col cols="6">
      <v-card dark @click="addCategory">
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-title class="headline">添加分类</v-card-title>
          </div>
          <v-avatar class="man-3" size="75" tile>
            <v-icon color="red">adb</v-icon>
          </v-avatar>
        </div>
      </v-card>
    </v-col>
    <v-col v-for="(item, i) in categorys" :key="i" cols="6">
      <v-card @click="categoryClick(item)">
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-title class="headline" v-text="item.name"></v-card-title>
            <v-card-subtitle v-text="item.detailName"></v-card-subtitle>
          </div>
          <v-avatar class="ma-3" size="75" tile>
            <v-icon v-text="item.name.slice(0,1).toUpperCase()"></v-icon>
          </v-avatar>
        </div>
      </v-card>
    </v-col>
    <v-dialog v-model="addCategoryDialog" max-width="600" data-app="true">
      <AddCategory @closeDialog="closeDialog" @refresh="refreshCategory"></AddCategory>
    </v-dialog>
    <v-dialog v-model="linksDialog" max-width="600" data-app="true">
      <LinksDialog
        :category="category"
        @closeDialog="closeDialog"
        @refreshCategory="refreshCategory"
        @refreshLoveLink="refreshLoveLink"
      ></LinksDialog>
    </v-dialog>
  </v-row>
</template>
<script>
import AddCategory from "./AddCategory";
import { getCategoryByDomain } from "@/api/domain/mine.api.js";
import LinksDialog from "./LinksDialog";

export default {
  name: "MineCategory",
  components: {
    AddCategory,
    LinksDialog
  },
  data: () => ({
    categorys: [],
    addCategoryDialog: false,
    category: null,
    linksDialog: false
  }),
  created() {
    this.loadCategory();
  },
  methods: {
    /**加载分类列表 */
    loadCategory(val) {
      getCategoryByDomain({
        domain: this.$store.state.domain.user.domain
      }).then(res => {
        if (res.data.code === 0) {
          this.categorys = res.data.data;
          if(val != null && val != undefined) {
            res.data.data.map(item => {
              if(item.id === val) {
                this.categoryClick(item);
              }
            })
          }
        } else {
          this.$snackbar.error(res.data.message);
        }
      });
    },
    refreshLoveLink() {
      this.$emit("refreshLoveLink");
    },
    /**添加分类 */
    addCategory() {
      this.addCategoryDialog = true;
    },
    categoryClick(data) {
      this.category = data;
      this.linksDialog = true;
    },
    closeDialog() {
      this.linksDialog = false;
      this.addCategoryDialog = false;
    },
    refreshCategory(val) {
      this.closeDialog();
      this.loadCategory(val);
    }
  }
};
</script>

<style scoped>
.mine-body {
  padding: 0 100px 0 0;
  height: calc(100% - 80px);
}
</style>