<template>
    <v-container fluid class="d-flex">
        <v-col cols="12">
            <v-row>
                <v-col cols="12" class="pa-0" style="text-align: end;">
                    <p> {{ score }}</p>
                    <p> {{ passFail }} </p>
                </v-col>
            </v-row>
            <v-row v-for="(problem, index) in problems" :key="index">
                
                <v-col cols="12" style="position: relative;">
                    <v-col v-if="examResult[index]" style="position: absolute; top: 25%; border: 1px solid red;">
                        dddd
                    </v-col>
                    <div v-else style="height: 50px; position: absolute; top: 25%; border: 1px solid red;">
                        /
                    </div>
                    <span>{{ index + 1 }}번.   {{ problem.question }}</span>
                </v-col>

                <v-col cols="12" class="d-flex pa-0" >
                    <img v-if="problem.problem_image" :src="problem.problem_image" alt="Image" class="shadow-md rounded-xl w-full sm:w-64"
                    style="width: 100%; max-height: 500px;" />
                </v-col>

                <v-col cols="1">
                    <span> 정 답 : </span>
                </v-col>
                <v-col cols="11">
                    <v-text-field v-if="problem.problem" data-test="problem" variant="outlined" hide-details value
                    auto-grow :value="problem.problem" />
                </v-col>
                
                <v-col cols="1">
                    <span> 제출한 답 : </span>
                </v-col>
                <v-col cols="11">
                    <v-text-field v-if="problem.problem" data-test="problem" variant="outlined" hide-details value
                    auto-grow :value="answers[index]" />
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

function getProblem () {
    problems.value = examStorePage.problems;
    answers.value = examStorePage.result;
    examResult.value = examStorePage.examResult;
    score.value = examStorePage.score;
    passFail.value = examStorePage.passFail === 0 ? '불합격' : '합격';
}

onMounted(() => {
    getProblem ();
});

</script>

<style scoped>

</style>