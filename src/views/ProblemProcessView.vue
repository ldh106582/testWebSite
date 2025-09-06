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
                    <h3>시험 문제 수</h3>
                </v-col>
                <v-col cols="2" class="px-0 ml-3">
                    <h3>작성자</h3>
                </v-col>
            </v-row>

            <v-row id="exam">
                <v-col cols="2" class="px-0 pt-0">
                    <v-text-field hide-details variant="outlined" readonly 
                    :value="`${getUnix(questionStorage.create_date)}-${questionStorage.exam_id}`" />
                </v-col>
                <v-col cols="2" class="px-0 pt-0 ml-3">
                    <v-text-field hide-details variant="outlined" readonly :value="questionStorage.exam_name" />
                </v-col>
                <v-col cols="2" class="px-0 pt-0 ml-3">
                    <v-text-field hide-details variant="outlined" readonly :value="questionStorage.exam_total" />
                </v-col>
                <v-col cols="2" class="px-0 pt-0 ml-3">
                    <v-text-field hide-details variant="outlined" readonly :value="questionStorage.user_id"/>
                </v-col>

                <v-col align="end">
                    <v-btn data-test="deleteQuestion" color="red" @click="deleteQuestion">삭제</v-btn>
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
                    <h3>기출년도</h3>
                </v-col>
                <v-col cols="2" class="pl-0">
                    <h3>레벨</h3>
                </v-col>
                <v-col cols="2" class="pl-0">
                    <h3>시험과목</h3>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="2" class="pl-0 py-0">
                    <v-text-field hide-details variant="outlined" readonly :value="`${questionStorage.create_date}-${questionStorage.question_id}`" />
                </v-col>
                <v-col cols="2" class="pl-0 pt-0">
                    <v-text-field data-test="point" hide-details variant="outlined" type="number" v-model="questionStorage.question_point" />
                </v-col>
                <v-col cols="2" class="pl-0 pt-0">
                    <v-select hide-details variant="outlined" :items="questionYears" v-model="questionStorage.question_year" />
                </v-col>
                <v-col cols="2" class="pl-0 pt-0">
                    <v-select hide-details variant="outlined" :items="questionRounds" 
                    v-model="questionStorage.question_round" />
                </v-col>
                <v-col cols="2" class="pl-0 pt-0">
                    <v-select hide-details variant="outlined" :items="questionLevels" v-model="questionStorage.question_level" />
                </v-col>
                <v-col cols="2" class="pl-0 pt-0">
                    <v-autocomplete data-test="subject" variant="outlined" item-title="subject" item-value="subject_id" :items="subjects"
                    v-model="questionStorage.subject" />
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
                    <v-textarea hide-details variant="outlined" v-model="questionStorage.question" />
                </v-col>
                <v-col cols="3" class="pl-0 pt-0">
                    <v-textarea hide-details variant="outlined"  v-model="questionStorage.answer" />
                </v-col>
            </v-row>

            <v-row>
                <v-col style="align-items: center;" class="pl-0 d-flex">
                    <h3>시험문제 예문 & 코드</h3>
                    <FileUpload mode="basic" @select="onFileSelect" customUpload auto style="border: 1px solid black; border-radius: 9.8px;" 
                    severity="secondary" class="p-button-outlined pa-2 ml-5" chooseLabel="change Upload" />
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" class="pl-0 pt-0 d-flex" id="delete">
                    <v-btn v-if="src || questionStorage.problem_image" class="pa-0" id="isDelete" size="10" @click="deleteImage">X</v-btn>
                    <img v-if="src" :src="src" alt="Image" class="shadow-md rounded-xl w-full sm:w-64" style="width: 100%; max-height: 300px;"/>
                    <img v-if="questionStorage.problem_image" :src="questionStorage.problem_image" alt="Image" 
                    class="shadow-md rounded-xl w-full sm:w-64" style="width: 100%; max-height: 300px;"/>
                </v-col>
                <v-col cols="12" class="pa-0">
                    <v-textarea hide-details variant="outlined" v-model="questionStorage.problem" />
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" class="pl-0">
                    <h3>풀이</h3>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" class="pl-0 pt-0   ">
                    <v-textarea data-test="explanation" hide-details variant="outlined" v-model="questionStorage.problem_explanation" />
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" class="pl-0">
                    <h3>FeedBack</h3>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" class="pl-0 pt-0">
                    <v-textarea data-test="feedback" hide-details variant="outlined"  v-model="questionStorage.problem_feedback" />
                </v-col>
            </v-row>

            <v-row>
                <v-col align="end" class="pr-0">
                    <v-btn data-test="save" color="blue" class="mr-3" @click="save">저장</v-btn>
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
import FileUpload from 'primevue/fileupload';
import useFileUpload from '@/mixins/useFileUpload';
import useChangeASCIIAndBactick from '@/mixins/useChangeASCIIAndBactick';

const questionStorage = ref([]);
const subjects = ref([]);
const isCheckLoading = ref(false);
const src = ref(null);
const image = ref('');

const { questionYears, questionRounds, questionLevels } = useQuestionStorage();
const { getUnix } = useMoment();
const { getInputFile } = useFileUpload();
const { changeBactick, changeTable } = useChangeASCIIAndBactick();

function onFileSelect(event) {
    getInputFile (event, async (data) => {
        src.value = await data.result;
        image.value = await data.fd;
    });
}

async function search() {
    const questionId = router.currentRoute.value.query.question_id;
    const examId = router.currentRoute.value.query.exam_id;

    await axios.get('/qeustion-with-problem', {
        params : {
            question_id : questionId,
            exam_id : examId
        }
    }).then(async res => {
        const data = await res.data;
        subjects.value = await data.subjects;

        await data.exams.forEach(q => {
            changeTable.forEach(t => {
                q[t.key] = changeBactick(q[t.key]) ?? '';
            });
        });

        questionStorage.value = await data.exams[0];
    });
}

function deleteQuestion() {
    const confirmMsg = '문제를 삭제하시겠습니까?';
    const cancelMsg = '취소되었습니다.';
    const sucessMsg = '삭제되었습니다.';

    if (!confirm(confirmMsg)) return alert (cancelMsg);
    
    axios.delete('/question', {
        params : {
            question_id : questionStorage.value.question_id,
            problem_id : questionStorage.value.problem_id,
        }
    }).then(res => {
        const data = res.data;
        if (data.result !== true) {
            alert (sucessMsg);
            router.push({ path: '/question-list' });
        } 
    });
}

async function save() {
    const errorMsg = '저장 하는 중 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.';
    const sucessMsg = '저장되었습니다.';
    let imagePath = null;

    if (image.value) {
        await axios.post('/image-upload', image.value)
        .then(res => {
            imagePath = res.data.imagePath;
        });
    }

    axios.put('/question', {
        questionStorages : questionStorage.value,
        image : imagePath ?? questionStorage.value.problem_image
    }).then(res => {
        const data = res.data;
        data.result !== true ? alert (sucessMsg) : alert (errorMsg);
    });
}

function deleteImage() {
    if (questionStorage.value.problem_image) {
        axios.delete('/image-delete', {
            params : {
                filename : questionStorage.value.problem_image,
                problem_id : questionStorage.value.problem_id
            }
        })
        .then(res => {
            if (!res.data.result) {
                search ();
            }
        });
    } else {
        src.value = null;
        image.value = null;
    }

}

onMounted(() => {
    search();
});

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