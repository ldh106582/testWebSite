<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" class="my-5">
                <h1>시험 추가 페이지</h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" class="mt-5 d-flex">
                <h3>주제</h3>
                <span class="ml-1">(띄워쓰기 사용금지)</span>
            </v-col>
            <v-col cols="12" class="py-0">
                <v-text-field data-test="search-input" variant="outlined" placeholder="ex)정보처리기사, 리눅스마스터 2급, 등 새롭게 만들 시험 제목"
                v-model="examName" />
            </v-col>
            <v-col style="text-align: end;" class="py-0">
                <v-btn data-test="search" color="primary" @click="searchExam">조회하기</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="4" class="py-0">
                <h3>시험시간</h3>
            </v-col>
            <v-col cols="4" class="py-0">
                <h3>시험 문제수</h3>
            </v-col>
            <v-col cols="4" class="py-0">
                <h3>합격 점수</h3>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="4">
                <v-text-field data-test="examTime" type="number" hide-details variant="outlined" placeholder="ex)'100', '60' 등 분 기준 시험 시간 기재 '분' 미포함" 
                v-model="examTime" />
            </v-col>
            <v-col cols="4">
                <v-text-field data-test="examTotal" hide-details variant="outlined" v-model="examTotal" />
            </v-col>
            <v-col cols="4">
                <v-text-field data-test="examTotal" hide-details variant="outlined" v-model="passScore" />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="4" class="py-0 mt-3">
                <h3>시험과목</h3>
            </v-col>
            <v-col cols="4" class="py-0 mt-3">
                <h3>과목 출제 수</h3>
            </v-col>
            <v-col cols="4" class="py-0 mt-3">
                <h3>과목 별 합격 점수</h3>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="4" class="pa-0">
                <v-list>
                    <v-list-item-group>
                        <v-list-item v-for="(subject, index) in subjects" :key="index">
                            <v-text-field data-test="subjects" hide-details variant="outlined" 
                            placeholder="ex)1과목, 2과목, 네트워크과목, 리눅스 과목 등 시험 진행 시 part 입력" 
                            v-model="subjects[index]"/>  
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-col>
            <v-col cols="4" class="pa-0">
                <v-list>
                    <v-list-item-group>
                        <v-list-item v-for="(total, index) in subjectTotal" :key="index">
                            <v-text-field data-test="subjectTotal" hide-details variant="outlined" v-model="subjectTotal[index]"/>  
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-col>
            <v-col cols="4" class="pa-0">
                <v-list>
                    <v-list-item-group>
                        <v-list-item v-for="(score, index) in subjectScore" :key="index">
                            <v-text-field data-test="subjecScore" hide-details variant="outlined" v-model="subjectScore[index]"/>  
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" align="end" class="py-0">
                <v-btn data-test="addSubject" color="blue" @click="addSubject">추가</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" class="py-0">
                <h3>설명</h3>
            </v-col>
            <v-col cols="12" class="pb-0" style="height: 100%;">
                <v-textarea data-test="examDes" variant="outlined" placeholder="시험 진행 시 안내 및 주의사항 문구를 입력" v-model="examDes"></v-textarea>
            </v-col>
            <v-col cols="12" class="py-0" style="text-align: end;">
                <v-btn data-test="saveExam" color="indigo" :disabled="isSearch" @click="saveExam">저장</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref } from 'vue';
import axios from '@/axios';

const examName = ref('');
const examDes = ref('');
const examTime = ref(0);
const examTotal = ref(0);
const isSearch = ref(true);
const subjects = ref(['']);
const newSubject = ref('');
const subjectTotal = ref([0]);
const subjectScore = ref([0]);
const passScore = ref(0);

function addSubject () {
    const subjectCopie = JSON.parse(JSON.stringify(newSubject.value));
    subjects.value.push(subjectCopie);
    subjectTotal.value.push(0);
}

function searchExam () {
    const errorMsg = '데이터를 등록해주세요.';
    const resultMsg = '해당하는 시험은 이미 존재합니다.';
    const nullMsg = '주제를 입력해주세요';

    if (examName.value === '') return alert (nullMsg);

    axios.get('/exam', {
        params: {
            exam_name : examName.value.replace(/ /g, '')
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

async function saveExam () {
    const confirmMsg = '데이터를 저장하시겠습니까?';
    const cancelMsg = '취소되었습니다.';
    const errorMsg = '시험유형을 생성하는데 실패하였습니다.';
    const successMsg = '시험 유형을 생성하는데 성공하였습니다.';
    const nullMsg = '주제를 입력해주세요';

    if (!confirm (confirmMsg)) {
        return alert (cancelMsg);
    } else if (examName.value === '') {
        return alert (nullMsg);
    }

    const examStorage = [
        { exam_name : examName.value.replace(/ /g, '') },
        { exam_des : examDes.value },
        { exam_time : examTime.value },
        { exam_total : examTotal.value },
        { pass_score : passScore.value }
    ];

    const subjectStorage = [
        { subject : subjects.value },
        { subject_total : subjectTotal.value },
        { subject_score : subjectScore.value },
    ];

    await axios.post('/exam', {
        examStorage : examStorage,
        subjectStorage : subjectStorage,
    }).then(res => {
        const data = res.data;        
        if (data.result) {
            alert (errorMsg);
        } else {
            alert (successMsg);
        }
    });
};

</script>

<style scoped>
</style>