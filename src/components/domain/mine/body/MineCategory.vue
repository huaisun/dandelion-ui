<template>
  <div class="mine-body">
    <v-row style="height: 100%">
      <v-col lg="2" md="4" sm="6" xs="12" style="padding: 0">
        <CategoryList ref="CategoryList" @loadDetail="loadDetail"></CategoryList>
      </v-col>
      <v-col lg="10" md="8" sm="6" xs="12" style="padding: 20px">
        <CategoryDetail
          :id="categoryId"
          :name="name"
          :detailName="detailName"
          :links="links"
          @refreshCategory="refreshCategory"
        ></CategoryDetail>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import CategoryList from "./left/CategoryList";
import CategoryDetail from "./right/CategoryDetail";

export default {
  name: "MineCategory",
  components: {
    CategoryList,
    CategoryDetail
  },
  data: () => ({
    name: "",
    detailName: "",
    links: [],
    categoryId: ""
  }),
  methods: {
    loadDetail(data) {
      this.name = data.name;
      this.detailName = data.detailName;
      this.categoryId = data.id;
      this.links = data.links;
    },
    refreshCategory(id) {
      this.$refs.CategoryList.loadCategory(id);
    },
  }
};
</script>

<style scoped>
.mine-body {
  padding: 0 100px 0 0;
  height: calc(100% - 80px);
}
</style>