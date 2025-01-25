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
        path: '/examType-create',
        name: 'examType-create',
        component: () => import('@/views/ExamCreatView.vue'),
        meta: {
            isAisAuthenticated: true
        }
    },
    {
        path: '/examType-update',
        name: 'examType-update',
        component: () => import('@/views/ExamUpdateView.vue'),
        meta: {
            isAisAuthenticated: true
        }
    },
    {
        path: '/examType-Description',
        name : 'examTypeDescription',
        component: () => import('../../nuxt-app/pages/ExamTypeDescriptionView.vue'),
        meta: {
            isAisAuthenticated: false,
        },
    },
    {
        path: '/question-create',
        name: 'question-create',
        component: () => import('@/views/QuestionCreateView.vue'),
        meta: {
            isAisAuthenticated: true
        }
    },
    {
        path: '/question-list',
        name: 'question-list',
        component: () => import('@/views/QuestionListView.vue'),
        meta: {
            isAisAuthenticated: true
        }
    },
    {
        path: '/question-process',
        name: 'question-process',
        component: () => import('@/views/QuestionProcessView.vue'),
        meta: {
            isAisAuthenticated: true
        }
    },
    {
        path: '/information-test',
        name: 'information-test',
        component: () => import('../../nuxt-app/pages/informationTestView.vue'),
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