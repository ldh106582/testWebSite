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
        <v-col cols="12" class="px-3 py-0">
            <v-autocomplete label="시험유형" item-title="exam_name" item-value="exam_id"
            v-model="examStore.exam_id" :items="examStore.list" 
            :menu-props="{ maxHeight: '200' }" >
                <template v-slot="{ props, item}">
                    <v-list-item
                    v-bind="props"
                    :title="item.raw.type_name">
                </v-list-item>
                </template>
            </v-autocomplete>
        </v-col>
        <v-col cols="12" class="py-0" style="text-align: end;">
            <v-btn color="indigo" @click="subjectSearch">조회하기</v-btn>
        </v-col>
    </v-row>

    <div v-if="isCheckExamId">
        <v-row>
            <v-col cols="12" class="px-3">
                <h2>시험 구성</h2>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="2" class="py-0 pr-0">
                <v-autocomplete label="시험과목" item-title="subject" item-value="subject_id" :items="subjects"
                v-model="subjects.subject_id" />
            </v-col>
            <v-col cols="2" class="py-0 pr-0">
                <v-text-field label="시험점수" type="number" v-model="questionPoint"></v-text-field>
            </v-col>
            <v-col cols="2" class="py-0 pr-0">
                <v-select label="시험난이도" :items="questionLevels" v-model="selectedLevel"></v-select>
            </v-col>
            <v-col cols="2" class="py-0 pr-0">
                <v-select label="시험타입" :items="questionTypes" v-model="selectedType"></v-select>
            </v-col>
            <v-col cols="2" class="py-0 pr-0">
                <v-select label="기출년도" :items="questionYears" v-model="selectedYear"></v-select>
            </v-col>
            <v-col cols="2" class="py-0 pr-0">
                <v-select label="기출회차" :items="questionAcademicYears" v-model="selectedAcademicYear"></v-select>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="9" class="pt-0" >
                <v-col cols="12" class="d-flex pa-0">
                    <h3 class="mr-5">시험문제</h3>
                    <FileUpload mode="basic" @select="onFileSelect" customUpload auto severity="secondary" class="p-button-outlined pa-0" chooseLabel="Upload" />
                </v-col>
                <v-col cols="12" class="d-flex pa-0" style="border: 1px solid black; max-width: 100%; max-height: 150px;">
                    <img v-if="src" :src="src" alt="Image" class="shadow-md rounded-xl w-full sm:w-64" style="width: 100%; max-height: 150px;"/>
                    <v-textarea v-else variant="outlined" hide-details v-model="question" />
                </v-col>
            </v-col>
            <v-col cols="3" class="pt-0">
                <h3>정답</h3>
                <v-textarea variant="outlined" hide-details @keydown.enter.prevent="addAnswer" v-model="addResult"/>
            </v-col>
            <v-col v-if="questionTypes === '단답형'">
                <h3>시험문제 예문 & 코드 </h3>
                <v-text-field variant="outlined" hide-details v-model="problem" />
            </v-col>
            <v-col v-else-if="questionTypes === '객관식'">
                <h3>시험문제 예문 & 코드 </h3>
                <v-col v-for="(option, index) in questionOptions" :key="index" cols="8" class="d-flex align-center px-0">
                    <input :id="index + 1" :value="index + 1"  type="radio" name="examQuestion" class="examQuestion" />
                    <label :for="index + 1" class="examQuestion-label">
                        <span class="examQuestion-Num">{{ option.no1 }}</span>
                    </label>
                    <v-text-field hide-details variant="outlined" v-model="option.value" />
                </v-col>
            </v-col>

            <v-col v-if="questionTypes === '주관식' || questionTypes === '서술형'">
                <h3>시험문제 예문 & 코드 </h3>
                <v-textarea variant="outlined" hide-details v-model="problem" />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" class="pt-0">
                <h3>문제풀이</h3>
                <v-textarea variant="outlined" hide-details v-model="problemExplanation"></v-textarea>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="py-0">
                <h3>오답피드백</h3>
                <v-textarea variant="outlined" hide-details v-model="problemFeedback"></v-textarea>
            </v-col>
        </v-row>
        <v-row>
            <v-col style="text-align: end;">
                <v-btn color="indigo" :disabled="!examStore.exam_id" @click="examCreateSave">저장</v-btn>
            </v-col>
        </v-row>
    </div>
</v-container>
</template>

<script setup>
import { ref } from 'vue';
import axios from '@/axios';
import { useExamStore } from '@/stores/useExamStore';
import router from '@/router';
import useQuestionStorage from '@/mixins/useQuestionStorage';
import moment from 'moment';
import useMoment from '@/mixins/useMoment';
import FileUpload from 'primevue/fileupload';
import useFileUpload from '@/mixins/useFileUpload';

const examStore = useExamStore();
const { questionTypes, questionYears, questionAcademicYears, questionLevels } = useQuestionStorage();
const { getFullDate } = useMoment();
const { getInputFile } = useFileUpload();

const questionPoint = ref(0);
const selectedType = ref('');
const selectedYear = ref('');
const selectedAcademicYear = ref('');
const selectedLevel = ref('');
const problemExplanation = ref('');
const problemFeedback = ref('');
const problem = ref('');
const questionOptions = ref([
    {no1: '1', value: ''}, 
    {no1: '2', value: ''}, 
    {no1: '3', value: ''}, 
    {no1: '4', value: ''},
    {no1: '5', value: ''} 
]);
const question = ref('');
const answer = ref('');
const addResult = ref('답 : ');
const subjects = ref([]);
const userId = ref(router.currentRoute.value.query.userId);
const today = ref(moment().format('YYYY-MM-DD'));
const isCheckExamId = ref(false);
const src = ref(null);

async function onFileSelect (event) {
    getInputFile (event, async (data) => {
        console.log('data', data)
        src.value = data;
    });
}

function addAnswer () {
    addResult.value += `\n답 : ${answer.value}`;
}

function subjectSearch () {

    axios.get('/subject', {
        params: {
            exam_id: examStore.exam_id
        }
    }).then (res => {
        subjects.value = res.data.rows;
        isCheckExamId.value = !isCheckExamId.value;
    });
}

async function examCreateSave () {
    const errorMsg = '등록 중 오류가 발생하였습니다. 새로고침 후 다시 시도해주세요.';
    const sucessMsg = '등록되었습니다.';
    let questionStorages = [];
    let problemStorages = [];

    questionStorages = [
        { question: question.value },
        { question_points: questionPoint.value },
        { question_type: selectedType.value },
        { question_year: selectedYear.value },
        { question_academic_year: selectedAcademicYear.value},
        { question_level: selectedLevel.value },
    ];
    
    let answers = [];
    const splitAnswer = (addResult.value).split('답 : ');
    splitAnswer.forEach(s => {
        if (s !== '') {
            const jsonAnswer = {
                '답': s.replace(/\n/g, '')
            };
            answers.push(jsonAnswer);
        }
    });

    const questionValue = questionOptions.value[0].value === '' ? question.value : questionOptions.value;

    problemStorages = [
        { problem: JSON.stringify(questionValue) },
        { answer: JSON.stringify(answers) },
        { problem_explanation: problemExplanation.value },
        { problem_feedback: problemFeedback.value}
    ];

    await axios.post('/question', {
        exam_id : examStore.exam_id,
        user_id: userId.value,
        questionStorages: questionStorages,
        problemStorages: problemStorages,
        today: getFullDate(today),
        subject_id: subjects.value.subject_id 
    }).then(res => {
        const data = res.data;
        console.log(data)
        data.result === true ? alert (errorMsg) : alert (sucessMsg)
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