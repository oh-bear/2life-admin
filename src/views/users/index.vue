<template lang="html">
  <div class="app-container">
    <div class="func">
      <el-button type="primary" @click="reset">重置次数</el-button>
    </div>
  </div>
</template>

<script>

export default {
  methods: {
    reset() {
      this.$store.dispatch('resetLastTime')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.func {
  display: flex;
  padding: 5px 10px;
}
</style>
