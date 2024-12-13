<template>
<v-container fluid fill-height>
    <v-row>
        <v-col class="mt-5 pa-2">
            <h1>시험문제 출제 사이트</h1>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="2" >
            <v-select label="시험구분" :items="examSelect" v-model="examSelect.value"></v-select>
        </v-col>
        <v-col cols="2">
            <v-select label="시험유형"  :items="examType" v-model="examType.value"></v-select>
        </v-col>
        <v-col cols="2">
            <v-text-field label="시험점수" v-model="examPoint"></v-text-field>
        </v-col>
        <v-col cols="2">
            <v-select label="시험난이도" :items="difficulty" v-model="examType.value"></v-select>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="2">
            <v-select label="기출년도도" :items="eaxmYear" v-model="eaxmYear.value"></v-select>
        </v-col>
        <v-col cols="2">
            <v-select label="기출회차" :items="eaxmAcademicYear" v-model="eaxmAcademicYear.value"></v-select>
        </v-col>
        <v-col cols="2">
            <v-text-field label="시험문제 번호" v-model="examNumber"></v-text-field>
        </v-col>
    </v-row>

    <v-row>
        <v-col>
            <h3>시험문제</h3>
            <v-textarea variant="outlined"v-model="message"></v-textarea>
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <h3>문제풀이</h3>
            <v-textarea variant="outlined" v-model="message"></v-textarea>
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <h3>오답피드백</h3>
            <v-textarea variant="outlined" v-model="message"></v-textarea>
        </v-col>
    </v-row>
    <v-row>
        <v-col style="text-align: end;">
            <v-btn color="blue">저장</v-btn>
        </v-col>
    </v-row>

</v-container>
</template>

<script setup>
import { ref } from 'vue';

const examSelect = ref(['정보처리기사', 'SQLD', '네트워크관리사2급', '리눅스마스터2급']);
const examType = ref(['주관식', '객관식', '서술형', '단답형']);
const difficulty = ref(['쉬움', '보통', '어려움']);
const eaxmYear = ref(['2022','2021', '2022', '2023','2024', '제작']);
const eaxmAcademicYear = ref(['1회차','2회차', '3회차', '4회차','5회차', '자체출제']);
const examPoint = ref(0);
const examNumber = ref(0)


</script>

<style scoped>

</style>