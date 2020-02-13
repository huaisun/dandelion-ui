<template>
  <div>
    <v-row class="left" dense>
      <v-col cols="6" v-for="(item,index) in items" :key="index">
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
    <div class="right">
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>导入文件</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-radio-group v-model="format">
              <v-radio
                v-for="(item, index) in items"
                :key="index"
                :label="item.flag"
                color="red"
                :value="item.flag"
              ></v-radio>
            </v-radio-group>
            <v-file-input show-size label="File input"></v-file-input>
            <v-btn color="primary">
              <v-icon>cloud_upload</v-icon>
              上传
            </v-btn>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
  </div>
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
    windowFlag: null,
    format: ""
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
.right {
  margin-bottom: 30px;
  padding: 0;
  max-width: 293px;
  position: absolute;
  right: 0;
  width: 100%;
}

.left {
  float: left;
  margin-right: 28px;
  max-width: 614px;
  width: 100%;
}
</style>