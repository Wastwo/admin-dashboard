<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';

const username = ref('');
const password = ref('');
const errorMessage = ref('');
const isShaking = ref(false);
const isLoading = ref(false);
const { login } = useAuth();
const router = useRouter();

watch([username, password], () => {
    if (errorMessage.value) errorMessage.value = '';
});

const triggerError = message => {
    errorMessage.value = message;
    isShaking.value = true;
    setTimeout(() => {
        isShaking.value = false;
    }, 400);
};

const handleLogin = async () => {
    errorMessage.value = '';

    if (!username.value.trim() || !password.value) {
        triggerError('Please enter username and password.');
        return;
    }

    isLoading.value = true;

    try {
        const isSuccess = await login(username.value, password.value);

        if (isSuccess) {
            const redirectPath = router.currentRoute.value.query.redirect || '/admin';
            router.push(redirectPath);
        } else {
            triggerError('Invalid username or password.');
        }
    } catch {
        triggerError('An error occurred during login.');
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <main class="relative flex min-h-screen w-full flex-col items-center justify-center bg-admin-content p-4 sm:p-8">
        <div
            class="relative z-10 w-full max-w-105 rounded-2xl border border-white/80 bg-white/80 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-2xl transition-all duration-300 sm:p-10"
            :class="{ 'animate-shake': isShaking }"
        >
            <div class="mb-8">
                <div class="mb-4 inline-flex size-12 items-center justify-center rounded-xl bg-admin-sidebar text-white ring-1 ring-white/20 shadow-inner">
                    <svg class="size-5.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                        <path d="m9 12 2 2 4-4" />
                    </svg>
                </div>
                <h1 class="font-display text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">Sign in</h1>
                <p class="mt-1.5 font-sans text-xs sm:text-sm text-text-secondary">Secure access to your admin dashboard.</p>
            </div>

            <div v-if="errorMessage" class="mb-6 flex animate-fade-in items-center gap-3 rounded-xl bg-red-50 px-4 py-3 ring-1 ring-inset ring-admin-danger/20">
                <div class="flex shrink-0">
                    <svg class="size-5 text-red-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </div>
                <p class="font-sans text-xs sm:text-sm font-medium leading-snug text-admin-danger">{{ errorMessage }}</p>
            </div>

            <form @submit.prevent="handleLogin" class="flex flex-col gap-5">
                <div class="group space-y-1.5">
                    <label for="username" class="ml-1 font-sans text-xs font-semibold text-text-secondary transition-colors group-focus-within:text-text-primary">Username</label>
                    <div class="relative flex items-center">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                            <svg
                                class="size-4.5 transition-all duration-300 group-focus-within:scale-110"
                                :class="errorMessage ? 'text-admin-danger' : 'text-text-secondary group-focus-within:text-admin-accent'"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                        </div>
                        <input
                            id="username"
                            v-model.trim="username"
                            type="text"
                            placeholder="e.g. admin"
                            class="h-12 w-full rounded-xl border-0 bg-gray-50/50 pl-11 pr-4 font-sans text-sm text-text-primary shadow-xs ring-1 ring-inset transition-all duration-300 placeholder:text-text-secondary/40 focus:bg-white focus:outline-none"
                            :class="errorMessage ? 'ring-admin-danger/50 focus:ring-2 focus:ring-admin-danger' : 'ring-admin-line focus:ring-2 focus:ring-admin-accent'"
                        />
                    </div>
                </div>

                <div class="group space-y-1.5">
                    <label for="password" class="ml-1 font-sans text-xs font-semibold text-text-secondary transition-colors group-focus-within:text-text-primary">Password</label>
                    <div class="relative flex items-center">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                            <svg
                                class="size-4.5 transition-all duration-300 group-focus-within:scale-110"
                                :class="errorMessage ? 'text-admin-danger' : 'text-text-secondary group-focus-within:text-admin-accent'"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <rect x="5" y="11" width="14" height="10" rx="3" ry="3" />
                                <path d="M8 11V7a4 4 0 1 1 8 0v4" />
                                <circle cx="12" cy="16" r="1.5" />
                            </svg>
                        </div>
                        <input
                            id="password"
                            v-model="password"
                            type="password"
                            placeholder="••••••••"
                            class="h-12 w-full rounded-xl border-0 bg-gray-50/50 pl-11 pr-4 font-sans text-sm tracking-widest text-text-primary shadow-xs ring-1 ring-inset transition-all duration-300 placeholder:tracking-normal placeholder:text-text-secondary/40 focus:bg-white focus:outline-none"
                            :class="errorMessage ? 'ring-admin-danger/50 focus:ring-2 focus:ring-admin-danger' : 'ring-admin-line focus:ring-2 focus:ring-admin-accent'"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    :disabled="isLoading"
                    class="mt-3 flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-admin-sidebar font-sans text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_4px_12px_rgba(30,41,59,0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#111827] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_6px_16px_rgba(30,41,59,0.2)] active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-80"
                >
                    <span v-if="!isLoading">Sign in to account</span>
                    <svg v-else class="size-5 animate-spin text-white/80" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </button>

                <div class="mt-4 flex items-center justify-center gap-2 rounded-xl bg-gray-50 p-2.5">
                    <span class="font-sans text-[11px] font-medium uppercase tracking-wider text-text-secondary">Demo:</span>
                    <div class="flex items-center gap-1.5 font-sans text-xs text-text-primary">
                        <span class="rounded bg-white px-2 py-0.5 ring-1 ring-admin-line">admin</span>
                        <span class="text-text-secondary">/</span>
                        <span class="rounded bg-white px-2 py-0.5 ring-1 ring-admin-line">password</span>
                    </div>
                </div>
            </form>
        </div>
    </main>
</template>

<style scoped>
.animate-fade-in {
    animation: fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-4px) scale(0.98);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

.animate-shake {
    animation: shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

@keyframes shake {
    0%,
    100% {
        transform: translateX(0);
    }
    20% {
        transform: translateX(-6px);
    }
    40% {
        transform: translateX(5px);
    }
    60% {
        transform: translateX(-3px);
    }
    80% {
        transform: translateX(2px);
    }
}
</style>
