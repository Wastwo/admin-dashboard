<script setup>
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';

const router = useRouter();
const isDrawerOpen = defineModel('isDrawerOpen', { type: Boolean, default: true });
const { logout } = useAuth();

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

            <h1 class="text-base sm:text-lg font-display font-bold text-text-primary tracking-tight">Dashboard Overview</h1>
        </div>

        <div class="flex items-center gap-3 sm:gap-5">
            <button class="relative p-2 sm:p-2.5 text-text-secondary transition-colors rounded-full hover:bg-gray-100 hover:text-text-primary cursor-pointer">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
                <span class="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white animate-ping"></span>
            </button>

            <div class="h-8 w-px bg-gray-200/80"></div>

            <div class="flex items-center gap-1.5">
                <div class="dropdown dropdown-end">
                    <div tabindex="0" role="button" class="flex items-center gap-2 rounded-full transition-colors py-1 pl-1 pr-2 sm:pr-2.5 hover:bg-black/5 active:scale-[0.98] cursor-pointer">
                        <span class="grid h-8 w-8 place-items-center rounded-full bg-admin-sidebar text-xs font-display font-semibold text-white">A</span>
                        <span class="hidden sm:block text-sm font-sans font-medium text-text-primary">Admin</span>
                        <svg class="hidden sm:block h-4 w-4 text-text-primary/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m6 9 6 6 6-6" />
                        </svg>
                    </div>

                    <ul tabindex="0" class="dropdown-content menu z-50 mt-4 w-52 rounded-xl bg-base-100 p-1.5 shadow-lg">
                        <li class="px-2.5 pb-1.5 pt-2 text-xs font-sans text-text-primary/50">Logged in as Administrator</li>
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
