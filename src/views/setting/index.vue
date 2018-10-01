<template lang="html">
  <div class="app-container">
    <el-card class="card" shadow="always">
      <router-link v-for="(item, index) in list" :to="item.to" :key="index" class="link">
        {{ item.title }}
      </router-link>
    </el-card>
  </div>
</template>

<script>

export default {
  data() {
    return {
      list: [
        {
          title: '管理员',
          to: '/setting/admin/index.vue'
        }
      ]
    }
  },
  computed: {},
  mounted() {},
  methods: {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
