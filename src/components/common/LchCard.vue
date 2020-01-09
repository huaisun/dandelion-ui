<template>
  <div style="padding: 5px 10px 5px 0;">
    <v-card class="mx-auto" width="344" shaped>
      <!-- 标题栏 -->
      <v-card-title>
        {{category.name}}
        <v-btn class="category-add-link" icon @click="addCategoryLink">
          <v-icon size="20">gps_fixed</v-icon>
        </v-btn>
        <v-btn class="category-details" icon>
          <v-icon>bookmark</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-subtitle>{{category.detailName}}</v-card-subtitle>
      <v-list class="transparent category-list">
        <v-list-item v-for="(item,index) in category.links" :key="index">
          <!-- 数据展示栏 -->

          <v-list-item-content>
            <v-list-item-title class="button-list" @click="urlClick(item)">{{ item.name }}</v-list-item-title>
          </v-list-item-content>
          <!-- 图标操作栏 -->
          <v-list-item-action>
            <v-btn icon @click="collectClick(item)">
              <v-icon
                :color="item.favorite ===1 ? '#EF9A9A': ''"
                size="20"
              >{{ item.favorite === 1 ? 'favorite' : 'favorite_border'}}</v-icon>
            </v-btn>
          </v-list-item-action>
          <v-list-item-action>
            <v-btn icon @click="deleteLink(item)">
              <v-icon size="23">delete_outline</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>
    <!-- 添加dialog -->
    <v-dialog v-model="addLinkDialog" max-width="600" data-app="true">
      <AddLink
        title="添加链接"
        :subtitle="'收藏到' + category.name + '分类'"
        flag="category"
        :data="category"
        @closeDialog="closeLinkDialog"
      ></AddLink>
    </v-dialog>
  </div>
</template>
<script>
import AddLink from "@/components/dialog/AddLink";

export default {
  name: "LchCard",
  props: ["category"],
  components: {
    AddLink
  },
  data: () => ({
    // 添加链接弹出框
    addLinkDialog: false
  }),
  methods: {
    /**url 跳转 */
    urlClick(data) {
      window.open(data.url);
    },
    /**添加分类链接 */
    addCategoryLink() {
      this.addLinkDialog = true;
    },
    /**关闭弹出框 */
    closeLinkDialog() {
      this.$emit("loadCategory");
      this.addLinkDialog = false;
    },
    /**收藏链接 */
    collectClick(data) {
      let user = JSON.parse(localStorage.getItem("user"));
      if (user != null) {
        if (data.favorite === 1) {
          this.$axios
            .delete("/lch/link/deleteLinkByUserId", {
              params: { ids: data.id, userId: user.id }
            })
            .then(res => {
              if (res.data.code === 0) {
                this.$emit("refresh");
              } else {
                this.color = this.COLOR_ERROR;
                this.text = res.data.message;
                this.snackbar = true;
              }
            });
        } else {
          this.$axios
            .post("/lch/link/addLoveLink", {
              linkId: data.id,
              userId: user.id
            })
            .then(res => {
              if (res.data.code === 0) {
                this.$emit("refresh");
              }
            });
        }
      }
    },
    /**删除链接 */
    deleteLink(data) {
      this.$axios
        .delete("/lch/category/deleteLink", {
          params: {
            categoryId: this.category.id,
            linkId: data.id
          }
        })
        .then(res => {
          if (res.data.code === 0) {
            this.$emit("refresh");
          }
        });
    }
  }
};
</script>


<style scoped>
.button-list {
  cursor: pointer;
}

.button-list:hover {
  text-decoration: underline;
  color: #0000dd;
  text-decoration-color: #0000dd;
}
.category-list {
  max-height: 300px;
  overflow-x: auto;
}

.category-details {
  position: absolute;
  right: 15px;
}

.category-add-link {
  position: absolute;
  right: 45px;
}
</style>