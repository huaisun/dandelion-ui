<template>
  <!-- 用户自定义分类单 -->
  <v-card class="mx-auto">
    <v-card-title>熊二</v-card-title>
    <v-card-text
      style="overflow-y: auto;"
      :style="{ maxHeight: fullscreenFlag == 1 ? '100%' : '406px'}"
    >
      <div id="user-category" style="display: flex;flex-flow:row wrap;">
        <!-- // 用户的网站 -->
        <LchCard
          v-for="(item, index) in categorys"
          :key="index"
          :links="item.links"
          :title="item.title"
          :subtitle="item.subtitle"
        ></LchCard>
      </div>

      <v-btn v-if="fullscreenFlag == 1" icon style="position: absolute; right: 0; top: 0" @click="fullscreenExit">
        <v-icon>fullscreen_exit</v-icon>
      </v-btn>

      <v-btn v-else icon style="position: absolute; right: 0; top: 0" @click="fullscreenClick">
        <v-icon>fullscreen</v-icon>
      </v-btn>
      
    </v-card-text>
  </v-card>
</template>

<script>
import LchCard from "@/components/common/LchCard.vue";

export default {
  name: "User",
  components: {
    LchCard
  },
  props: ["fullscreenFlag"],
  data: () => ({
    categorys: [
      {
        title: "搜索引擎分类",
        subtitle: "搜索引擎分类",
        links: [
          {
            name: "百度",
            url: "http://www.basssssssssssssssssidu.com",
            isFavorite: 1
          },
          {
            name: "谷歌",
            url: "http://www.google.com",
            isFavorite: 1
          },
          {
            name: "必应",
            url: "http://www.bing.com",
            isFavorite: 0
          },
          {
            name: "必应",
            url: "http://www.bing.com",
            isFavorite: 1
          },
          {
            name: "必应",
            url: "http://www.bing.com",
            isFavorite: 0
          },
          {
            name: "必应",
            url: "http://www.bing.com",
            isFavorite: 0
          }
        ]
      },
      {
        title: "搜索引擎分类",
        subtitle: "搜索引擎分类",
        links: [
          {
            name: "百度",
            url: "http://www.basssssssssssssssssidu.com",
            isFavorite: 1
          },
          {
            name: "谷歌",
            url: "http://www.google.com",
            isFavorite: 1
          },
          {
            name: "必应",
            url: "http://www.bing.com",
            isFavorite: 0
          },
          {
            name: "必应",
            url: "http://www.bing.com",
            isFavorite: 1
          },
          {
            name: "必应",
            url: "http://www.bing.com",
            isFavorite: 0
          },
          {
            name: "必应",
            url: "http://www.bing.com",
            isFavorite: 0
          }
        ]
      },
      {
        title: "搜索引擎分类",
        subtitle: "搜索引擎分类",
        links: [
          {
            name: "百度",
            url: "http://www.basssssssssssssssssidu.com",
            isFavorite: 1
          },
          {
            name: "谷歌",
            url: "http://www.google.com",
            isFavorite: 1
          },
          {
            name: "必应",
            url: "http://www.bing.com",
            isFavorite: 0
          },
          {
            name: "必应",
            url: "http://www.bing.com",
            isFavorite: 1
          },
          {
            name: "必应",
            url: "http://www.bing.com",
            isFavorite: 0
          },
          {
            name: "必应",
            url: "http://www.bing.com",
            isFavorite: 0
          }
        ]
      },
      {
        title: "搜索引擎分类",
        subtitle: "搜索引擎分类",
        links: [
          {
            name: "百度",
            url: "http://www.basssssssssssssssssidu.com",
            isFavorite: 1
          },
          {
            name: "谷歌",
            url: "http://www.google.com",
            isFavorite: 1
          },
          {
            name: "必应",
            url: "http://www.bing.com",
            isFavorite: 0
          },
          {
            name: "必应",
            url: "http://www.bing.com",
            isFavorite: 1
          },
          {
            name: "必应",
            url: "http://www.bing.com",
            isFavorite: 0
          },
          {
            name: "必应",
            url: "http://www.bing.com",
            isFavorite: 0
          }
        ]
      },
      {
        title: "搜索引擎分类",
        subtitle: "搜索引擎分类",
        links: [
          {
            name: "百度",
            url: "http://www.basssssssssssssssssidu.com",
            isFavorite: 1
          },
          {
            name: "谷歌",
            url: "http://www.google.com",
            isFavorite: 1
          },
          {
            name: "必应",
            url: "http://www.bing.com",
            isFavorite: 0
          },
          {
            name: "必应",
            url: "http://www.bing.com",
            isFavorite: 1
          },
          {
            name: "必应",
            url: "http://www.bing.com",
            isFavorite: 0
          },
          {
            name: "必应",
            url: "http://www.bing.com",
            isFavorite: 0
          }
        ]
      },
      {
        title: "搜索引擎分类",
        subtitle: "搜索引擎分类",
        links: [
          {
            name: "百度",
            url: "http://www.basssssssssssssssssidu.com",
            isFavorite: 1
          },
          {
            name: "谷歌",
            url: "http://www.google.com",
            isFavorite: 1
          },
          {
            name: "必应",
            url: "http://www.bing.com",
            isFavorite: 0
          },
          {
            name: "必应",
            url: "http://www.bing.com",
            isFavorite: 1
          },
          {
            name: "必应",
            url: "http://www.bing.com",
            isFavorite: 0
          },
          {
            name: "必应",
            url: "http://www.bing.com",
            isFavorite: 0
          }
        ]
      }
    ]
  }),
  methods: {
    fullscreenClick() {
      this.$emit("fullscreenChange", 1);
    },
    fullscreenExit() {
      this.$emit("fullscreenChange", 0);
    }
  }
};
</script>