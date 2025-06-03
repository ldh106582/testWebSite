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
        component: () => import('@/views/MemberLoginView.vue'),
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
        path: '/exam-create',
        name: 'exam-create',
        component: () => import('@/views/ExamCreatView.vue'),
        meta: {
            isAisAuthenticated: true
        }
    },
    {
        path: '/exam-update',
        name: 'exam-update',
        component: () => import('@/views/ExamUpdateView.vue'),
        meta: {
            isAisAuthenticated: true
        }
    },
    {
        path: '/problem-create',
        name: 'problem-create',
        component: () => import('@/views/ProblemCreateView.vue'),
        meta: {
            isAisAuthenticated: true
        }
    },
    {
        path: '/problem-list',
        name: 'problem-list',
        component: () => import('@/views/ProblemListView.vue'),
        meta: {
            isAisAuthenticated: true
        }
    },
    {
        path: '/problem-process',
        name: 'problem-process',
        component: () => import('@/views/ProblemProcessView.vue'),
        meta: {
            isAisAuthenticated: true
        }
    },
    {
        path: '/exam-start',
        name: 'exam-start',
        component: () => import('../../nuxt-app/pages/ExamStartView.vue'),
        meta: {
            isAisAuthenticated: false
        }
    },
    {
        path: '/exam-end',
        name: 'exam-end',
        component: () => import('../../nuxt-app/pages/ExamEndView.vue'),
        meta: {
            isAisAuthenticated: false
        }
    },
    {
        path: '/exam-Description',
        name : 'exam-Description',
        component: () => import('../../nuxt-app/pages/ExamDescriptionView.vue'),
        meta: {
            isAisAuthenticated: false,
        },
    },
    {
        path: '/practice',
        name: 'practice',
        component: () => import('@/views/PracticeView.vue'),
        meta: {
            isAisAuthenticated: false
        }
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

export default router;