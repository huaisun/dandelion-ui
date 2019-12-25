<template>
  <!-- 系统排行榜 -->
  <SystemCard :title="title" :subtitle="subtitle" :data="links"></SystemCard>
</template>

<script>
import SystemCard from '@/components/common/SystemCard.vue'
export default {
  name: "LinkRanks",
  components: {
    SystemCard,
  },
  data: () => ({
    title: '最强链接',
    subtitle: '详细信息',
    links: [
      {
        id: '1234',
        name: "谷歌浏览",
        loveTimes: 900,
      },{
        id: '1234',
        name: "谷歌浏览",
        loveTimes: 900,
      },{
        id: '1234',
        name: "谷歌浏览",
        loveTimes: 900,
      },{
        id: '1234',
        name: "谷歌浏览",
        loveTimes: 900,
      },{
        id: '1234',
        name: "谷歌浏览",
        loveTimes: 900,
      },{
        id: '1234',
        name: "谷歌浏览",
        loveTimes: 900,
      },{
        id: '1234',
        name: "谷歌浏览",
        loveTimes: 900,
      }
    ]
  })
};
</script>