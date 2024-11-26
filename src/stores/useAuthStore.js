import { defineStore } from "pinia";
import axios from "@/axios";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuthenticated: false,
        userId: null,
        userInfo: null
    }),
    actions: {
        initialize() {
            const token = localStorage.getItem('token');
            if (token) {
                this.isAuthenticated = true;
                this.getMemberInfo();
            }
        },
        login(userInfo) {
            this.isAuthenticated = true;
            this.userId = userInfo.userData[0].user_id;
            localStorage.setItem('token', userInfo.token);
            this.getMemberInfo();
        },
        logout() {
            this.isAuthenticated = false;
            this.userId = null;
            localStorage.removeItem('token');
        },
        getMemberInfo() {
            const token = localStorage.getItem('token');
            
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            axios.get('/member-info', config)
                .then(res => {
                    const userInfo = res.data.rows[0];
                    this.userId = userInfo.user_id;
                })
                .catch(error => {
                    console.error('회원 정보 가져오기 실패:', error);
                });
        },
    }
});
