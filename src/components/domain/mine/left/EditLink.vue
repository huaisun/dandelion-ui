<template>
  <v-card>
    <v-card-title>
      <span class="headline">分类下的链接</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="form.url" label="链接*" required></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="form.name" label="名称*" @focus="urlChange" required></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <small style="color: #F44336">*修改链接</small>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="warning" text @click="closeDialog">关闭</v-btn>
      <v-btn color="success" text @click="updateUrl">保存</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { getTitleByUrl, updateCategoryLink } from "@/api/domain/mine.api.js";
export default {
  name: "EditLink",
  props: ["id", "linkId"],
  computed: {
    form: function() {
      return this.$store.state.domain.link.form;
    }
  },
  methods: {
    /**关闭弹出框 */
    closeDialog() {
      this.$emit("closeDialog");
    },
    /**修改 */
    updateUrl() {
      let user = JSON.parse(localStorage.getItem("user"));
      // 判断是否为空。如果为空，则进行提示
      if (user == null || user === undefined) {
        this.$snackbar.warning(this.ADD_LOVE_ERROR);
      } else {
        if (this.form.url.indexOf("http") == 0) {
          updateCategoryLink({
            categoryId: this.id,
            linkId: this.linkId,
            url: this.form.url,
            name: this.form.name
          }).then(res => {
            if (res.data.code === 0) {
              this.$emit("refresh");
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
      if (this.form.url.indexOf("http") === 0) {
        getTitleByUrl({ url: this.form.url }).then(res => {
          if (res.data.code === 0) {
            this.form.name = res.data.data;
          }
        });
      } else {
        this.$snackbar.warning(this.INCORRECT_LINK);
      }
    }
  }
};
</script>