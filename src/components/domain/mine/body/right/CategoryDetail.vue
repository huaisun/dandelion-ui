<template>
  <v-card width="100%" max-width="720px" class="mx-auto category category-2 category-detail">
    <v-card-title>
      <v-list-item>
        <v-list-item-avatar color="cyan">
          <v-icon color="white" v-text="name.slice(0,1).toUpperCase()"></v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="headline" v-text="name"></v-list-item-title>
          <v-list-item-subtitle v-text="detailName"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card-title>

    <v-card-text>
      <v-list dense color="rgba(0,0,0,0)" v-if="links.length == 1 && links[0].id == null"></v-list>
      <v-list dense color="rgba(0,0,0,0)" v-else>
        <div v-for="(item, index) in links" :key="index">
          <v-list-item @click="itemClick()">
            <v-list-item-icon>
              <img style="height: 24px; width: 24px;" :src="'data:image/png;base64,' + item.ico" />
            </v-list-item-icon>
            <v-list-item-content @click="urlClick(item)">
              <h3 v-text="item.name"></h3>
            </v-list-item-content>
            <v-list-item-action style="margin: 0">
              <v-menu offset-y>
                <template v-slot:activator="{ on }">
                  <v-btn v-show="$store.state.domain.authority.edit" v-on="on" color="white" icon>
                    <v-icon>more_vert</v-icon>
                  </v-btn>
                </template>
                <v-list dense dark>
                  <v-list-item
                    v-for="(item1, index) in $store.state.domain.categroyLinkMenu"
                    :key="index"
                    @click="handleLove(item1.com, item)"
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
          <v-divider></v-divider>
        </div>
      </v-list>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn icon @click="addLinkDialog = true" color="white">
        <v-icon>playlist_add</v-icon>
      </v-btn>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn v-show="$store.state.domain.authority.edit" v-on="on" color="white" icon>
            <v-icon>more_vert</v-icon>
          </v-btn>
        </template>
        <v-list dense dark>
          <v-list-item
            v-for="(item2, index) in $store.state.domain.categroyLinkMenu"
            :key="index"
            @click="handleCategory(item2.com)"
          >
            <v-list-item-icon>
              <v-icon v-text="item2.icon" :color="item2.color"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item2.text + '分类'" :color="item2.color"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-actions>
    <v-dialog v-model="editCategory" max-width="600" data-app="true">
      <EditCategory :id="id" @closeDialog="closeDialog" @refresh="refreshCategory"></EditCategory>
    </v-dialog>
    <v-dialog v-model="addLinkDialog" max-width="600" data-app="true">
      <AddLink :category="name" :id="id" @closeDialog="closeDialog" @refresh="refreshLink"></AddLink>
    </v-dialog>
    <v-dialog v-model="editLinkDialog" max-width="600" data-app="true">
      <EditLink :id="id" :linkId="linkId" @closeDialog="closeDialog" @refresh="refreshLink"></EditLink>
    </v-dialog>
  </v-card>
</template>
<script>
import EditCategory from "./EditCategory";
import AddLink from "./AddLink";
import EditLink from "./EditLink";
import { mapActions } from "vuex";
import {
  deleteCategoryLink,
  saveLoveLink,
  deleteCategory,
  addCategoryUser
} from "@/api/domain/mine.api.js";

export default {
  name: "CategoryDetail",
  props: ["name", "detailName", "links", "id"],
  components: { EditCategory, AddLink, EditLink },
  data: () => ({
    editCategory: false,
    addLinkDialog: false,
    editLinkDialog: false,
    linkId: ""
  }),
  methods: {
    /**注册store方法 */
    ...mapActions("domain", ["putCategoryForm", "putLinkForm"]),
    /**链接点击 */
    urlClick(data) {
      window.open(data.url);
    },
    /**刷新 */
    refreshCategory(id) {
      this.editCategory = false;
      this.$emit("refreshCategory", id);
    },
    /**关闭 */
    closeDialog() {
      this.editCategory = false;
      this.addLinkDialog = false;
      this.editLinkDialog = false;
    },
    /**操作分类 */
    handleCategory(com) {
      if (com === "add") {
        // 添加收藏
        let user = JSON.parse(localStorage.getItem("user"));
        addCategoryUser({id: this.id, userId: user.id}).then(res => {
          if (res.data.code === 0) {
            this.$snackbar.success(this.COLLECT_SUCCESS);
          } else {
            this.$snackbar.error(res.data.message);
          }
        });
      } else if (com === "delete") {
        // 进行删除分类
        deleteCategory({ categoryId: this.id }).then(res => {
          if (res.data.code === 0) {
            this.$emit("refreshCategory");
          } else {
            this.$snackbar.error(res.data.message);
          }
        });
      } else if (com === "edit") {
        // 进行编辑分类
        this.editCategory = true;
        this.putCategoryForm({ name: this.name, detailName: this.detailName });
      }
    },
    /**刷新该分类 */
    refreshLink() {
      this.closeDialog();
      this.$emit("refreshCategory", this.id);
    },
    /**加行点击效果 */
    itemClick() {},
    /**进行操作处理 */
    handleLove(com, data) {
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
        deleteCategoryLink({ categoryId: this.id, linkId: data.id }).then(
          res => {
            if (res.data.code === 0) {
              this.$emit("refreshCategory", this.id);
            } else {
              this.$snackbar.error(res.data.message);
            }
          }
        );
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