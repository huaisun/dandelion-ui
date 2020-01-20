<template>
  <div class="mine-body">
    <v-row>
      <v-col md="5" xs="6">
        <CategoryList></CategoryList>
      </v-col>
      <v-col md="7" xs="6">
        <CategoryDetail></CategoryDetail>
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
  }
};
</script>

<style scoped>
.mine-body {
  padding: 20px 80px 0 20px;
}
</style>