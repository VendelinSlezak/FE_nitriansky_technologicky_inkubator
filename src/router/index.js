import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ProgramAView from '../views/ProgramAView.vue'
import ProgramBView from '../views/ProgramBView.vue'
import PartnersAndMentorsView from '../views/PartnersAndMentorsView.vue'
import NewsView from '../views/NewsView.vue'
import ArticleView from '@/views/ArticleView.vue'
import StudentView from '@/views/StudentView.vue'
import CreateTeamView from '@/views/CreateTeamView.vue'
import CreateChallengeView from '@/views/CreateChallengeView.vue'
import LoginView from '../views/LoginView.vue'
import ResetPasswordView from '@/views/ResetPasswordView.vue'
import UpdateResettedPasswordView from '@/views/UpdateResettedPasswordView.vue'
import RegisterView from '../views/RegisterView.vue'
import RegisterStudentView from '../views/RegisterStudentView.vue'
import RegisterFirmView from '../views/RegisterFirmView.vue'
import RegisterSuccessView from '../views/RegisterSuccessView.vue'

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
            path: '/news',
            name: 'news',
            component: NewsView,
        },
        {
            path: '/news/:id',
            name: 'article',
            props: true,
            component: ArticleView,
        },
        {
            path: '/student-dashboard',
            name: 'student',
            component: StudentView,
        },
        {
            path: '/student-dashboard/vytvorit-tim',
            name: 'vytvorit-tim',
            component: CreateTeamView
        },
        {
            path: '/student-dashboard/vytvorit-vyzvu',
            name: 'vytvorit-vyzvu',
            component: CreateChallengeView
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView,
        },
        {    
            path: '/reset-password',
            name: 'reset-password',
            component: ResetPasswordView,
        },
        {
            path: '/update-resetted-password/:token',
            name: 'update-resetted-password',
            props: true,
            component: UpdateResettedPasswordView,
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
        {
            path: '/register-firm',
            name: 'register-firm',
            component: RegisterFirmView,
        },
        {
            path: '/register-success',
            name: 'register-success',
            component: RegisterSuccessView,
        },
    ],
})

export default router