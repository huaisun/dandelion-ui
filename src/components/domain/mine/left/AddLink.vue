<template>
  <v-card>
    <v-card-title>
      <span class="headline">分类下的链接</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="url" label="链接*" required></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="name" label="名称*" required @focus="urlChange"></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <small style="color: #F44336">*收藏到{{category.name}}分类</small>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="warning" text @click="closeDialog">关闭</v-btn>
      <v-btn color="success" text @click="saveUrl">保存</v-btn>
    </v-card-actions>
    <v-dialog v-model="loadingDialog" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          请稍等
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { addCategoryLink, getTitleByUrl } from "@/api/domain/mine.api.js";

export default {
  name: "AddLink",
  props: ["category"],
  data: () => ({
    url: "",
    name: "",
    loadingDialog: false,
  }),
  methods: {
    initForm() {
      this.url = "";
      this.name = "";
    },
    /**关闭弹出框 */
    closeDialog() {
      this.$emit("closeDialog");
      this.initForm();
    },
    /**保存 */
    saveUrl() {
      let user = JSON.parse(localStorage.getItem("user"));
      // 判断是否为空。如果为空，则进行提示
      if (user == null || user === undefined) {
        this.$snackbar.warning(this.ADD_LOVE_ERROR);
      } else {
        if (this.url.indexOf("http") == 0) {
          this.loadingDialog = true;
          addCategoryLink({
            categoryId: this.category.id,
            url: this.url,
            name: this.name,
            userId: user.id
          }).then(res => {
            this.loadingDialog = false;
            if (res.data.code === 0) {
              this.$emit("refresh");
              this.initForm();
            } else {
              this.$snackbar.error(res.data.message);
            }
          });
        } else {
          this.$snackbar.warning(this.INCORRECT_LINK);
        }
      }
    },
    /**获取title */
    urlChange() {
      if (this.url.indexOf("http") === 0) {
        getTitleByUrl({ url: this.url }).then(res => {
          if (res.data.code === 0) {
            this.name = res.data.data;
          }
        });
      } else {
        this.$snackbar.warning(this.INCORRECT_LINK);
      }
    }
  }
};
</script>