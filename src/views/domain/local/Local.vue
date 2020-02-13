<template>
  <v-row dense>
    <v-col cols="4" v-for="(item,index) in items" :key="index">
      <v-card class="mx-auto" @click="cardClick(item)">
        <div class="d-flex flex-no-wrap justify-space-between">
          <v-avatar class="ma-3" size="75" tile>
            <v-img :src="item.src"></v-img>
          </v-avatar>
          <div>
            <v-card-title class="headline" v-text="item.title"></v-card-title>

            <v-card-subtitle v-text="item.artist"></v-card-subtitle>
          </div>
        </div>
      </v-card>
    </v-col>
    <v-dialog v-model="windowDialog" width="1080px">
      <InnerDialog :flag="windowFlag" @closeDialog="closeInnerDialog"></InnerDialog>
    </v-dialog>
  </v-row>
</template>
<script>
import Chrome from "@/assets/photos/chrome.png";
import InnerDialog from "@/components/domain/local/InnerDialog";

export default {
  name: "Local",
  components: { InnerDialog },
  data: () => ({
    items: [
      {
        title: "谷歌浏览器",
        artist: "chrome 书签导入说明",
        src: Chrome,
        flag: "chrome"
      }
    ],
    windowDialog: false,
    windowFlag: null
  }),
  methods: {
    cardClick(data) {
      this.windowFlag = data.flag;
      this.windowDialog = true;
    },
    /**关闭 */
    closeInnerDialog() {
      this.windowDialog = false;
    }
  }
};
</script>

<style scoped>
.navigation-1 {
  background-image: linear-gradient(to bottom, #77a1d3, #79cbca);
}
</style>