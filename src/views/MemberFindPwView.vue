<template>
    <div>dddd</div>
</template>

<script setup>
import { ref } from 'vue';
import axios from '@/axios';

const userId = ref('');

function findPw () {
    const errorMsg = '존쟈하는 아이디가 없습니다.';
    const confrimMsg = '작성하신 이메일로 임시 비밀전호를 전송하였습니다.';

    axios.get('/findpw-email', {
        userId: userId.value
    }).then(res => {
        const data = res.data.error;

        if (data) {
            return alert (errorMsg);
        } else {
            return alert (confrimMsg);
        }
    });
}

</script>

<style scoped>
</style>