<template lang="html">
  <div class="app-container">
    <el-card shadow="always">
      <div slot="header" class="header">
        <span>{{ detail.title }}</span>
        <span>{{ '#' + detail.number }}</span>
      </div>
      <div>
        <div class="user">
          <img :src="info.avatar">
          <div>
            <div class="name">
              <span>{{ info.name }}</span>
              <span v-for="(label, i) in detail.labels" :key="i" :style="{ background: `#${label.color}`, color: label.color === 'ededed' ? 'black' : `white` }" class="label">{{ label.name }}</span>
            </div>
            <div class="date">
              {{ info.date }}
            </div>
          </div>
        </div>
        <div class="content">
          {{ info.content }}
        </div>
      </div>
    </el-card>
    <div v-if="detail.comments" class="comments">
      <el-card v-for="(item, index) in comments" :key="index" class="item">
        <div class="user">
          <img :src="item.user.avatar_url">
          <div>
            <div class="name">
              <span>{{ item.user.login }}</span>
            </div>
            <div class="date">
              {{ time(item.created_at) }}
            </div>
          </div>
        </div>
        <div class="content">
          {{ item.body }}
        </div>
      </el-card>
    </div>
    <div class="create">
      <el-input :autosize="{ minRows: 6, maxRows: 999}" v-model="content" type="textarea" placeholder="请输入内容"></el-input>
      <div class="btn" @click="commit">
        提交
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { parseTime } from '@/utils/index.js'

export default {
  data() {
    return {
      comments: [],
      content: ''
    }
  },
  computed: {
    ...mapGetters({
      list: 'feedback'
    }),
    detail() {
      const id = this.$route.params.id
      return this._.filter(this.list, val => Number(val.id) === Number(id))[0]
    },
    info() {
      if (!this.detail.body) return
      return {
        avatar: `https://${this.detail.body.split('https://')[1].split('.jpg')[0]}.jpg`,
        name: this.detail.body.split('.jpg)')[1].split('---')[0],
        content: this.detail.body.split('---')[1],
        date: parseTime(this.detail.created_at)
      }
    }
  },
  mounted() {
    console.log(this.info)
    this.getComments()
  },
  methods: {
    time(date) {
      return parseTime(date)
    },
    getComments() {
      if (!this.detail.comments) return
      this.$store.dispatch('GetComments', this.detail.comments_url).then(data => {
        this.comments = data
        console.log(data)
      })
    },
    commit() {
      console.log(this.content)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.header {
  span:last-child {
    margin-left: 10px;
    color: #a3aab1;
  }
}

.user {
  display: flex;

  img {
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

.content {
  margin: 20px 0;
  padding: 10px 20px;
  border-radius: 10px;
  line-height: 1.5;
  background: #ededed;
}

.comments {
  margin-top: 20px;
}

.create {
  margin: 20px 0;

  .btn {
    float: right;
    margin: 20px 10px;
    padding: 10px 30px;
    border-radius: 10px;
    color: white;
    background: #28a745;
  }
}
</style>
