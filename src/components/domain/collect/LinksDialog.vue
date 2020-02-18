<template>
  <v-card>
    <v-card-title>
      <span class="headline" v-text="title"></span>
    </v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item v-for="(item, i) in links" :key="i" @click="itemClick()">
          <v-list-item-icon @click="urlClick(item)">
            <img style="height: 24px; width: 24px;" :src="'data:image/png;base64,' + item.ico" />
          </v-list-item-icon>
          <v-list-item-content @click="urlClick(item)">
            <v-list-item-title v-text="item.name"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-action v-if="$store.state.domain.authority.love">
            <v-btn color="error" icon @click="collectLoveLink(item)">
              <v-icon>mdi-heart</v-icon>
            </v-btn>
          </v-list-item-action>
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
import { saveLoveLink } from "@/api/domain/mine.api.js";

export default {
  name: "LinksDialog",
  props: ["title", "links"],
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },
    urlClick(data) {
      window.open(data.url);
    },
    itemClick() {},
    /**收藏到喜爱 */
    collectLoveLink(data) {
      // 进行添加到我的喜欢
      let user = JSON.parse(localStorage.getItem("user"));
      saveLoveLink({
        linkId: data.id,
        userId: user.id,
        name: data.name
      }).then(res => {
        if (res.data.code === 0) {
          this.$snackbar.success(this.COLLECT_SUCCESS);
          this.$emit("refreshLoveLink");
        } else {
          this.$snackbar.error(res.data.message);
        }
      });
    }
  }
};
</script>