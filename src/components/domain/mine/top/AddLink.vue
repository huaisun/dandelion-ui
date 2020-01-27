<template>
  <v-card dark class="category category-1">
    <v-card-title>
      <span class="headline">最喜爱链接</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="url" label="链接*" required @change="urlChange"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="name" label="名称*" required></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <small style="color: #F44336">*收藏到你的最爱</small>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="warning" text @click="closeDialog">关闭</v-btn>
      <v-btn color="success" text @click="saveUrl">保存</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { saveLoveLink, getTitleByUrl } from "@/api/domain/mine.api.js";
export default {
  name: "AddLink",
  props: ["data"],
  data: () => ({
    url: "",
    name: ""
  }),
  methods: {
    /**关闭弹出框 */
    closeDialog() {
      this.$emit("closeDialog");
      this.url = "";
      this.name = "";
    },
    /**保存 */
    saveUrl() {
      let user = JSON.parse(localStorage.getItem("user"));
      // 判断是否为空。如果为空，则进行提示
      if (user == null || user === undefined) {
        this.$snackbar.warning(this.ADD_LOVE_ERROR);
      } else {
        if (this.url.indexOf("http") == 0) {
          saveLoveLink({
            url: this.url,
            name: this.name,
            userId: user.id
          }).then(res => {
            if (res.data.code === 0) {
              this.closeDialog();
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