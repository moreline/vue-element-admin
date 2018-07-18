<template>
  <scroll-bar>
    <el-menu mode="vertical" unique-opened :default-active="$route.path" :collapse="isCollapse" background-color="#4365a3"
             text-color="#fff" active-text-color="#409EFF">
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'

export default {
  components: { SidebarItem, ScrollBar },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      console.log(this.$router)
      return this.$router.options.routes
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
