<template>
  <v-navigation-drawer dark style="background: rgba(0,0,0,0)" permanent>
    <v-list-item>
      <v-list-item-avatar>
        <v-icon>dashboard</v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="title">链接分类</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item style="padding: 0 20px; border-color: #eee" @click="addCategory">
        <v-list-item-icon>
          <v-icon>library_add</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            <h3>添加分类</h3>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        style="padding: 0 20px;"
        v-for="item in categorys"
        :key="item.id"
        link
        @click="loadDetail(item)"
      >
        <v-list-item-icon v-text="item.name.slice(0,1).toUpperCase()" style="font-size: 18px;"></v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>
            <h3 v-text="item.name"></h3>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-dialog v-model="addCategoryDialog" max-width="600" data-app="true">
      <AddCategory @closeDialog="closeDialog" @refresh="refreshCategory"></AddCategory>
    </v-dialog>
  </v-navigation-drawer>
</template>
<script>
import { getCategoryByDomain } from "@/api/domain/mine.api.js";
import AddCategory from "./AddCategory";

export default {
  name: "CategoryList",
  components: {
    AddCategory
  },
  data: () => ({
    categorys: [],
    addCategoryDialog: false
  }),
  created() {
    this.loadCategory();
  },
  methods: {
    /**加载分类列表 */
    loadCategory(id) {
      getCategoryByDomain({
        domain: this.$store.state.domain.user.domain
      }).then(res => {
        if (res.data.code === 0) {
          this.categorys = res.data.data;
          if (this.categorys != null && this.categorys.length > 0) {
            if (id == null || id == undefined) {
              this.loadDetail(res.data.data[0]);
            } else {
              res.data.data.map(item => {
                if(item.id === id) {
                  this.loadDetail(item);
                }
              })
            }
          }
        } else {
          this.$snackbar.error(res.data.message);
        }
      });
    },
    /**加载分类详情 */
    loadDetail(data) {
      this.$emit("loadDetail", data);
    },
    /**添加分类 */
    addCategory() {
      this.addCategoryDialog = true;
    },
    closeDialog() {
      this.addCategoryDialog = false;
    },
    /**刷新分类加载 */
    refreshCategory() {
      this.addCategoryDialog = false;
      this.loadCategory();
    }
  }
};
</script>

<style scoped>
</style>