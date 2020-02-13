<template>
  <div>
    <v-window v-model="window" class="elevation-1" show-arrows>
      <v-window-item v-for="(n, i) in chrome" :key="i">
        <v-card flat>
          <v-card-text>
            <v-row class="mb-4" align="center">
              <strong class="title">{{ flag }}</strong>
              <v-spacer></v-spacer>
              <v-btn icon @click="closeDialog">
                <v-icon>close</v-icon>
              </v-btn>
            </v-row>
            <p v-text="n.tip"></p>
            <v-divider></v-divider>
            <v-row>
              <v-col v-for="(item, index) in n.img" :key="index" cols="4" class="d-flex child-flex">
                <v-card flat tile class="d-flex img-card" @click="imgClick(item)">
                  <v-img :src="item" aspect-ratio="1" class="grey lighten-2">
                    <template v-slot:placeholder>
                      <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-window-item>
    </v-window>
    <v-dialog v-model="showImage">
      <v-card>
        <v-img :src="imgDialog">
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
            </v-row>
          </template>
        </v-img>
        <div style="position: fixed; top: 0;width: 100%; text-align: center;">
          <v-btn color="grey" large icon dark @click="closeImageDialog">
            <v-icon>close</v-icon>
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import One from "@/assets/photos/chrome/one.png";
import Two from "@/assets/photos/chrome/two.png";
import Three from "@/assets/photos/chrome/three.png";
import Four from "@/assets/photos/chrome/four.png";
import Five from "@/assets/photos/chrome/five.png";

export default {
  name: "InnerDialog",
  props: ["flag"],
  data: () => ({
    window: 0,
    chrome: [
      {
        tip:
          "1、打开chrome浏览器的书签管理器，也可以通过谷歌的默认按键【 ctrl+ shfit + o 】打开",
        img: [One, Two, Three]
      },
      {
        tip: "2、通过下列的操作，将书签数据导出到您想存在的目录",
        img: [Four, Five]
      },
      {
        tip: "3、将导出的书签数据文件上传到浏览器中，点击分析"
      }
    ],
    imgDialog: null,
    showImage: false
  }),
  methods: {
    imgClick(img) {
      this.imgDialog = img;
      this.showImage = true;
    },
    closeDialog() {
      this.$emit("closeDialog");
    },
    closeImageDialog() {
      this.showImage = false;
    }
  }
};
</script>

<style scoped>
.img-card {
  padding: 20px;
  border-radius: 10px;
}
</style>