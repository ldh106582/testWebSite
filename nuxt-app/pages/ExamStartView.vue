<template>
    <v-container fluid class="d-flex">
        <v-col cols="9">
            <v-row v-for="(problem, index) in problems" :key="index">
                <v-col cols="10">
                    <span>{{ index + 1 }}번.   {{ problem.question }}</span>
                </v-col>
                <v-col cols="2" style="text-align: end; align-content: center;">
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
                    <v-text-field variant="outlined" hide-details v-model="answers[index]" />
                </v-col>
            </v-row>
            
            <v-row>
                <v-col style="text-align: end;">
                    <v-btn color="indigo" @click="submit">제출</v-btn>
                </v-col>
            </v-row>
        </v-col>

        <v-col cols="2" style="border: 1px solid black; right: 0%; position: fixed; top: 7.5%; height: 90vh; overflow: auto;" >
            <v-row class="d-flex" style="border: 1px solid black; text-align: center;">
                <v-col cols="12" class="px-0">
                    <div style="align-content: center;">
                        <span style="font-weight: bold;">남은시간</span>
                    </div>
                    <div class="text-center">
                        <v-chip class="ma-2 pa-5" size="x-large">
                        {{ remainingTime }}
                        </v-chip>
                    </div>
                </v-col>
            </v-row>
            
            <v-row v-for="(p, index) in problems" :key="index">
                <v-col class="d-flex pa-0">
                    <v-col cols="1" class="pa-0 mr-1" style="align-content: center; text-align: center;">
                        <span> {{ index + 1 }}  </span>
                    </v-col>
                    <v-col cols="11" class="pa-0">
                        <v-text-field variant="outlined" hide-details v-model="answers[index]" />
                    </v-col>
                </v-col>
            </v-row>
        </v-col>
    </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import router from '@/router';
import axios from '../../src/axios';
import { useExamStart } from '../store/useExamStart'; 

const examStore = useExamStart ();

const userId = ref('');
const problems = ref([]);
const examTime = ref(0);
const remainingTime = ref('');
const answers = ref([]);
let examId = '';
let examTotal = '';
let subjectId = '';
let questionType = '';
let questionYear = '';
let questionRound = '';

async function search () {
    const errorMsg = '해당하는 문제가 존재하지 않습니다. 잠시 후 다시 시도해주세요.';

    examId = router.currentRoute.value.query.exam_id;
    examTotal = router.currentRoute.value.query.exam_total;
    subjectId = router.currentRoute.value.query.subject_id;
    questionType = router.currentRoute.value.query.question_type;
    questionYear = router.currentRoute.value.query.question_year;
    questionRound = router.currentRoute.value.query.question_round;

    await axios.get('/start-exam', {
        params : {
            exam_id : examId,
            subject_id : subjectId,
            question_type : questionType,
            question_year : questionYear,
            question_round : questionRound,
            exam_total : examTotal
        }
    }).then(res => {
        const data = res.data;

        if (data.rows.length === 0 || data.rows === true) {
            return alert (errorMsg);
        } else {
            problems.value = data.rows;
            const examTimeInMinutes = parseInt(problems.value[0].exam_time);
            examTime.value = Date.now() + (examTimeInMinutes * 60 * 1000);
        }
    });
}

async function submit () {
    const problemAnswers = [];
    const result = [];
    let list = [];
    const item = [];
    let score = 0;
    let passFail = 0;

    problems.value.forEach(p => {
        problemAnswers.push(p.answer)
    });

    problemAnswers.forEach((p, index) => {
        const point = getScore (p, index);
        item.push(point === 0 ? false : true);
        score += getScore (p, index);
    });
    passFail = passFail >= problems.value.pass_score ?  1 : 0;

    list.push(
        { exam_id : examId },
        { question_type : questionType === '' ? null : questionType },
        { question_year : questionYear === '' ? null : questionYear },
        { question_round : questionRound === '' ? null : questionRound },
        { score : score },
        { user_id : userId.value },
        { pass_fail : passFail }
    );

    // await axios.post('/save-exam-result', {
    //     list : list
    // }).then(res => {
    //     const data = res.data;
    //     if (!data.result) {
    //         examStore.setExamData ({
    //             problems : problems.value,
    //             examResult : item,
    //             answers : answers.value,
    //             score : score,
    //             passFail : passFail
    //         });
    //         router.push('/exam-end');
    //     }
    // });
}

function getScore (params, index) {
    let score = 0;
    const value = answers.value[index];
    const problemAnswer = params.split(/\s+/).filter(word => word.length > 0).filter(word => !/^\d+\.$/.test(word)) .map(word => word.replace(/,/g, ''));;
    const userAnswer = value !== undefined ? value.split(/\s+/).filter(word => word.length > 0).filter(word => !/^\d+\.$/.test(word)) : [];
    const intersecter = [];
    userAnswer.forEach((problem, index) => {
        if (problemAnswer.includes(problem)) {
            intersecter.push(problem);
        }
    });

    const totalAnswers = problemAnswer.length;
    const correctAnswers = intersecter.length;

    if (totalAnswers === 0) return score;

    if (totalAnswers <= 2) {
        score = correctAnswers * 2.5;
    } else if (totalAnswers === 3) {
        if (correctAnswers === 1) {
            score = 1;
        } else if (correctAnswers === 2) {
            score = 3;
        } else if (correctAnswers === 3) {
            score = 5;
        }
    } else {
        const correct = ((correctAnswers / userAnswer.length) * 100);
        if (correct > 80) {
            score = 5;
        } else {
            score = (correctAnswers / totalAnswers) * 5;
        }
    }

    return Math.round(score * 10) / 10;
}

function timer () {
    setInterval(() => {
    const remainingMs = examTime.value - Date.now();
    
    if (remainingMs <= 0) {
        clearInterval(timer);
        return;
    }
    
    const seconds = Math.floor((remainingMs / 1000) % 60);
    const minutes = Math.floor((remainingMs / (1000 * 60)) % 60);
    const hours = Math.floor(remainingMs / (1000 * 60 * 60));
    remainingTime.value = `${hours}:${minutes}:${seconds}`
    }, 1000);
}

onMounted(() => {
    search();
    userId.value = router.currentRoute.value.query.user_id;
    timer();
    
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