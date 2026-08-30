import { readonly, ref } from "vue";

const isAuthenticated = ref(localStorage.getItem('isLoggedIn') === 'true')
const currentUsername = ref(localStorage.getItem('username') || null)
const loginTime = ref(localStorage.getItem('loginTime') || null)

export function useAuth() {
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

    const logout = () => {
        isAuthenticated.value = false
        currentUsername.value = null
        loginTime.value = null
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
        loginTime: readonly(loginTime),
        login,
        logout,
        checkAuth,
    }
}