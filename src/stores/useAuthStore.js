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

    async function login (userInfo) {
        try {
            isAuthenticated.value = true;
            userId.value = userInfo.rows[0].user_id;
            isTemporary.value = false;
            localStorage.setItem('token', userInfo.token);

            localStorage.removeItem('tempUserId');
            localStorage.removeItem('tempCreatedAt');

            await getMemberInfo();
        } catch (err) {
            console.error('Login error:', err);
            error.value = 'Failed to login. Please try again.';
            logout();
            throw err;
        }
    }

    function logout () {
        isAuthenticated.value = false;
        userId.value = null;
        error.value = null;
        isCheckTemp.value = false;


        localStorage.removeItem('token');
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
            throw new Error('No token found');
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
            console.error('Failed to fetch member info:', err);
            
            if (err.response?.status === 401) {
                logout();
                error.value = 'Session expired. Please login again.';
            } else if (err.response?.status === 500) {
                error.value = 'Server error. Please try again later.';
            } else {
                error.value = 'Failed to fetch member information.';
            }
            
            throw err;
        }
    }

    async function initialize () {
        const token = localStorage.getItem('token');

        if (token) {
            isAuthenticated.value = true;
            isCheckTemp.value = false;
            await getMemberInfo();
        } else if (tempId) {
            userId.value = tempId;
            isCheckTemp.value = true;
        } else {
            templateUser();
        }
    }

    function templateUser () {
        const tempId = `temp_${getUnix(today)}`;
        userId.value = tempId;
        isCheckTemp.value = true;

        localStorage.setItem('tempUserId', tempId);
        localStorage.setItem('v', today.format());

        return tempId
    }
    
    return { login, logout, getMemberInfo, initialize, templateUser, isAuthenticated, userId, error }
});