import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProgramBView from '@/views/ProgramBView.vue'
import PartnersAndMentorsView from '@/views/PartnersAndMentorsView.vue'
import NewsView from '@/views/NewsView.vue'

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
            name: 'about-us',
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
            component: ProgramBView,
        },
        {
            path: '/partneri-a-mentori',
            name: 'partners-and-mentors',
            component: PartnersAndMentorsView,
        },
        {
            path: '/novinky',
            name: 'news',
            component: NewsView,
        },
    ],
})

export default router