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
            } else {
                this.logout(); // 토큰이 없으면 로그아웃 처리
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
            axios.get('/member-info', config).then(res => {
                const userInfo = res.data.rows; // 'rows'로 수정
                this.userId = userInfo[0].user_id; // 배열에서 첫 번째 요소 접근
            }).catch(error => {
                console.error("Error fetching member info:", error);
            });
        },
    }
});
