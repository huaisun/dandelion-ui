<template>
  <div>
    <v-row class="left" dense>
      <v-col v-for="(item,index) in items" :key="index">
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
                :value="item.flag"
              ></v-radio>
            </v-radio-group>
            <v-file-input show-size truncate-length label="File input" @change="uploadFile"></v-file-input>
            <v-btn color="primary" @click="uploadClick">
              <v-icon>cloud_upload</v-icon>上传
            </v-btn>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
    <v-dialog v-model="lodingDialog" persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          请稍后
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="windowDialog" width="1080px">
      <InnerDialog :flag="windowFlag" @closeDialog="closeInnerDialog"></InnerDialog>
    </v-dialog>
    <v-dialog v-model="backDialog" persistent width="850px">
      <BackDialog :links="links" @closeDialog="closeBackDialog" @refreshMineCategory="refreshMineCategory"></BackDialog>
    </v-dialog>
  </div>
</template>
<script>
import Chrome from "@/assets/photos/chrome.png";
import InnerDialog from "@/components/domain/local/InnerDialog";
import BackDialog from "@/components/domain/local/BackDialog";
import { uploadLocalFile } from "@/api/domain/local.api.js";

export default {
  name: "Local",
  components: { InnerDialog, BackDialog },
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
    format: null,
    file: null,
    links: [],
    backDialog: false,
    lodingDialog: false
  }),
  methods: {
    closeBackDialog() {
      this.backDialog = false;
    },
    cardClick(data) {
      this.windowFlag = data.flag;
      this.windowDialog = true;
    },
    /**关闭 */
    closeInnerDialog() {
      this.windowDialog = false;
    },
    /**上传 */
    uploadClick() {
      if (this.format == null) {
        this.$snackbar.warning(this.NO_EMPTY_FORMAT);
      } else if (this.file == null) {
        this.$snackbar.warning(this.NO_EMPTY_FILE);
      } else {
        if (this.file.size > 5242880) {
          this.$snackbar.error(this.MAX_FILE_ERROR);
        } else {
          this.lodingDialog = true;
          let form = new FormData();
          form.append("format", this.format);
          form.append("file", this.file);
          uploadLocalFile(form).then(res => {
            this.lodingDialog = false;
            if (res.data.data == null) {
              this.$snackbar.error(this.HANDLE_ERROR);
            } else {
              this.links = res.data.data;
              this.backDialog = true;
            }
          });
        }
      }
    },
    uploadFile(data) {
      this.file = data;
    },
    refreshMineCategory() {
      this.$emit("refreshMineCategory");
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
  max-width: 614px;
  position: absolute;
  right: 0;
  width: 100%;
}

.left {
  float: left;
  margin-right: 28px;
  max-width: 293px;
  width: 100%;
}
</style>