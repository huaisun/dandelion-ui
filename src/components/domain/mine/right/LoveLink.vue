<template>
  <v-card class="mx-auto" max-width="400">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-subtitle>
          <span>喜欢</span>
          <span v-if="$store.state.domain.authority.edit" style="float: right">
            <div v-if="editFlag">
              <v-btn small icon @click="successEdit">
                <v-icon color="success">done</v-icon>
              </v-btn>
              <v-btn small icon @click="cancelEdit">
                <v-icon color="error">close</v-icon>
              </v-btn>
            </div>
            <div v-else>
              <v-btn small icon @click="addLove">
                <v-icon color="red">favorite</v-icon>
              </v-btn>
              <v-btn small icon @click="deleteLove">
                <v-icon color="grey">delete_outline</v-icon>
              </v-btn>
            </div>
          </span>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-text>
      <v-chip-group multiple column active-class="primary--text">
        <v-chip
          v-for="(tag, index) in links"
          :close="editFlag"
          :key="tag.id"
          label
          :color="$store.state.domain.colors[index % 7]"
          class="link-tag"
          @click:close="closeClick(tag)"
          @click="linkClik(tag)"
        >
          <div left class="avator-ico">
            <img :src="tag.ico != null ? 'data:image/png;base64,' + tag.ico: ''" />
          </div>
          <div class="link-name">{{ tag.name }}</div>
        </v-chip>
      </v-chip-group>
    </v-card-text>
    <v-dialog v-model="addLinkDialog" max-width="600" data-app="true">
      <AddLink @closeDialog="closeLinkDialog"></AddLink>
    </v-dialog>
  </v-card>
</template>
<script>
import {
  getLoveLinkByDomain,
  deleteLinkByUserId
} from "@/api/domain/mine.api.js";
import AddLink from "./AddLink";

export default {
  name: "LoveLink",
  components: {
    AddLink
  },
  data: () => ({
    // 添加链接弹出框
    addLinkDialog: false,
    // 是否处于编辑状态
    editFlag: false,
    links: [],
    removeLink: []
  }),
  created() {
    // 初始化加载用户收藏数据
    this.loadLoveLink();
  },

  methods: {
    /**进行操作处理 */
    addLove() {
      this.addLinkDialog = true;
    },
    deleteLove() {
      this.editFlag = true;
    },
    /**关闭弹出框 */
    closeLinkDialog() {
      this.loadLoveLink();
      this.addLinkDialog = false;
    },
    /**用户收藏加载 */
    loadLoveLink() {
      getLoveLinkByDomain({
        domain: this.$store.state.domain.user.domain
      }).then(res => {
        this.links = res.data.data;
      });
    },
    /**跳转链接 */
    linkClik(data) {
      window.open(data.url);
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
              this.$snackbar.error(res.data.message);
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
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.link-name {
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: white;
  white-space: nowrap;
}
</style>