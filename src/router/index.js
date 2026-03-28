import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/o-nas',
            name: 'o-nas',
            component: HomeView,
        },
        {
            path: '/program-a',
            name: 'program-a',
            component: HomeView,
        },
        {
            path: '/program-b',
            name: 'program-b',
            component: HomeView,
        },
        {
            path: '/partneri-a-mentori',
            name: 'partneri-a-mentori',
            component: HomeView,
        },
        {
            path: '/novinky',
            name: 'novinky',
            component: HomeView,
        },
    ],
})

export default router