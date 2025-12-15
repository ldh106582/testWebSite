<template>
    <v-container fluid class="d-flex">
        <v-col cols="12">
            <v-row>
                <v-col cols="12" class="pa-0" style="text-align: end;">
                    <p class="passFail" > {{ score }}</p>
                    <p class="passFail" :style="{  color: passFail === '불합격' ?  'res' : 'black'}"> {{ passFail }} </p>
                </v-col>
            </v-row>
            <v-row v-for="(problem, index) in problems" :key="index">
                <v-col cols="12" style="position: relative;">
                    <v-col v-if="examResult[index]" style="height: 50px; top: 0%; left: 0%; position: absolute;">
                        <div>
                            <span class="result"> O </span>
                        </div>
                    </v-col>
                    <div v-else style="height: 50px; position: absolute;">
                        <span class="result"> / </span>
                    </div>
                    <span>{{ index + 1 }}번.   {{ problem.question }}</span>
                </v-col>

                <v-col cols="12" class="d-flex pa-0" >
                    <img v-if="problem.image" :src="problem.image" alt="Image" class="shadow-md rounded-xl w-full sm:w-64"
                    style="width: 100%; max-height: 500px;" />
                </v-col>

                <v-col cols="1" class="answer py-0">
                    <span class="title"> 제 출 : </span>
                </v-col>
                <v-col cols="11">
                    <v-text-field data-test="problem" variant="outlined" hide-details
                    auto-grow class="pa-0" v-model="answers[index]" />
                </v-col>

                <v-col cols="1  " class="answer py-0">
                    <span class="title"> 정 답 : </span>
                </v-col>
                <v-col cols="11">
                    <v-text-field data-test="problem" variant="outlined" hide-details
                    auto-grow class="pa-0" :value="problem.answer" />
                </v-col>
                <v-col cols="12" class="answer py-0">
                    <span class="title" > 해 설 : </span>
                </v-col>
                <v-col cols="12">
                    <v-textarea data-test="problem" variant="outlined" hide-details
                    auto-grow class="pa-0" :value="problem.explanation" />
                </v-col>
                <v-col cols="12" class="answer py-0">
                    <span class="title" style="font-weight: bold; font-size: large;"> Feedback : </span>
                </v-col>
                <v-col cols="12">
                    <v-textarea data-test="problem" variant="outlined" hide-details
                    auto-grow class="pa-0" :value="problem.feedback" />
                </v-col>
            </v-row>
        </v-col>
    </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from '../../src/axios';
import { useExamStart } from '../store/useExamStart'; 

const examStorePage = useExamStart();

const problems = ref([]);
const answers = ref([]);
const examResult = ref([]);
const score = ref(0);
const passFail = ref('');
const classObject = ref({
    isActive: true,
    'text-danger': false
});

function getProblem() {
    problems.value = examStorePage.problems;
    answers.value = examStorePage.answers;
    examResult.value = examStorePage.examResult;
    score.value = examStorePage.score;
    passFail.value = examStorePage.passFail === 0 ? '불합격' : '합격';
}

function getAIAnswer(index) {
    axios.post('/ai-answer', {
        question_id: examStorePage.problems[index],
        answers: answers.value[index]
    }).then(res => {
        const result = res.data.result;
        
    });
}

onMounted(() => {
    getProblem();
});

</script>

<style scoped>
.result {
    color: red;
    font-weight: bold;
}

.answer {
    align-content: center;
}

.paaFail {
    font-size: large;
    font-weight: bold;
}
</style>