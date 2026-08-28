import { readonly, ref } from "vue";

const isAuthenticated = ref(localStorage.getItem('isLoggedIn') === 'true')
const currentUsername = ref(localStorage.getItem('username') || null)

export function useAuth() {
    const login = (username, password) => {
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

    const logout = (() => {
        isAuthenticated.value = false
        currentUsername.value = null
        localStorage.removeItem('isLoggedIn')
        localStorage.removeItem('username')
        localStorage.removeItem('loginTime')
    })

    const cekAuth = (() => {
        return isAuthenticated.value
    })

    return {
        isAuthenticated: readonly(isAuthenticated),
        currentUsername,
        login,
        logout,
        cekAuth,
    }
}