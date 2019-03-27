<!-- 系统锁定页 -->
<template>
  <div class="lock-wrap">
    <el-carousel height="100%" indicator-position="none">
      <el-carousel-item>
        <div>
          <img src="../../assets/images/banner1.png" alt="">
        </div>
      </el-carousel-item>
      <el-carousel-item>
        <div>
          <img src="../../assets/images/banner2.png" alt="">
        </div>
      </el-carousel-item>
      <el-carousel-item >
        <div>
          <img src="../../assets/images/banner3.png" alt="">
        </div>
      </el-carousel-item>
    </el-carousel>
    <div class="lock-container">
      <div class="lock-container__box">
        <h1><span>{{$t('app.unlock')}} {{$t('login.edenPart1')}}</span><span class="subtitle">{{$t('login.edenPart2')}}</span></h1>
        <el-input v-model="pwd" placeholder="请输入系统密码"></el-input>
        <el-button class="btn" @click="unlock">解 锁</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import storage from '@/utils/storage'
export default {
  name: 'lock',
  data() {
    return {
      pwd: ''
    }
  },
  created() {
  },
  methods: {
    unlock() {
      if (this.pwd === '') {
        this.$message.error('请输入解锁密码！')
      } else {
        if (this.pwd == storage.get('loginUser').password) {//判断密码是否和输入一致
          this.$message.success(this.$t('lock.unlock'))
          this.$store.dispatch('setLockState', 'unlock')
          this.$router.push('/')
        }else{
          this.$message.error('密码与登陆密码不一致！请重新输入！')
          this.pwd = '';
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.lock-wrap
  width 100%
  height 100%
  overflow hidden
  .el-carousel
    height 65%

.lock-container
  width 100%
  height 35%
  display flex
  align-items center
  justify-content center
  &__box
    color #659c84
    margin-top -8%
    h1
      text-align center
    .btn
      margin-top 20px
      width 100%
    .subtitle
      color #374b63
  
.el-carousel__item
  display flex
  align-items center
  justify-content center
  div
    font-size 35px
    color white
.el-carousel__item:nth-child(2n)
  background-color #659c84
.el-carousel__item:nth-child(2n+1)
  background-color #374b63
</style>
