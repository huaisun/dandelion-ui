<template>
  <v-card>
    <v-card-title>
      <span class="headline">分类</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="name" label="分类名*" required></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="detailName" label="分类详情*" required></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <small>*收藏你的宝藏</small>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="closeDialog">关闭</v-btn>
      <v-btn color="blue darken-1" text @click="saveCategory">收藏</v-btn>
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
  name: "AddCategory",
  data: () => ({
    name: "",
    detailName: "",
    timeout: 3000,
    color: "",
    text: "",
    snackbar: false
  }),
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },
    saveCategory() {
      let user = JSON.parse(localStorage.getItem("user"));
      if (user != null) {
        this.$axios
          .post("/lch/category/addCategory", {
            userId: user.id,
            name: this.name,
            detailName: this.detailName
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
      }
    }
  }
};
</script>