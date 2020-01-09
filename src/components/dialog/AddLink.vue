<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ title }}</span>
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
      <small>*{{ subtitle }}</small>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="closeDialog">关闭</v-btn>
      <v-btn color="blue darken-1" text @click="saveUrl">收藏</v-btn>
    </v-card-actions>
    <!-- 消息提示 -->
    <v-snackbar :color="color" :timeout="timeout" v-model="snackbar">
      {{ text }}
      <v-btn text @click="snackbar = false">关闭</v-btn>
    </v-snackbar>
  </v-card>
</template>

<script>
export default {
  name: "AddLink",
  props: ["title", "subtitle", "flag", "data"],
  data: () => ({
    url: "",
    name: "",
    snackbar: false,
    timeout: 3000,
    color: "",
    text: ""
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
        this.text = this.ADD_LOVE_ERROR;
        this.color = this.COLOR_WARNING;
        this.snackbar = true;
      } else {
        let url = "/lch/link/addLoveLink";
        let vo = {
          url: this.url,
          name: this.name,
          userId: user.id
        };
        if (this.flag === "category") {
          url = "/lch/category/addCategoryLink";
          vo.categoryId = this.data.id;
        }
        this.$axios.post(url, vo).then(res => {
          if (res.data.code === 0) {
            this.closeDialog();
          } else {
            this.color = this.COLOR_ERROR;
            this.text = res.data.message;
            this.snackbar = true;
          }
        });
      }
    },
    /**获取title */
    urlChange() {
      this.$axios
        .get("/lch/link/getTitleByUrl", { params: { url: this.url } })
        .then(res => {
          if (res.data.code === 0) {
            this.name = res.data.data;
          }
        });
    }
  }
};
</script>