import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/publicWeb/HomeView.vue'
import AboutView from '../views/publicWeb/AboutView.vue'
import ProgramAView from '../views/publicWeb/ProgramAView.vue'
import ProgramBView from '../views/publicWeb/ProgramBView.vue'
import PartnersAndMentorsView from '../views/publicWeb/PartnersAndMentorsView.vue'
import NewsView from '../views/publicWeb/NewsView.vue'
import ArticleView from '../views/publicWeb/ArticleView.vue'

import LoginView from '../views/login/LoginView.vue'
import ResetPasswordView from '../views/login/ResetPasswordView.vue'
import UpdateResettedPasswordView from '../views/login/UpdateResettedPasswordView.vue'
import RegisterView from '../views/registration/RegisterView.vue'
import RegisterStudentView from '../views/registration/RegisterStudentView.vue'
import RegisterFirmView from '../views/registration/RegisterFirmView.vue'
import RegisterSuccessView from '../views/registration/RegisterSuccessView.vue'

import StudentDashboardView from '../views/studentDashboard/StudentDashboardView.vue'
import CreateTeamView from '../views/studentDashboard/CreateTeamView.vue'
import CreateChallengeView from '../views/studentDashboard/CreateChallengeView.vue'
import StudentProfileView from '@/views/studentDashboard/StudentProfileView.vue'
import StudentTeamleaderDashboardView from '@/views/studentDashboard/StudentTeamleaderDashboardView.vue'

import MentorDashboardView from '../views/mentorDashboard/MentorDashboardView.vue'
import MentorProjectView from '@/views/mentorDashboard/MentorProjectView.vue'

import CommitteeMemberDashboardView from '@/views/committeeMemberDashboard/CommitteeMemberDashboardView.vue'
import CommitteeMemberProjectView from '@/views/committeeMemberDashboard/CommitteeMemberProjectView.vue'

import EditorDashboardView from '@/views/editorDashboard/EditorDashboardView.vue'
import EditorEditNewsView from '@/views/editorDashboard/EditorEditNewsView.vue'
import EditorCreateArticleView from '@/views/editorDashboard/EditorCreateArticleView.vue'
import EditorEditArticleView from '@/views/editorDashboard/EditorEditArticleView.vue'
import EditorEditLogosView from '@/views/editorDashboard/EditorEditLogosView.vue'
import EditorEditFAQView from '@/views/editorDashboard/EditorEditFAQView.vue'

import FirmDashboardView from '@/views/firmDashboard/FirmDashboardView.vue'
import FirmCreateChallengeView from '@/views/firmDashboard/FirmCreateChallengeView.vue'
import FirmChallengeView from '@/views/firmDashboard/FirmChallengeView.vue'

import AdminDashboardView from '@/views/adminDashboard/AdminDashboardView.vue'
import AdminTeamManagementView from '@/views/adminDashboard/AdminTeamManagementView.vue'
import AdminManageAccountsView from '@/views/adminDashboard/AdminManageAccountsView.vue'
import AdminManageTeamsView from '@/views/adminDashboard/AdminManageTeamsView.vue'
import AdminManageCallsView from '@/views/adminDashboard/AdminManageCallsView.vue'
import AdminCreateAccountView from '@/views/adminDashboard/AdminCreateAccountView.vue'
import AdminEditAccountView from '@/views/adminDashboard/AdminEditAccountView.vue'
import AdminCreateChallengeView from '@/views/adminDashboard/AdminCreateChallengeView.vue'
import AdminEditChallengeView from '@/views/adminDashboard/AdminEditChallengeView.vue'
import AdminCreateTeamView from '@/views/adminDashboard/AdminCreateTeamView.vue'
import AdminEditTeamView from '@/views/adminDashboard/AdminEditTeamView.vue'

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
            name: 'student-dashboard',
            component: StudentDashboardView,
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
            path: '/student-dashboard/profile',
            name: 'student-profile',
            component: StudentProfileView
        },
        {
            path: '/student-dashboard/teamleader-dashboard',
            name: 'student-teamleader-dashboard',
            component: StudentTeamleaderDashboardView
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

        {
            path: '/mentor-dashboard',
            name: 'mentor-dashboard',
            component: MentorDashboardView,
        },
        {
            path: '/mentor-dashboard/project/:id',
            name: 'mentor-project',
            props: true,
            component: MentorProjectView,
        },

        {
            path: '/committee-member-dashboard',
            name: 'committee-member-dashboard',
            component: CommitteeMemberDashboardView,
        },
        {
            path: '/committee-member-dashboard/project/:id',
            name: 'committee-member-project',
            props: true,
            component: CommitteeMemberProjectView,
        },
        {
            path: '/editor-dashboard',
            name: 'editor-dashboard',
            component: EditorDashboardView,
            children: [
                {
                    path: '/editor-dashboard/edit-news',
                    name: 'editor-edit-news',
                    component: EditorEditNewsView,
                },
                {
                    path: '/editor-dashboard/create-article',
                    name: 'editor-create-article',
                    component: EditorCreateArticleView,
                },
                {
                    path: '/editor-dashboard/edit-article/:id',
                    name: 'editor-edit-article',
                    props: true,
                    component: EditorEditArticleView,
                },
                {
                    path: '/editor-dashboard/edit-logos',
                    name: 'editor-edit-logos',
                    component: EditorEditLogosView,
                },
                {
                    path: '/editor-dashboard/edit-faq',
                    name: 'editor-edit-faq',
                    component: EditorEditFAQView,
                },
            ]
        },
        {
            path: '/admin-dashboard',
            name: 'admin-dashboard',
            component: AdminDashboardView,
            children: [
                {
                    path: '/admin-dashboard/edit-news',
                    name: 'admin-edit-news',
                    component: EditorEditNewsView,
                },
                {
                    path: '/admin-dashboard/create-article',
                    name: 'admin-create-article',
                    component: EditorCreateArticleView,
                },
                {
                    path: '/admin-dashboard/edit-article/:id',
                    name: 'admin-edit-article',
                    props: true,
                    component: EditorEditArticleView,
                },
                {
                    path: '/admin-dashboard/edit-logos',
                    name: 'admin-edit-logos',
                    component: EditorEditLogosView,
                },
                {
                    path: '/admin-dashboard/edit-faq',
                    name: 'admin-edit-faq',
                    component: EditorEditFAQView,
                },
                {
                    path: '/admin-dashboard/team-management',
                    name: 'admin-team-management',
                    component: AdminTeamManagementView
                },
                {
                    path: '/admin-dashboard/manage-accounts',
                    name: 'admin-manage-accounts',
                    component: AdminManageAccountsView,

                },
                {
                    path: '/admin-dashboard/manage-teams',
                    name: 'admin-manage-teams',
                    component: AdminManageTeamsView
                },
                {
                    path: '/admin-dashboard/manage-calls',
                    name: 'admin-manage-calls',
                    component: AdminManageCallsView
                },
                {
                    path: '/admin-dashboard/create-account',
                    name: 'admin-create-account',
                    component: AdminCreateAccountView
                },
                {
                    path: '/admin-dashboard/edit-account/:id',
                    name: 'admin-edit-account',
                    props: true,
                    component: AdminEditAccountView
                },
                {
                    path: '/admin-dashboard/create-challenge',
                    name: 'admin-create-challenge',
                    component: AdminCreateChallengeView
                },
                {
                    path: '/admin-dashboard/edit-challenge/:id',
                    name: 'admin-edit-challenge',
                    props: true,
                    component: AdminEditChallengeView
                },
                {
                    path: '/admin-dashboard/create-team',
                    name: 'admin-create-team',
                    component: AdminCreateTeamView
                },
                {
                    path: '/admin-dashboard/edit-team/:id',
                    name: 'admin-edit-team',
                    props: true,
                    component: AdminEditTeamView
                },
            ]
        },
        {
            path: '/firm-dashboard',
            name: 'firm-dashboard',
            component: FirmDashboardView,
        },
        {
            path: '/firm-dashboard/create-challenge/:id',
            props: true,
            name: 'firm-create-challenge',
            component: FirmCreateChallengeView,
        },
        {
            path: '/firm-dashboard/challenge/:id',
            props: true,
            name: 'firm-challenge',
            component: FirmChallengeView,
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        return { top: 0, behavior: 'smooth' }
    },
})

export default router