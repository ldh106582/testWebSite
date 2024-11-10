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
        component: () => import('@/views/MemberCreate.vue'),
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

export default router;