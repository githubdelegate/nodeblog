<template>
  <div class="login">
    <div class="login_form">
      <p class="login_title">登录</p>
      <div class="login_item">
        <p class="form_title">账号</p>
        <input type="text" v-model="loginInfo.admin_id">
      </div>
       <div class="login_item">
        <p class="form_title">密码</p>
        <input type="text" v-model="loginInfo.admin_pwd">
      </div>
       <div class="login_item">
        <p class="form_title">验证码</p>
        <input type="text" v-model="loginInfo.code">
        <img :src=check_code_img alt="验证码" class="ver-code" @click="re_checkcode">
      </div>
       <div class="login_item">
         <button @click="login">登录</button>
      </div>
        <div class="login_item">
         <button @click="signup">注册</button>
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
    // 注册
    async signup (){
      let res = await this.$http.api_admin_signup({
        admin_id: this.loginInfo.admin_id,
        admin_pwd: this.loginInfo.admin_pwd
      })
      console.log(res)
      alert(res.data.msg)
    },

    // 登录
    async login () {
      let res = await this.$http.api_admin_login({
        admin_id: this.loginInfo.admin_id,
        admin_pwd: this.loginInfo.admin_pwd
      })
      console.log(res)
      alert(res.data.msg)
    },
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
    $color:#92ACC3;
    background: url('http://image.lcylove.cn/16598d602ac_571542a9');
    background-size: cover;
    width: 100%;
    height: 100vh;
    .login_form {
      border: 1px solid  $color;
      width: 400px;
      margin: 0 auto;
      position: relative;
      top: 200px;
      padding-bottom: 10px;
      transition: box-shadow .3s;
      &:hover{
        box-shadow: 0 0 20px  $color;
      }
      .login_title {
        height: 40px;
        line-height: 40px;
        font-size: 26px;
        padding: 10px 0;
        text-align: center;
        border-bottom: 1px solid  $color;
        color:  $color;
        font-weight: bold;
      }
      .login_item {
        position: relative;
        display: flex;
        height: 25px;
        line-height: 25px;
        padding: 10px;
        margin: 10px 0;
        .form_title {
          width: 80px;
          text-align: right;
          margin-right: 20px;
          color:  $color;
          font-size: 16px;
        }
        input {
          flex: 1;
          margin-right: 20px;
          border: none;
          background-color: transparent;
          border-bottom: 1px dotted  $color;
          outline: none;
          box-sizing: border-box;
          padding-left: 5px;
          font-size: 16px;
          color: $color;
          transition: border .6s;
          &:focus {
            border-bottom-color: red;
          }
          
        }
        img {
          position: absolute;
          right: 30px;
          top: 0;
        }
        button {
          width: 180px;
          height: 40px;
          display: block;
          margin: 5px auto;
          cursor: pointer;
          background: transparent;
          border: 1px solid  $color;
          color:  $color;
          outline: none;
          font-size: 16px;
          letter-spacing: 4px;
          &:active {
            background:  $color;
            color: #666;
          }
        }
      }
    }
  }
</style>
