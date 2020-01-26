<template>
  <v-card width="100%" max-width="720px" class="mx-auto category category-1 category-detail">
    <v-card-title>
      <v-icon large left v-text="title.slice(0,1).toUpperCase()"></v-icon>
      <span class="title font-weight-light" v-text="title"></span>
    </v-card-title>

    <v-card-text>
      <v-list dense color="rgba(0,0,0,0)">
        <div v-for="(item, index) in links" :key="index">
          <v-list-item @click="urlClick(item)">
            <v-list-item-icon>
              <img style="height: 24px; width: 24px;" :src="'data:image/png;base64,' + item.ico" />
            </v-list-item-icon>
            <v-list-item-content>
              <h3 v-text="item.name"></h3>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
        </div>
      </v-list>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: "CategoryDetail",
  props: ["title", "links"],
  methods: {
    urlClick(data) {
      window.open(data.url);
    }
  }
};
</script>