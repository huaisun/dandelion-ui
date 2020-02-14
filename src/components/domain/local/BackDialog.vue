<template>
  <v-card>
    <v-tabs>
      <v-tab>所有链接</v-tab>
      <v-spacer></v-spacer>
      <v-btn icon @click="closeDialog">
        <v-icon color="info">close</v-icon>
      </v-btn>
      <v-tab-item>
        <v-card class="card" flat>
          <v-card-text>
            <v-list dense>
              <v-list-item v-for="(item, i) in links" :key="i">
                <v-list-item-icon>
                  <img
                    style="height: 24px; width: 24px;"
                    v-if="item.icon != null"
                    :src="'data:image/png;base64,' + item.icon"
                  />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.name"></v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon title="添加到分类" @click="addForCategory(item)">
                    <v-icon>exit_to_app</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
    <v-dialog v-model="dialog" width="450px">
      <v-card>
        <v-card-title>
          选择分类
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>

        <v-data-table
          v-model="selected"
          :headers="headers"
          :search="search"
          :items="categorys"
          class="elevation-1"
          height="450px"
          show-select
          hide-default-header
          hide-default-footer
        ></v-data-table>
        <v-card-actions>
          <v-btn text color="warning" @click="addCategoryDialog = true">新增分类</v-btn>
          <v-spacer></v-spacer>
          <v-btn text color="grey" @click="dialog = false">关闭</v-btn>
          <v-btn text color="info" @click="sureSelect">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="addCategoryDialog" max-width="600" data-app="true">
      <AddCategory @closeDialog="addCategoryDialog = false" @refresh="refreshCategory"></AddCategory>
    </v-dialog>
  </v-card>
</template>

<script>
import { getCategoryByDomain, addCategoryLink } from "@/api/domain/mine.api.js";
import AddCategory from "@/components/domain/mine/left/AddCategory";

export default {
  name: "BackDialog",
  props: ["links"],
  components: {
    AddCategory
  },
  data: () => ({
    headers: [
      {
        text: "分类名称",
        align: "left",
        sortable: true,
        value: "name"
      }
    ],
    categorys: [],
    dialog: false,
    categoryName: "",
    search: "",
    selected: [],
    selectedLink: null,
    addCategoryDialog: false
  }),
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },
    /**将链接添加到分类 */
    addForCategory(data) {
      this.selectedLink = data;
      this.loadCategory();
      this.dialog = true;
    },
    loadCategory(val) {
      let user = JSON.parse(localStorage.getItem("user"));
      if (user != null) {
        getCategoryByDomain({
          domain: user.domain,
          order: val,
          name: this.categoryName
        }).then(res => {
          if (res.data.code === 0) {
            this.categorys = res.data.data;
          }
        });
      }
    },
    /**确认选中 */
    sureSelect() {
      if (this.selected.length == 0) {
        this.$snackbar.error(this.NO_EMTPY_SELECT_CATEGORY);
      } else {
        let ids = "";
        this.selected.map(item => {
          ids += item.id + ",";
        });
        let user = JSON.parse(localStorage.getItem("user"));
        addCategoryLink({
          ids: ids,
          userId: user.id,
          url: this.selectedLink.url,
          name: this.selectedLink.name,
          icon: this.selectedLink.icon
        }).then(res => {
          if (res.data.code === 0) {
            this.$snackbar.success(this.ADD_SUCCESS);
            this.$emit("refreshMineCategory");
          } else {
            this.$snackbar.error(res.data.message);
          }
        });
        this.dialog = false;
        this.selected = [];
      }
    },
    refreshCategory() {
      this.loadCategory();
      this.addCategoryDialog = false;
      this.$emit("refreshMineCategory");
    }
  }
};
</script>

<style scoped>
.card {
  max-height: 650px;
}
.card-category {
  height: 350px;
}
</style>