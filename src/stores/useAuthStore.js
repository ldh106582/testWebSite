import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuthenticated: false,
        user: null
    }),
    actions: {
        login (userId) {
            this.isAuthenticated = true;
            this.user = userId;
            localStorage.setItem('user', userId);
        },
        logout (userId) {
            this.isAuthenticated = false;
            this.user = null;
            localStorage.removeItem('user');
        },
        initialize () {
            const user = localStorage.getItem('user');
            if (user) {
                this.isAuthenticated = true,
                this.user = user;
            }
        }
    },
});