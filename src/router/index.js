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
        component: () => import('@/views/MemberLoginPageView.vue'),
    },
    {
        path: '/find-id',
        name : 'find-id',
        component: () => import('@/views/MemberFindIdView.vue'),
    },
    {
        path: '/find-pw',
        name : 'find-pw',
        component: () => import('@/views/MemberFindPwView.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        const token = localStorage.getItem('token');
        if (token) {
            next();
        } else {
            next('/login');
        }
    } else {
        next();
    }
})

export default router;