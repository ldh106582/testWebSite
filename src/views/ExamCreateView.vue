<template>
<v-container fluid fill-height>
    <v-row>
        <v-col class="my-5  py-5 px-3">
            <h1 style="border-bottom: 2px solid silver; width: 25%;">시험문제 출제 페이지</h1>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="2" class="py-0 pr-0">
            <v-text-field label="시험점수" v-model="examScore"></v-text-field>
        </v-col>
        <v-col cols="2" class="py-0 pr-0">
            <v-select label="시험구분" :items="examSelect" v-model="examSelect.value"></v-select>
        </v-col>
        <v-col cols="2" class="py-0 pr-0">
            <v-select label="시험유형"  :items="examType" v-model="examType.value"></v-select>
        </v-col>

    </v-row>
    <v-row style="border-bottom: 1px solid black">


        <v-col cols="2" class="py-0 pr-0">
            <v-select label="기출년도" :items="eaxmYear" v-model="eaxmYear.value"></v-select>
        </v-col>
        <v-col cols="2" class="py-0 pr-0">
            <v-select label="기출회차" :items="eaxmAcademicYear" v-model="eaxmAcademicYear.value"></v-select>
        </v-col>
        <v-col cols="2" class="py-0 pr-0">
            <v-select label="시험난이도" :items="difficulty" v-model="difficulty.value"></v-select>
        </v-col>

    </v-row>

    <v-row>
        <v-col class="mt-5 pt-5">
            <h3>시험문제</h3>
            <v-textarea variant="outlined"v-model="examQuestion"></v-textarea>
        </v-col>
    </v-row>
    <v-row>
        <v-col >
            <h3>문제풀이</h3>
            <v-textarea variant="outlined" v-model="examExplanation"></v-textarea>
        </v-col>
    </v-row>
    <v-row>
        <v-col class="pb-0">
            <h3>오답피드백</h3>
            <v-textarea variant="outlined" v-model="examFeedback"></v-textarea>
        </v-col>
    </v-row>
    <v-row>
        <v-col style="text-align: end;" class="pt-0">
            <v-btn color="indigo" @click="examCreateSave">저장</v-btn>
        </v-col>
    </v-row>

</v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import useMoment from '@/mixins/useMoment.js';
import axios from '@/axios';

const examSelect = ref(['정보처리기사', 'SQLD', '네트워크관리사2급', '리눅스마스터2급']);
const examType = ref(['주관식', '객관식', '서술형', '단답형']);
const difficulty = ref(['쉬움', '보통', '어려움']);
const eaxmYear = ref(['2022','2021', '2022', '2023','2024', '자체출제']);
const eaxmAcademicYear = ref(['1회차','2회차', '3회차', '4회차','5회차', '자체출제']);
const examScore = ref(0);
const examNumber = ref(0);
const rules = ref([
    v => {
        const pattern = 100;
        const errorNumber = '최대 문제는 100번 까지 입력하실 수 있습니다.'
        if (v > 100) 
        {
            examNumber.value = 0;
            return alert (errorNumber);
        }
    }
]);
const examQuestion = ref('');
const examExplanation = ref('');
const examFeedback = ref('');
const examCreate = ref([]);
const useMoments = useMoment();
const today = useMoments.getCreateAt();


function examCreateSave () {

    examCreate.value = [examSelect.value.value, examType.value.value, difficulty.value.value, eaxmYear.value.value, eaxmAcademicYear.value.value, 
    examScore.value, examNumber.value, examQuestion.value, examExplanation.value, examFeedback.value];

    // 추가 수정 필요
    axios.get('/exam-create', {
        params :{
            create_at : today,
            examCreate: examCreate.value
        }
    }).then(res, () => {
        // console.log(res.data.rows);
    });
    
}

</script>

<style scoped>

</style>