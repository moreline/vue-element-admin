<template>
  <el-menu class="navbar" mode="horizontal">
    <div class="left-nav">
      <p class="avater-img"><img src="../../../assets/images/img-logo.png"></p>
      <p class="group-name">中兴驾图</p>
    </div>
    <div class="right-nav">
        <div class="top-nav">
          <span style="cursor:pointer;display:none;">通知<strong>99+</strong></span>
          <span>欢迎您,[{{userName}}]</span>
          <span style="cursor:pointer;" @click="tipsShowList">通知<strong>5</strong></span>
          <span style="cursor:pointer;">帮助</span>
          <span style="cursor:pointer;">反馈意见</span>
          <span @click="logout" style="cursor:pointer;">退出</span>
          <!--<Tips ref="tips1"></Tips>-->
        </div>
      <!--<el-dropdown class="avatar-container" trigger="click">-->
        <!--<div class="avatar-wrapper">-->
          <!--<img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">-->
          <!--<i class="el-icon-caret-bottom"></i>-->
        <!--</div>-->
        <!--<el-dropdown-menu class="user-dropdown" slot="dropdown">-->
          <!--<router-link class="inlineBlock" to="/">-->
            <!--<el-dropdown-item>-->
              <!--Home-->
            <!--</el-dropdown-item>-->
          <!--</router-link>-->
          <!--<el-dropdown-item divided>-->
            <!--<span @click="logout" style="display:block;">LogOut</span>-->
          <!--</el-dropdown-item>-->
        <!--</el-dropdown-menu>-->
      <!--</el-dropdown>-->
    </div>
  </el-menu>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        userName: '',
        logoUrl: '',
        groupName:''
      }
    },
    computed: {
    },
    methods: {
      // 退出登录
      logout() {
      },
      // 通知
      tipsShowList(){

      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    height: 60px;
    line-height: 60px;
    width: 100%;
    position: fixed;
    z-index: 1001;
    border-radius: 0px !important;
    background-color: #324e80;
    .left-nav {
      float: left;
      p {
        float: left;
      }
      .avater-img {
        width: 40px;
        height: 40px;
        margin: 10px 20px 10px 20px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .group-name {
        height: 100%;
        line-height: 100%;
        margin-top: 24px;
        color: white;
        font-weight: bold;
        font-size: 16px;
      }
    }
    .right-nav {
      float: right;
      height: 100%;
      .top-nav{
        height: 100%;
        span {
          display: inline-block;
          color: #9aa6c4;
          font-size: 12px;
          margin: 4px 20px 0 0;
        }
      }

      .top-nav span::before {
        content: '';
        width: 24px;
        height: 24px;
        display: inline-block;
        margin-right: 5px;
        background-color: pink;
        background: url('../../../assets/images/icon-nav.png');
        position: relative;
        top: 10px;
      }
      .top-nav span:nth-child(1) {
        margin-right: 100px;
      }

      .top-nav span:nth-child(1)::before {
        background-position-y: 217px;
        background-position-x: -53px;
      }

      .top-nav span:nth-child(2)::before {
        opacity: 0;
      }

      .top-nav span:nth-child(3)::before {
        background-position-y: 218px;
        background-position-x: -53px;
      }

      .top-nav span:nth-child(4)::before {
        background-position-y: 193px;
        background-position-x: -53px;
      }

      .top-nav span:nth-child(5)::before {
        background-position-y: 168px;
        background-position-x: -53px;
      }

      .top-nav span:nth-child(6)::before {
        background-position-y: 145px;
        background-position-x: -53px;
      }
      .top-nav strong {
        display: inline-block;
        padding: 0 5px;
        height: 16px;
        line-height: 16px;
        background: #ff6c60;
        border-radius: 15px;
        color: #ffffff;
        position: relative;
        left: -10px;
        top: -11px;
      }
    }
    .hamburger-container {
      line-height: 58px;
      height: 60px;
      float: left;
      padding: 0 10px;
    }
    .screenfull {
      position: absolute;
      right: 90px;
      top: 16px;
      color: red;
    }
    .avatar-container {
      height: 60px;
      display: inline-block;
      position: absolute;
      right: 35px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
</style>

