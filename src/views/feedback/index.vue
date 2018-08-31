<template lang="html">
  <div class="app-container">
    <el-card v-for="(item, index) in list" :key="index" class="card" shadow="always">
      <router-link :to="{ name: 'FeedbackDetail', params: { id: item.id } }" class="card-container">
        <img :src="getAvatar(item.body)" class="avatar">
        <div class="content">
          <div class="title">
            <span>{{ item.title }}</span>
            <span v-for="(label, i) in item.labels" :key="i" :style="{ background: `#${label.color}`, color: label.color === 'ededed' ? 'black' : `white` }" class="label">{{ label.name }}</span>
          </div>
          <div class="date">
            {{ time(item.created_at) }}
          </div>
        </div>
      </router-link>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { parseTime } from '@/utils/index.js'

export default {
  computed: {
    ...mapGetters({
      list: 'feedback'
    })
  },
  mounted() {
    this.$store.dispatch('GetFeedback').then(data => {
      console.log(this.list)
    })
  },
  methods: {
    getAvatar(str) {
      return `https://${str.split('https://')[1].split('.jpg')[0]}.jpg`
    },
    time(time) {
      return parseTime(time)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.card {
  margin-top: 20px;

  .card-container {
    display: flex;
    align-items: center;

    .avatar {
      width: 50px;
      height: 50px;
      margin-right: 20px;
    }

    .label {
      display: inline;
      margin-left: 10px;
      padding: 2px 5px;
      border-radius: 5px;
      font-size: 14px;
    }

    .date {
      margin-top: 15px;
      font-size: 13px;
      color: #999;
    }
  }
}

.card:first-child {
  margin-top: 0;
}

.card:hover {
  border-color: #28a745;
}
</style>
