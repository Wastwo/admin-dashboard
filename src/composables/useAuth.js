/**
 * @module useAuth
 * @description Singleton authentication composable providing login, logout,
 * and session-persistence via localStorage. Module-level refs are shared
 * across all consumers so that auth state stays synchronised globally.
 */
import { readonly, ref } from "vue";

/** @type {import('vue').Ref<boolean>} Whether a user session is currently active. */
const isAuthenticated = ref(localStorage.getItem('isLoggedIn') === 'true')
/** @type {import('vue').Ref<string|null>} The active user's display name, or null when logged out. */
const currentUsername = ref(localStorage.getItem('username') || null)
/** @type {import('vue').Ref<string|null>} ISO-8601 timestamp of when the current session started. */
const loginTime = ref(localStorage.getItem('loginTime') || null)

/**
 * Returns reactive authentication state and actions.
 *
 * State refs are exposed as `readonly` to prevent accidental mutation
 * outside of `login` / `logout`.
 *
 * @returns {{
 *   isAuthenticated: Readonly<import('vue').Ref<boolean>>,
 *   currentUsername: Readonly<import('vue').Ref<string|null>>,
 *   loginTime: Readonly<import('vue').Ref<string|null>>,
 *   login: (username: string, password: string) => Promise<boolean>,
 *   logout: () => void,
 *   checkAuth: () => boolean,
 * }}
 *
 * @example
 * const { isAuthenticated, login, logout } = useAuth()
 * await login('admin', 'password')
 * console.log(isAuthenticated.value) // true
 */
export function useAuth() {
    /**
     * Authenticates a user against hardcoded demo credentials.
     *
     * Simulates a 1-second network delay, then persists the session
     * to both reactive state and localStorage so it survives page reloads.
     *
     * @param {string} username - The username to authenticate.
     * @param {string} password - The plaintext password to validate.
     * @returns {Promise<boolean>} `true` if credentials are valid, `false` otherwise.
     *
     * @example
     * const success = await login('admin', 'password')
     * if (!success) console.log('Invalid credentials')
     */
    const login = async (username, password) => {
        await new Promise(resolve => setTimeout(resolve, 1000))

        if (username === 'admin' && password === 'password') {
            isAuthenticated.value = true
            currentUsername.value = username
            loginTime.value = new Date().toISOString()
            localStorage.setItem('isLoggedIn', 'true')
            localStorage.setItem('username', username)
            localStorage.setItem('loginTime', loginTime.value)

            return true
        }
        return false
    }

    /**
     * Destroys the current session by clearing reactive state and localStorage.
     *
     * @returns {void}
     */
    const logout = () => {
        isAuthenticated.value = false
        currentUsername.value = null
        loginTime.value = null
        localStorage.removeItem('isLoggedIn')
        localStorage.removeItem('username')
        localStorage.removeItem('loginTime')
    }

    /**
     * Checks whether a user is currently authenticated.
     *
     * Used by the router `beforeEach` guard to decide whether to allow
     * navigation to protected routes.
     *
     * @returns {boolean} `true` if a valid session exists.
     */
    const checkAuth = () => {
        return isAuthenticated.value
    }

    return {
        /** @type {Readonly<import('vue').Ref<boolean>>} */
        isAuthenticated: readonly(isAuthenticated),
        /** @type {Readonly<import('vue').Ref<string|null>>} */
        currentUsername: readonly(currentUsername),
        /** @type {Readonly<import('vue').Ref<string|null>>} */
        loginTime: readonly(loginTime),
        login,
        logout,
        checkAuth,
    }
}