<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" class="my-5">
                <h1>시험 추가 페이지</h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" class="mt-5">
                <h3>주제</h3>
            </v-col>
            <v-col cols="12" class="py-0">
                <v-text-field variant="outlined" placeholder="ex)정보처리기사, 리눅스마스터 2급, 등 새롭게 만들 시험" v-model="examSubject"></v-text-field>
            </v-col>
            <v-col style="text-align: end;" class="py-0">
                <v-btn data-test="search" color="primary" @click="searchExam">조회하기</v-btn>
            </v-col>
        </v-row>
        <v-row v-if="isSearch">
            <v-col cols="12" class="mt-5">
                <h3>시험 확인하기</h3>
            </v-col>
            <v-col cols="12" v-for="(examData, index) in examDatas" :key="index">
                <v-col></v-col>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" class="py-0">
                <h3>설명</h3>
            </v-col>
            <v-col cols="12" class="pb-0" style="height: 100%;">
                <v-textarea variant="outlined" placeholder="시험 진행 시 안내 및 주의사항 문구를 입력" v-model="examDescription"></v-textarea>
            </v-col>
            <v-col cols="12" class="py-0" style="text-align: end;">
                <v-btn color="blue" @click="createEaxmType">저장</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from '@/axios';

const examSubject = ref('');
const examDescription = ref('');
const examDatas = ref([]);
const isSearch = ref(false);

function searchExamType () {
    const errorMsg = '데이터가 존재하지 않습니다.';
    const nullMsg = '주제를 입력해주세요';

    if (examSubject.value === '') return alert (nullMsg)

    axios.get('/search-eaxm', {
        params: {
            examSubject: examSubject.value. replace(/ /g, '')
        }
    }).then(res => {
        const data = res.data

        if (data) {
            alert (errorMsg);
        } else {
            examDatas.value = data.rows;

            isSearch.value = true;
        }
    });
};

function createEaxmType () {
    const errorMsg = '시험유형을 생성하는데 실패하였습니다.';
    const successMsg = '시험 유형을 생성하는데 성공하였습니다.';
    const nullMsg = '주제를 입력해주세요';

    if (!confirm('데이터를 저장하시겠습니까?')) {
        return
    } else if (examSubject.value === '') {
        return alert (nullMsg)
    }
    
    axios.get('/create-examType', {
        params: {
            examSubject: examSubject.value. replace(/ /g, ''),
            examDescription: examDescription.value
        }
    }).then(res => {
        const data = res.data

        if (data.result) {
            alert (errorMsg)
        } else {
            alert (successMsg)
        }
    });
};

onMounted(() => {

});

</script>

<style scoped>
</style>