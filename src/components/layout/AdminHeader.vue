<script setup>
/**
 * @component AdminHeader
 * @description Sticky top header bar for authenticated pages. Displays the
 * current page title, a notification bell, a mobile hamburger toggle, and a
 * user dropdown menu with logout functionality.
 *
 * @props {boolean} [isDrawerOpen=true] - Two-way bound via `v-model:isDrawerOpen`;
 *   toggles the mobile sidebar overlay when the hamburger button is clicked.
 */
import { useRoute, useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import { computed } from 'vue';

const route = useRoute();
const router = useRouter();
/** Two-way binding with parent layout for mobile drawer toggle. */
const isDrawerOpen = defineModel('isDrawerOpen', { type: Boolean, default: true });
const { logout, currentUsername, loginTime } = useAuth();

/** @type {import('vue').ComputedRef<string>} Current page title from route meta. */
const pageTitle = computed(() => route.meta.title || 'Dashboard');
/** @type {import('vue').ComputedRef<string>} Capitalised display name for the current user. */
const displayName = computed(() => {
    const name = currentUsername.value ?? 'Admin';
    return name.charAt(0).toUpperCase() + name.slice(1);
});
/** @type {import('vue').ComputedRef<string>} Two-letter avatar initials. */
const avatarInitial = computed(() => displayName.value.slice(0, 2).toUpperCase());
/** @type {import('vue').ComputedRef<string>} Formatted login time (e.g. "02:30 PM"). */
const formattedLoginTime = computed(() => {
    if (!loginTime.value) return '';
    const date = new Date(loginTime.value);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
});

/**
 * Clears the auth session and redirects to the login page.
 *
 * @returns {void}
 */
function handleLogout() {
    logout();
    router.push('/login');
}
</script>

<template>
    <header class="sticky top-0 z-10 flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8 bg-admin-header/70 backdrop-blur-xl border-b border-gray-200/60 shadow-sm transition-all duration-300">
        <div class="flex items-center gap-3">
            <button
                type="button"
                @click="isDrawerOpen = !isDrawerOpen"
                class="flex lg:hidden items-center justify-center p-2 rounded-xl text-text-secondary hover:text-text-primary hover:bg-gray-100 transition-colors cursor-pointer"
                aria-label="Toggle mobile menu"
            >
                <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="4" y1="12" x2="20" y2="12"></line>
                    <line x1="4" y1="6" x2="20" y2="6"></line>
                    <line x1="4" y1="18" x2="20" y2="18"></line>
                </svg>
            </button>

            <h1 class="text-base sm:text-lg font-display font-bold text-text-primary tracking-tight">{{ pageTitle }}</h1>
        </div>

        <div class="flex items-center gap-3 sm:gap-5">
            <button class="relative p-2 sm:p-2.5 text-text-secondary transition-colors rounded-full hover:bg-gray-100 hover:text-text-primary cursor-pointer">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
                <span class="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white motion-safe:animate-ping"></span>
            </button>

            <div class="h-8 w-px bg-gray-200/80"></div>

            <div class="flex items-center gap-1.5">
                <div class="dropdown dropdown-end">
                    <div tabindex="0" role="button" class="flex items-center gap-2 rounded-full transition-colors py-1 pl-1 pr-2 sm:pr-2.5 hover:bg-black/5 active:scale-[0.98] cursor-pointer">
                        <span class="grid h-8 w-8 place-items-center rounded-full bg-admin-sidebar text-xs font-display font-semibold text-white">{{ avatarInitial }}</span>
                        <span class="hidden sm:block text-sm font-sans font-medium text-text-primary">{{ displayName }}</span>
                        <svg class="hidden sm:block h-4 w-4 text-text-primary/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m6 9 6 6 6-6" />
                        </svg>
                    </div>

                    <ul tabindex="0" class="dropdown-content menu z-50 mt-4 w-52 rounded-xl bg-base-100 p-1.5 shadow-lg">
                        <li class="px-2.5 pb-1.5 pt-2 text-xs font-sans text-text-primary/50">Logged in as {{ displayName }}</li>
                        <li v-if="formattedLoginTime" class="px-2.5 pb-1.5 text-xs font-sans text-text-secondary/50">Since {{ formattedLoginTime }}</li>
                        <li>
                            <button type="button" class="rounded-lg font-medium font-sans text-red-600 hover:bg-red-50 cursor-pointer" @click="handleLogout">
                                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                    <path d="M16 17l5-5-5-5" />
                                    <path d="M21 12H9" />
                                </svg>
                                Log out
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </header>
</template>
