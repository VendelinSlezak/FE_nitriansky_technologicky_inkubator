import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ProgramAView from '../views/ProgramAView.vue'
import ProgramBView from '../views/ProgramBView.vue'
import PartnersAndMentorsView from '../views/PartnersAndMentorsView.vue'
import NewsView from '../views/NewsView.vue'
import StudentView from '@/views/StudentView.vue'
import CreateTeamView from '@/views/CreateTeamView.vue'
import CreateChallengeView from '@/views/CreateChallengeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import RegisterStudentView from '../views/RegisterStudentView.vue'


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
            component: AboutView,
        },
        {
            path: '/program-a',
            name: 'program-a',
            component: ProgramAView,
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
        {

            path: '/student',
            name: 'student',
            component: StudentView,
            children: [{
                path: '/student/vytvorit-tim',
                name: 'vytvorit-tim',
                component: CreateTeamView
            },{
                path: '/student/vytvorit-vyzvu',
                name: 'vytvorit-vyzvu',
                component: CreateChallengeView

        }]
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView,
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterView,
        },
        {
            path: '/register-student',
            name: 'register-student',
            component: RegisterStudentView,
        },

    ],
})

export default router