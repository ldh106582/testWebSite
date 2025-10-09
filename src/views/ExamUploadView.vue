<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" class="my-5">
                <h1>시험 추가 페이지</h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" class="mt-5 d-flex">
                <h2>주제</h2>
                <span style="align-content  : center;" class="ml-1">(띄어쓰기 사용금지)</span>
            </v-col>
            <v-col cols="12" class="py-0">
                <v-text-field data-test="search-input" variant="outlined" placeholder="ex)정보처리기사, 리눅스마스터2급, 등 새롭게 만들 시험 제목"
                v-model="examName" />
            </v-col>
            <v-col style="text-align: end;" class="py-0">
                <v-btn data-test="search" color="primary" @click="searchExam">조회하기</v-btn>
            </v-col>
        </v-row>

        <div v-if="!isSearch">
            <v-row>
                <v-col>
                    <h2>시험</h2>
                </v-col>
            </v-row>
            
            <v-row>
                <v-col cols="4" class="py-0 pr-0">
                    <span class="titles">시간 (분)</span>
                    <v-text-field data-test="examTime" type="number" hide-details variant="outlined"
                    placeholder="ex)'100', '60' 등 분 기준 시험 시간 기재 '분' 미포함" 
                    v-model="examTime" />
                </v-col>
                <v-col cols="4" class="py-0 px-1">
                    <span class="titles">문제 수</span>
                    <v-text-field data-test="examTotal" type="number" hide-details variant="outlined" v-model="examTotal" />
                </v-col>
                <v-col cols="4" class="py-0 pl-0">
                    <span class="titles">합격 점수</span>
                    <v-text-field data-test="examTotal" type="number" hide-details variant="outlined" v-model="passScore" />
                </v-col>
            </v-row>

            <v-spacer style="border: 1px solid silver;" class="my-5"/>
            
            <v-row>
                <v-col>
                    <h2>과목</h2>
                </v-col>
            </v-row>

            <v-row class="mb-2">
                <v-col cols="12" sm="4" md="4" class="py-0 px-0">
                    <span class="titles pl-2">시험과목</span>
                </v-col>
                <v-col cols="12" sm="3" md="3" class="py-0 px-1">
                    <span class="titles">과목 출제 수</span>
                </v-col>
                <v-col cols="12" sm="3" md="3" class="py-0 px-1">
                    <span class="titles" id="subject-point">과목합격점수</span>
                </v-col>
                <v-col cols="12" sm="2" md="2" class="py-0">
                    <span class="titles" id="subject-delete">관리</span>
                </v-col>
            </v-row>

            <v-row v-for="(subject, index) in subjects" :key="index" class="mb-1 align-center">
                <v-col cols="12" sm="4" md="4" class="py-1 px-0">
                    <v-text-field data-test="subjects" hide-details variant="outlined" class="pl-2"
                        placeholder="ex)1과목, 2과목, 네트워크과목, 리눅스 과목 등"  v-model="subjects[index]" />  
                </v-col>
            
                <v-col cols="12" sm="3" md="3" class="py-1 px-1">
                    <v-text-field data-test="subjectTotal" type="number" hide-details variant="outlined" 
                    v-model="subjectTotal[index]" min="1" /> 
                </v-col>
            
                <v-col cols="12" sm="3" md="3" class="py-1 px-1">
                    <v-text-field data-test="min_score" type="number" hide-details variant="outlined" 
                    v-model="min_score[index]" min="0" max="100" />
                </v-col>
            
                <v-col cols="12" sm="2" md="2" class="py-1">
                    <div class="d-flex">
                        <v-btn class="mr-2" color="error" size="small" variant="outlined" :disabled="subjects.length <= 1"
                            @click="deleteSubject(index)" icon="mdi-delete" />
                        <v-btn v-if="index === subjects.length - 1" color="primary" size="small"
                            variant="outlined" @click="addSubject" icon="mdi-plus" />
                    </div>
                </v-col>
            </v-row>
        

            <v-spacer style="border: 1px solid silver;" class="my-5"/>

            <v-row>
                <v-col cols="12" class="py-0">
                    <h3>시험 진행 안내 사항</h3>
                </v-col>
                <v-col cols="12" class="pb-0" style="height: 100%;">
                    <v-textarea data-test="examDes" variant="outlined"
                    placeholder="시험 진행 시 안내 및 주의사항 문구를 입력" v-model="examDes" />
                </v-col>
                <v-col cols="12" class="py-0" style="text-align: end;">
                    <v-btn data-test="save" text="저장" color="indigo" @click="save" :disabled="isSearch" />
                </v-col>
            </v-row>
        </div>
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
const min_score = ref([0]);
const passScore = ref(0);

function addSubject() {
    const subjectCopie = JSON.parse(JSON.stringify(newSubject.value));
    subjects.value.push(subjectCopie);
    subjectTotal.value.push(0);
    min_score.value.push(0);
}

function searchExam() {
    const errorMsg = '데이터를 등록해주세요.';
    const resultMsg = '해당하는 시험은 이미 존재합니다.';
    const nullMsg = '주제를 입력해주세요';

    if (examName.value === '') return alert(nullMsg);

    axios.get('/exam', {
        params: {
            exam_name: examName.value.replace(/ /g, '')
        }
    }).then(res => {
        const data = res.data;

        if (data.result || data.rows.length === 0) {
            alert(errorMsg);
            isSearch.value = false;
        } else {
            alert(resultMsg);
            isSearch.value = true;
        }
    });
};

async function save() {
    const confirmMsg = '데이터를 저장하시겠습니까?';
    const cancelMsg = '취소되었습니다.';
    const errorMsg = '시험유형을 생성하는데 실패하였습니다.';
    const successMsg = '시험 유형을 생성하는데 성공하였습니다.';
    const nullMsg = '주제를 입력해주세요';
    let subjectStorage = [];

    if (!confirm(confirmMsg)) return alert(cancelMsg);
    else if (examName.value === '') return alert(nullMsg);

    const examStorage = [
        { exam_name: examName.value.replace(/ /g, '') },
        { exam_des: examDes.value },
        { exam_time: examTime.value },
        { exam_total: examTotal.value },
        { pass_score: passScore.value }
    ];

    for (let i = 0; i < subjects.value.length; i++) {
        subjectStorage.push({ subject: subjects.value[i],
            subject_total: subjectTotal.value[i],
            min_score: min_score.value[i]
        })
    }

    await axios.post('/exam', {
        examStorage: examStorage,
        subjectStorage: subjectStorage,
    }).then(res => {
        const data = res.data;        
        if (data.result) return alert(errorMsg);
        alert(successMsg);
    });
};

function deleteSubject(index) {
    subjects.value.splice(index, 1);
    subjectTotal.value.splice(index, 1);
    min_score.value.splice(index, 1);
}

</script>

<style scoped>
.v-list-item {
    padding: 0;
}

.titles {
    font-weight: bold;
}

.v-list-item--density-default:not(.v-list-item--nav).v-list-item--one-line {
    padding-inline: 0px;
    padding-top: 5px;
}

@media (max-width: 787px) {
    #subject-point {
        font-size: 12.5px;
    }

    #subject-delete{
        font-size: 14px;
    }
}
</style>