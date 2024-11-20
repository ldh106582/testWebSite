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
        path: '/login-page',
        name : 'login-page',
        component: () => import('@/views/LoginPageView.vue'),
    },
    {
        path: '/find-id',
        name : 'find-id',
        component: () => import('@/views/FindIdView.vue'),
    },
    // {
    //     path: '/find-pw',
    //     name : 'find-pw',
    //     component: () => import('@/views/FindPwView.vue'),
    // },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

export default router;