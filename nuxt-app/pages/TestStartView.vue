<template>
    <v-container fluid>
        <v-row v-for="problem in problems" :key="index">
            <v-col cols="1">
                <span> 문제 {{ index + 1 }} 번. </span>
            </v-col>            
            <v-col cols="10" class="question">
                <span>{{ problem.question }}</span>
            </v-col>
            <v-col cols="1">
                <span>( {{ problem.question_points }} 점)</span>
            </v-col>
            <v-col cols="12" class="problem">
                <p>{{ problem.problem }}</p>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import router from '@/router';
import axios from '../../src/axios';

const userId = ref('');
const problems = ref([]);
const limit = ref(19);

async function search () {
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
            question_academic_year: questionAcademicYear,
            limit: limit.value
        }
    }).then(res => {
        const data = res.data;

        if (data.rows.length === 0 || data.rows === true) {
            return alert (errorMsg);
        } else {
            problems.value = data.rows;
        }
    });
}

onMounted(() => {
    search();
    userId.value = router.currentRoute.value.query.user_id;
});

</script>

<style scoped>
.question{
    border: 1px solid black;
}

.problem {
    border: 1px solid black;
    border-radius: 1.53%;
}

</style>