<template>
  <div>
    <!-- 用户最喜爱的网站标题 -->
    <v-card class="mx-auto category category-1" tile min-height="76">
      <v-card-text>
        <v-row style="padding: 0 10px">
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn
                v-show="$store.state.domain.authority.edit"
                style="height: 47px; width: 47px;"
                v-on="on"
                color="white"
                icon
              >
                <v-icon>more_vert</v-icon>
              </v-btn>
            </template>
            <v-list dense>
              <v-list-item
                v-for="(item, index) in $store.state.domain.loveLinkMenus"
                :key="index"
                @click="handleLove(item.com)"
              >
                <v-list-item-icon>
                  <v-icon v-text="item.icon" :color="item.color"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.text" :color="item.color"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-chip-group multiple column active-class="primary--text" class="chip-links">
            <v-chip
              v-for="(tag, index) in links"
              :close="editFlag"
              :key="tag.id"
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

            <v-chip v-show="editFlag" color="success" outlined @click="successEdit">
              <v-btn color="success" text @click="successEdit">
                <v-icon>done</v-icon>完成
              </v-btn>
            </v-chip>
            <v-chip v-show="editFlag" color="error" outlined @click="cancelEdit">
              <v-btn color="error" text @click="cancelEdit">
                <v-icon>close</v-icon>取消
              </v-btn>
            </v-chip>
          </v-chip-group>
        </v-row>
      </v-card-text>
    </v-card>
    <v-dialog v-model="addLinkDialog" max-width="600" data-app="true">
      <AddLink @closeDialog="closeLinkDialog"></AddLink>
    </v-dialog>
  </div>
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
    removeLink: [],
  }),
  created() {
    // 初始化加载用户收藏数据
    this.loadLoveLink();
  },

  methods: {
    /**进行操作处理 */
    handleLove(com) {
      if (com === "add") {
        this.addLinkDialog = true;
      } else if (com === "delete") {
        this.editFlag = true;
      }
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

.chip-links {
  padding-right: 80px;
}
</style>