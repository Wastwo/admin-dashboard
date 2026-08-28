import { ref } from "vue";
import { mockUsers } from "@/data/mockUsers";

const users = ref(mockUsers)

export function useUsers() {
    const currentUser = ref(null)
    const isLoading = ref(false)
    const errorMessage = ref(null)

    const fetchUserById = async (rawId) => {
        isLoading.value = true
        errorMessage.value = null
        currentUser.value = null

        try {
            await new Promise((resolve) => setTimeout(resolve, 600))

            if (rawId === null || rawId === undefined || rawId === '') {
                throw new Error('Invalid User ID provided.')
            }

            const id = Number(rawId)
            const result = users.value.find((user) => user.id === id)

            if (!result) {
                throw new Error(`User with ID #${rawId} was not found.`)
            }

            currentUser.value = result
            return result
        } catch (error) {
            errorMessage.value = error.message
        } finally {
            isLoading.value = false
        }
    }



    return {
        users,
        currentUser,
        isLoading,
        errorMessage,
        fetchUserById,
    }
}