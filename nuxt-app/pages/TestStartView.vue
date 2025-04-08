<template>
    <v-container fluid>
        <v-row>
            <v-col cols="11">
                <span>{{ problems.problem }}</span>
            </v-col>
            <v-col cols="1">
                <span>{{ problems.problem }}</span>
            </v-col>
            <v-col>
                <p>{{ problems.problem }}</p>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import router from '@/router';
import axios from '../../src/axios';
import { error } from 'console';

const userId = ref('');
const problems = ref([]);

async function test() {
    const errorMsg = '해당하는 문제가 존재하지 않습니다. 잠시 후 다시 시도해주세요.';

    const examId = router.currentRoute.value.query.exam_id;
    const subjectId = router.currentRoute.value.query.subject_id;
    const questionType = router.currentRoute.value.query.question_type;
    const questionYear = router.currentRoute.value.query.question_year;
    const questionAcademicYear = router.currentRoute.value.query.question_academic_year;

    await axios.get('/start-problems', {
        params: {
            exam_id: examId,
            subject_id: subjectId,
            question_type: questionType,
            question_year: questionYear,
            question_academic_year: questionAcademicYear
        }
    }).then(res => {
        const data = res.data;

        if (data.result.length === 0 || data.result.length === true) {
            return alert (errorMsg);
        } else {
            problems.value = res.data.rows;
            console.log(problems.value)
        }
    });
}

onMounted(() => {
    test();
    userId.value = router.currentRoute.value.query.user_id;
});

</script>

<style scoped>

</style>