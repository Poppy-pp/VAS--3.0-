<template>
  <el-badge class="notice-area" :value="$store.getters.userInfo.amountcount">
    <el-tooltip effect="dark" content="我的待办" placement="top">
      <i class="iconfont icon-tixing" @click.prevent="open"></i>
    </el-tooltip>
  </el-badge>
</template>

<script>
export default {
  name: 'demo',
  methods:{
      open() {
          this.$router.push("/formMain");
      },
  }
}
</script>
<style type="text/css" >
  .el-badge__content.is-fixed{top:15px;}
</style>
<style lang="stylus" scoped>
.notice-area
  width: 26px
  height 100%
  transition color .28s
  i
    vertical-align middle
    cursor pointer
    font-size 2.5rem
    color #515151
    transition color .28s
    &:hover
      color #41b883
</style>
