<template>
    <v-container fluid>
        <v-row class="pa-0 ma-0">
            <v-col class="d-flex justify-center align-center" style="height: 93vh;">
                <v-col cols="4">
                    <div class="login-title mb-5">
                        <p>로그인 페이지</p>
                    </div>
                    <div>
                        <form data-test="login" @submit.prevent="login">
                            <v-text-field class="id" type="text" v-model="user.userId"></v-text-field>
                            <v-text-field class="pw" type="password" v-model="user.userId"></v-text-field>
                            <v-btn type="submit" color="rgb(26, 32, 53)" width="100%">로그인</v-btn>
                        </form>
                    </div>
                </v-col>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';

const user = ref({
    userId: '',
    userPw: ''
});

function login() {
    console.log("id : " + user.value.userId + " pw : " + user.value.userPw)
    const checkLogin = '아이디 비밀번호 모두 입력해야 합니다.'
    const errorLogin = '일치하는 아이디와 비밀번호가 없습니다.';

    if (user.value.userId === '' || user.value.userPw == '') {
        return alert (checkLogin);
    }

    axios.get('/user-data-check', {
        params: {
            userId : user.value.userId,
            userPw: user.value.userPw
        }
    }).then((res) => {
        const data = res.data.error;

        if (data) {
            return alert (errorLogin);
        } else {
            return router.push('/');
        }

    });

}

</script>

<style scoped>
.login-title{
    font-size: 35px;
    font-weight: bold;
}
</style>