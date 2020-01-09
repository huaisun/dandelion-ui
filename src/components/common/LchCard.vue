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
            <!-- <v-btn icon>
                <v-icon size="20">{{ item.isFavorite === 1 ? 'favorite' : 'favorite_border'}}</v-icon>
            </v-btn>-->
            <v-btn icon>
              <v-icon size="20">info</v-icon>
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