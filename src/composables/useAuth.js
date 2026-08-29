import { readonly, ref } from "vue";

const isAuthenticated = ref(localStorage.getItem('isLoggedIn') === 'true')
const currentUsername = ref(localStorage.getItem('username') || null)

export function useAuth() {
    const login = async (username, password) => {
        await new Promise(resolve => setTimeout(resolve, 1000))

        if (username === 'admin' && password === 'password') {
            isAuthenticated.value = true
            currentUsername.value = username
            localStorage.setItem('isLoggedIn', 'true')
            localStorage.setItem('username', username)
            localStorage.setItem('loginTime', new Date().toISOString());

            return true
        }
        return false
    }

    const logout = () => {
        isAuthenticated.value = false
        currentUsername.value = null
        localStorage.removeItem('isLoggedIn')
        localStorage.removeItem('username')
        localStorage.removeItem('loginTime')
    }

    const checkAuth = () => {
        return isAuthenticated.value
    }

    return {
        isAuthenticated: readonly(isAuthenticated),
        currentUsername: readonly(currentUsername),
        login,
        logout,
        checkAuth,
    }
}