<template>
  <v-card class="mx-auto" width="344" shaped>
    <v-card-title>{{title}}</v-card-title>
    <v-card-subtitle>{{subtitle}}</v-card-subtitle>
    <v-list class="transparent rank-list">
      <v-list-item v-for="(item, index) in data" :key="index">
        <v-list-item-content>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-row>
            <v-btn icon>
              <v-icon>favorite</v-icon>
            </v-btn>
            <span style="line-height: 36px; padding-right: 10px;">{{ item.loveTimes}}</span>
            <v-btn icon>
              <v-icon>info</v-icon>
            </v-btn>
          </v-row>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: "SystemCard",
  props: ["title", "subtitle", "data"]
};
</script>

<style scoped>
.rank-list {
    max-height: 436px;
}
</style>