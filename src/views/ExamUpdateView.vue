<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" class="my-5">
                <h1>시험 유형 조회 및 수정 페이지</h1>
            </v-col>
        </v-row>
        <v-row class="mb-2">
            <v-col cols="12" class="py-1">
                <span class="exam-search"> 시험유형 조회 </span>
            </v-col>
            <v-col cols="12">
                <v-autocomplete data-test="search" variant="outlined" hide-details v-model="examStore.exam_id"
                item-title="exam_name" item-value="exam_id" :items="examStore.list"
                :menu-props="{ maxHeight: '200' }" />
            </v-col>
            <v-col cols="12" class="py-0 px-3 d-flex justify-end">
                <v-btn data-test="search-click" color="indigo" @click="search">유형조회</v-btn>
            </v-col>
        </v-row>
        <v-row style="border-top: 1px solid silver;">
            <v-col cols="12">
                <span class="exam-search">시험 수정 및 삭제</span>
            </v-col>
        </v-row>

        <v-row class="px-3" v-if="isCheckData">
            <v-col cols="12" class="exam-search-haeder">
                <span class="exam-search">데이터를 조회해주세요.</span>
            </v-col>
        </v-row>

        <v-row class="px-3" v-else>
            <v-col class="px-1 py-0" cols="12" >
                <v-text-field data-test="examName" variant="outlined" hide-details label="시험유형" v-model="examStorages.exam_name" />
            </v-col>
            <v-col class="px-1" cols="12">

                <v-col class="px-0 d-flex" style="justify-content: space-between;">
                    <v-btn data-test="toggleVisible" color="primary" @click="toggleVisible">시험과목</v-btn>
                    <v-btn v-if="isToggle" data-test="addSubject" color="green" @click="addSubject">과목추가</v-btn>
                </v-col>

                <v-col v-if="isToggle" cols="12" class="pa-0 d-flex">
                    <v-col cols="4" class="px-0 py-1">
                        <h3>시험과목</h3>
                    </v-col>
                    <v-col cols="3" class="px-2 py-1">
                        <h3>과목 문제 수</h3>
                    </v-col>
                    <v-col cols="3" class="px-2 py-1">
                        <h3>과목별 합격 점수 (과락)</h3>
                    </v-col>
                    <v-col cols="3" class="px-2 py-1">
                        <h3>삭제</h3>
                    </v-col>
                </v-col>

                <v-col class="pa-0 d-flex" cols="auto" v-for="(storage, index) in subjectStorage" :key="index" style="align-items: center;">
                    <v-col v-if="isToggle" cols="4" class="px-0 py-1">
                        <v-text-field data-test="subject" variant="outlined" hide-details class="pa-0" v-model="storage.subject" />
                    </v-col>

                    <v-col v-if="isToggle" cols="3" class="px-2 py-1">
                        <v-text-field data-test="subjectTotal" type="number" variant="outlined" hide-details class="pa-0" v-model="storage.subject_total" />
                    </v-col>

                    <v-col v-if="isToggle" cols="3" class="px-2 py-1">
                        <v-text-field data-test="subjectTotal" type="number" variant="outlined" hide-details 
                        class="pa-0" v-model="storage.min_score" />
                    </v-col>

                    <v-col v-if="isToggle" class="px-3" style="text-align: start;">
                        <v-btn data-test="deleteSubject" color="red" @click="deleteSubject(index)">삭제</v-btn>
                    </v-col>
                </v-col>
            </v-col>
        </v-row>

        <v-row class="px-3">
            <v-col cols="4">
                <h3>시험 시간 (분)</h3>
            </v-col>
            <v-col cols="4">
                <h3>시험 문제 수</h3>
            </v-col>
            <v-col cols="4">
                <h3>시험 합격 점수</h3>
            </v-col>
        </v-row>

        <v-row class="px-3">
            <v-col class="px-1 py-0 d-flex">
                <v-col cols="4" class="px-0 py-0">
                    <v-text-field data-test="examTime" type="number" variant="outlined" hide-details v-model="examStorages.exam_time" />
                </v-col>
                <v-col cols="4" class="px-2 py-0">
                    <v-text-field data-test="examTotal" type="number" variant="outlined" hide-details v-model="examStorages.exam_total" />
                </v-col>
                <v-col cols="4" class="px-2 py-0">
                    <v-text-field data-test="examTotal" type="number" variant="outlined" hide-details v-model="examStorages.pass_score" />
                </v-col>
            </v-col>
        </v-row>

        <v-row class="px-2">
            <v-col>
                <h3>시험 설명</h3>
            </v-col>
        </v-row>

        <v-row class="px-2">
            <v-col cols="12" class="px-1 py-0" >
                <v-textarea data-test="examDes" variant="outlined" hide-details label="시험설명" v-model="examStorages.exam_des" />
            </v-col>
            <v-col class="px-1 pt-1 d-flex justify-end" >
                <v-btn data-test="examSave" class="mr-3" color="primary" @click="examSave(examStorages.exam_id)">저장</v-btn>
                <v-btn data-test="examDelete" color="red" @click="examDelete(examStorages.exam_id)">삭제</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import axios from '@/axios';
import { ref } from 'vue';
import { useExamStore } from '@/stores/useExamStore';

const isCheckData = ref(true);
const examStorages = ref([]);
const subjectStorage = ref([]);
const isToggle = ref(true);
const examStore = useExamStore();

function toggleVisible () {
    isToggle.value = !isToggle.value;
}

function addSubject () {
    const subject = { subject : '', subject_total : 0};
    const copie = JSON.parse(JSON.stringify(subject));
    subjectStorage.value.push(copie);
}

function search () {
    const errorMsg = '알 수 없는 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.';
    const typeNameNull = '데이터를 먼저 입력해주세요.';
    subjectStorage.value = [];

    if ( examStore.exam_id === undefined ) { return alert (typeNameNull) }

    axios.get('/exam-join-subject', {
        params: {
            exam_id : examStore.exam_id
        }
    }).then(res => {
        const data = res.data;

        if (data.result) {
            alert (errorMsg);
        } else {
            examStorages.value = data.rows[0];

            data.rows.forEach(d => {
                subjectStorage.value.push({
                    exam_id : d.exam_id,
                    subject_id : d.subject_id,
                    subject : d.subject,
                    subject_total : d.subject_total,
                    min_score : d.min_score,
                    isEmpty : true
                });
            });
            isCheckData.value = false;
        }
    });
}

function deleteSubject (index) {
    const confirmMsg = '시험 과목을 삭제하시겠습니까?';
    const cancelMsg = '취소되었습니다.';
    const succesMsg = '시험과목이 삭제되었습니다.';
    const errorMsg = '시험과목을 삭제하던 중 오류가 발생하였습니다. 다시 시도해주세요.';
    
    if (!confirm (confirmMsg)) {
        return alert (cancelMsg);
    }

    axios.delete('/subject', {
        params: {
            subject_id : subjectStorage.value[index].subject_id,
            exam_id : subjectStorage.value[index].exam_id
        }
    }).then(res => {
        const data = res.data;

        if (data.result) {
            return alert (errorMsg);
        } else {
            subjectStorage.value.splice(index, 1);
            return alert (succesMsg);
        } 
    });
}

function examDelete (id) {
    const confirmMsg = '되돌릴 수 없습니다. 정말 삭제하시겠습니까?';
    const cancelMsg = '취소되었습니다.';
    const errorMsg ='진행 중 오류를 발견하였습니다.';
    const succesMsg = '삭제되었습니다.';

    if (!confirm (confirmMsg)) { return alert (cancelMsg) };
    
    axios.delete('/exam', {
        params: {
            exam_id : id,
        }
    }).then(res => {
        const data = res.data;
        data.result === true ? alert (errorMsg) : alert (succesMsg);
    });
}

function examSave (id) {

    const errorMsg = '저장 중 오류가 발생하였습니다. 변경사항을 확인 후 다시 시도해주세요.';
    const succesMsg = '데이터를 변경하는 성공하였습니다.';
    const subjectDatas = [];

    subjectStorage.value.forEach(s => {
        subjectDatas.push({ subject_id: s.subject_id, subject : s.subject, subject_total : s.subject_total, min_score : s.min_score });
    });

    axios.put('/exam', {
        exam_id : id,
        exam_name : examStorages.value.exam_name,
        exam_des : examStorages.value.exam_des,
        exam_total : examStorages.value.exam_total,
        exam_time : examStorages.value.exam_time,
        pass_score : examStorages.value.pass_score,
        subject : subjectDatas
    }).then(res => {
        const data = res.data;
        data.result === true ? alert (errorMsg) : alert (succesMsg);
    });
}

</script>

<style lang="css" scoped>
.exam-search {
    font-weight: bold;
    font-size: 20px;
}

.exam-search-haeder {
    text-align: center; 
    border: 1px solid silver; 
    border-radius: 8px;
}

.exam-description{
    width: 100%;
}

</style>