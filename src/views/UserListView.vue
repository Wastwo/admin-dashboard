<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import UserCard from '@/components/ui/UserCard.vue';
import { useUsers } from '@/composables/useUsers.js';

const searchQuery = ref('');
const router = useRouter();
const { users } = useUsers();

const filteredUsers = computed(() => {
    let result = users.value;

    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        result = result.filter(user => user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query));
    }
    return result;
});

const handleSelectUser = userId => {
    router.push({ name: 'user-detail', params: { id: userId } });
};
</script>

<template>
    <div class="space-y-6">
        <div class="flex flex-col justify-center items-start gap-1">
            <h1 class="text-2xl font-display font-semibold text-text-primary">Users</h1>
            <p class="text-sm font-sans text-text-secondary">Manage user accounts and permissions</p>
        </div>

        <div class="flex items-center rounded-xl border border-gray-200/60 bg-base-100 px-5 py-4">
            <div class="relative flex-1">
                <svg
                    class="pointer-events-none z-10 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                </svg>
                <input
                    v-model.trim="searchQuery"
                    type="text"
                    placeholder="Search by name or email..."
                    class="input input-md w-full rounded-xl border-gray-200/60 bg-gray-50 pl-9 text-sm font-sans outline-none"
                />
            </div>
        </div>

        <div v-if="filteredUsers.length > 0" class="space-y-3">
            <UserCard v-for="user in filteredUsers" :key="user.id" :user="user" :show-status="false" :show-email="true" @selected="handleSelectUser" class="rounded-xl border border-gray-200/60" />
        </div>

        <div v-else class="flex flex-col gap-3 items-center justify-center bg-base-100 p-12 rounded-xl border border-gray-200/60">
            <svg
                class="text-text-secondary/40 w-8 h-8"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <p class="text-sm font-sans text-text-secondary">No users found.</p>
        </div>
    </div>
</template>
