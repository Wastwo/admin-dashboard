<script setup>
/**
 * @component NotFoundView
 * @description 404 error page displayed for any unmatched route. Shows the
 * attempted URL and provides a button to navigate back to the dashboard.
 */
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

/** @type {import('vue').ComputedRef<string>} The URL path the user attempted to visit. */
const attemptedPath = computed(() => route.fullPath || '/');
</script>

<template>
    <main class="flex min-h-screen w-full items-center bg-admin-content px-6 py-16 sm:px-10 lg:px-16">
        <div class="mx-auto grid w-full max-w-5xl items-center gap-10 lg:grid-cols-[1fr_auto_1fr] lg:gap-0">
            <div class="flex select-none justify-start lg:justify-end lg:pr-14" aria-hidden="true">
                <span class="font-display text-[clamp(4.5rem,15vw,8rem)] font-extrabold leading-[0.8] tracking-tight text-text-primary">404</span>
            </div>

            <div class="hidden h-40 border-l border-[#b2b8c3] lg:block"></div>

            <div class="flex flex-col items-start border-t border-[#b2b8c3] pt-8 text-left lg:border-t-0 lg:pt-0 lg:pl-14">
                <h1 class="font-display text-2xl font-bold leading-tight tracking-tight text-text-primary sm:text-3xl">This route doesn't exist.</h1>
                <p class="mt-3 max-w-sm font-sans text-[15px] leading-relaxed text-text-secondary">
                    That address isn't part of the admin panel, and no page has ever lived there. Check the link, or head back to familiar ground.
                </p>

                <div class="mt-8 flex flex-wrap items-center gap-3">
                    <button
                        type="button"
                        @click="router.push('/admin')"
                        class="inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg bg-admin-accent px-4 font-sans text-sm font-medium text-white transition-colors duration-150 hover:bg-admin-accent/90"
                    >
                        Back to dashboard
                        <svg
                            class="size-3.5 shrink-0"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                        </svg>
                    </button>
                </div>

                <div
                    class="mt-10 inline-flex max-w-full items-center gap-2 rounded-full border border-admin-line bg-base-100 px-3.5 py-1.5 font-sans text-xs text-text-secondary"
                    :title="attemptedPath"
                >
                    <span class="shrink-0 text-text-secondary/60">Requested</span>
                    <span class="min-w-0 truncate text-text-primary">{{ attemptedPath }}</span>
                </div>
            </div>
        </div>
    </main>
</template>
