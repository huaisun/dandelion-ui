<template>
  <!-- 系统排行榜 -->
  <SystemCard :title="title" :subtitle="subtitle" :data="categorys"></SystemCard>
</template>
<script>

import SystemCard from '@/components/common/SystemCard.vue'
export default {
  name: "CategoryRanks",
  components: {
    SystemCard,
  },
  data: () => ({
    title: '最强分类',
    subtitle: '分类信息',
    categorys: [
      {
        id: '32133',
        name: "dasfsdf",
        loveTimes: 900,
      },{
        id: '32133',
        name: "dasfsdf",
        loveTimes: 900,
      },{
        id: '32133',
        name: "dasfsdf",
        loveTimes: 900,
      },{
        id: '32133',
        name: "dasfsdf",
        loveTimes: 900,
      },{
        id: '32133',
        name: "dasfsdf",
        loveTimes: 900,
      },{
        id: '32133',
        name: "dasfsdf",
        loveTimes: 900,
      },{
        id: '32133',
        name: "dasfsdf",
        loveTimes: 900,
      },
    ]
  })
};
</script>