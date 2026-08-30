<script setup>
/**
 * @component UserCard
 * @description Clickable card row displaying a user's avatar, name, optional
 * email, status badge, and last-active timestamp. Used in both the dashboard
 * "Top Users" panel and the full user list view.
 *
 * @props {Object} user - User data object (must include `id`, `name`, `avatar`).
 * @props {boolean} [showEmail=true] - Whether to render the user's email address.
 * @props {boolean} [showStatus=true] - Whether to render the active/inactive status badge.
 *
 * @emits {('selected', userId: number)} Emitted when the card is clicked, carrying the user's ID.
 */
defineProps({
    /** The user data object — requires at minimum `id`, `name`, and `avatar`. */
    user: {
        type: Object,
        required: true,
    },
    /** Controls visibility of the email line beneath the user's name. */
    showEmail: {
        type: Boolean,
        default: true,
    },
    /** Controls visibility of the active/inactive status pill badge. */
    showStatus: {
        type: Boolean,
        default: true,
    },
});

const emit = defineEmits(['selected']);
</script>

<template>
    <div @click="emit('selected', user.id)" class="flex flex-wrap items-center justify-between bg-base-100 px-5 py-3.5 cursor-pointer">
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
