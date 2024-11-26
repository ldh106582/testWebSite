<template>
    <v-container fluid fill-height>
        <v-row justify="center" align="center">
            <v-col cols="12"  lg="5" sm="12" class="d-flex justify-center align-center" style="height: 93vh;">
                <v-col cols="12"  lg="12" sm="12">
                    <v-col cols="12" lg="12" sm="12" class="login-title pa-0 mb-4">
                        <p>비밀번호 찾기 페이지</p>
                    </v-col>

                    <v-col class="pa-0" cols="12" lg="10" sm="10" style="height: auto;">
                        <v-text-field v-model="userId">  </v-text-field>
                        <v-btn data-test="btn" @click="findPw" color="rgb(26, 32, 53)" width="100%">비밀번호 찾기</v-btn>
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
import { useRouter } from 'vue-router';

const userId = ref('');
let temporaryPw = ref('');

const router = useRouter();
const auth = useAuthStore();

async function findPw () {
    const errorMsg = '존재하는 아이디가 없습니다.';
    const confirmMsg = '작성하신 이메일로 임시 비밀번호를 전송하였습니다.';

    templatePw();

    axios.get('/findpw-email', {
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

            auth.login (userInfo)
            
            return router.push('/march-pw', userInfo.userData )
        }
    });
}

function templatePw () {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*';
    const numbers = '123456789';
    temporaryPw.value = '';

    temporaryPw.value += numbers[Math.floor(Math.random() * numbers.length)];

	for(let i = 0; i < 6; i++) {
        let randomIndex = Math.floor(Math.random() * chars.length);
        temporaryPw.value += chars[randomIndex];
	}
    return temporaryPw.value
}
</script>

<style scoped>
.login-title{
    font-size: 35px;
    font-weight: bold;
}
</style>