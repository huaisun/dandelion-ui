<template>
  <!-- 消息提示 -->
  <v-snackbar :color="color" :timeout="timeout" v-model="open" top>
    {{ text }}
    <v-icon>{{icon}}</v-icon>
  </v-snackbar>
</template>

<script>
export default {
  name: "Snackbar",
  data: () => ({
    icon: "",
    color: "",
    open: false,
    text: "",
    timeout: 0
  }),
  methods: {
    info(mes) {
      this.color = "#9E9E9E";
      this.open = true;
      this.text = mes;
      this.timeout = 3000;
      this.icon = "info";
    },
    error(mes) {
      this.color = "#F44336";
      this.open = true;
      this.text = mes;
      this.timeout = 3000;
      this.icon = "error";
    },
    warning(mes) {
      this.color = "#FF9800";
      this.open = true;
      this.text = mes;
      this.timeout = 3000;
      this.icon = 'warning';
    },
    success(mes) {
      this.color = "#4CAF50";
      this.open = true;
      this.text = mes;
      this.timeout = 3000;
      this.icon = 'mdi-checkbox-marked-circle';
    }
  }
};
</script>