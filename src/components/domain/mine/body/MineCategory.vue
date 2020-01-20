<template>
  <div class="mine-body">
    <v-row>
      <v-col md="5" xs="6">
        <CategoryList @loadDetail="loadDetail"></CategoryList>
      </v-col>
      <v-col md="7" xs="6">
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
      console.log(data);
      this.detailTitle = data.name;
      this.links = data.links;
    }
  }
};
</script>

<style scoped>
.mine-body {
  padding: 20px 80px 0 20px;
}
</style>