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

const userId = ref('');

function findPw () {
    const errorMsg = '존쟈하는 아이디가 없습니다.';
    const confrimMsg = '작성하신 이메일로 임시 비밀번호를 전송하였습니다.';

    axios.get('/findpw-email', {
        userId: userId.value
    }).then(res => {
        const data = res.data.result;

        if (data) {
            return alert(errorMsg);
        } else {
            return alert(confrimMsg);
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