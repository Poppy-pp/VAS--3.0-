<template>
  <div class="notfound-wrap">
    <div class="content">
      <div class="title"><span>404</span> 页面未找到 </div>
      <div class="sub">找不到路径</div>
      <el-button type="primary" @click="returnPrevPage">回主页</el-button>
      <el-button type="primary" plain>检查文档</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page404',
  methods: {
    returnPrevPage() {
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.notfound-wrap
  width 100%
  height 100%
  display flex
  align-items center
  justify-content center
  transform translateY(-80px)
  .content
    text-align right
    .title
      -webkit-font-smoothing antialiased
      color #73b99a
      font-size 100px
      span
        font-size 240px
    .sub
      font-size 30px
      color #ccc
      padding-bottom 50px
</style>
