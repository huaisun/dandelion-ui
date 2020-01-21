<template>
  <div class="mine-body">
    <v-row>
      <v-col lg="2" md="4" sm="6" xs="12">
        <CategoryList @loadDetail="loadDetail"></CategoryList>
      </v-col>
      <v-col lg="10" md="8" sm="6" xs="12">
        <CategoryDetail :title="detailTitle" :links="links"></CategoryDetail>
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
    detailTitle: "",
    links: []
  }),
  methods: {
    loadDetail(data) {
      this.detailTitle = data.name;
      this.links = data.links;
    }
  }
};
</script>

<style scoped>
.mine-body {
  padding: 20px 100px 0 20px;
}
</style>