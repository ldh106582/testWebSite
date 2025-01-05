import { defineStore } from "pinia";
import { ref } from 'vue';
import axios from "@/axios";
import moment from "moment";
import useMoment from "@/mixins/useMoment";

const { getUnix } = useMoment();

export const useAuthStore = defineStore ('auth', () => {
    const today = moment();
    const isAuthenticated = ref(false);
    const userId = ref(null);
    const error = ref(null);
    const isCheckTemp = ref(false);
    const tempId = ref('');

    async function login (userInfo) {
        try {
            isAuthenticated.value = true;
            userId.value = userInfo.rows[0].user_id;
            localStorage.setItem('userId', userId.value );
            const token = userInfo.token;
            localStorage.setItem('token', token);

            if (tempId.value) {
                isCheckTemp.value = false;
                localStorage.removeItem('tempUserId');
                localStorage.removeItem('tempCreatedAt');   
            }
            await getMemberInfo();
        
        } catch (err) {
            console.error('Login error:', err);
            logout();
        }
    }

    function logout () {
        isAuthenticated.value = false;
        userId.value = null;
        error.value = null;
        isCheckTemp.value = false;

        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('tempUserId');
        localStorage.removeItem('tempCreatedAt');
    }
    
    async function getMemberInfo () {

        if (isCheckTemp.value) {
            return {
                userId: userId.value,
                isCheckTemp: true,
                createdAt: localStorage.getItem('tempCreatedAt')
            };
        }

        const token = localStorage.getItem('token');
        if (!token) {
            logout();
        }
            
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        try {
            const response = await axios.get('/member-info', config);
            return response.data;
        } catch (err) {
            console.error('Auth Error', err);
        }
    }

    async function initialize () {
        const token = localStorage.getItem('token');
        const maintaindUserId = localStorage.getItem('userId'); 
        const maintainTempId = localStorage.getItem('tempUserId');

        if (token) {
            isAuthenticated.value = true;
            userId.value = maintaindUserId;
            isCheckTemp.value = false;
            await getMemberInfo();
        } else if (maintainTempId) {
            tempId.value = maintainTempId;
            userId.value = maintainTempId;
            isCheckTemp.value = true;
            await getMemberInfo();
        }
    }

    function templateUser () {
        tempId.value = `temp_${getUnix(today)}`;
        userId.value = tempId.value;
        isCheckTemp.value = true;

        localStorage.setItem('tempUserId', tempId.value);
        localStorage.setItem('v', today.format());
    }
    
    return { login, logout, getMemberInfo, initialize, templateUser, isAuthenticated, userId, error }
});