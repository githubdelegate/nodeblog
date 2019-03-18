<template>
  <div class="login">
    <div class="login_form">
      <p class="login_title">登录</p>
      <div class="login_item">
        <p class="form_title">账号</p>
        <input type="text">
      </div>
       <div class="login_item">
        <p class="form_title">密码</p>
        <input type="text">
      </div>
       <div class="login_item">
        <p class="form_title">验证码</p>
        <input type="text">
        <img :src=check_code_img alt="验证码" class="ver-code" @click="re_checkcode">
      </div>
       <div class="login_item">
         <button @click="login">登录</button>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginInfo: {
        admin_id: '',
        admin_pwd: '',
        code: ''
      },
      check_code_img: '',
      check_code_token: ''
    }
  },
  methods: {
    async re_checkcode () {
      let res = await this.$http.api_get_checkcode()
      console.log('哈哈哈验证码',res)
      this.check_code_img = res.data.data.img
    }
  },
  async created() {
    this.re_checkcode()
  }
}
</script>

<style lang="scss" scoped>
.login {
  $color: #92acc3;
  .login_form {
    border: 1px solid $color;
    width: 400px;
    position: relative;
    top: 200px;
    transition: box-shadow .3s;
    &:hover {
      box-shadow: 0 0 20px $color;
    }
    .login_title {
      
    }

    .login_item {
      .form_title {

      }

      input {

      }

      img {
        position: absolute;
        right: 30px;
        width: 100px;
        height: 40px;
      }
    }
  }
}
</style>
