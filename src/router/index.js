import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/anchor-register',
    component: () => import('@/views/anchor/register'),
    hidden: true
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/mcn-task',
    component: Layout,
    redirect: '/mcn-task/list',
    alwaysShow: true,
    meta: { title: '任务中心', icon: 'dashboard' },
    children: [
      {
        path: 'list',
        component: () => import('@/views/mcn/task/list'),
        name: 'task-list',
        meta: { title: '历史任务列表', roles: ['admin'] }
      },
      {
        path: 'fillin',
        hidden: true,
        component: () => import('@/views/mcn/task/view/fillin'),
        name: 'task-fillin',
        meta: { title: '填写任务信息', roles: ['admin'], activeMenu: '/mcn/task/list' }
      },
      {
        path: 'confirm',
        hidden: true,
        component: () => import('@/views/mcn/task/view/confirm'),
        name: 'task-confirm',
        meta: { title: '确认任务信息', roles: ['admin'], activeMenu: '/mcn/task/list' }
      },
      {
        path: 'affix',
        hidden: true,
        component: () => import('@/views/mcn/task/view/affix'),
        name: 'task-affix',
        meta: { title: '签署合同', roles: ['admin'], activeMenu: '/mcn/task/list' }
      },
      {
        path: 'detail',
        hidden: true,
        component: () => import('@/views/mcn/task/view/detail'),
        name: 'task-detail',
        meta: { title: '任务详情', roles: ['admin'], activeMenu: '/mcn/task/list' }
      },
      {
        path: 'printpdf',
        hidden: true,
        component: () => import('@/views/mcn/task/view/printpdf'),
        name: 'task-printpdf',
        meta: { title: '查看/打印合同', roles: ['admin'], activeMenu: '/mcn/task/printpdf' }
      },
      {
        path: 'release',
        component: () => import('@/views/mcn/task/release'),
        name: 'task-release',
        meta: { title: '发布任务', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/mcn-account',
    component: Layout,
    redirect: '/mcn-account/information',
    alwaysShow: true,
    meta: { title: '账号设置', icon: 'dashboard' },
    children: [
      {
        path: 'information',
        component: () => import('@/views/mcn/account/information'),
        name: 'account-information',
        meta: { title: '基本资料', roles: ['admin'] }
      },
      {
        path: 'editpwd',
        // hidden: true,
        component: () => import('@/views/mcn/account/editpwd'),
        name: 'account-editpwd',
        meta: { title: '修改密码', roles: ['admin'] }
      },
      {
        path: 'billing',
        // hidden: true,
        component: () => import('@/views/mcn/account/billing'),
        name: 'account-billing',
        meta: { title: '开票信息', roles: ['admin'] }
      },
      {
        path: 'qualifications',
        // hidden: true,
        component: () => import('@/views/mcn/account/qualifications'),
        name: 'account-qualifications',
        meta: { title: '相关资质', roles: ['admin'] }
      }
    ]
  },

  {
    path: '/anchor-record',
    component: Layout,
    redirect: '/anchor-record/history',
    alwaysShow: true,
    meta: { title: '用工记录', icon: 'dashboard' },
    children: [
      {
        path: 'history',
        component: () => import('@/views/anchor/record/history'),
        name: 'anchor-history',
        meta: { title: '历史记录', roles: ['admin'] }
      }
    ]
  },

  {
    path: '/anchor-account',
    component: Layout,
    redirect: '/anchor-account/information',
    alwaysShow: true,
    meta: { title: '账号中心', icon: 'dashboard' },
    children: [
      {
        path: 'information',
        component: () => import('@/views/anchor/account/information'),
        name: 'anchor-information',
        meta: { title: '基本信息', roles: ['admin'] }
      },
      {
        path: 'editpwd',
        component: () => import('@/views/anchor/account/editpwd'),
        name: 'anchor-editpwd',
        meta: { title: '修改密码', roles: ['admin'] }
      },
      {
        path: 'phone',
        component: () => import('@/views/anchor/account/phone'),
        name: 'anchor-phone',
        meta: { title: '手机号绑定', roles: ['admin'] }
      },
      {
        path: 'collection',
        component: () => import('@/views/anchor/account/collection'),
        name: 'anchor-collection',
        meta: { title: '收款信息', roles: ['admin'] }
      },
      {
        path: 'relations',
        component: () => import('@/views/anchor/account/relations'),
        name: 'anchor-relations',
        meta: { title: '用工关系', roles: ['admin'] }
      }
    ]
  },

  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/admin/home'),
        name: 'admin-home',
        meta: { title: '首页', icon: 'dashboard', roles: ['admin'], affix: true }
      }
    ]
  },

  {
    path: '/admin-account',
    component: Layout,
    redirect: '/admin-account/mcnlist',
    alwaysShow: true,
    meta: { title: '账号管理', icon: 'dashboard' },
    children: [
      {
        path: 'mcnlist',
        component: () => import('@/views/admin/account/mcnlist'),
        name: 'admin-mcnlist',
        meta: { title: 'MCN账号列表', roles: ['admin'] }
      },
      {
        path: 'mcnview',
        hidden: true,
        component: () => import('@/views/admin/account/mcnview'),
        name: 'admin-mcnview',
        meta: { title: '账号详情', roles: ['admin'], activeMenu: '/admin-account/mcnlist' }
      },
      {
        path: 'anchorlist',
        component: () => import('@/views/admin/account/anchorlist'),
        name: 'admin-anchorlist',
        meta: { title: '主播账号列表', roles: ['admin'] }
      },
      {
        path: 'anchorview',
        hidden: true,
        component: () => import('@/views/admin/account/anchorview'),
        name: 'admin-anchorview',
        meta: { title: '账号详情', roles: ['admin'] }
      },
      {
        path: 'mcnadd',
        component: () => import('@/views/admin/account/mcnadd'),
        name: 'admin-mcnadd',
        meta: { title: '新增MAC账号', roles: ['admin'], activeMenu: '/admin-account/mcnlist' }
      },
      {
        path: 'anchoradd',
        component: () => import('@/views/admin/account/anchoradd'),
        name: 'admin-anchoradd',
        meta: { title: '新增主播账号', roles: ['admin'] }
      }
    ]
  },

  {
    path: '/admin-mission',
    component: Layout,
    redirect: '/admin-mission/untreated',
    alwaysShow: true,
    meta: { title: '总包任务管理', icon: 'dashboard' },
    children: [
      {
        path: 'untreated',
        component: () => import('@/views/admin/mission/untreated'),
        name: 'admin-untreated',
        meta: { title: '未处理任务列表', roles: ['admin'] }
      },
      {
        path: 'processed',
        component: () => import('@/views/admin/mission/processed'),
        name: 'admin-processed',
        meta: { title: '已处理任务列表', roles: ['admin'] }
      },
      {
        path: 'invoice',
        component: () => import('@/views/admin/mission/invoice'),
        name: 'admin-invoice',
        meta: { title: '开票申请', roles: ['admin'] }
      },
      {
        path: 'mission-view',
        hidden: true,
        component: () => import('@/views/admin/mission/mission_view'),
        name: 'admin-mission-view',
        meta: { title: '未处理任务列表', roles: ['admin'] }
      }
    ]
  },

  {
    path: '/admin-part',
    component: Layout,
    redirect: '/admin-part/list/type/1',
    alwaysShow: true,
    meta: { title: '分包任务管理', icon: 'dashboard' },
    children: [
      {
        path: 'list/type/1',
        component: () => import('@/views/admin/part/list'),
        name: 'admin-list-1',
        meta: { title: '未处理任务列表', roles: ['admin'] }
      },
      {
        path: 'list/type/4',
        component: () => import('@/views/admin/part/list'),
        name: 'admin-list-4',
        meta: { title: '待审任务列表', roles: ['admin'] }
      },
      {
        path: 'list/type/5',
        component: () => import('@/views/admin/part/list'),
        name: 'admin-list-5',
        meta: { title: '进行中任务列表', roles: ['admin'] }
      },
      {
        path: 'list/type/6',
        component: () => import('@/views/admin/part/list'),
        name: 'admin-list-6',
        meta: { title: '已完成任务列表', roles: ['admin'] }
      },
      {
        path: 'list/type/3',
        component: () => import('@/views/admin/part/list'),
        name: 'admin-list-3',
        meta: { title: '申诉任务列表', roles: ['admin'] }
      },
      {
        path: 'list/view',
        component: () => import('@/views/admin/part/view'),
        name: 'admin-list-view',
        meta: { title: '任务详情', roles: ['admin'] }
      }
    ]
  },

  {
    path: '/admin-contract',
    component: Layout,
    redirect: '/admin-contract/mission',
    alwaysShow: true,
    meta: { title: '合同模板管理', icon: 'dashboard' },
    children: [
      {
        path: 'mission',
        component: () => import('@/views/admin/contract/mission'),
        name: 'admin-contract-mission',
        meta: { title: '总包合同模板管理', roles: ['admin'] }
      },
      {
        path: 'part',
        component: () => import('@/views/admin/contract/part'),
        name: 'admin-contract-part',
        meta: { title: '分包合同模板管理', roles: ['admin'] }
      },
      {
        path: 'flexible',
        component: () => import('@/views/admin/contract/flexible'),
        name: 'admin-contract-flexible',
        meta: { title: '灵活用工合同模板管理', roles: ['admin'] }
      },
      {
        path: 'chapter',
        component: () => import('@/views/admin/contract/chapter'),
        name: 'admin-contract-chapter',
        meta: { title: '签章管理', roles: ['admin'] }
      }
    ]
  },

  {
    path: '/admin-taxrate',
    component: Layout,
    redirect: '/admin-taxrate/taxrate',
    alwaysShow: true,
    meta: { title: '税率管理', icon: 'dashboard' },
    children: [
      {
        path: 'taxrate',
        component: () => import('@/views/admin/taxrate/taxrate'),
        name: 'admin-taxrate',
        meta: { title: '税率管理', roles: ['admin'] }
      }
    ]
  },

  {
    path: '/admin-admin',
    component: Layout,
    redirect: '/admin-admin/list',
    alwaysShow: true,
    meta: { title: '管理员管理', icon: 'dashboard' },
    children: [
      {
        path: 'list',
        component: () => import('@/views/admin/admin/list'),
        name: 'admin-admin-list',
        meta: { title: '账号列表', roles: ['admin'] }
      },
      {
        path: 'role',
        component: () => import('@/views/admin/admin/role'),
        name: 'admin-admin-role',
        meta: { title: '角色管理', roles: ['admin'] }
      },
      {
        path: 'permissions',
        component: () => import('@/views/admin/admin/permissions'),
        name: 'admin-admin-permissions',
        meta: { title: '权限管理', roles: ['admin'] }
      }
    ]
  },

  {
    path: '/admin-log',
    component: Layout,
    redirect: '/admin-log/list',
    alwaysShow: true,
    meta: { title: '行为日志', icon: 'dashboard' },
    children: [
      {
        path: 'list',
        component: () => import('@/views/admin/log/list'),
        name: 'admin-log-list',
        meta: { title: '行为日志列表', roles: ['admin'] }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
