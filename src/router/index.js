import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/dashboard',
    component: Layout,
    name: 'Dashboard',
    children: [{
      path: 'dashboard',
      name: 'First',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'tree' }
    }]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '运营概览', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/example/table/index'),
        meta: { title: '工作台', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/example/tree/index'),
        meta: { title: '目标管理', icon: 'tree' }
      },
      {
        path: 'jt-analysis',
        name: 'JtAnalysis',
        component: () => import('@/views/example/JtAnalysis/index'),
        meta: { title: '运营分析', icon: 'tree' }
      }
    ]
  },
  {
    path: '/vehicle-positioning',
    component: Layout,
    redirect: '/vehicle-positioning/form',
    name: 'VehiclePositioning',
    meta: { title: '位置服务', icon: 'example' },
    children: [
      {
        path: 'form',
        name: 'Form',
        component: () => import('@/views/VehiclePositioning/form/index'),
        meta: { title: '车辆定位', icon: 'form' }
      },
      {
        path: 'jt-electronic',
        name: 'Jtelectronic',
        component: () => import('@/views/VehiclePositioning/jtelectronic/index'),
        meta: { title: '电子围栏', icon: 'form' }
      }
    ]
  },
  {
    path: '/scheduling-management',
    component: Layout,
    redirect: '/scheduling-management/form',
    name: 'SchedulingManagement',
    meta: { title: '调度管理', icon: 'tree' },
    children: [
      {
        path: 'schedulingview',
        name: 'SchedulingView',
        component: () => import('@/views/SchedulingManagement/SchedulingView/index'),
        meta: { title: '调度概览', icon: 'form' }
      },
      {
        path: 'travelapplication',
        name: 'TravelApplication',
        component: () => import('@/views/SchedulingManagement/travelApplication/index'),
        meta: { title: '出行申请', icon: 'form' }
      },
      {
        path: 'travelapproval',
        name: 'TravelApproval',
        component: () => import('@/views/SchedulingManagement/travelApproval/index'),
        meta: { title: '出行审批', icon: 'form' }
      },
      {
        path: 'truckingorder',
        name: 'TruckingOrder',
        component: () => import('@/views/SchedulingManagement/truckingOrder/index'),
        meta: { title: '派车单', icon: 'form' }
      }
    ]
  },
  {
    path: '/daily-things',
    component: Layout,
    redirect: '/daily-things/carfault',
    name: 'DailyThings',
    meta: { title: '日常事务', icon: 'tree' },
    children: [
      {
        path: 'carfault',
        name: 'CarFault',
        component: () => import('@/views/DailyThings/CarFault/index'),
        meta: { title: '车辆故障', icon: 'form' }
      },
      {
        path: 'carremind',
        name: 'CarRemind',
        component: () => import('@/views/DailyThings/carRemind/index'),
        meta: { title: '车务提醒', icon: 'form' }
      },
      {
        path: 'carthings',
        name: 'CarThings',
        component: () => import('@/views/DailyThings/carThings/index'),
        meta: { title: '车辆事务', icon: 'form' }
      },
      {
        path: 'feesmanagement',
        name: 'FeesManagement',
        component: () => import('@/views/DailyThings/feesManagement/index'),
        meta: { title: '规费管理', icon: 'form' }
      },
      {
        path: 'oilmanagement',
        name: 'OilManagement',
        component: () => import('@/views/DailyThings/oilManagement/index'),
        meta: { title: '加油管理', icon: 'form' }
      }
    ]
  },
  {
    path: '/total-form',
    component: Layout,
    redirect: '/TotalForm/formone',
    name: 'TotalForm',
    meta: { title: '统计报表', icon: 'tree' },
    children: [
      {
        path: 'formone',
        name: 'Formone',
        component: () => import('@/views/TotalForm/formone/index'),
        meta: { title: '统计一', icon: 'form' }
      }
    ]
  },
  {
    path: '/platform-function',
    component: Layout,
    redirect: '/PlatformFunction/customer',
    name: 'PlatformFunction',
    meta: { title: '平台功能', icon: 'tree' },
    children: [
      {
        path: 'customer',
        name: 'Customer',
        component: () => import('@/views/PlatformFunction/customer/index'),
        meta: { title: '客户管理', icon: 'form' }
      },
      {
        path: 'officialinfo',
        name: 'OfficialInfo',
        component: () => import('@/views/PlatformFunction/officialinfo/index'),
        meta: { title: '官方公告', icon: 'form' }
      },
      {
        path: 'feedback',
        name: 'Feedback',
        component: () => import('@/views/PlatformFunction/feedback/index'),
        meta: { title: '意见反馈', icon: 'form' }
      }
    ]
  },
  {
    path: '/system-settings',
    component: Layout,
    redirect: '/SystemSettings/company',
    name: 'SystemSettings',
    meta: { title: '系统设置', icon: 'tree' },
    children: [
      {
        path: 'company',
        name: 'Company',
        component: () => import('@/views/SystemSettings/company/index'),
        meta: { title: '企业信息', icon: 'form' }
      },
      {
        path: 'car-archives',
        name: 'CarArchives',
        component: () => import('@/views/SystemSettings/carArchives/index'),
        meta: { title: '车辆档案', icon: 'form' }
      },
      {
        path: 'equipment',
        name: 'Equipment',
        component: () => import('@/views/SystemSettings/equipment/index'),
        meta: { title: '设备管理', icon: 'form' }
      },
      {
        path: 'parameter',
        name: 'Parameter',
        component: () => import('@/views/SystemSettings/parameter/index'),
        meta: { title: '参数设置', icon: 'form' }
      },
      {
        path: 'changepassword',
        name: 'ChangePassword',
        component: () => import('@/views/SystemSettings/changePassword/index'),
        meta: { title: '密码变更', icon: 'form' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

