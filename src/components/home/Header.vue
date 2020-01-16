<template>
  <div style="height: 100px; background-color: white; width: 100%;">
    <!-- 用户最喜爱的网站标题 -->
    <v-card class="mx-auto" raised min-height="120">
      <v-card-text>
        <v-chip-group multiple column active-class="primary--text" class="chip-links">
          <v-chip
            v-for="tag in links"
            :close="editFlag"
            :key="tag.id"
            class="link-tag"
            @click:close="closeClick(tag)"
            @click="linkClik(tag)"
          >
            <div left class="avator-ico">
              <img :src="'data:image/png;base64,' + tag.ico" />
            </div>
            <div class="link-name">{{ tag.name }}</div>
          </v-chip>
          <v-chip color="primary" outlined @click="addLove">
            <v-avatar left>
              <v-icon>add</v-icon>
            </v-avatar>
            <div class="link-name">添加链接</div>
          </v-chip>
        </v-chip-group>
      </v-card-text>
    </v-card>
    <div v-if="editFlag">
      <v-btn
        color="warning"
        text
        class="button-fixed button-right-2 button-top"
        @click="cancelEdit"
      >取消</v-btn>
      <v-btn
        color="success"
        text
        class="button-fixed button-right-1 button-top"
        @click="successEdit"
      >完成</v-btn>
    </div>
    <!-- 编辑 -->
    <v-btn
      v-else
      color="primary"
      icon
      class="button-fixed button-right-1 button-top"
      @click="editFlag = true"
    >
      <v-icon>edit</v-icon>
    </v-btn>
    <!-- 添加dialog -->
    <v-dialog v-model="addLinkDialog" max-width="600" data-app="true">
      <AddLink title="宝藏" subtitle="收藏到你的最爱" flag="love" @closeDialog="closeLinkDialog"></AddLink>
    </v-dialog>
    <!-- 消息提示 -->
    <v-snackbar :color="color" :timeout="timeout" v-model="snackbar">
      {{ text }}
      <v-btn text @click="snackbar = false">关闭</v-btn>
    </v-snackbar>
  </div>
</template>
<script>
import {
  getLoveLinkByUserId,
  deleteLinkByUserId
} from "@/api/home/home.api.js";
import AddLink from "@/components/dialog/AddLink";

export default {
  name: "Header",
  components: {
    AddLink
  },
  data: () => ({
    // 添加链接弹出框
    addLinkDialog: false,
    // 是否处于编辑状态
    editFlag: false,
    links: [],
    removeLink: [],
    snackbar: false,
    timeout: 3000,
    color: "",
    text: ""
  }),
  created() {
    // 初始化加载用户收藏数据
    this.loadLoveLink();
  },

  methods: {
    /**关闭弹出框 */
    closeLinkDialog() {
      this.loadLoveLink();
      this.addLinkDialog = false;
    },
    /**用户收藏加载 */
    loadLoveLink() {
      let user = JSON.parse(localStorage.getItem("user"));
      if (user != null && user != undefined) {
        getLoveLinkByUserId({ id: user.id }).then(res => {
          this.links = res.data.data;
        });
      }
    },
    /**跳转链接 */
    linkClik(data) {
      window.open(data.url);
    },
    /**弹出表单框 */
    addLove() {
      this.addLinkDialog = true;
    },
    /**取消编辑 */
    cancelEdit() {
      this.loadLoveLink();
      this.editFlag = false;
    },
    /**完成编辑 */
    successEdit() {
      let ids = "";
      if (this.removeLink.length > 0) {
        this.removeLink.map(item => {
          ids += item.id + ",";
        });
        let user = JSON.parse(localStorage.getItem("user"));
        if (user != null && user !== undefined) {
          deleteLinkByUserId({ ids: ids, userId: user.id }).then(res => {
            if (res.data.code === 0) {
              this.loadLoveLink();
              this.editFlag = false;
              this.removeLink = [];
            } else {
              this.color = this.COLOR_ERROR;
              this.text = res.data.message;
              this.snackbar = true;
            }
          });
        }
      } else {
        this.editFlag = false;
      }
    },
    /**关闭纸片 */
    closeClick(tag) {
      this.links.splice(this.links.indexOf(tag), 1);
      this.removeLink.push(tag);
    }
  }
};
</script>


<style scoped>
.button-fixed {
  position: absolute;
  z-index: 456;
}

.button-right-1 {
  left: 15px;
}

.button-right-2 {
  left: 60px;
}

.button-top-2 {
  top: 60px;
}

.link-tag {
  max-width: 130px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.link-name {
  max-width: 130px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.chip-links {
  padding-right: 80px;
}
</style>