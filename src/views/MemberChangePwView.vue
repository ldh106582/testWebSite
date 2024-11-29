<template>
    <v-container fluid fill-height>
        <v-row justify="center" align="center" >
            <v-col cols="12"  lg="5" sm="12" class="d-flex justify-center align-center" style="height: 93vh;">
                <v-col cols="12"  lg="12" sm="12">
                    <v-col cols="12" lg="12" sm="12" class="march-title mb-4">
                        <p>비밀번호 변경 페이지</p>
                    </v-col>

                    <v-col>
                        <v-text-field cols="12" type="text" v-model="userPw" label="임시 비밀전호" hide-details readonly></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field cols="12" type="password" v-model="newPw" label="새로운 비밀전호" @keydown.enter="changePw" focused :rules="rulesPw"></v-text-field>
                    </v-col>

                    <v-col class="mt-2" cols="12" lg="12" sm="12">
                        <v-btn color="rgb(26, 32, 53)" width="100%" @click="changePw">비밀번호 변경</v-btn>
                    </v-col>
                
                </v-col>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import router from '@/router';
import axios from '@/axios';

const userPw = ref('');
const newPw = ref('');
const rulesPw = ref([
    v => {
        const pattern = /[!@#$%^&*(),.?":{}|<>]/;
        const validPw = '특수문자가 반드시 포함되어야 합니다.';

        if (!pattern.test(v)) { return  validPw }

    }
]);

function changePw() { 
    const checkPw = '새로운 비밀번호를 입력해주세요';
    const errorMsg = '예상하지 못한 오류가 발생하였습니다. 잠시 후 다시 시도해주세요';
    const successMsg = '비밀번호가 정상적으로 변경되었습니다.';

    if (newPw.value === '') return alert (checkPw);

    axios.put('/change-pw', {
        userId: router.currentRoute.value.query.userId,
        userPw: newPw.value
    }).then( res => {
        const data = res.data;

        if (data.result) {
            return alert (errorMsg);
        } else {
            alert (successMsg);
            return router.push('/');
        }
    });
}

onMounted(() => {
    userPw.value = router.currentRoute.value.query.userPw;
})

</script>

<style scoped>
.march-title{
    font-size: 35px;
    font-weight: bold;
}

</style>