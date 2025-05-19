<template>
    <v-container fluid>
        <v-row >
            <v-col style="align-content: center; height: 92vh;">
                <v-col style="text-align: center;">
                    <h1>{{ exam.exam_name }}</h1>
                    <h3>시간:  {{ exam.exam_time  }}</h3>
                </v-col>
                <v-col class="d-flex pa-0">
                    <v-col cols="3" class="py-0">
                        <v-autocomplete data-test="subject_id" label="시험과목"
                        item-title="subject" item-value="subject_id" :items="subjects"
                        v-model="subjects.subject_id" />
                    </v-col>
                    <v-col cols="3" class="py-0">
                        <v-select data-test="type" label="시험타입" :items="questionTypes" v-model="selectType" />
                    </v-col>
                    <v-col cols="3" class="py-0">
                        <v-select data-test="year" label="기출년도" :items="questionYears" v-model="selectYear" />
                    </v-col>
                    <v-col cols="3" class="py-0">
                        <v-select data-test="academinYear" label="기출회차" :items="questionRounds" v-model="selecteRound" />
                    </v-col>
                </v-col>
                <v-col style="text-align: center;">
                    <v-textarea variant="outlined" :value="exam.exam_des" readonly></v-textarea>
                </v-col>
                <v-col cols="12" style="text-align: center;">
                    <v-btn style="width: 22%;" color="primary" @click="testStart" >시험 시작하기</v-btn>
                </v-col>
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
const selectType = ref('');
const selectYear = ref('');
const selectRound = ref('');

const { questionTypes, questionYears, questionRounds } = useQuestionStorage();

function getExamTypeStorage () {    
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
        path : '/test-start', 
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