<template>
    <v-container fluid fill-height>
        <v-row justify="center" align="center" >
            <v-col cols="12"  lg="5" sm="12" class="d-flex justify-center align-center" style="height: 93vh;">
                <v-col cols="12"  lg="12" sm="12">
                    <v-col cols="12" lg="12" sm="12" class="login-title pa-0 mb-4">
                        <p>로그인 페이지</p>
                    </v-col>

                    <v-form data-test="login" @submit.prevent="login" cols="12" lg="12" sm="12" style="height: auto;">
                        <v-text-field class="id" type="text" v-model="user.userId"></v-text-field>
                        <v-text-field class="pw" type="password" v-model="user.userPw"></v-text-field>
                        <v-btn type="submit" color="rgb(26, 32, 53)" width="100%">로그인</v-btn>
                    </v-form>

                    <v-col style="justify-content: space-between;" class="d-flex pa-0 ma-0 mt-2" cols="12" lg="12" sm="12">
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

const router = useRouter();
const user = ref([]);

function login () {
    const checkLogin = '아이디 비밀번호 모두 입력해야 합니다.';
    const errorLogin = '일치하는 아이디와 비밀번호가 없습니다.';
    const errorMsg = '진행 중 오류가 발생했습니다.';

    if (user.value.userId === '' || user.value.userPw == '') {
        return alert (checkLogin);
    }

    axios.get('/user-data-check', {
        params: {
            userId : user.value.userId,
            userPw: user.value.userPw
        }
    }).then((res) => {
<<<<<<< HEAD
        const data = res.data.result;
        const userId = res.data.rows[0].user_id;
=======
        const data = res.data.error;
>>>>>>> parent of 898c3b0 (auth 설정중)

        if (data) {
            return alert (errorLogin);
        } else if (userId !== undefined) {
            return router.push('/');
        } else {
            return alert (errorMsg);
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