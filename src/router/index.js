import { createRouter, createWebHistory  } from "vue-router";

const routes = [
    {
        path: '/',
        name : 'home',
        component: () => import('@/views/home.vue'),
    },
    {
        path: '/member-create',
        name : 'member-create',
        component: () => import('@/views/MemberCreateView.vue'),
    },
    {
        path: '/member-login',
        name : 'member-login',
        component: () => import('@/views/MemberLoginPageView.vue'),
    },
    {
        path: '/member-findpw',
        name : 'member-findpw',
        component: () => import('@/views/MemberFindPwView.vue'),
    },
    {
        path: '/member-changepw',
        name : 'member-changepw',
        component: () => import('@/views/MemberChangePwView.vue'),
        meta: {
            isAisAuthenticated: true
        }
    },
    {
        path: '/examType-create',
        name: 'examType-create',
        component: () => import('@/views/ExamTypeCreatView.vue'),
        meta: {
            isAisAuthenticated: true
        }
    },
    {
        path: '/exam-create',
        name: 'exam-create',
        component: () => import('@/views/ExamCreateView.vue'),
        meta: {
            isAisAuthenticated: true
        }
    },
    {
        path: '/exam-update',
        name: 'exam-update',
        component: () => import('@/views/ExamUpdateeView.vue'),
        meta: {
            isAisAuthenticated: true
        }
    },
    {
        path: '/information',
        name : 'information',
        component: () => import('../../nuxt-app/pages/information.vue'),
        meta: {
            isAisAuthenticated: false,
        },
    },
    {
        path: '/sqld',
        name : 'sqld',
        component: () => import('../../nuxt-app/pages/sqld.vue'),
        meta: {
            isAisAuthenticated: false
        }
    },
    {
        path: '/network',
        name : 'network',
        component: () => import('../../nuxt-app/pages/network.vue'),
        meta: {
            isAisAuthenticated: false
        }
    },
    {
        path: '/linux',
        name : 'linux',
        component: () => import('../../nuxt-app/pages/linux.vue'),
        meta: {
            isAisAuthenticated: false
        }
    },
    {
        path: '/information-test',
        name: 'information-test',
        component: () => import('../../nuxt-app/pages/informationTestView.vue'),
        meta: {
            isAisAuthenticated: false
        }
    }
    
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

export default router;