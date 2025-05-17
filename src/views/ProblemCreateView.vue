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
            <v-autocomplete data-test="examId" label="시험유형" item-title="exam_name" item-value="exam_id"
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
            <v-btn data-test="search" color="indigo" @click="subjectSearch">조회하기</v-btn>
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
                <v-select data-test="type" label="시험타입" :items="questionTypes" v-model="selectedType" />
            </v-col>
            <v-col cols="2" class="py-0 pr-0">
                <v-autocomplete data-test="subject_id" label="시험과목" item-title="subject" item-value="subject_id" :items="subjects"
                v-model="subjects.subject_id" />
            </v-col>
            <v-col cols="2" class="py-0 pr-0">
                <v-text-field data-test="point" label="시험점수" type="number" v-model="questionPoint" />
            </v-col>
            <v-col cols="2" class="py-0 pr-0">
                <v-select data-test="level" label="시험난이도" :items="questionLevels" v-model="selectedLevel" />
            </v-col>
            <v-col cols="2" class="py-0 pr-0">
                <v-select data-test="year" label="기출년도" :items="questionYears" v-model="selectedYear" />
            </v-col>
            <v-col cols="2" class="py-0 pr-0">
                <v-select data-test="academinYear" label="기출회차" :items="questionRound" v-model="questionRound" />
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="9" class="pt-0" >
                <h3>시험문제</h3>
                <v-textarea data-test="question" variant="outlined" hide-details placeholder="예제) 다음 중 옳은 것을 선택하시오" v-model="question" />
            </v-col>
            <v-col cols="3" class="pt-0">
                <h3>정답</h3>
                <v-textarea data-test="addResult" variant="outlined" hide-details
                placeholder="복수 정답일 경우 2, 3 형식으로 입력해주세요." v-model="answer"/>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" class="pt-0 d-flex">
                <FileUpload mode="basic" @select="onFileSelect" customUpload auto 
                style="border: 1px solid black; border-radius: 9.8px;" 
                severity="secondary" class="p-button-outlined pa-2" chooseLabel="Image Upload" />
            </v-col>
            <v-col cols="12" id="delete">
                <img v-if="src" :src="src" alt="Image" class="shadow-md rounded-xl w-full sm:w-64" style="width: 100%; max-height: 300px;"/>
                <v-btn v-if="src" class="pa-0" id="isDelete" size="10" @click="deleteImage"> X </v-btn>
            </v-col>
        </v-row>

        <v-row cols="12" v-if="selectedType === '단답형'">
            <v-col class="d-flex pa-0 mb-2" style="align-items: center;">
                <h3 style="justify-content: center;" class="mr-5"> 시험문제 예문 & 코드 </h3>
            </v-col>
            <v-col class="d-flex pa-0" style="border: 1px solid black; border-radius: 9.8px; max-width: 100%; max-height: 150px;">
                <v-textarea data-test="problem" variant="outlined" hide-details 
                placeholder="작성하고 싶은 예문 혹은 문제를 작성해주세요." v-model="problem" />
            </v-col>
        </v-row>
            
        <v-row v-else-if="selectedType === '객관식'">
            <v-col cols="12" class="d-flex pa-0 mb-2" style="align-items: center;">
                <h3 style="justify-content: center;" class="mr-5"> 시험문제 예문 & 코드 </h3>
            </v-col>
            <v-col cols="12" class="d-flex pa-0 mb-2" style="border: 1px solid black; border-radius: 9.8px;">
                <v-textarea variant="outlined" hide-details placeholder="작성하고 싶은 예문 혹은 문제를 작성해주세요." v-model="problem" />
            </v-col>
            <v-col v-for="(option, index) in questionOptions" :key="index" cols="8" class="d-flex align-center px-0">
                <input :id="index + 1" :value="index + 1"  type="radio" name="examQuestion" class="examQuestion" />
                <label :for="index + 1" class="examQuestion-label">
                    <span class="examQuestion-Num">{{ option.no1 }}</span>
                </label>
                <v-text-field hide-details variant="outlined" placeholder="작성하고 싶은 예문 혹은 문제를 작성해주세요." v-model="option.value" />
            </v-col>
        </v-row>

        <v-row v-if="selectedType === '주관식' || selectedType === '서술형'">
            <v-col cols="12" class="d-flex pa-0 mb-2" style="align-items: center;">
                <h3 style="justify-content: center;" class="mr-5"> 시험문제 예문 & 코드 </h3>
            </v-col>
            <v-col cols="12" class="d-flex pa-0 mb-2" style="border: 1px solid black; border-radius: 9.8px;">
                <v-textarea variant="outlined" hide-details placeholder="작성하고 싶은 예문 혹은 문제를 작성해주세요." v-model="problem" />
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" class="pt-0">
                <h3>문제풀이</h3>
                <v-textarea data-test="problemExplanation" variant="outlined" hide-details v-model="problemExplanation" />
            </v-col>
        </v-row>

        <v-row>
            <v-col class="py-0">
                <h3>오답피드백</h3>
                <v-textarea data-test="problemFeedback" variant="outlined" hide-details v-model="problemFeedback" />
            </v-col>
        </v-row>

        <v-row>
            <v-col style="text-align: end;">
                <v-btn data-test="examCreateSave" color="indigo" :disabled="!examStore.exam_id" @click="examCreateSave">저장</v-btn>
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
const { questionTypes, questionYears, questionRound, questionLevels } = useQuestionStorage();
const { getFullDate } = useMoment();
const { getInputFile } = useFileUpload();

const questionPoint = ref(0);
const selectedType = ref('');
const selectedYear = ref('');
const selectRound = ref('');
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
const subjects = ref([]);
const userId = ref(router.currentRoute.value.query.userId);
const today = ref(moment().format('YYYY-MM-DD'));
const isCheckExamId = ref(false);
const src = ref(null);
const image = ref('');

async function onFileSelect (event) {
    getInputFile (event, async (data) => {
        src.value = await data.result;
        image.value = await data.fd;
    });
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
    let imagePath = '';

    questionStorages = [
        { question: question.value },
        { question_points: questionPoint.value },
        { question_type: selectedType.value },
        { question_year: selectedYear.value },
        { question_round: selectRound.value},
        { question_level: selectedLevel.value },
    ];

    const questionValue = questionOptions.value[0].value === '' ? question.value : questionOptions.value;
    await axios.post('/image-upload', image.value).then(res => { 
        imagePath = res.data.imagePath;
    });

    problemStorages = [
        { problem: JSON.stringify(questionValue) },
        { problem_image: imagePath },
        { answer: answer.value.toLowerCase() },
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
        data.result === true ? alert (errorMsg) : alert (sucessMsg);
    });

}

function deleteImage () {
    src.value = null;
    image.value = null;
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

#delete {
    position: relative;
}

#isDelete {
    position: absolute;
    top: 5%;
    left: 96%;
}

#isDelete :hover{
    cursor: pointer;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    background-color: silver;
    color: white;
    border: 1px solid black;
}
</style>