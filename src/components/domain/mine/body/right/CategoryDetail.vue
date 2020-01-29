<template>
  <v-card width="100%" max-width="720px" class="mx-auto category category-1 category-detail">
    <v-card-title>
      <v-list-item>
        <v-list-item-avatar color="cyan">
          <v-icon color="white" v-text="name.slice(0,1).toUpperCase()"></v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="headline" v-text="name"></v-list-item-title>
          <v-list-item-subtitle v-text="detailName"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card-title>

    <v-card-text>
      <v-list dense color="rgba(0,0,0,0)" v-if="links.length == 1 && links[0].id == null">
      </v-list>
      <v-list dense color="rgba(0,0,0,0)" v-else>
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
      <v-btn icon @click="edit">
        <v-icon>edit</v-icon>
      </v-btn>
    </v-card-actions>
    <v-dialog v-model="editCategory" max-width="600" data-app="true">
      <EditCategory
        ref="EditCategory"
        :id="id"
        @closeDialog="closeDialog"
        @refresh="refreshCategory"
      ></EditCategory>
    </v-dialog>
  </v-card>
</template>
<script>
import EditCategory from "./EditCategory";
import { mapActions } from "vuex";

export default {
  name: "CategoryDetail",
  props: ["name", "detailName", "links", "id"],
  components: { EditCategory },
  data: () => ({
    editCategory: false
  }),
  methods: {
    /**注册store方法 */
    ...mapActions("domain", ["putCategoryForm"]),
    /**链接点击 */
    urlClick(data) {
      window.open(data.url);
    },
    /**刷新 */
    refreshCategory(id) {
      this.editCategory = false;
      this.$emit("refreshCategory", id);
    },
    /**关闭 */
    closeDialog() {
      this.editCategory = false;
    },
    edit() {
      this.editCategory = true;
      this.putCategoryForm({ name: this.name, detailName: this.detailName });
    }
  }
};
</script>