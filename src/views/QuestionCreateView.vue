<template>
<v-container fluid fill-height>
    <v-row>
        <v-col class="my-5  py-5 px-3">
            <h1 style="border-bottom: 2px solid silver; width: 25%;">시험문제 출제 페이지</h1>
        </v-col>
    </v-row>

    <v-row>
        <v-col cols="12" class="px-3">
            <h2>시험유형 조회</h2>
        </v-col>
        <v-col cols="12" class="px-3 pt-0">
            <v-autocomplete label="시험유형" item-title="exam_name" item-value="exam_id"
            v-model="examTypeStore.exam_id" :items="examTypeStore.list" 
            :menu-props="{ maxHeight: '200' }" >
                <template v-slot="{ props, item}">
                    <v-list-item
                    v-bind="props"
                    :title="item.raw.type_name">
                </v-list-item>
                </template>
            </v-autocomplete>
        </v-col>
    </v-row>

    <v-row >
        <v-col cols="12" class="px-3">
            <h2>시험 문제 만들기</h2>
        </v-col>
        <v-col cols="2" class="py-0 pr-0">
            <v-text-field label="시험점수" v-model="questionPoint"></v-text-field>
        </v-col>
        <v-col cols="2" class="py-0 pr-0">
            <v-select label="시험타입" :items="questionType" v-model="questionType.value"></v-select>
        </v-col>
        <v-col cols="2" class="py-0 pr-0">
            <v-select label="기출년도" :items="qeustionYear" v-model="qeustionYear.value"></v-select>
        </v-col>
        <v-col cols="2" class="py-0 pr-0">
            <v-select label="기출회차" :items="questionAcademicYear" v-model="questionAcademicYear.value"></v-select>
        </v-col>
        <v-col cols="2" class="py-0 pr-0">
            <v-select label="시험난이도" :items="questionLevel" v-model="questionLevel.value"></v-select>
        </v-col>
    </v-row>

    <v-row>
        <v-col cols="12">
            <h3>시험 과목</h3>
        </v-col>
        <v-col class="py-0">
            <v-text-field placeholder="SQL, 프로그래밍 언어, 네트워크 분야, OS분야" v-model="questionSubject"/>
        </v-col>
    </v-row>

    <v-row>
        <v-col cols="12" class="pt-3">
            <h3>시험문제</h3>
            <v-textarea variant="outlined" v-model="question" />
        </v-col>
        <v-col v-if="questionType.value === '단답형'">
            <h3>시험문제 예문 & 코드 </h3>
            <v-text-field variant="outlined" v-model="questionProblem" />
        </v-col>
        <v-col v-else-if="questionType.value === '객관식'">
            <h3>시험문제 예문 & 코드 </h3>
            <v-col v-for="(option, index) in questionOptions" :key="index" cols="8" class="d-flex align-center px-0">
                <input :id="index + 1" :value="index + 1"  type="radio" name="examQuestion" class="examQuestion" />
                <label :for="index + 1" class="examQuestion-label">
                    <span class="examQuestion-Num">{{ option.no1 }}</span>
                </label>
                <v-text-field hide-details variant="outlined" v-model="option.value" />
            </v-col>
        </v-col>

        <v-col v-if="questionType.value === '주관식' || questionType.value === '서술형'">
            <h3>시험문제 예문 & 코드 </h3>
            <v-textarea variant="outlined" v-model="questionProblem" />
        </v-col>
    </v-row>
    <v-row>
        <v-col >
            <h3>문제풀이</h3>
            <v-textarea variant="outlined" v-model="quetionExplanation"></v-textarea>
        </v-col>
    </v-row>
    <v-row>
        <v-col class="pb-0">
            <h3>오답피드백</h3>
            <v-textarea variant="outlined" v-model="quetionFeedback"></v-textarea>
        </v-col>
    </v-row>
    <v-row>
        <v-col style="text-align: end;" class="pt-0">
            <v-btn color="indigo" :disabled="!examTypeStore.exam_id" @click="examCreateSave">저장</v-btn>
        </v-col>
    </v-row>

</v-container>
</template>

<script setup>
import { ref } from 'vue';
import useMoment from '@/mixins/useMoment.js';
import axios from '@/axios';
import { useExamTypeStore } from '@/stores/useExamTypeStore';
import router from '@/router';

const examTypeStore = useExamTypeStore();

const questionPoint = ref(0);
const questionType = ref(['주관식', '객관식', '서술형', '단답형']);
const qeustionYear = ref(['2022','2021', '2022', '2023','2024', '자체출제']);
const questionAcademicYear = ref(['1회차','2회차', '3회차', '4회차','5회차', '자체출제']);
const questionLevel = ref(['쉬움', '보통', '어려움']);
const questionSubject = ref('');
const question = ref('');
const questionProblem = ref('');
const questionOptions = ref([
    {no1: '①', value: ''}, 
    {no1: '②', value: ''}, 
    {no1: '③', value: ''}, 
    {no1: '④', value: ''},
    {no1: '⑤', value: ''} 
]);
const quetionExplanation = ref('');
const quetionFeedback = ref('');
const useMoments = useMoment();

const today = useMoments.getCreateAt();

function examCreateSave () {
    // router에서 userId 챙겨와야함
    console.log(router)
    
    let questionStorage = [];

    questionStorage = [
        { question: question.value },
        { question_points: questionPoint.value },
        { question_type: questionType.value },
        { question_year: qeustionYear.value},
        { question_academic_year: questionAcademicYear.value},
        { question_level: questionLevel.value },
        { question_subject: questionSubject.value },
        { quetion_explanation: quetionExplanation.value },
        { quetionFeedback: quetionFeedback.value}
    ];

    // 추가 수정 필요
    axios.post('/exam', {
        exam_id : examTypeStore.exam_id,
        create_at : today,
        examCreate: questionStorage.value
    }).then(res, () => {
        // console.log(res.data.rows);
    });
    
}

</script>

<style scoped>
.examQuestion {
    display: none;
}

.examQuestion-label {
    position: relative;
}

.examQuestion-Num ::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    transform: translateX(-50%);
    width: 20px; /* 체크박스의 너비 */
    height: 20px; /* 체크박스의 높이 */
}

input[type="radio"]:checked + .examQuestion-label::before {
    content: '✔'; /* 체크 마크 */
    color: red; /* 체크 마크 색상 */
    text-align: center;
    line-height: 20px; /* 세로 정렬 */
}

.examQuestion-Num:hover {
    cursor: pointer;
}

.examQuestion-Num {
    font-weight: bold;
    font-size: 25px;
    padding-right: 30px;
}
</style>