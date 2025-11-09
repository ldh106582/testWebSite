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
                <v-col cols="6" lg="2" xs="6" class="px-0">
                    <span class="titles">유형 번호</span>
                    <v-text-field hide-details variant="outlined" readonly 
                    :value="`${getUnix(questionStorage.create_date)}-${questionStorage.exam_id}`" />
                </v-col>
                <v-col cols="6" lg="2" xs="6" class="px-1">
                    <span class="titles">유형 이름</span>
                    <v-text-field hide-details variant="outlined" readonly :value="questionStorage.exam_name" />
                </v-col>
                <v-col cols="4" lg="2" xs="4" class="px-0">
                    <span class="titles">시험 문제 수</span>
                    <v-text-field hide-details variant="outlined" readonly :value="questionStorage.exam_total" />
                </v-col>
                <v-col cols="5" lg="2" xs="4" class="px-1">
                    <span class="titles">작성자</span>
                    <v-text-field hide-details variant="outlined" readonly :value="questionStorage.user_id"/>
                </v-col>
                <v-col class="d-flex justify-end align-center mt-2" >
                    <v-btn data-test="deleteQuestion" color="red" class="mt-2" @click="deleteQuestion">삭제</v-btn>
                </v-col>
            </v-row>

            <v-row class="mt-2">
                <v-col class="px-0" style="border-bottom: 2px solid black;">
                    <h2>Question</h2>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="6" lg="2" xs="6" class="pl-0 py-2">
                    <span class="titles">번호</span>
                    <v-text-field hide-details variant="outlined" readonly :value="`${questionStorage.create_date}-${questionStorage.question_id}`" />
                </v-col>
                <v-col cols="6" lg="2" xs="6" class="pl-0 py-2">
                    <span class="titles">점수</span>
                    <v-text-field data-test="point" hide-details variant="outlined" type="number" v-model="questionStorage.point" />
                </v-col>
                <v-col cols="6" lg="2" xs="6" class="pl-0 py-2">
                    <span class="titles">년도</span>
                    <v-select hide-details variant="outlined" :items="questionYears" v-model="questionStorage.year" />
                </v-col>
                <v-col cols="6" lg="2" xs="6" class="pl-0 py-2">
                    <span class="titles">기출년도</span>
                    <v-select hide-details variant="outlined" :items="questionRounds" v-model="questionStorage.round" />
                </v-col>
                <v-col cols="6" lg="2" xs="6" class="pl-0 py-2">
                    <span class="titles">레벨</span>
                    <v-select hide-details variant="outlined" :items="questionLevels" v-model="questionStorage.level" />
                </v-col>
                <v-col cols="6" lg="2" xs="6" class="pl-0 py-2">
                    <span class="titles">시험과목</span>
                    <v-autocomplete data-test="subject" variant="outlined"
                    item-title="subject" item-value="subject_id" :items="subjects" v-model="questionStorage.subject" />
                </v-col>
            </v-row>

            <v-row>
                <v-col class="px-0 pt-0" style="border-bottom: 2px solid black;">
                    <h2>Problem</h2>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" lg="9" xs="12" class="pl-0">
                    <h3>문제</h3>
                    <v-textarea hide-details variant="outlined" v-model="questionStorage.question" />
                </v-col>
                <v-col cols="12" lg="3" xs="12" class="pl-0">
                    <h3>답</h3>
                    <v-textarea hide-details variant="outlined"  v-model="questionStorage.answer" />
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" class="pl-0 d-flex" style="align-items: center;">
                    <h3>시험문제 예문 & 코드</h3>
                    <FileUpload mode="basic" @select="onFileSelect" customUpload auto style="border: 1px solid black; border-radius: 9.8px;" 
                    severity="secondary" class="p-button-outlined pa-1 ml-5" chooseLabel="change Upload" />
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" class="pl-0 pt-0 d-flex" id="delete">
                    <v-btn v-if="src || questionStorage.image" text="X" 
                    class="pa-0" id="isDelete" size="10" @click="deleteImage" />
                    <img v-if="src" :src="src" alt="Image" class="shadow-md rounded-xl w-full sm:w-64" style="width: 100%; max-height: 300px;"/>
                    <img v-if="questionStorage.image" :src="questionStorage.image" alt="Image" 
                    class="shadow-md rounded-xl w-full sm:w-64" style="width: 100%; max-height: 300px;"/>
                </v-col>
                <v-col v-if="questionStorage.type === 1" cols="12" class="pa-0">
                    <v-textarea variant="outlined" hide-details v-model="questionStorage.problem" />
                </v-col>
                <v-col v-else cols="12" class="pa-0">
                    <div v-for="(value, index) in questionStorage.problem" key="index">
                        <div >
                            {{  vlaue  }}
                        </div>
                    </div>
                    <!-- <v-textarea variant="outlined" hide-details v-model="questionStorage.problem" /> -->
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" class="pl-0">
                    <h3>풀이</h3>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" class="pl-0 pt-0">
                    <v-textarea data-test="explanation" hide-details variant="outlined" v-model="questionStorage.explanation" />
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" class="pl-0">
                    <h3>FeedBack</h3>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" class="pl-0 pt-0">
                    <v-textarea data-test="feedback" hide-details variant="outlined" v-model="questionStorage.feedback" />
                </v-col>
            </v-row>

            <v-row>
                <v-col align="end" class="pr-0">
                    <v-btn data-test="save" text="저장" color="blue" class="mr-3" @click="save" />
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
const { changeBactick, changeASCII, changeTable } = useChangeASCIIAndBactick();

function onFileSelect(event) {
    getInputFile(event, async (data) => {
        src.value = await data.result;
        image.value = await data.fd;
    });
}

async function search() {
    const questionId = router.currentRoute.value.query.question_id;
    const examId = router.currentRoute.value.query.exam_id;

    await axios.get('/qeustion-with-problem', {
        params : {
            question_id: questionId,
            exam_id: examId
        }
    }).then(async res => {
        const data = await res.data;
        subjects.value = await data.subjects;

        await data.exams.forEach(q => {
            changeTable.forEach(t => {
                const key = t.key;
                q[key] = changeBactick(q[key]) ?? '';
                if (key === 'problem') {
                    let value = data.exams[0][key];
  value = value
    .replace(/\s+/g, '')           // 공백 제거
    .replace(/(\w+):/g, '"$1":')   // 키에 따옴표
    .replace(/:(\w+)/g, ':"$1"');  // 값에 따옴표
  
  q[key] = JSON.parse(value);
  
  console.log('✅ 성공!');
  console.log(typeof q[key]);  // "object"
  console.log(Array.isArray(q[key]));  // true
                }
            });
        });

        // console.log(data.exams)

        // const test = (data.exams[0].problem).replace(/\\"/g, '"')
        // const test1 = 
        // console.log(JSON.parse(test1))

        questionStorage.value = await data.exams[0];
    });
}

function deleteQuestion() {
    const confirmMsg = '문제를 삭제하시겠습니까?';
    const sucessMsg = '삭제되었습니다.';

    if (!confirm(confirmMsg)) return;
    axios.delete('/question', {
        params : {
            question_id : questionStorage.value.question_id,
            problem_id : questionStorage.value.problem_id,
        }
    }).then(res => {
        const data = res.data;
        if (data.result !== true) {
            alert(sucessMsg);
            router.push({ path: '/question-list' });
        } 
    });
}

async function save() {
    const errorMsg = '저장 하는 중 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.';
    const sucessMsg = '저장되었습니다.';
    let imagePath = null;
    
    [questionStorage.value].forEach(q => {
        changeTable.forEach(t => {
            q[t.key] = changeASCII(q[t.key])
        })
    });

    if (image.value) {
        await axios.post('/image-upload', image.value)
        .then(res => {
            imagePath = res.data.imagePath;
        });
    }

    axios.put('/question', {
        questionStorages : questionStorage.value,
        image : imagePath ?? questionStorage.value.image
    }).then(res => {
        const data = res.data;
        data.result !== true ? alert(sucessMsg) : alert(errorMsg);
        search();
    });
}

function deleteImage() {
    if (questionStorage.value.image) {
        axios.delete('/image-delete', {
            params : {
                filename : questionStorage.value.image,
                problem_id : questionStorage.value.problem_id
            }
        })
        .then(res => {
            if (!res.data.result) {
                search();
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

.titles {
    font-weight: bold;
}

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