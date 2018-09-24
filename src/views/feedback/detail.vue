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
              <span class="add" @click="modalShow = true">
                <svg-icon icon-class="add"/>
              </span>
            </div>
            <div class="date">
              {{ info.date }}
            </div>
          </div>
          <el-button class="btn" type="danger" @click="close">Close</el-button>
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
      <el-input :autosize="{ minRows: 6, maxRows: 999}" v-model="content" type="textarea" placeholder="请输入内容" />
      <el-button class="btn" type="success" :disabled="!content" @click="commit">提交</el-button>
    </div>
    <el-dialog :visible.sync="modalShow" :before-close="handleClose" title="添加label" width="30%">
      <div class="modal-container">
        <el-input v-model="newLabel" placeholder="请输入标签名" clearable></el-input>
      </div>
      <div slot="footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="addLabel">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { parseTime } from '@/utils/index.js'

export default {
  data() {
    return {
      comments: [],
      content: '',
      modalShow: false,
      newLabel: ''
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
    handleClose() {
      if (!this.newLabel) {
        this.modalShow = false
        return
      }
      this.$confirm('确认关闭').then(_ => {
        this.newLabel = ''
        this.modalShow = false
      })
    },
    addLabel() {
      this.$store.commit('ADD_LABEL', { id: this.$route.params.id, name: this.newLabel, color: 'ededed' })
      this.newLabel = ''
      this.modalShow = false
    },
    close() {
      this.$store.dispatch(
        'CloseIssue',
        {
          number: this.detail.number,
          data: {
            state: 'close'
          }
        }
      )
    },
    commit() {
      if (!this.content) return
      this.$store.dispatch(
        'Commit',
        {
          account: 'airing',
          password: '123456',
          uid: Number(this.detail.body.split('![')[1].split('](http')[0]),
          content: this.content,
          number: this.detail.number
        }
      ).then(res => {
        if (res) {
          this.$message({
            message: '回复成功',
            type: 'success'
          })
          setTimeout(() => {
            this.$router.go(-1)
          }, 1000)
        } else {
          this.$message.error('回复失败')
        }
      })
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
  position: relative;
  display: flex;

  img {
    width: 50px;
    height: 50px;
    margin-right: 20px;
  }

  .label {
    display: inline;
    margin-left: 10px;
    padding: 2px 8px;
    border-radius: 5px;
    font-size: 14px;
  }

  .add {
    margin-left: 20px;
  }

  .date {
    margin-top: 15px;
    font-size: 13px;
    color: #999;
  }

  .btn {
    position: absolute;
    right: 0;
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
  }
}
</style>
