import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuthenticated: false,
        user: null
    }),
    actions: {
        login(userData) {
            isAuthenticated = true;
            user = userData;
        },
        logout() {
            isAuthenticated = false;
            user = null;
        },
    },
});

