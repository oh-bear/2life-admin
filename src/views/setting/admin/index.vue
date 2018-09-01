<template lang="html">
  <div class="app-container">
    <el-card v-for="(item, index) in admin" :key="index" class="card" shadow="always">
      <router-link :to="{ name: 'AdminEditor', params: { id: item.id } }" class="card-container">
        <img :src="item.avatar">
        <div class="user">
          <div class="name">
            {{ item.name }}
          </div>
          <div class="right">
            权限: <span v-for="(val, index) in item.right" :key="index">{{ val }}</span>
          </div>
        </div>
        <el-button type="primary" class="btn">编辑</el-button>
      </router-link>
    </el-card>
  </div>
</template>

<script>

export default {
  data() {
    return {
      admin: [
        {
          id: 1,
          name: 'admin',
          avatar: '',
          right: ['admin']
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
.card-container {
  position: relative;
  display: flex;

  img {
    width: 50px;
    height: 50px;
  }

  .user {
    margin-left: 20px;

    .right {
      margin-top: 15px;
      font-size: 13px;
      color: #999;
    }
  }

  .btn {
    position: absolute;
    right: 0;
  }
}
</style>
