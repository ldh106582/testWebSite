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
        <v-col class="mt-5 pt-5" v-if="examType.value === '단답형'">
            <h3>시험문제</h3>
            <v-text-field variant="outlined" v-model="examQuestion" />
        </v-col>
        <v-col class="mt-5 pt-5" v-else-if="examType.value === '객관식'">
            <h3>시험문제</h3>
            <v-col v-for="(option, index) in options" :key="index" cols="8" class="d-flex align-center px-0">
                <input :id="index + 1" :value="index + 1"  type="radio" name="examQuestion" class="examQuestion" />
                <label :for="index + 1" class="examQuestion-label">
            <span class="examQuestion-Num">{{ option }}</span>
        </label>
        <v-text-field hide-details variant="outlined" v-model="examQuestion" />
            </v-col>
        </v-col>
        <v-col class="mt-5 pt-5" v-if="examType.value === '주관식' || examType.value === '서술형'">
            <h3>시험문제</h3>
            <v-textarea variant="outlined" v-model="examQuestion" />
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
const options = ref(['①', '②', '③', '④', '⑤']);
const today = useMoments.getCreateAt();

function examCreateSave () {

    examCreate.value = [
        { examSelect: examSelect.value.value },
        { examType: examType.value.value },
        { difficulty: difficulty.value.value },
        { eaxmYear: eaxmYear.value.value },
        { eaxmAcademicYear: eaxmAcademicYear.value.value},
        { examScore: examScore.value },
        { examNumber:examNumber.value },
        { examQuestion: examQuestion.value },
        { examExplanation: examExplanation.value },
        { examFeedback: examFeedback.value}
    ];

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