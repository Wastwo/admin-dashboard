import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import DashboardView from '@/views/DashboardView.vue'
import UserListView from '@/views/UserListView.vue'
import UserDetailView from '@/views/UserDetailView.vue'
import { useAuth } from '@/composables/useAuth'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: LoginView,
            meta: {
                requiresAuth: false,
                title: 'Login',
            },
        },
        {
            path: '/admin',
            name: 'admin',
            component: AdminLayout,
            meta: {
                requiresAuth: true,
            },
            children: [
                {
                    path: '',
                    name: 'dashboard',
                    component: DashboardView,
                    meta: { requiresAuth: true, title: 'Overview' },
                },
                {
                    path: 'users',
                    name: 'users',
                    component: UserListView,
                    meta: { requiresAuth: true, title: 'User Management' },
                },
                {
                    path: 'users/:id',
                    name: 'user-detail',
                    component: UserDetailView,
                    meta: { requiresAuth: true, title: 'User Details' },
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

router.beforeEach((to) => {
    const { isAuthenticated } = useAuth()

    if (to.meta.requiresAuth && !isAuthenticated.value) {
        return {
            path: '/login',
            query: { redirect: to.fullPath }
        }
    }

    if (to.name === 'login' && isAuthenticated.value) {
        return {
            path: '/admin'
        }
    }

    return true;
})

router.afterEach((to) => {
    document.title = `Admin Dashboard - ${to.meta.title || to.name}`

    window.scrollTo(0, 0)
})

export default router
