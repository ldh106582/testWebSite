<template>
    <v-container fluid fill-height>
        <v-row justify="center" align="center" >
            <v-col cols="12"  lg="5" sm="12" class="d-flex justify-center align-center" style="height: 93vh;">
                <v-col cols="auto">
                    <v-col cols="auto" class="login-title pa-0 mb-4">
                        <p>로그인 페이지</p>
                    </v-col>

                    <v-form data-test="login" cols="12" lg="12" sm="12" style="height: auto;" @submit.prevent="login">
                        <v-text-field class="id" type="text" v-model="user.userId"></v-text-field>
                        <v-text-field class="pw" type="password" v-model="user.userPw"></v-text-field>
                        <v-btn color="rgb(26, 32, 53)" width="100%" type="submit">로그인</v-btn>
                    </v-form>

                    <v-col cols="12" lg="12" sm="12" class="d-flex pa-0 ma-0 mt-2" style="justify-content: space-between;">
                        <button class="find" @click="findPw">비밀번호 찾기</button>
                    </v-col>
                </v-col>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import axios from '@/axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from "@/stores/useAuthStore";

const auth = useAuthStore();
const router = useRouter();
const user = ref([]);

function login () {
    const checkLogin = '아이디 비밀번호 모두 입력해야 합니다.';
    const errorLogin = '일치하는 아이디와 비밀번호가 없습니다.';

    if (user.value.userId === '' || user.value.userPw == '') {
        return alert (checkLogin);
    }

    axios.post('/login', {
        userId : user.value.userId,
        userPw: user.value.userPw
    }).then((res) => {
        const data = res.data.result;
        const userInfo = res.data;

        if (data) {
            return alert (errorLogin);
        } else {
            auth.login (userInfo);
            return router.push('/');
        }
    });
}

function findPw () {
    router.push('/find-pw');
}

</script>

<style scoped>
.login-title{
    font-size: 35px;
    font-weight: bold;
}

.find:hover{
    cursor: pointer;
    border-bottom: 1px solid black;
}
</style>