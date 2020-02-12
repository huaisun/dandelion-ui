<template>
  <v-card>
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="headline" v-text="category.name"></v-list-item-title>
        <v-list-item-subtitle v-text="category.detailName"></v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-card-text>
      <v-list
        color="rgba(0,0,0,0)"
        v-if="category.links.length == 1 && category.links[0].id == null"
      ></v-list>
      <v-list v-else>
        <v-list-item v-for="(item, i) in category.links" :key="i" @click="console.log()">
          <v-list-item-icon @click="urlClick(item)">
            <img style="height: 24px; width: 24px;" :src="'data:image/png;base64,' + item.ico" />
          </v-list-item-icon>
          <v-list-item-content @click="urlClick(item)">
            <v-list-item-title v-text="item.name"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-action style="margin: 0">
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-btn v-show="$store.state.domain.authority.edit" v-on="on" icon>
                  <v-icon>more_vert</v-icon>
                </v-btn>
              </template>
              <v-list dense>
                <v-list-item
                  v-for="(item1, index) in $store.state.domain.categroyLinkMenu"
                  :key="index"
                  @click="handleLink(item1.com, item)"
                >
                  <v-list-item-icon>
                    <v-icon v-text="item1.icon" :color="item1.color"></v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="item1.text" :color="item1.color"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn icon @click="addLinkCategory">
        <v-icon color="primary">playlist_add</v-icon>
      </v-btn>
      <v-btn icon @click="editCategory">
        <v-icon color="green">edit_location</v-icon>
      </v-btn>
      <v-btn icon @click="collectCategory">
        <v-icon color="error">mdi-heart</v-icon>
      </v-btn>
      <v-btn icon @click="deleteCategory">
        <v-icon color="grey">delete_outline</v-icon>
      </v-btn>
      <v-btn color="grey" text @click="closeDialog">关闭</v-btn>
    </v-card-actions>
    <v-dialog v-model="editCategoryDialog" max-width="450" data-app="true">
      <EditCategory :id="category.id" @closeDialog="closeInnerDialog" @refresh="refreshCategory"></EditCategory>
    </v-dialog>
    <v-dialog v-model="addLinkDialog" max-width="450" data-app="true">
      <AddLink :category="category" @closeDialog="closeInnerDialog" @refresh="refreshCategory"></AddLink>
    </v-dialog>
    <v-dialog v-model="editLinkDialog" max-width="450" data-app="true">
      <EditLink
        :id="category.id"
        :linkId="linkId"
        @closeDialog="closeInnerDialog"
        @refresh="refreshLink"
      ></EditLink>
    </v-dialog>
  </v-card>
</template>
<script>
import {
  deleteCategory,
  addCategoryUser,
  deleteCategoryLink,
  saveLoveLink
} from "@/api/domain/mine.api.js";
import EditCategory from "./EditCategory";
import AddLink from "./AddLink";
import EditLink from "./EditLink";
import { mapActions } from "vuex";

export default {
  name: "LinksDialog",
  props: ["category"],
  components: {
    EditCategory,
    AddLink,
    EditLink
  },
  data: () => ({
    editCategoryDialog: false,
    addLinkDialog: false,
    linkId: "",
    editLinkDialog: false
  }),
  methods: {
    /**注册store方法 */
    ...mapActions("domain", ["putCategoryForm", "putLinkForm"]),
    closeDialog() {
      this.$emit("closeDialog");
    },
    /**关闭弹出框 */
    closeInnerDialog() {
      this.editCategoryDialog = false;
      this.addLinkDialog = false;
      this.editLinkDialog = false;
    },
    urlClick(data) {
      window.open(data.url);
    },
    /**删除分类 */
    deleteCategory() {
      deleteCategory({ categoryId: this.category.id }).then(res => {
        if (res.data.code === 0) {
          this.$emit("refreshCategory");
        } else {
          this.$snackbar.error(res.data.message);
        }
      });
    },
    /**收藏分类 */
    collectCategory() {
      // 添加收藏
      let user = JSON.parse(localStorage.getItem("user"));
      addCategoryUser({ id: this.category.id, userId: user.id }).then(res => {
        if (res.data.code === 0) {
          this.$snackbar.success(this.COLLECT_SUCCESS);
        } else {
          this.$snackbar.error(res.data.message);
        }
      });
    },
    /**编辑分类名称 */
    editCategory() {
      this.editCategoryDialog = true;
      this.putCategoryForm({
        name: this.category.name,
        detailName: this.category.detailName
      });
    },
    /**刷新分类名称 */
    refreshCategory() {
      this.closeInnerDialog();
      this.$emit("refreshCategory", this.category.id);
    },
    addLinkCategory() {
      this.addLinkDialog = true;
    },
    handleLink(com, data) {
      if (com === "add") {
        // 进行添加到我的喜欢
        let user = JSON.parse(localStorage.getItem("user"));
        saveLoveLink({
          linkId: data.id,
          userId: user.id,
          name: data.name
        }).then(res => {
          if (res.data.code === 0) {
            this.$emit("refreshLoveLink");
          } else {
            this.$snackbar.error(res.data.message);
          }
        });
      } else if (com === "delete") {
        // 进行删除
        deleteCategoryLink({
          categoryId: this.category.id,
          linkId: data.id
        }).then(res => {
          if (res.data.code === 0) {
            this.$emit("refreshCategory", this.category.id);
          } else {
            this.$snackbar.error(res.data.message);
          }
        });
      } else if (com === "edit") {
        // 进行编辑
        this.editLinkDialog = true;
        this.linkId = data.id;
        this.putLinkForm({ url: data.url, name: data.name });
      }
    }
  }
};
</script>