<template>
  <v-card>
    <v-card-title>
      <span class="headline" v-text="title"></span>
    </v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item v-for="(item, i) in links" :key="i" @click="urlClick(item)">
          <v-list-item-icon>
            <img style="height: 24px; width: 24px;" :src="'data:image/png;base64,' + item.ico" />
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.name"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="green darken-1" text @click="closeDialog">关闭</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: "LinksDialog",
  props: ["title", "links"],
  methods: {
      closeDialog() {
          this.$emit("closeDialog");
      },
      urlClick(data) {
          window.open(data.url);
      }
  }
};
</script>