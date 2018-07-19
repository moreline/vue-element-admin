<template>
  <div class="login-container">
    <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left"
             label-width="0px"
             class="card-box login-form">
      <p class="avater-login"><img src="../../assets/images/img-logo.png"></p>
      <h3 class="title">中兴驾图车辆管理平台</h3>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user"/>
        </span>
        <el-input class="inputbg" value="" name="username" type="text" v-model="loginForm.userName" placeholder="账号"/>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
        <el-input class="inputbg" value="" name="password" :type="pwdType" @keyup.enter.native="handleLogin"
                  v-model="loginForm.userPwd"
                  placeholder="密码"></el-input>
        <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye"/></span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
      <div class="tips">
        <span style="margin-right:20px;">username: 13000000000</span>
        <span> password: 123456</span>
      </div>
    </el-form>
  </div>
</template>

<script>
  import api from '../../utils/config.js'

  export default {
    name: 'login',
    data() {
      // const validateUsername = (rule, value, callback) => {
      //   if (!isvalidUsername(value)) {
      //     callback(new Error('请输入正确的用户名'))
      //   } else {
      //     callback()
      //   }
      // }
      // const validatePass = (rule, value, callback) => {
      //   if (value.length < 5) {
      //     callback(new Error('密码不能小于5位'))
      //   } else {
      //     callback()
      //   }
      // }
      return {
        loginForm: {
          userName: '',
          userPwd: ''
        },
        loading: false,
        pwdType: 'password'
      }
    },
    methods: {
      /**
       * 密码显示与否
       */
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      /**
       * 点击登录登录方法
       */
      handleLogin() {
        api.post('login', this.loginForm, (data) => {
          /*登录成功*/
          if (data.code === 0) {
            this.$message({
              showClose: true,
              message: '登录成功',
              type: 'success'
            });
            setTimeout(() => {
              this.$router.push('/dashboard')
            }, 2000)
          } else {
            /*登录失败*/
            this.$message({
              showClose: true,
              message: '请检查用户名和密码是否输入正确',
              type: 'error'
            });
          }
          console.log(data)
          /*获取用户信息*/

        })
      }

    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;

  .login-container {
    position: fixed;
    height: 100%;
    width: 100%;
    background: url("../../assets/images/login-bg.jpg") no-repeat;
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
      -webkit-text-fill-color: #fff !important;
    }
    .avater-login {
      width: 100px;
      height: 100px;
      margin: 20px auto;
      border-radius: 50px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      height: 47px;
    }
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0 1000px rgba(255,255,255,1) inset !important;
      -webkit-text-fill-color: gray !important;
    }
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 400px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }
    .el-form-item {
      /*border: 1px solid rgba(255, 255, 255,1);*/
      background: rgba(255, 255, 255,1);
      border-radius: 5px;
      color: #454545;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: white;
      cursor: pointer;
      user-select: none;
      .svg-icon{
        color: gray;
      }
    }
    .thirdparty-button {
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
  }
</style>
