<template>
  <div class="jt-pager">
    <el-pagination
      background
      @current-change="handleCurrentChange"
      :current-page="pager.currentPage"
      :page-size="pager.pageSize"
      layout="total, prev, pager, next"
      :total="pager.total">
    </el-pagination>
  </div>
</template>

<script type="text/ecmascript-6">
  /**
   * '分页器'组件.
   * @author jt-lixiaoying-2018/7/12
   */
  export default {
    data() {
      return {}
    },
    props: {
      pager: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    methods: {
      handleCurrentChange(val) {
        this.$emit('changeCurrentPage', val)
      }
    }
  }
</script>

<style lang="less">
  .jt-pager {
    text-align: center;
    .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li {
      background-color: #fff;
      border: 1px solid #c2dbef;
    }
    .el-pagination.is-background .el-pager li:not(.disabled).active {
      border-color: #79a0eb;
      background-color: #79a0eb;
    }
    .el-pagination {
      font-weight: 600;
    }
  }
</style>
