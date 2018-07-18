<!--主页面-->
<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <!--头部-->
    <navbar></navbar>
    <div class="main-container">
      <!--左边菜单栏-->
      <sidebar class="sidebar-container"></sidebar>
      <!--内容-->
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
  import {Navbar, Sidebar, AppMain} from '@/views/layout/components'

  export default {
    name: 'layout',
    components: {
      Navbar,
      Sidebar,
      AppMain
    },
    computed: {
      sidebar() {
        return this.$store.state.app.sidebar
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../../styles/mixin.scss';

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  }
</style>
