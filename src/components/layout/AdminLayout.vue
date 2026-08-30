<script setup>
/**
 * @component AdminLayout
 * @description Root layout shell for all authenticated pages. Composes the
 * collapsible sidebar, sticky header, and a scrollable `<RouterView>` content
 * area. Manages the shared drawer-open state that is passed down to both
 * `AdminSidebar` and `AdminHeader` via `v-model`.
 */
import { ref } from 'vue';
import AdminHeader from './AdminHeader.vue';
import AdminSidebar from './AdminSidebar.vue';
import { RouterView } from 'vue-router';

/** @type {import('vue').Ref<boolean>} Controls sidebar expanded/collapsed state. */
const isDrawerOpen = ref(true);
</script>

<template>
    <div class="flex h-screen overflow-hidden bg-admin-content font-sans relative">
        <div v-if="isDrawerOpen" @click.self="isDrawerOpen = false" class="fixed inset-0 z-30 bg-slate-900/50 backdrop-blur-sm lg:hidden transition-opacity duration-300"></div>
        <AdminSidebar v-model:is-drawer-open="isDrawerOpen" />
        <div class="flex flex-col flex-1 min-w-0 transition-all duration-300 ease-in-out">
            <AdminHeader v-model:is-drawer-open="isDrawerOpen" />
            <main class="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                <RouterView/>
            </main>
        </div>
    </div>
</template>
