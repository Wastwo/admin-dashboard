<script setup>
import { computed, ref } from 'vue';
import UserCard from '@/components/ui/UserCard.vue';
import { useUsers } from '@/composables/useUsers.js';
import { useRouter } from 'vue-router';

const router = useRouter();
const { users } = useUsers();

const topUsers = computed(() => {
    return users.value.slice(0, 4);
});

const handleSelectUser = userId => {
    router.push({ name: 'user-detail', params: { id: userId } });
};

const stats = ref([
    { label: 'Total Users', value: '2,847', change: '+12.5%', positive: true, color: 'bg-blue-50 text-blue-600', icon: 'users' },
    { label: 'Active Today', value: '1,204', change: '+8.2%', positive: true, color: 'bg-emerald-50 text-emerald-600', icon: 'activity' },
    { label: 'New This Week', value: '184', change: '+24.3%', positive: true, color: 'bg-violet-50 text-violet-600', icon: 'user-plus' },
    { label: 'Inactive Users', value: '312', change: '-3.1%', positive: false, color: 'bg-amber-50 text-amber-600', icon: 'user-off' },
]);

const recentActivity = ref([
    { user: 'Sarah Chen', action: 'created account', time: '2m ago', type: 'created' },
    { user: 'Mike Peters', action: 'updated profile', time: '15m ago', type: 'edited' },
    { user: 'Lisa Wong', action: 'logged in', time: '1h ago', type: 'login' },
    { user: 'James Miller', action: 'changed password', time: '2h ago', type: 'lock' },
    { user: 'Anna Davis', action: 'created account', time: '3h ago', type: 'created' },
    { user: 'Tom Wilson', action: 'updated preferences', time: '5h ago', type: 'settings' },
]);

const activityIcons = {
    created: `<svg xmlns="http://www.w3.org/2000/svg" class="text-text-secondary w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-5"/></svg>`,
    edited: `<svg xmlns="http://www.w3.org/2000/svg" class="text-text-secondary w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>`,
    login: `<svg xmlns="http://www.w3.org/2000/svg" class="text-text-secondary w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" x2="3" y1="12" y2="12"/></svg>`,
    lock: `<svg xmlns="http://www.w3.org/2000/svg" class="text-text-secondary w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx="12" cy="16" r="1"/></svg>`,
    settings: `<svg xmlns="http://www.w3.org/2000/svg" class="text-text-secondary w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`,
};
</script>

<template>
    <div class="space-y-6">
        <div class="flex flex-col justify-center items-start gap-1">
            <h1 class="text-2xl font-display font-semibold text-text-primary">Dashboard</h1>
            <p class="text-sm font-sans text-text-secondary">Overview of your admin panel</p>
        </div>

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div v-for="stat in stats" :key="stat.label" class="rounded-xl border border-gray-200/60 bg-base-100 p-5">
                <div class="flex flex-col items-start justify-between">
                    <p class="text-xs font-medium font-sans uppercase tracking-wide text-text-secondary">{{ stat.label }}</p>
                    <p class="mt-2 text-2xl font-display font-semibold text-text-primary">{{ stat.value }}</p>
                    <p class="mt-1 flex items-center justify-center gap-1 text-xs font-sans" :class="stat.positive ? 'text-emerald-600' : 'text-red-600'">
                        <svg
                            v-if="stat.positive"
                            class="w-3 h-3"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                            <polyline points="16 7 22 7 22 13" />
                        </svg>
                        <svg
                            v-else
                            class="w-3 h-3"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
                            <polyline points="16 17 22 17 22 11" />
                        </svg>
                        {{ stat.change }} from last month
                    </p>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div class="flex flex-col rounded-xl border border-gray-200/60 bg-base-100">
                <div class="flex items-center justify-between px-5 py-4 border-b border-gray-200/60">
                    <div class="flex items-center gap-2">
                        <svg
                            class="text-text-secondary w-4 h-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                        <h2 class="text-base font-display font-semibold text-text-primary">Top Users</h2>
                    </div>
                    <RouterLink class="shrink-0 text-xs font-sans text-text-secondary hover:text-text-primary" :to="{ name: 'users' }">View all</RouterLink>
                </div>
                <UserCard
                    v-for="user in topUsers"
                    :key="user.name"
                    :user="user"
                    :show-status="true"
                    :show-email="false"
                    @selected="handleSelectUser"
                    class="border-b border-gray-200/60 last:border-b-0"
                />
            </div>

            <div class="flex flex-col rounded-xl border border-gray-200/60 bg-base-100 lg:col-span-2">
                <div class="flex items-center gap-2 border-b border-gray-200/60 px-5 py-4">
                    <svg
                        class="text-text-secondary w-4 h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <h2 class="text-base font-display font-semibold text-text-primary">Recent Activity</h2>
                </div>
                <div class="divide-y divide-gray-200/60">
                    <div v-for="activity in recentActivity" :key="activity.user" class="flex items-center justify-between px-5 py-3.5">
                        <div class="flex justify-start items-center gap-4">
                            <span class="font-medium text-sm font-sans text-text-primary">{{ activity.user }}</span>
                            <div class="flex justify-center items-center gap-1.5">
                                <div class="flex shrink-0 items-center justify-center rounded-lg" v-html="activityIcons[activity.type]"></div>
                                <span class="text-text-secondary text-[10px] font-sans"> {{ activity.action }}</span>
                            </div>
                        </div>
                        <span class="shrink-0 text-xs font-sans text-text-secondary">{{ activity.time }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
