<template>
    <v-container fluid>
        <v-row v-for="(problem, index) in problems" :key="index">      
            <v-col cols="11">
                <span>{{ index + 1 }}번.   {{ problem.question }}</span>
            </v-col>
            <v-col cols="1">
                <span>( {{ problem.question_point }} 점)</span>
            </v-col>
            
            <v-col cols="12" class="d-flex pa-0" >
                <img v-if="problem.problem_image" :src="problem.problem_image" alt="Image" class="shadow-md rounded-xl w-full sm:w-64"
                style="width: 100%; max-height: 500px;" />
            </v-col>

            <v-col cols="12">
                <v-textarea v-if="problem.problem" data-test="problem" variant="outlined" hide-details
                auto-grow v-model="problem.problem" readonly/>
            </v-col>
            
            <v-col cols="1" style="text-align: center; align-content: center;">
                <span>답 :  </span>
            </v-col>

            <v-col cols="11">
                <v-text-field variant="outlined" hide-details></v-text-field>
            </v-col>
        </v-row>
        
        <v-row>
            <v-btn>완료</v-btn>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import router from '@/router';
import axios from '../../src/axios';

const userId = ref('');
const problems = ref([]);
const limit = ref(22);

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