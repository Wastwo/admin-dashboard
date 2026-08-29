import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/LoginView.vue'),
            meta: {
                requiresAuth: false,
                title: 'Login',
            },
        },
        {
            path: '/admin',
            name: 'admin',
            component: () => import('@/components/layout/AdminLayout.vue'),
            meta: {
                requiresAuth: true,
            },
            children: [
                {
                    path: '',
                    name: 'dashboard',
                    component: () => import('@/views/DashboardView.vue'),
                    meta: { requiresAuth: true, title: 'Overview' },
                },
                {
                    path: 'users',
                    name: 'users',
                    component: () => import('@/views/UserListView.vue'),
                    meta: { requiresAuth: true, title: 'User Management' },
                },
                {
                    path: 'users/:id',
                    name: 'user-detail',
                    component: () => import('@/views/UserDetailView.vue'),
                    meta: { requiresAuth: true, title: 'User Details' },
                    props: true,
                }
            ]
        },
        {
            path: '/',
            redirect: '/admin'
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: () => import('@/views/NotFoundView.vue'),
            meta: { title: '404 Not Found' }
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
