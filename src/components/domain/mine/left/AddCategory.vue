<template>
  <v-card>
    <v-card-title>
      <span class="headline">添加分类</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-text-field v-model="form.name" label="分类名称*" required></v-text-field>
        <v-text-field v-model="form.detailName" label="分类详情*" required></v-text-field>
      </v-container>
      <small style="color: #F44336">*添加自己的分类</small>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="warning" text @click="closeDialog">关闭</v-btn>
      <v-btn color="success" text @click="save">保存</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { addCategory } from "@/api/domain/mine.api.js";
export default {
  name: "AddCategory",
  props: [],
  data: () => ({
    form: {
      name: "",
      detailName: ""
    }
  }),
  methods: {
    initForm() {
      this.form.name = "";
      this.form.detailName = "";
    },
    /**关闭弹窗 */
    closeDialog() {
      this.$emit("closeDialog");
      this.initForm();
    },
    /**保存分类 */
    save() {
      if (this.form.name === "") {
        this.$snackbar.warning(this.NO_EMPTY_CATEGORY);
      } else {
        let user = JSON.parse(localStorage.getItem("user"));
        addCategory({
          name: this.form.name,
          detailName: this.form.detailName,
          userId: user.id
        }).then(res => {
          if (res.data.code !== 0) {
            this.$snackbar.error(res.data.message);
          } else {
            this.$emit("refresh");
            this.initForm();
          }
        });
      }
    }
  }
};
</script>