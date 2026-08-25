import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import DashboardView from '@/views/DashboardView.vue'
import UserListView from '@/views/UserListView.vue'
import UserDetailView from '@/views/UserDetailView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: LoginView,
            meta: { requiresAuth: false },
        },
        {
            path: '/admin',
            name: 'admin',
            component: AdminLayout,
            meta: { requiresAuth: true },
            children: [
                {
                    path: '',
                    name: 'dashboard',
                    component: DashboardView,
                },
                {
                    path: 'users',
                    name: 'users',
                    component: UserListView,
                },
                {
                    path: 'users/:id',
                    name: 'user-detail',
                    component: UserDetailView,
                    props: true,
                }
            ]
        },
        {
            path: '/',
            redirect: '/admin'
        }
    ],
})

export default router
