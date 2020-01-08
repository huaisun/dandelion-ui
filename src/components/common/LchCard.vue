<template>
  <div style="padding: 5px 10px 5px 0;">
    <v-card class="mx-auto" width="344" shaped>
      <!-- 标题栏 -->
      <v-card-title>
        {{title}}
        <v-btn class="category-details" icon>
          <v-icon>bookmark</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-subtitle>{{subtitle}}</v-card-subtitle>
      <v-list class="transparent category-list">
        <v-list-item v-for="(item,index) in links" :key="index">
          <!-- 数据展示栏 -->
          <v-list-item-content>
            <v-list-item-title class="button-list">
              <v-row justify>
                <v-col cols="12" sm="6">{{ item.title }}</v-col>
                <v-col cols="12" sm="6">{{ item.url }}</v-col>
              </v-row>
            </v-list-item-title>
          </v-list-item-content>
          <!-- 图标操作栏 -->
          <v-list-item-action>
            <!-- <v-btn icon>
                <v-icon size="20">{{ item.isFavorite === 1 ? 'favorite' : 'favorite_border'}}</v-icon>
            </v-btn>-->
            <v-btn icon>
              <v-icon size="20">info</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>
<script>
export default {
  name: "LchCard",
  props: ["links", "title", "subtitle"]
};
</script>


<style scoped>
.button-list {
  cursor: pointer;
}

.button-list:hover {
  text-decoration: underline;
  color: #0000dd;
  text-decoration-color: #0000dd;
}
.category-list {
  max-height: 300px;
  overflow-x: auto;
}

.category-details {
  position: absolute;
  right: 15px;
}
.link-name {
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>