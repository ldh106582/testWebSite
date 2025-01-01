import { defineStore } from "pinia";
import { ref } from 'vue';
import axios from "@/axios";
import moment from "moment";
import useMoment from "@/mixins/useMoment";

const { getUnix } = useMoment();

export const useAuthStore = defineStore('auth', () => {

    const today = moment();
    const isAuthenticated = ref(false);
    const userId = ref(null);

    async function login ( userInfo ) {
        isAuthenticated.value = true;
        userId.value = userInfo.rows[0].user_id;
        localStorage.setItem('token', userInfo.token);

        console.log('userId', userInfo.rows[0].user_id)

        if (userId.value === '') {
            userId.value = getUnix(today);
            return userId.value
        } else {
            await getMemberInfo();
        }
    }

    function logout () {
        isAuthenticated = false;
        userId = null;
        localStorage.removeItem('token');
    }

    async function getMemberInfo(userId) {
        const token = localStorage.getItem('token');
            
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        axios.get('/member-info', config).then(res => {
        });
    }

    function initialize () {

        const token = localStorage.getItem('token');
        
        if (token) {
            isAuthenticated.value = true;
            getMemberInfo();
        } else {
            logout(); // 토큰이 없으면 로그아웃 처리
        }
    }
    
    return {login , logout, getMemberInfo, initialize}
    
});