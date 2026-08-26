<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const isDrawerOpen = defineModel('isDrawerOpen', { type: Boolean, default: true });

const menuItems = [
    { label: 'Dashboard', to: '/admin', exact: true, icon: 'dashboard' },
    { label: 'Users', to: '/admin/users', exact: false, icon: 'users' },
];

function isActive(item) {
    if (item.exact) {
        return route.path === item.to;
    }
    return route.path.startsWith(item.to);
}
</script>

<template>
    <aside
        class="fixed lg:static inset-y-0 left-0 z-40 flex flex-col h-full bg-slate-900 border-r border-slate-800 text-slate-300 transition-all duration-300 ease-in-out shadow-2xl shadow-slate-900/20"
        :class="[isDrawerOpen ? 'w-64 translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-20']"
    >
        <div class="flex items-center h-16 border-b border-slate-800/60 transition-all duration-300 overflow-hidden" :class="isDrawerOpen ? 'px-7 justify-between' : 'px-0 justify-center'">
            <span class="font-bold font-display text-lg text-white tracking-wide transition-all duration-300 whitespace-nowrap" :class="isDrawerOpen ? 'w-auto opacity-100' : 'w-0 opacity-0 hidden'">
                AdminPanel
            </span>

            <button
                type="button"
                @click="isDrawerOpen = !isDrawerOpen"
                class="flex items-center justify-center w-10 h-10 rounded-xl text-text-secondary hover:text-white hover:bg-slate-800 transition-all duration-200"
                aria-label="Toggle sidebar"
            >
                <svg
                    class="w-5 h-5 transition-transform duration-300"
                    :class="!isDrawerOpen && 'rotate-180'"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                    <path d="M9 3v18" />
                    <path d="m14 15-3-3 3-3" />
                </svg>
            </button>
        </div>

        <div class="flex-1 overflow-y-auto overflow-x-hidden" :class="isDrawerOpen ? 'px-4 py-6' : 'px-3 py-13.75'">
            <h2 v-if="isDrawerOpen" class="text-[10px] px-3 font-sans font-bold text-text-secondary uppercase tracking-widest mb-4 transition-all duration-300 whitespace-nowrap">Menu Utama</h2>

            <nav class="space-y-1.5">
                <RouterLink
                    v-for="item in menuItems"
                    :key="item.to"
                    :to="item.to"
                    :title="!isDrawerOpen ? item.label : undefined"
                    class="flex items-center rounded-xl text-sm font-medium font-sans transition-all duration-200 group relative"
                    :class="[
                        isActive(item) ? 'bg-admin-accent text-white shadow-lg shadow-admin-accent/30' : 'text-text-secondary hover:bg-slate-800/50 hover:text-white',
                        isDrawerOpen ? ' gap-3 py-3 px-4' : ' p-3 justify-center',
                    ]"
                >
                    <svg
                        v-if="item.icon === 'dashboard'"
                        class="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:scale-110"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.75"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <rect x="3" y="3" width="7" height="9" rx="2" />
                        <rect x="14" y="3" width="7" height="5" rx="2" />
                        <rect x="14" y="12" width="7" height="9" rx="2" />
                        <rect x="3" y="16" width="7" height="5" rx="2" />
                    </svg>

                    <svg
                        v-else-if="item.icon === 'users'"
                        class="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:scale-110"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.75"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>

                    <span class="whitespace-nowrap transition-all duration-300" :class="isDrawerOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'">
                        {{ item.label }}
                    </span>

                    <div v-if="!isDrawerOpen && isActive(item)" class="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-5 bg-admin-header rounded-r-md"></div>
                </RouterLink>
            </nav>
        </div>
    </aside>
</template>
