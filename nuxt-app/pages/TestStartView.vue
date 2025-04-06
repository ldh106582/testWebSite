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
                <p>내용</p>
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

async function test() {
    const list = [];

    const examId = router.currentRoute.value.query.exam_id;
    const subjectId = router.currentRoute.value.query.subject_id;
    const questionType = router.currentRoute.value.query.question_type;
    const questionYear = router.currentRoute.value.query.question_year;
    const questionAcademicYear = router.currentRoute.value.query.question_academic_year;
    
    list.push ({
        exam_id: examId,
        subject_id: subjectId,
        question_type: questionType,
        question_year: questionYear,
        question_academic_year: questionAcademicYear
    });

    await axios.get('/getProblems', {
        params: {
            list: list
        }
    }).then(res => {
        problems.value = res.data.rows;

    });


}


onMounted(() => {
    test();
    userId.value = router.currentRoute.value.query.user_id;
})
</script>

<style scoped>

</style>