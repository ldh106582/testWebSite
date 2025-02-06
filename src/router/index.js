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
        path: '/exam-Description',
        name : 'exam-Description',
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