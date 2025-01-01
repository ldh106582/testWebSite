<template>
    <v-container fluid fill-height>
        <v-row justify="center" align="center">
            <v-col cols="12"  lg="5" sm="12" class="d-flex justify-center align-center" style="height: 93vh;">
                <v-col cols="12"  lg="12" sm="12">
                    <v-col cols="12" lg="12" sm="12" class="login-title pa-0 mb-4">
                        <p>비밀번호 찾기 페이지</p>
                    </v-col>

                    <v-col class="pa-0" cols="12" lg="10" sm="10" style="height: auto;">
                        <v-text-field v-model="userId" label="아이디 입력" @keydown.enter="findPw" focused></v-text-field>
                        <v-btn data-test="btn" color="rgb(26, 32, 53)" width="100%" type="submit" @click="findPw">비밀번호 찾기</v-btn>
                    </v-col>
                </v-col>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref } from 'vue';
import axios from '@/axios';
import { useAuthStore } from '@/stores/useAuthStore';
import router from '@/router';

const userId = ref('');
const temporaryPw = ref('');

const auth = useAuthStore ();

async function findPw () {
    const checkId = '아이디를 입력해주세요.';
    const errorMsg = '존재하는 아이디가 없습니다.';
    const confirmMsg = '작성하신 이메일로 임시 비밀번호를 전송하였습니다.';

    if (userId.value === '') return alert (checkId);
    
    temporaryPw.value = templatePw();
    
    axios.get('/changepw-email', {
        params: {
            userId: userId.value,
            userPw: temporaryPw.value
        }
    }).then(res => {
        const data = res.data.result;
        const userInfo = res.data;

        if (data) {
            return alert (errorMsg);
        } else {
            alert (confirmMsg);

            auth.login (userInfo);

            router.push({ 
                path: '/member-changepw', 
                query: { 
                    userId: userId.value,
                    userPw: userInfo.row[0].user_pw,
                } 
            });
        }
    });
}

function templatePw () {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*';
    const numbers = '123456789';
    let password = '';

    password += numbers[Math.floor(Math.random() * numbers.length)];
	for (let i = 0; i < 6; i++) {
        let randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
	}
    return password

}
</script>

<style scoped>
.login-title{
    font-size: 35px;
    font-weight: bold;
}
</style>