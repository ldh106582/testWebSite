<template>
    <v-container fluid class="ma-3">
        <v-row>
            <v-col cols="12" class="px-0">
                <h1>시험 상세 페이지</h1>
            </v-col>
        </v-row>

        <v-row class="mt-2">
            <v-col class="px-0" style="border-bottom: 2px solid black;">
                <h2>시험 유형</h2>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="2" class="px-0">
                <h3>유형 번호</h3>
            </v-col>
            <v-col cols="2" class="px-0">
                <h3>유형 이름</h3>
            </v-col>
        </v-row>
    </v-container>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from '@/axios';
import router from '@/router';

const questionStorage = ref([]);
const isCheckLoading = ref(false);

async function search () {

    const qeustionId = router.currentRoute.value.query.question_id;
    const examId = router.currentRoute.value.query.exam_id;

    await axios.get('/qeustion-with-problem', {
        params: {
            question_id: qeustionId,
            exam_id: examId
        }
    }).then(res => {
        const data = res.data;


    });
}

onMounted(async () => {
    search ();
})

</script>

<style scoped>

</style>