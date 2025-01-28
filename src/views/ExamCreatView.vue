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
                <v-text-field variant="outlined" placeholder="ex)정보처리기사, 리눅스마스터 2급, 등 새롭게 만들 시험 제목"
                v-model="examName" />
            </v-col>
            <v-col style="text-align: end;" class="py-0">
                <v-btn data-test="search" color="primary" @click="searchExam">조회하기</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" class="py-0">
                <h3>시험시간</h3>
            </v-col>
            <v-col cols="12">
                <v-text-field hide-details variant="outlined" placeholder="ex)02시간30분, 01시간, 03시간 등 시험 시간 기재" 
                v-model="examTime"
                />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" class="py-0">
                <h3>시험과목</h3>
            </v-col>
            <v-col cols="12" class="px-0">
                <v-list>
                    <v-list-item-group>
                        <v-list-item v-for="(subject, index) in subjects" :key="index">
                            <v-text-field hide-details variant="outlined" 
                            placeholder="ex)1과목, 2과목, 네트워크과목, 리눅스 과목 등 시험 진행 시 part 입력" 
                            v-model="subjects[index]"/>  
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" align="end" class="py-0">
                <v-btn color="blue" @click="addSubject">추가</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" class="py-0">
                <h3>설명</h3>
            </v-col>
            <v-col cols="12" class="pb-0" style="height: 100%;">
                <v-textarea variant="outlined" placeholder="시험 진행 시 안내 및 주의사항 문구를 입력" v-model="examDes"></v-textarea>
            </v-col>
            <v-col cols="12" class="py-0" style="text-align: end;">
                <v-btn color="indigo" :disabled="isSearch" @click="saveExam">저장</v-btn>
            </v-col>x
        </v-row>
    </v-container>
</template>

<script setup>
import { ref } from 'vue';
import axios from '@/axios';

const examName = ref('');
const examDes = ref('');
const examTime = ref('');
const isSearch = ref(true);
const subjects = ref(['']);
const newSubject = ref('');


function addSubject () {
    const copie = JSON.parse(JSON.stringify(newSubject.value));
    subjects.value.push(copie)
}

function searchExam () {
    const errorMsg = '데이터를 등록해주세요.';
    const resultMsg = '해당하는 시험은 이미 존재합니다.'
    const nullMsg = '주제를 입력해주세요';

    if (examName.value === '') return alert (nullMsg)

    axios.get('/exam', {
        params: {
            exam_name: examName.value.replace(/ /g, '')
        }
    }).then(res => {
        const data = res.data;

        if (data.result || data.rows.length === 0) {
            alert (errorMsg);
            isSearch.value = false;
        } else {
            alert (resultMsg);
            isSearch.value = true;
        }
    });
};

function saveExam () {
    const errorMsg = '시험유형을 생성하는데 실패하였습니다.';
    const successMsg = '시험 유형을 생성하는데 성공하였습니다.';
    const nullMsg = '주제를 입력해주세요';

    if (!confirm('데이터를 저장하시겠습니까?')) {
        return
    } else if (examName.value === '') {
        return alert (nullMsg)
    }

    const examStorage = [
        {exam_name: examName.value.replace(/ /g, '')},
        {exam_des: examDes.value},
        {exam_time: examTime.value},
    ]

    axios.post('/exam', {
        examStorage: examStorage,
        subjects: subjects.value,
    }).then(res => {
        const data = res.data;        
        if (data.result) {
            alert (errorMsg)
        } else {
            alert (successMsg)
        }
    });
};


</script>

<style scoped>
</style>