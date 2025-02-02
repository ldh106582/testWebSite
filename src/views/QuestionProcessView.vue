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
                <v-col cols="1" class="pl-0">
                    <h3>점수</h3>
                </v-col>
                <v-col cols="1" class="pl-0">
                    <h3>년도</h3>
                </v-col>
                <v-col cols="2" class="pl-0">
                    <h3>Academic_Year</h3>
                </v-col>
                <v-col cols="1" class="pl-0">
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
                <v-col cols="1" class="pl-0 pt-0">
                    <v-text-field hide-details variant="outlined" :value="questionStorage.question_points" />
                </v-col>
                <v-col cols="1" class="pl-0 pt-0">
                    <v-text-field hide-details variant="outlined" :value="questionStorage.question_year" />
                </v-col>
                <v-col cols="2" class="pl-0 pt-0">
                    <v-text-field hide-details variant="outlined" :value="questionStorage.question_academic_year" />
                </v-col>
                <v-col cols="1" class="pl-0 pt-0">
                    <v-text-field hide-details variant="outlined" :value="questionStorage.question_level" />
                </v-col>
                <v-col cols="2" class="pl-0 pt-0">
                    <v-text-field hide-details variant="outlined" :value="questionStorage.subject"></v-text-field>
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
                    <v-text-field hide-details variant="outlined" v-model="questionStorage.problem" />
                </v-col>
                <v-col cols="3" class="pl-0 pt-0">
                    <v-text-field hide-details variant="outlined" v-model="questionStorage.answer" />
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
                    <v-btn color="blue" class="mr-3" @click="saveAll">저장</v-btn>
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

const questionStorage = ref([]);
const problemStorage = ref([]);
const isCheckLoading = ref(false);

const { getUnix } = useMoment();

async function search () {

    const questionId = router.currentRoute.value.query.question_id;
    const examId = router.currentRoute.value.query.exam_id;

    await axios.get('/qeustion-with-problem', {
        params: {
            question_id: questionId,
        }
    }).then(async res => {
        const data = await res.data;
        console.log(data)

        await data.rows.forEach(async q => {
            q.create_date = getUnix(q.create_date);
            q.answer = JSON.stringify(q.anwser)
        });

        questionStorage.value = data.rows[0];
    });
}

function deleteQuestion () {
    
    axios.delete('/question', {
        params: {
            question_id: questionStorage.value.question_id,
            problem_id: questionStorage.value.problem_id,
        }
    }).then(res => {
        const data = res.data;
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