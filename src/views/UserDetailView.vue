<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUsers } from '@/composables/useUsers';

const props = defineProps({
    id: { type: [String, Number], required: true },
});

const router = useRouter();
const { getUserById } = useUsers();
const activeTab = ref('overview');
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

const user = computed(() => {
    return getUserById(props.id);
});

const stats = [
    { label: 'Projects', value: '24' },
    { label: 'Tasks Done', value: '147' },
    { label: 'Streak', value: '12 Days' },
    { label: 'Active', value: '2m ago' },
];

const profileFields = [
    { label: 'Email', value: user.value.email },
    { label: 'Username', value: `@${user.value.username}` },
    { label: 'Location', value: `${user.value.location} · ${user.value.timezone}` },
];

const accountInfo = [
    { label: 'Last Login', value: user.value.lastLogin, tone: false },
    { label: 'Status', value: 'Online', tone: true },
    { label: '2FA', value: 'Enabled', tone: true },
];

const permissions = [
    { label: 'Manage Users', granted: true },
    { label: 'View Analytics', granted: true },
    { label: 'Edit Content', granted: true },
    { label: 'Delete Records', granted: false },
    { label: 'System Settings', granted: true },
    { label: 'Billing Access', granted: false },
];

const activityLog = [
    { action: 'Logged in', detail: 'Chrome on macOS', time: '2 minutes ago', icon: 'login', security: true },
    { action: 'Changed password', detail: 'Security settings', time: '2 days ago', icon: 'lock', security: true },
    { action: 'Completed task "Design Review"', detail: 'Project: Mobile App', time: '3 hours ago', icon: 'check', security: false },
    { action: 'Created new project', detail: 'Website Redesign', time: '5 days ago', icon: 'plus', security: false },
];

const sessions = [
    { device: 'MacBook Pro', browser: 'Chrome 120', location: 'San Francisco, US', active: true, lastActive: 'Current session', icon: 'desktop' },
    { device: 'iPhone 15 Pro', browser: 'Safari', location: 'San Francisco, US', active: true, lastActive: '1 hour ago', icon: 'mobile' },
];

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
</script>

<template>
    <div class="space-y-6">
        <nav class="flex items-center gap-2 text-sm text-text-secondary">
            <button class="transition-colors hover:text-text-primary" @click="router.push({ name: 'users' })">Users</button>
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
                        <span class="absolute inset-e-0 bottom-0 size-3.5 translate-x-1/3 translate-y-1/3 rounded-full border-2 border-base-100 bg-admin-success sm:size-4"></span>
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
                    <span class="inline-flex items-center gap-1.5 font-medium font-sans text-admin-success">
                        <span class="size-1.5 rounded-full bg-admin-success"></span>
                        Active
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
