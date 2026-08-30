/**
 * @module useUsers
 * @description Composable for accessing the shared user list and fetching
 * individual user details. Backed by mock data with simulated async latency.
 */
import { ref } from "vue";
import { mockUsers } from "@/data/mockUsers";

/** @type {import('vue').Ref<Array<Object>>} Shared reactive list of all mock users. */
const users = ref(mockUsers)

/**
 * Provides reactive access to the user collection and per-user fetch logic.
 *
 * Each call returns the same shared `users` ref so that mutations are visible
 * across all components consuming this composable.
 *
 * @returns {{
 *   users: import('vue').Ref<Array<Object>>,
 *   currentUser: import('vue').Ref<Object|null>,
 *   isLoading: import('vue').Ref<boolean>,
 *   errorMessage: import('vue').Ref<string|null>,
 *   fetchUserById: (rawId: string|number) => Promise<Object|null>,
 * }}
 *
 * @example
 * const { users, fetchUserById, isLoading } = useUsers()
 * await fetchUserById(1)
 */
export function useUsers() {
    /** @type {import('vue').Ref<Object|null>} The most recently fetched user, or null. */
    const currentUser = ref(null)
    /** @type {import('vue').Ref<boolean>} Whether an async fetch is in progress. */
    const isLoading = ref(false)
    /** @type {import('vue').Ref<string|null>} Error message from the last failed fetch. */
    const errorMessage = ref(null)

    /**
     * Fetches a single user by ID with simulated 600 ms latency.
     *
     * Sets `isLoading` and `errorMessage` reactively so consumers can
     * drive UI loading / error states without additional wiring.
     *
     * @param {string|number|null|undefined} rawId - The user ID (string or number).
     * @returns {Promise<Object|null>} The matching user object, or `null` on failure.
     * @throws {Error} If `rawId` is null, undefined, or empty string.
     * @throws {Error} If no user exists with the given ID.
     *
     * @example
     * const user = await fetchUserById('2')
     * console.log(user.name) // "Mike Peters"
     */
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