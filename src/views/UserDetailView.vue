<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUsers } from '@/composables/useUsers';

const route = useRoute();
const router = useRouter();
const { currentUser: user, fetchUserById, isLoading, errorMessage } = useUsers();
const activeTab = ref('overview');

const userId = computed(() => route.params.id);

const icon = d => {
    return `<svg class="size-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
};

const tabs = [
    {
        id: 'overview',
        label: 'Overview',
        icon: icon(
            '<rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>'
        ),
    },
    {
        id: 'activity',
        label: 'Activity',
        icon: icon('<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'),
    },
    { id: 'sessions', label: 'Sessions', icon: icon('<rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/>') },
];

const stats = computed(() => user.value?.stats || []);
const accountInfo = computed(() => user.value?.accountInfo || []);
const permissions = computed(() => user.value?.permissions || []);
const activityLog = computed(() => user.value?.activityLog || []);
const sessions = computed(() => user.value?.sessions || []);
const isActive = computed(() => user.value?.status === 'active');
const profileFields = computed(() => {
    if (!user.value) return [];
    return [
        { label: 'Email', value: user.value.email },
        { label: 'Username', value: `@${user.value.username}` },
        { label: 'Location', value: `${user.value.location} · ${user.value.timezone}` },
    ];
});

const activityIcons = {
    login: icon('<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" x2="3" y1="12" y2="12"/>'),
    lock: icon('<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx="12" cy="16" r="1"/>'),
    check: icon('<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>'),
    plus: icon('<line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/>'),
};

const deviceIcons = {
    desktop: icon('<rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/>'),
    mobile: icon('<rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>'),
};

onMounted(() => {
    fetchUserById(userId.value);
});

watch(userId, newId => {
    fetchUserById(newId);
});
</script>

<template>
    <div v-if="isLoading" class="space-y-6 animate-pulse">
        <nav class="flex items-center gap-2 text-sm">
            <div class="h-5 w-12 rounded bg-admin-line/70"></div>
            <div class="size-3 rounded-sm bg-admin-line/70"></div>
            <div class="h-5 w-32 rounded bg-admin-line/70"></div>
        </nav>

        <div class="rounded-xl border border-admin-line bg-base-100 p-5">
            <div class="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div class="flex gap-5">
                    <div class="relative h-fit shrink-0">
                        <div class="size-16 rounded-xl bg-admin-line/70 sm:size-20"></div>
                        <span class="absolute inset-e-0 bottom-0 size-3.5 translate-x-1/3 translate-y-1/3 rounded-full border-2 border-base-100 bg-admin-line/80 sm:size-4"></span>
                    </div>
                    <div class="flex flex-col gap-1.5 justify-center items-start pt-0.5">
                        <div class="h-3 w-20 rounded bg-admin-line/70"></div>
                        <div class="flex flex-col justify-center gap-1 mt-1">
                            <div class="h-7 w-40 rounded bg-admin-line/70 sm:h-8 sm:w-56"></div>
                            <div class="h-4 w-32 rounded bg-admin-line/70 sm:h-5 sm:w-48"></div>
                        </div>
                    </div>
                </div>

                <div class="flex shrink-0 items-center gap-3 text-sm sm:flex-col sm:items-end sm:gap-1.5">
                    <span class="inline-flex items-center gap-1.5">
                        <span class="size-1.5 rounded-full bg-admin-line/70"></span>
                        <div class="h-5 w-14 rounded bg-admin-line/70"></div>
                    </span>
                    <div class="h-4 w-28 rounded bg-admin-line/70"></div>
                </div>
            </div>

            <div class="mt-6 flex snap-x snap-mandatory divide-x divide-admin-line overflow-x-auto rounded-xl border border-admin-line scrollbar-none">
                <div v-for="i in 4" :key="i" class="min-w-28 shrink-0 snap-start px-5 py-4 text-center sm:min-w-0 sm:flex-1 sm:text-left">
                    <div class="h-7 w-12 rounded bg-admin-line/70 mx-auto sm:mx-0"></div>
                    <div class="mt-1.5 h-3 w-20 rounded bg-admin-line/70 mx-auto sm:mx-0"></div>
                </div>
            </div>
        </div>

        <div class="flex gap-6 overflow-x-auto scrollbar-none">
            <div v-for="i in 3" :key="i" class="relative flex shrink-0 items-center gap-2 whitespace-nowrap pb-2">
                <div class="size-3.5 rounded bg-admin-line/70"></div>
                <div class="h-5 w-20 rounded bg-admin-line/70"></div>
            </div>
        </div>

        <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div class="h-fit rounded-xl border border-admin-line bg-base-100 py-4 px-5">
                <div class="mb-3 h-6 w-24 rounded bg-admin-line/70"></div>
                <div class="divide-y divide-admin-line">
                    <div v-for="i in 3" :key="i" class="flex items-center justify-between py-2.5">
                        <div class="h-5 w-20 rounded bg-admin-line/70"></div>
                        <div class="h-5 w-32 rounded bg-admin-line/70"></div>
                    </div>
                </div>
            </div>

            <div class="space-y-6 lg:col-span-2">
                <div class="rounded-xl border border-admin-line bg-base-100">
                    <div class="border-b border-admin-line py-4 px-5">
                        <div class="h-6 w-32 rounded bg-admin-line/70"></div>
                    </div>
                    <div class="divide-y divide-admin-line">
                        <div v-for="i in 3" :key="i" class="grid grid-cols-3 gap-4 px-5 py-3.5">
                            <div class="h-5 w-24 rounded bg-admin-line/70"></div>
                            <div class="col-span-2 h-5 w-full max-w-60 rounded bg-admin-line/70"></div>
                        </div>
                    </div>
                </div>

                <div class="rounded-xl border border-admin-line bg-base-100">
                    <div class="border-b border-admin-line py-4 px-5">
                        <div class="h-6 w-28 rounded bg-admin-line/70"></div>
                    </div>
                    <div class="flex flex-wrap gap-2 px-5 py-3.5">
                        <div class="h-8 w-20 rounded-full bg-admin-line/70"></div>
                        <div class="h-8 w-28 rounded-full bg-admin-line/70"></div>
                        <div class="h-8 w-24 rounded-full bg-admin-line/70"></div>
                        <div class="h-8 w-32 rounded-full bg-admin-line/70"></div>
                        <div class="h-8 w-16 rounded-full bg-admin-line/70"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div v-else-if="errorMessage" class="flex flex-col items-center justify-center rounded-xl border border-admin-line bg-base-100 p-12 text-center">
        <h2 class="font-display text-lg font-semibold text-red-500">Failed to Load User</h2>
        <p class="mt-1 font-sans text-sm text-text-secondary">{{ errorMessage }}</p>
        <div class="flex flex-col w-full sm:w-fit sm:flex-row sm:justify-center sm:items-center gap-2 sm:gap-4 mt-4">
            <button
                @click="router.push({ name: 'users' })"
                class="rounded-lg bg-admin-sidebar px-4 py-2 font-sans text-sm text-white active:scale-95 shadow-sm transition-colors duration-200 cursor-pointer"
            >
                Back to Users
            </button>
            <button
                type="button"
                @click="fetchUserById(userId)"
                class="inline-flex items-center justify-center px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 active:scale-95 rounded-lg shadow-sm transition-colors duration-200 cursor-pointer"
            >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                </svg>
                Try Again
            </button>
        </div>
    </div>

    <div v-else-if="user" class="space-y-6">
        <nav class="flex items-center gap-2 text-sm text-text-secondary">
            <button class="transition-colors hover:text-text-primary cursor-pointer" @click="router.push({ name: 'users' })">Users</button>
            <svg class="size-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m9 18 6-6-6-6" />
            </svg>
            <span class="font-medium text-text-primary">{{ user.name }}</span>
        </nav>

        <div class="rounded-xl border border-admin-line bg-base-100 p-5">
            <div class="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div class="flex gap-5">
                    <div class="relative h-fit shrink-0">
                        <div
                            class="flex size-16 items-center justify-center rounded-xl bg-admin-sidebar font-display text-lg font-semibold text-white ring-1 ring-inset ring-white/10 sm:size-20 sm:text-xl"
                        >
                            {{ user.avatar }}
                        </div>
                        <span
                            class="absolute inset-e-0 bottom-0 size-3.5 translate-x-1/3 translate-y-1/3 rounded-full border-2 border-base-100 sm:size-4"
                            :class="isActive ? 'bg-admin-success' : 'bg-text-secondary'"
                        ></span>
                    </div>
                    <div class="flex flex-col gap-1.5 justify-center items-start pt-0.5">
                        <p class="text-[11px] font-semibold font-sans uppercase tracking-widest text-admin-accent">{{ user.role }}</p>
                        <div class="flex flex-col justify-center">
                            <h1 class="font-display text-xl font-semibold tracking-tight text-text-primary sm:text-2xl">{{ user.name }}</h1>
                            <p class="font-sans text-xs sm:text-sm text-text-secondary">{{ user.email }}</p>
                        </div>
                    </div>
                </div>
                <div class="flex shrink-0 items-center gap-3 text-sm sm:flex-col sm:items-end sm:gap-1.5">
                    <span class="inline-flex items-center gap-1.5 font-medium font-sans" :class="isActive ? 'text-admin-success' : 'text-text-secondary'">
                        <span class="size-1.5 rounded-full" :class="isActive ? 'bg-admin-success' : 'bg-text-secondary'"></span>
                        {{ isActive ? 'Active' : 'Inactive' }}
                    </span>
                    <span class="font-sans text-xs text-[#aab0bb]">Joined {{ user.joinDate }}</span>
                </div>
            </div>

            <div class="mt-6 flex snap-x snap-mandatory divide-x divide-admin-line overflow-x-auto rounded-xl border border-admin-line scrollbar-none">
                <div v-for="stat in stats" :key="stat.label" class="min-w-28 shrink-0 snap-start px-5 py-4 text-center sm:min-w-0 sm:flex-1 sm:text-left">
                    <p class="font-display text-xl font-semibold tabular-nums text-text-primary">{{ stat.value }}</p>
                    <p class="mt-1 text-[11px] font-medium font-sans uppercase tracking-wider text-text-secondary">{{ stat.label }}</p>
                </div>
            </div>
        </div>

        <div class="flex gap-6 overflow-x-auto scrollbar-none">
            <button
                v-for="tab in tabs"
                :key="tab.id"
                class="relative flex shrink-0 items-center gap-2 whitespace-nowrap pb-2 text-sm font-sans font-medium transition-colors cursor-pointer"
                :class="[activeTab === tab.id ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary']"
                @click="activeTab = tab.id"
            >
                <span v-html="tab.icon"></span>{{ tab.label }}
                <span
                    class="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-admin-accent transition-opacity duration-200 motion-reduce:transition-none"
                    :class="activeTab === tab.id ? 'opacity-100' : 'opacity-0'"
                ></span>
            </button>
        </div>

        <div v-show="activeTab === 'overview'" class="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div class="h-fit rounded-xl border border-admin-line bg-base-100 py-4 px-5">
                <h3 class="mb-3 font-display text-base font-semibold text-text-primary">Account</h3>
                <div class="divide-y divide-admin-line">
                    <div v-for="i in accountInfo" :key="i.label" class="flex items-center justify-between py-2.5">
                        <span class="text-sm font-sans text-text-secondary">{{ i.label }}</span>
                        <span class="text-sm font-sans font-medium" :class="i.tone ? 'text-admin-success' : 'text-text-primary'">{{ i.value }}</span>
                    </div>
                </div>
            </div>

            <div class="space-y-6 lg:col-span-2">
                <div class="rounded-xl border border-admin-line bg-base-100">
                    <h2 class="border-b border-admin-line py-4 px-5 font-display text-base font-semibold text-text-primary">Profile Details</h2>
                    <div class="divide-y divide-admin-line">
                        <div v-for="f in profileFields" :key="f.label" class="grid grid-cols-3 gap-4 px-5 py-3.5">
                            <span class="text-sm font-sans text-text-secondary">{{ f.label }}</span>
                            <span class="col-span-2 text-sm font-medium font-sans text-text-primary truncate">{{ f.value }}</span>
                        </div>
                    </div>
                </div>

                <div class="rounded-xl border border-admin-line bg-base-100">
                    <h2 class="border-b border-admin-line py-4 px-5 font-display text-base font-semibold text-text-primary">Permissions</h2>
                    <div class="flex flex-wrap gap-2 px-5 py-3.5">
                        <span
                            v-for="perm in permissions"
                            :key="perm.label"
                            class="rounded-full border px-4 py-2 text-[10px] sm:text-xs font-sans font-medium leading-none cursor-pointer"
                            :class="perm.granted ? 'border-transparent bg-admin-sidebar text-white' : 'border-admin-line text-text-secondary/50'"
                            >{{ perm.label }}</span
                        >
                    </div>
                </div>
            </div>
        </div>

        <div v-show="activeTab === 'activity'" class="rounded-xl border border-admin-line bg-base-100">
            <h2 class="border-b border-admin-line py-4 px-5 font-display text-base font-semibold text-text-primary">Activity Log</h2>
            <div class="relative space-y-6 px-5 py-3.5 before:absolute before:inset-s-8.5 before:top-7 before:bottom-7 before:w-px before:bg-admin-line">
                <div v-for="a in activityLog" :key="a.action" class="relative flex gap-4 ps-9">
                    <div
                        class="absolute inset-s-0 flex size-7 items-center justify-center rounded-full border bg-base-100"
                        :class="a.security ? 'border-admin-accent/30 text-admin-accent' : 'border-admin-line text-text-secondary'"
                        v-html="activityIcons[a.icon]"
                    ></div>
                    <div class="min-w-0 flex-1">
                        <p class="text-sm font-sans font-medium text-text-primary">{{ a.action }}</p>
                        <p class="truncate font-sans text-xs text-text-secondary">{{ a.detail }} · {{ a.time }}</p>
                    </div>
                </div>
            </div>
        </div>

        <div v-show="activeTab === 'sessions'" class="space-y-3">
            <div v-for="s in sessions" :key="s.device" class="flex flex-col gap-4 rounded-xl border border-admin-line bg-base-100 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between">
                <div class="flex items-center gap-4">
                    <div class="flex size-9 shrink-0 items-center justify-center rounded-md border border-admin-line bg-admin-content text-text-secondary" v-html="deviceIcons[s.icon]"></div>
                    <div class="space-y-0.5">
                        <div class="flex items-center gap-2">
                            <span class="text-sm font-sans font-medium text-text-primary">{{ s.device }}</span>
                            <span v-if="s.active" class="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-admin-success">
                                <span class="size-1.5 rounded-full bg-admin-success"></span>Active
                            </span>
                        </div>
                        <p class="text-xs font-sans text-text-secondary">{{ s.browser }} · {{ s.location }}</p>
                    </div>
                </div>
                <div class="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                    <span class="text-xs font-sans tabular-nums text-text-secondary">{{ s.lastActive }}</span>
                    <button v-if="s.active" class="text-xs font-sans font-medium text-admin-danger transition-colors hover:underline cursor-pointer">Revoke</button>
                </div>
            </div>
        </div>
    </div>
</template>
