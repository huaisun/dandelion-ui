<template>
  <v-card>
    <v-card-title class="headline">提示?</v-card-title>

    <v-card-text>{{text}}</v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn color="green darken-1" text @click="closeDialog()">否</v-btn>

      <v-btn color="green darken-1" text @click="sureDialog()">是</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "SureDialog",
  props: ["text"],
  data: () => ({}),
  methods: {
    closeDialog(){
      this.$emit("closeDialog");
    },

    sureDialog() {
      this.$emit("sureDialog");
    }
  }
};
</script>