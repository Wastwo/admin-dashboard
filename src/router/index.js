/**
 * @module router
 * @description Application router configuration using Vue Router 4.
 * Defines route hierarchy, lazy-loaded components, navigation guards
 * for authentication, and post-navigation side-effects.
 */
import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

/**
 * Router instance with HTML5 history mode.
 *
 * Route hierarchy:
 * - `/login` — public login page
 * - `/admin` — authenticated layout wrapper with nested child routes
 *   - `/admin` (default) — dashboard overview
 *   - `/admin/users` — user management list
 *   - `/admin/users/:id` — individual user detail view
 * - `/` — redirect to `/admin`
 * - `/*` — 404 catch-all
 *
 * All route components are lazy-loaded via dynamic `import()` to minimise
 * the initial bundle size; each chunk is fetched only when its route is visited.
 */
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
            // WHY: Nested children inherit the AdminLayout wrapper so the
            // sidebar and header persist across all authenticated pages
            // without each view having to import them individually.
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
                    // WHY: `requiresAuth: true` is repeated on each child
                    // (rather than only on the parent) so that the beforeEach
                    // guard can evaluate protection per-route without walking
                    // the matched route chain.
                    meta: { requiresAuth: true, title: 'User Details' },
                }
            ]
        },
        {
            // WHY: Root path redirects instead of rendering content so that
            // bookmarks and deep-links always land on a meaningful page.
            path: '/',
            redirect: '/admin'
        },
        {
            // WHY: Vue Router 4's catch-all syntax (`:pathMatch(.*)*`) replaces
            // the legacy `*` wildcard and must be registered last so that all
            // defined routes are evaluated first.
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: () => import('@/views/NotFoundView.vue'),
            meta: { title: '404 Not Found' }
        }
    ],
})

/**
 * Global navigation guard — runs before every route transition.
 *
 * Enforces two rules:
 * 1. Protected routes (`meta.requiresAuth`) redirect unauthenticated users
 *    to `/login`, preserving the original destination in a `redirect` query
 *    param so it can be restored after successful login.
 * 2. Already-authenticated users visiting `/login` are redirected to `/admin`
 *    to prevent redundant login screens.
 *
 * @param {import('vue-router').RouteLocationNormalized} to - The target route.
 * @returns {true|{path: string, query?: Object}} Navigation resolution.
 */
router.beforeEach((to) => {
    const { checkAuth } = useAuth()
    const isLoggedIn = checkAuth()

    if (to.meta.requiresAuth && !isLoggedIn) {
        return {
            path: '/login',
            query: { redirect: to.fullPath }
        }
    }

    if (to.name === 'login' && isLoggedIn) {
        return {
            path: '/admin'
        }
    }

    return true;
})

/**
 * Global post-navigation hook — runs after every successful route transition.
 *
 * Sets the browser tab title from the route's `meta.title` and scrolls
 * to the top so that users always start at the beginning of the new page.
 *
 * @param {import('vue-router').RouteLocationNormalized} to - The resolved route.
 * @returns {void}
 */
router.afterEach((to) => {
    document.title = `Admin Dashboard - ${to.meta.title || to.name}`

    window.scrollTo(0, 0)
})

export default router
