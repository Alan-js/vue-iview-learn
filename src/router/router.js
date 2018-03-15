import Main from '@/views/main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: '登录'
    },
    component: resolve => { require(['@/views/login.vue'], resolve); }
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: resolve => { require(['@/views/error-page/404.vue'], resolve); }
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: resolve => { require(['@//views/error-page/403.vue'], resolve); }
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: resolve => { require(['@/views/error-page/500.vue'], resolve); }
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        { path: 'home', title: {i18n: 'home'}, name: 'home_index', component: resolve => { require(['@/views/home/home.vue'], resolve); } },
        { path: 'userUpdate/:userId', title: '修改用户', name: 'userUpdate', component: resolve => { require(['@/views/user/user-update/userUpdate.vue'], resolve); } },
        { path: 'departmentUpdate/:departmentId', title: '修改部门', name: 'departmentUpdate', component: resolve => { require(['@/views/department/department-update/departmentUpdate.vue'], resolve); } },
        { path: 'roleUpdate/:roleId', title: '修改角色', name: 'roleUpdate', component: resolve => { require(['@/views/role/role-update/roleUpdate.vue'], resolve); } }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/user',
        icon: 'person',
        name: 'user',
        title: '用户管理',
        component: Main,
        children: [
            {
                path: 'userInfo',
                icon: 'person',
                name: 'userInfo',
                title: '用户信息',
                component: resolve => { require(['@/views/user/user-info/userInfo.vue'], resolve); }
            },
            {
                path: 'userAdd',
                icon: 'plus',
                name: 'userAdd',
                title: '添加用户',
                component: resolve => { require(['@/views/user/user-add/userAdd.vue'], resolve); }
            },
            {
                path: 'roleInfo',
                icon: 'heart',
                name: 'roleInfo',
                title: '角色信息',
                component: resolve => { require(['@/views/role/role-info/roleInfo.vue'], resolve); }
            },
            {
                path: 'roleAdd',
                icon: 'plus',
                name: 'roleAdd',
                title: '添加角色',
                component: resolve => { require(['@/views/role/role-add/roleAdd.vue'], resolve); }
            }
        ]
    },
    {
        path: '/department',
        icon: 'pin',
        name: 'department',
        title: '部门管理',
        component: Main,
        children: [
            {
                path: 'departmentInfo',
                icon: 'pin',
                name: 'departmentInfo',
                title: '部门信息',
                component: resolve => { require(['@/views/department/department-info/departmentInfo.vue'], resolve); }
            },
            {
                path: 'departmentAdd',
                icon: 'plus',
                name: 'departmentAdd',
                title: '添加部门',
                component: resolve => { require(['@/views/department/department-add/departmentAdd.vue'], resolve); }
            }
        ]
    },
    {
        path: '/manageSet',
        icon: 'ios-paper',
        title: '系统设置',
        name: 'manageSet',
        component: Main,
        children: [
            { path: 'index', title: '系统设置', name: 'page_index', component: resolve => { require(['@/views/manage-set/manageSet.vue'], resolve); } }
        ]
    }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    ...appRouter,
    page500,
    page403,
    page404
];
