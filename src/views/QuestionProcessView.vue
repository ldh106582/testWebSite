<template>
    <v-container fluid class="ma-3">
        <v-row>
            <v-col cols="12" class="px-0">
                <h1>시험 상세 페이지</h1>
            </v-col>
        </v-row>
        <v-row v-if="isCheckLoading">
            <v-col class="loading">
                <h3>해당 내용을 조회하고 있습니다.</h3>
            </v-col>
        </v-row>
        <div v-else>
            <v-row class="mt-2">
                <v-col class="px-0" style="border-bottom: 2px solid black;">
                    <h2>Exam</h2>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="2" class="px-0">
                    <h3>유형 번호</h3>
                </v-col>
                <v-col cols="2" class="px-0 ml-3">
                    <h3>유형 이름</h3>
                </v-col>
                <v-col cols="2" class="px-0 ml-3">
                    <h3>작성자</h3>
                </v-col>
            </v-row>

            <v-row id="exam">
                <v-col cols="2" class="px-0 pt-0">
                    <v-text-field hide-details variant="outlined" :value="`${questionStorage.create_date}-${questionStorage.exam_id}`" />
                </v-col>
                <v-col cols="2" class="px-0 pt-0 ml-3">
                    <v-text-field hide-details variant="outlined" :value="questionStorage.exam_name" />
                </v-col>
                <v-col cols="2" class="px-0 pt-0 ml-3">
                    <v-text-field hide-details variant="outlined" :value="questionStorage.user_id"/>
                </v-col>

                <v-col align="end">
                    <v-btn color="red" @click="deleteQuestion">삭제</v-btn>
                </v-col>
            </v-row>

            <v-row class="mt-2">
                <v-col class="px-0" style="border-bottom: 2px solid black;">
                    <h2>Question</h2>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="2" class="pl-0">
                    <h3>번호</h3>
                </v-col>
                <v-col cols="2" class="pl-0">
                    <h3>점수</h3>
                </v-col>
                <v-col cols="2" class="pl-0">
                    <h3>년도</h3>
                </v-col>
                <v-col cols="2" class="pl-0">
                    <h3>Academic_Year</h3>
                </v-col>
                <v-col cols="2" class="pl-0">
                    <h3>레벨</h3>
                </v-col>
                <v-col cols="2" class="pl-0">
                    <h3>주제</h3>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="2" class="pl-0 py-0">
                    <v-text-field hide-details variant="outlined" :value="`${questionStorage.create_date}-${questionStorage.question_id}`" />
                </v-col>
                <v-col cols="2" class="pl-0 pt-0">
                    <v-text-field hide-details variant="outlined" type="number" v-model="questionStorage.question_points" />
                </v-col>
                <v-col cols="2" class="pl-0 pt-0">
                    <v-select hide-details variant="outlined" :items="questionYears" v-model="questionStorage.question_year" />
                </v-col>
                <v-col cols="2" class="pl-0 pt-0">
                    <v-select hide-details variant="outlined" :items="questionAcademicYears" 
                    v-model="questionStorage.question_academic_year" />
                </v-col>
                <v-col cols="2" class="pl-0 pt-0">
                    <v-select hide-details variant="outlined" :items="questionLevels" v-model="questionStorage.question_level" />
                </v-col>
                <v-col cols="2" class="pl-0 pt-0">
                    <v-select hide-details variant="outlined" :items="subjects" 
                    item-title="subject" item-value="subject_id" v-model="questionStorage.subject" />
                </v-col>
            </v-row>

            <v-row>
                <v-col class="px-0 pt-0" style="border-bottom: 2px solid black;">
                    <h2>Problem</h2>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="9" class="pl-0">
                    <h3>문제</h3>
                </v-col>
                <v-col cols="3" class="pl-0">
                    <h3>답</h3>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="9" class="pl-0 pt-0">
                    <v-textarea hide-details variant="outlined" v-model="questionStorage.problem" />
                </v-col>
                <v-col cols="3" class="pl-0 pt-0">
                    <v-textarea hide-details variant="outlined" @keydown.enter.prevent="addAnswer" v-model="addResult" />
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" class="pl-0">
                    <h3>풀이</h3>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" class="pl-0 pt-0   ">
                    <v-textarea hide-details variant="outlined" v-model="questionStorage.problem_explanation" />
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" class="pl-0">
                    <h3>FeedBack</h3>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" class="pl-0 pt-0">
                    <v-textarea hide-details variant="outlined"  v-model="questionStorage.problem_feedback" />
                </v-col>
            </v-row>

            <v-row>
                <v-col align="end" class="pr-0">
                    <v-btn color="blue" class="mr-3" @click="save">저장</v-btn>
                </v-col>
            </v-row>
        </div>
    </v-container>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from '@/axios';
import router from '@/router';
import useMoment from '@/mixins/useMoment';
import useQuestionStorage from '@/mixins/useQuestionStorage';

const questionStorage = ref([]);
const subjects = ref([]);
const isCheckLoading = ref(false);
const addResult = ref('');
const { questionTypes, questionYears, questionAcademicYears, questionLevels } = useQuestionStorage();

const { getUnix } = useMoment();

function addAnswer () {
    addResult.value += `\n답 : `;
}

async function search () {

    const questionId = router.currentRoute.value.query.question_id;
    const examId = router.currentRoute.value.query.exam_id;

    await axios.get('/qeustion-with-problem', {
        params: {
            question_id: questionId,
        }
    }).then(async res => {
        const data = await res.data;
        await data.rows.forEach(async q => {
            q.create_date = getUnix(q.create_date);
            addResult.value = `답 : ${q.answer.map(i => i['답'])}`;
        });
        questionStorage.value = await data.rows[0];
        subjects.value = await data.rows1;
    });
}

function deleteQuestion () {
    const confirmMsg = '문제를 삭제하시겠습니까?';
    const cancelMsg = '취소되었습니다.';
    const sucessMsg = '삭제되었습니다.';

    if (!confirm(confirmMsg)) {
        return alert (cancelMsg);
    }
    
    axios.delete('/question', {
        params: {
            question_id: questionStorage.value.question_id,
            problem_id: questionStorage.value.problem_id,
        }
    }).then(res => {
        const data = res.data;
        if (data.result !== true) {
            alert (sucessMsg);
            router.push({ path: '/question-list' });
        } 
    });
}

function save () {
    const errorMsg = '저장 하는 중 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.';
    const sucessMsg = '저장되었습니다.';

    let answers = [];
    console.log(addResult.value)
    const splitAnswer = (addResult.value).split('답 : ');
    splitAnswer.forEach(s => {
        if (s.trim() !== '') {
            const jsonAnswer = {
                '답': s.replace(/\s+/g, '')
            };
            answers.push(jsonAnswer);
        }
    });
    questionStorage.value.answer = JSON.stringify(answers)
    console.log(questionStorage.value)
    axios.put('/question', {
        questionStorages : questionStorage.value,
    }).then(res => {
        const data = res.data;
        data.result !== true ? alert (errorMsg) :  alert (sucessMsg);
    });
}

onMounted(async () => {
    search ();
})

</script>

<style scoped>
.loading {
    text-align: center;
    align-content: center;
    height: 700px;
}

#exam {
    justify-content: space-between;
}

</style>