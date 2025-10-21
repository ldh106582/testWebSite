<template>
    <v-container fluid class="d-flex align-center justify-center" style="height: 100vh;">
        <v-row justify="center">
            <v-col cols="12">
                <v-row>
                    <v-col style="text-align: center;">
                        <h1>{{ exam.exam_name }}</h1>
                        <h3>시간: {{ exam.exam_time }}</h3>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6" lg="3" xs="6" class="py-0">
                        <v-autocomplete data-test="subject_id" label="시험과목"
                        :items="subjects" item-title="subject" item-value="subject_id" v-model="subjects.subject_id"/>
                    </v-col>
                    <v-col cols="6" lg="3" xs="6" class="py-0">
                        <v-select data-test="type" label="시험타입" 
                        :items="questionTypes" :item-title="questionTypes.title" :item-value="questionTypes.value"
                        v-model="selectType" />
                    </v-col>
                    <v-col cols="6" lg="3" xs="6" class="py-0">
                        <v-select data-test="year" label="기출년도" :items="questionYears" v-model="selectYear" />
                    </v-col>
                    <v-col cols="6" lg="3" xs="6" class="py-0">
                        <v-select data-test="academinYear" label="기출회차" :items="questionRounds" v-model="selectRound" />
                    </v-col>
                </v-row>
                <v-row>
                <v-col class="py-0" style="text-align: center;">
                    <v-textarea variant="outlined" :value="exam.exam_des" readonly />
                </v-col>
                </v-row>
                <v-row justify="center">
                <v-col cols="12" class="d-flex justify-center">
                    <v-btn text="시험 시작하기" color="primary" @click="testStart" block />
                </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import router from '@/router';
import axios from '../../src/axios';
import useQuestionStorage from '@/mixins/useQuestionStorage';

const userId = ref('');
const examId = ref(0);
const exam = ref([]);
const subjects = ref([]);
const selectType = ref(1);
const selectYear = ref('');
const selectRound = ref('');

const { questionTypes, questionYears, questionRounds } = useQuestionStorage();

function getExamTypeStorage() {
    examId.value = router.currentRoute.value.query.exam_id;
    userId.value = router.currentRoute.value.query.user_id;
    
    axios.get('/exam-join-subject', {
        params: {
            exam_id: examId.value
        }
    }).then(res => {
        exam.value = res.data.rows[0];
        subjects.value = res.data.rows;
    });
}

function testStart() {
    router.push({
        path : '/exam-start', 
        query : {
            user_id : userId.value,
            exam_id : examId.value,
            exam_total : exam.value.exam_total,
            subject_id : subjects.value.subject_id,
            question_type : selectType.value,
            question_year : selectYear.value,
            question_round : selectRound.value,
        }
    });
}

onMounted(() => {
    getExamTypeStorage();
});

</script>

<style scoped>
</style>