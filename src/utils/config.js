import axios from 'axios'
import router from './router'

const api = {
  url: '/fms-web/',
  act: function (method, action, params, other) {
    let params1 = new URLSearchParams()
    // 遍历参数格式化
    for (let k in params) {
      params1.append(k, params[k])
    }
    // axios.defaults.withCredentials=true
    let result
    axios({
      method: method,
      url: '/fms-web/' + action,
      data: params1,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      // withCredentials: true
    }).then((response) => {
      // 判断是否为登录退出页面
      if (response.data.code != 0) {
        // 判断是否session存在
        if (response.data.msg == 'session不存在') {
          this.cookie.removeAll()
          location.href = '/'
          return false
        }
        alert(response.data.msg)
        if (other) {
          other(false)
        }
        result = false
      } else {
        //登录
        if (action == 'login') {
          console.log(response.data.data)
          for (let key in response.data.data) {
            api.cookie.set(key, response.data.data[key], {
              expires: new Date().getTime() + 1e3 * 60 * 60 * 24,
              path: '/'
            })
          }
          //退出
        } else if (action == 'logout') {
          location.reload()
        }
        if (other) {
          other(response.data)
        }
        result = response.data
      }
      return result
    })
    //   .catch(function (response) {
    //   console.log(response)
    // })
  },
  post: function (action, params, other) {
    return this.act('post', action, params, other)
  },
  get: function (action, params, other) {
    return this.act('get', action, params, other)
  },
  put: function (action, params, other) {
    return this.act('put', action, params, other)
  },
  delete: function (action, params, other) {
    return this.act('delete', action, params, other)
  },
  patch: function (action, params, other) {
    return this.act('patch', action, params, other)
  },
  request: function (action, params, other) {
    return this.act('request', action, params, other)
  },
  head: function (action, params, other) {
    return this.act('head', action, params, other)
  },
  options: function (action, params, other) {
    return this.act('options', action, params)
  },
  /**
   * 获取table数据功能接口   ,fuc
   */
  getPage: function (url, obj, bl, pageNum, pageSize, other, fuc) {
    let _this = this
    if (!pageNum) {
      pageNum = 1
    }
    if (!pageSize) {
      pageSize = pageSize ? pageSize : (typeof(obj.$refs[bl + 'Table'].$refs.page.pages.pagesSize) != 'undefined' ? obj.$refs[bl + 'Table'].$refs.page.pages.pagesSize : 10)
    }
    let params1 = {pageNum: pageNum, pageSize: pageSize}
    if (typeof(obj.$refs.searchForm) != 'undefined') {
      let params = obj.$refs.searchForm.dynamicValidateForm
      for (let k in params) {
        if (params[k] || params[k].length > 0 || params[k] === 0) {
          params1[k] = params[k]
        }
      }
    }
    if (other) {
      for (let k in other) {
        params1[k] = other[k]
      }
    }
    _this.post(url, params1, (data) => {
      if (fuc) {
        fuc(data)
      }
      obj.$refs[bl + 'Table'].$refs.page.pages.total = data.data.total
      obj.$refs[bl + 'Table'].$refs.page.pages.pagesSize = pageSize
      obj.$refs[bl + 'Table'].$refs.page.pages.pageNow = pageNum
      obj.$refs[bl + 'Table'].$refs.page.pages.bl = bl
      obj.$refs[bl + 'Table'].$refs.page.pages.url = url
      if (!data.data.list) {
        if (obj.bl && data.data.length > 0) {
          let id = data.data[0].id
          for (let k in obj.bl) {
            for (let k1 in obj.bl[k]) {
              for (let k2 in obj[k1][obj.bl[k][k1]].info) {
                if (obj[k1][obj.bl[k][k1]].info[k2].type == 'link') {
                  _this.dt(obj[k1][obj.bl[k][k1]].info[k2], (val) => {
                    obj[k1][obj.bl[k][k1]].info[k2].data = val
                  }, {id: id})
                }
              }
            }
          }
        }
      } else {
        if (obj.bl && data.data.list.length > 0) {
          let id = data.data.list[0].id
          for (let k in obj.bl) {
            for (let k1 in obj.bl[k]) {
              for (let k2 in obj[k1][obj.bl[k][k1]].info) {
                if (obj[k1][obj.bl[k][k1]].info[k2].type == 'link') {
                  _this.dt(obj[k1][obj.bl[k][k1]].info[k2], (val) => {
                    obj[k1][obj.bl[k][k1]].info[k2].data = val
                  }, {id: id})
                }
              }
            }
          }
        }
      }
      try {
        if (data.data.list) {
          obj.$set(obj[bl].tabledata.list = _this.changeAllListTime(data.data.list, obj.$refs[bl + 'Table'].Receive.head))
        } else {
          obj.$set(obj[bl].tabledata.list = _this.changeAllListTime(data.data, obj.$refs[bl + 'Table'].Receive.head))
        }
      } catch (e) {
        console.log(e)
        if (data.data.list) {
          obj.tabledata.list = _this.changeAllListTime(data.data.list, obj.$refs[bl + 'Table'].Receive.head)
        } else {
          obj.tabledata.list = _this.changeAllListTime(data.data, obj.$refs[bl + 'Table'].Receive.head)
        }
      }
    })
  },
  /**
   * 删除功能接口
   */
  del: function (url, row, obj, bl) {
    if (confirm('确定删除？')) {
      let _this = this
      _this.post(url, {id: row.row.id}, (data) => {
        _this.getPage(obj.$refs[bl + 'Table'].$refs.page.pages.url, obj, obj.$refs[bl + 'Table'].$refs.page.pages.bl, obj.$refs[bl + 'Table'].$refs.page.pages.pageNow, obj.$refs[bl + 'Table'].$refs.page.pages.pageSize)
      })
    }
  },

  /**
   * 编辑功能接口
   */
  edit: function (obj, obj1, bl, Dialog, url, values) {
    if (!Dialog) {
      Dialog = 'Dialog'
    }
    console.log(obj1.$refs[bl + Dialog])
    // 修改编辑弹窗的title
    var arr = ['新增车辆', '新增人员', '新增用车类型', '新增规费类型', '新增油品类型', '新增规费', '新增油费', '新增保险', '新增保养', '新增年检', '新增客户']
    var brr = ['编辑车辆', '编辑人员', '编辑用车类型', '编辑规费类型', '编辑油品类型', '编辑规费', '编辑油费', '编辑保险', '编辑保养', '编辑年检', '编辑客户']
    for (var i = 0; i < arr.length; i++) {
      if (obj1.$refs[bl + Dialog].formdata.buttomName === arr[i]) {
        obj1.$refs[bl + Dialog].formdata.dialogTitle = brr[i]
      }
    }
    obj1.$refs[bl + Dialog].centerDialogVisible = true
    let temp = {}
    // obj.row回显数据对象
    if (typeof(obj.row) != 'undefined' && typeof(obj.row.id) != 'undefined') {
      temp.id = obj.row.id
    }
    if (url) {
      this.post(url, {id: obj.row.id}, function (data) {
        for (let k in obj1[bl][Dialog].info) {
          temp[obj1[bl][Dialog].info[k].name] = data.data[obj1[bl][Dialog].info[k].name]
        }
        if (values) {
          for (let k in values) {
            temp[k] = values[k]
          }
        }
        try {
          obj1.$refs[bl + Dialog].setForm(temp)
        } catch (e) {
          obj1[bl][Dialog].values = temp
        }
      })
      return
    }
    for (let k in obj1[bl][Dialog].info) {
      if (obj1[bl][Dialog].info[k].fromId) {
        temp[obj1[bl][Dialog].info[k].name] = obj.row[obj1[bl][Dialog].info[k].fromId]
      } else if (typeof(obj.row) != 'undefined' && !obj.row[obj1[bl][Dialog].info[k].name]) {
        temp[obj1[bl][Dialog].info[k].name] = obj1[bl][Dialog].info[k].value
      } else if (typeof(obj.row) != 'undefined') {
        temp[obj1[bl][Dialog].info[k].name] = obj.row[obj1[bl][Dialog].info[k].name] == '启用' ? 1 : obj.row[obj1[bl][Dialog].info[k].name]
      }
    }
    if (values) {
      for (let k in values) {
        temp[k] = values[k]
      }
    }
    try {
      obj1.$refs[bl + Dialog].setForm(temp)
    } catch (e) {
      obj1[bl][Dialog].values = temp
    }

  },
  /**
   * 提交功能接口
   * @param  obj 表单子组件
   * @param obj1 父组件
   */
  formSubmit(obj, obj1) {
    let u = 'add'
    if (obj.obj.$refs.formDesc.dynamicValidateForm.id) {
      u = 'update'
    }
    let params = obj.obj.$refs.formDesc.dynamicValidateForm
    let modelIdBefor = params.modelId
    for (let k in params) {
      if (k === 'resIds') {
        let str = ''
        for (let k1 in params[k]) {
          str += params[k][k1] + ','
        }
        str = str.replace(/,$/, '')
        params[k] = str
      }
      if (k === 'modelId') {
        var modelId = params.modelId[2]
        params.modelId = modelId
      }
    }
    obj.obj.loading = true
    u = /submit$/.test(obj.buttons.urlPre) || typeof(obj.buttons.notCommon) != 'undefined' ? obj.buttons.urlPre : obj.buttons.urlPre + u
    api.post(
      u,
      obj.obj.$refs.formDesc.dynamicValidateForm,
      bool => {
        obj.obj.loading = false
        if (bool !== false) {
          // 重置modelId为数组
          params.modelId = modelIdBefor
          console.log(params)
          obj.obj.$parent.$parent.$message({
            message: '操作成功',
            type: 'success'
          })
          if (!obj.action) {
            obj.obj.centerDialogVisible = false
          }
          try {
            //                                                                              路径 /
            // api.getPage(obj.buttons.listPage ? obj.buttons.listPage : obj.buttons.urlPre + 'page', obj1, obj.buttons.bl)
          } catch (e) {

          }
        }
      }
    )
  },
  /**
   * 获取树形结构数据
   */
  getOrg: function (obj) {
    let list = []
    axios.post('/fms-web/org/tree').then(function (res) {
      let list = []
      let i = 0
      for (let k in res.data.data) {
        list[res.data.data[k].id] = {
          id: res.data.data[k].id,
          label: res.data.data[k].name,
          pid: res.data.data[k].parentId
        }
      }
      let p = []

      function toTree(dd) {
        dd.forEach(function (item) {
          delete item.children
        });

        let map = {};
        dd.forEach(function (item) {
          map[item.id] = item
        });

        let val = []
        dd.forEach(function (item) {
          let parent = map[item.pid]
          if (parent) {
            (parent.children || (parent.children = [])).push(item)
          } else {
            val.push(item)
          }
        })
        return val
      }

      obj.tree = toTree(list)
    })
  },
  /**
   * 获取车牌号
   */
  dt(obj, func, other) {
    var params = {pageNow: 1, pageSize: 999999999}
    if (other) {
      for (let k in other) {
        params[k] = other[k]
      }
    }
    api.post(
      obj.url,
      params,
      data => {
        let list = typeof(data.data.list) != 'undefined' ? data.data.list : data.data, temp = []
        for (let k in list) {
          temp[k] = {
            value: list[k][obj.params[0]],
            label: list[k][obj.params[1]]
          }
        }
        func(temp)
      }
    )
  },
  /**
   * 设置cookie缓存
   */
  cookie: {
    set: function (name, value, opts) {
      console.log()
      if (!opts)
        opts = {};
      let cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
      if (opts.maxAge)
        cookie += '; Max-Age=' + opts.maxAge;
      if (opts.expires)
        cookie += '; Expires=' + (opts.expires.constructor == Date ? opts.expires.toUTCString() : new Date(opts.expires).toUTCString());
      if (opts.path)
        cookie += '; Path=' + opts.path;
      if (opts.domain)
        cookie += '; Domain=' + opts.domain;
      if (opts.secure)
        cookie += '; Secure';
      document.cookie = cookie;
    },

    get: function (name) {
      let result = document.cookie.match(new RegExp('(?:^|; )' + encodeURIComponent(name).replace(/[.*()]/g, '\\$&') + '=([^;]*)'));
      return result ? decodeURIComponent(result[1]) : null;
    },
    /**
     * 表格删除一个
     */
    remove: function (name, opts) {
      if (!opts)
        opts = {};
      opts.maxAge = 0;
      let set = function (name, value, opts) {
        if (!opts)
          opts = {};
        let cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
        if (opts.maxAge)
          cookie += '; Max-Age=' + opts.maxAge;
        if (opts.expires)
          cookie += '; Expires=' + (opts.expires.constructor == Date ? opts.expires.toUTCString() : new Date(opts.expires).toUTCString());
        if (opts.path)
          cookie += '; Path=' + opts.path;
        if (opts.domain)
          cookie += '; Domain=' + opts.domain;
        if (opts.secure)
          cookie += '; Secure';
        document.cookie = cookie;
      }
      set(name, '', opts);
    },
    /**
     * 表格删除全部
     */
    removeAll: function () {
      let cookies = document.cookie.split(';')
      let remove = function (name, opts) {
        if (!opts)
          opts = {};
        opts.maxAge = 0;
        let set = function (name, value, opts) {
          if (!opts)
            opts = {};
          let cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
          if (opts.maxAge)
            cookie += '; Max-Age=' + opts.maxAge;
          if (opts.expires)
            cookie += '; Expires=' + (opts.expires.constructor == Date ? opts.expires.toUTCString() : new Date(opts.expires).toUTCString());
          if (opts.path)
            cookie += '; Path=' + opts.path;
          if (opts.domain)
            cookie += '; Domain=' + opts.domain;
          if (opts.secure)
            cookie += '; Secure';
          document.cookie = cookie;
        }
        set(name, '', opts);
      }
      for (let i = 0; i < cookies.length; i++) {
        let key = cookies[i].split('=')[0].replace(/\s/g, '');
        remove(key);
      }
    }
  },
  /**
   * 修改时间戳格式
   */
  timeToString: function (linuxtime, noTime) {
    let date = new Date()
    date.setTime(linuxtime * 1000)
    let y = date.getFullYear()
    let m = date.getMonth() + 1
    m = m < 10 ? ('0' + m) : m
    let d = date.getDate()
    d = d < 10 ? ('0' + d) : d
    let h = date.getHours()
    h = h < 10 ? ('0' + h) : h
    let minute = date.getMinutes()
    let second = date.getSeconds()
    minute = minute < 10 ? ('0' + minute) : minute
    second = second < 10 ? ('0' + second) : second
    let str = y + '-' + m + '-' + d
    if (!noTime) {
      str += ' ' + h + ':' + minute + ':' + second
    }
    return str
  },
  changeAllListTime: function (list, head) {
    let temp = {}
    for (let i in head) {
      temp[head[i].name] = head[i]
    }
    for (let k in list) {
      for (let k1 in list[k]) {
        if (typeof(temp[k1]) != 'undefined' && typeof(temp[k1].changeDate) != 'undefined') {
          list[k][k1] = this.timeToString(list[k][k1] / 1000, temp[k1].noTime)
        }
        if (typeof(temp[k1]) != 'undefined' && typeof(temp[k1].data) != 'undefined') {
          list[k][k1] = temp[k1].data[list[k][k1]]
        }
      }
    }
    return list
  }
}
export default api
