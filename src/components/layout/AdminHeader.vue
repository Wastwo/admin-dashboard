<script setup>
import { watch } from 'vue';
import { useRouter } from 'vue-router';

const emit = defineEmits(['toggle-sidebar', 'logout']);
const isDrawerOpen = defineModel('isDrawerOpen', { type: Boolean, default: true });
const router = useRouter()

function toggleDrawer() {
    isDrawerOpen.value = !isDrawerOpen.value;
    emit('toggle-sidebar', isDrawerOpen.value);
}

watch(
    isDrawerOpen,
    open => {
        const root = document.documentElement;
        root.classList.toggle('is-drawer-open', open);
        root.classList.toggle('is-drawer-close', !open);
    },
    { immediate: true }
);

function handleLogout() {
    emit('logout');
    router.push('/login')
}
</script>

<template>
    <header class="fixed top-0 left-0 right-0 h-16 bg-admin-header shadow-sm z-10 flex items-center justify-between px-6">
        <div class="flex items-center gap-3">
            <button
                type="button"
                aria-label="Toggle sidebar"
                :aria-expanded="isDrawerOpen"
                class="flex h-9 w-9 items-center justify-center rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
                @click="toggleDrawer"
            >
                <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 6h18M3 12h18M3 18h18" />
                </svg>
            </button>

            <span class="text-xl font-bold font-display text-text-primary">AdminPanel</span>
        </div>

        <div class="flex items-center gap-4">
            <span class="text-sm font-medium font-sans text-text-primary">Admin</span>
            <button @click="handleLogout" class="px-3 py-1.5 text-xs font-sans font-semibold text-red-600 bg-red-50 hover:bg-red-100 active:scale-95 rounded-md transition-all">Logout</button>
        </div>
    </header>
</template>
