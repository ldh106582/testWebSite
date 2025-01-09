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
            <v-autocomplete label="시험유형" item-title="type_name" item-value="type_id"
            v-model="examTypeStore.type_id" :items="examTypeStore.list" 
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
            <h2>시험 작성하기</h2>
        </v-col>
        <v-col cols="2" class="py-0 pr-0">
            <v-text-field label="시험점수" v-model="questionScore"></v-text-field>
        </v-col>
        <v-col cols="2" class="py-0 pr-0">
            <v-select label="시험타입" :items="questionType" v-model="questionType.value"></v-select>
        </v-col>
        <v-col cols="2" class="py-0 pr-0">
            <v-select label="기출년도" :items="eaxmYear" v-model="eaxmYear.value"></v-select>
        </v-col>
        <v-col cols="2" class="py-0 pr-0">
            <v-select label="기출회차" :items="eaxmAcademicYear" v-model="eaxmAcademicYear.value"></v-select>
        </v-col>
        <v-col cols="2" class="py-0 pr-0">
            <v-select label="시험난이도" :items="questionLevel" v-model="questionLevel.value"></v-select>
        </v-col>
    </v-row>

    <v-row>
                <!--수정 다 똑같은 답이 적힘 및 문제 자체를 적을 수 있어야함-->
        <v-col cols="12" class="pt-3">
            <h3>시험문제</h3>
            <v-textarea variant="outlined" v-model="questionSubject" />
        </v-col>
        <v-col v-if="questionType.value === '단답형'">
            <h3>시험문제 예문 & 코드 </h3>
            <v-text-field variant="outlined" v-model="questionProblem" />
        </v-col>
        <v-col v-else-if="questionType.value === '객관식'">
            <h3>시험문제 예문 & 코드 </h3>
            <v-col v-for="(option, index) in options" :key="index" cols="8" class="d-flex align-center px-0">
                <input :id="index + 1" :value="index + 1"  type="radio" name="examQuestion" class="examQuestion" />
                <label :for="index + 1" class="examQuestion-label">
                    <span class="examQuestion-Num">{{ option.No1 }}</span>
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
            <v-btn color="indigo" :disabled="!examTypeStore.type_id" @click="examCreateSave">저장</v-btn>
        </v-col>
    </v-row>

</v-container>
</template>

<script setup>
import { ref } from 'vue';
import useMoment from '@/mixins/useMoment.js';
import axios from '@/axios';
import { useExamTypeStore } from '@/stores/useExamTypeStore';

const examTypeStore = useExamTypeStore();

const questionType = ref(['주관식', '객관식', '서술형', '단답형']);
const questionLevel = ref(['쉬움', '보통', '어려움']);
const eaxmYear = ref(['2022','2021', '2022', '2023','2024', '자체출제']);
const eaxmAcademicYear = ref(['1회차','2회차', '3회차', '4회차','5회차', '자체출제']);
const questionScore = ref(0);
const examNumber = ref(0);
const questionProblem = ref('');
const questionSubject = ref('');
const quetionExplanation = ref('');
const quetionFeedback = ref('');
const examCreate = ref([]);
const useMoments = useMoment();
const options = ref([
    {No1: '①', value: ''}, 
    {No1: '②', value: ''}, 
    {No1: '③', value: ''}, 
    {No1: '④', value: ''},
    {No1: '⑤', value: ''} 
]);
const today = useMoments.getCreateAt();

function examCreateSave () {

    examCreate.value = [
        { examType: questionType.value.value },
        { difficulty: questionLevel.value.value },
        { eaxmYear: eaxmYear.value.value },
        { eaxmAcademicYear: eaxmAcademicYear.value.value},
        { examScore: questionScore.value },
        { examNumber:examNumber.value },
        { examQuestion: questionSubject.value },
        { examExplanation: quetionExplanation.value },
        { examFeedback: quetionFeedback.value}
    ];

    // 추가 수정 필요
    axios.post('/exam', {
        type_id : examTypeStore.type_id,
        create_at : today,
        examCreate: examCreate.value
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