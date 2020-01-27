<template>
  <v-card dark>
    <v-card-title>
      <span class="headline">{{ title }}</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-text-field v-model="form.name" label="分类名称*" required @change="urlChange"></v-text-field>
      </v-container>
      <small style="color: #F44336">*{{ subtitle }}</small>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="warning" text @click="closeDialog">关闭</v-btn>
      <v-btn color="success" text @click="saveUrl">保存</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "AddCategory",
  props: [],
  data: () => ({
    form: {
      name: ""
    }
  }),
  methods: {
    /**关闭弹窗 */
    closeDialog() {}
  }
};
</script>