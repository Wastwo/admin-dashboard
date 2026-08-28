<script setup>
defineProps({
    user: {
        type: Object,
        required: true,
    },
    showEmail: {
        type: Boolean,
        default: true,
    },
    showStatus: {
        type: Boolean,
        default: true,
    },
});

const emit = defineEmits(['selected']);
</script>

<template>
    <div @click="emit('selected', user.id)" class="flex flex-wrap items-center justify-between bg-base-100 px-5 py-3.5">
        <div class="flex justify-center items-center gap-3">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-admin-sidebar text-xs font-medium text-white font-display">
                {{ user.avatar }}
            </div>
            <div class="flex justify-center items-start gap-4">
                <div class="flex flex-col">
                    <p class="truncate text-sm font-medium font-sans text-text-primary">{{ user.name }}</p>
                    <p v-if="showEmail && user.email" class="truncate text-xs font-sans text-[#a3a7ae]">{{ user.email }}</p>
                </div>
                <span
                    v-if="showStatus && user.status"
                    class="inline-flex items-center justify-center gap-1 rounded-full px-2 py-0.5 text-xs font-sans font-medium"
                    :class="user.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-50 text-gray-600'"
                >
                    <span class="h-1.5 w-1.5 rounded-full" :class="user.status === 'active' ? 'bg-emerald-500' : 'bg-gray-400'"></span>
                    {{ user.status }}
                </span>
            </div>
        </div>
        <div class="flex items-center justify-center gap-1 font-sans text-xs text-text-secondary">
            {{ user.lastActive }}
        </div>
    </div>
</template>
