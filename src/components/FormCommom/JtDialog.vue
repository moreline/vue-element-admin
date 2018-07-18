<template>
  <div class="jt-dialog-wrapper">
    <el-dialog :visible.sync="dialogShow" style="margin-top: 5vh;" width="837px" :modal="modal"
               :before-close="handleClose">
      <slot name="dialog"></slot>
      <span slot="footer" class="jt-dialog-foot" v-if="useFooter">
                <slot name="jt-dialog-footer"></slot>
            </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  /**
   * '弹框'组件.
   * @author jt-lixiaoying-2018/7/18
   */
  export default {
    data() {
      return {
        propShow: false
      }
    },
    props: {
      // 弹框的显示
      dialogShow: {
        type: Boolean,
        required: true,
        default: false
      },
      // 是否需要遮罩层
      modal: {
        type: Boolean,
        default: false
      },
      // 是否使用 footer
      useFooter: {
        ype: Boolean,
        default: false
      }
    },
    methods: {
      handleClose() {
        this.propShow = !this.dialogShow
        this.$emit('update:dialogShow', this.propShow)
      }
    }
  }
</script>

<style lang="less">
  .jt-dialog-wrapper {
    .el-dialog {
      box-shadow: 0 0 30px rgb(203, 216, 250);
    }
    .el-dialog__headerbtn .el-dialog__close {
      font-size: 30px;
      color: #4595ff;
    }
    .el-dialog__body {
      padding: 30px 48px;
      .jt-dialog-line {
        border-bottom: 1px solid #f6f7f9;
        height: 42px;
        p {
          width: 50%;
          box-sizing: border-box;
          line-height: 1;
          text-align: center;
          padding-top: 20px;
          padding-bottom: 8px;
        }
        .jt-dialog-key {
          border-right: 1px solid #f6f7f9;
        }
      }
      .jt-dialog-btn {
        margin-top: 20px;
        text-align: center;
      }
    }
  }
</style>
