<template>
    <v-container fluid class="mx-2">
        <v-row>
            <v-col class="px-3">
                <h1>시험 문제 리스트</h1>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="6" lg="2" xs="6">
                <span class="titles">Start Date</span>
            </v-col>
            <v-col cols="6" lg="2" xs="6">
                <span class="titles">End Date</span>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6" lg="2" xs="6" class="py-0 pl-2 titles">
                <v-text-field data-test="startDate" variant="outlined" hide-details type="date"
                :max="endDate" max="9999-12-31" v-model="startDate"/>
            </v-col>
            <v-col cols="6" lg="2" xs="6" class="py-0 pl-2 titles">
                <v-text-field variant="outlined" hide-details type="date"
                :min="startDate" max="9999-12-31" v-model="endDate"/>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="6" lg="2" xs="6" class="pb-0 titles">
                <span class="titles" style="font-weight: bold;">시험 과목</span>
                <v-autocomplete data-test="examId" variant="outlined" hide-details
                :items="examStore.list" item-title="exam_name" item-value="exam_id" v-model="examStore.exam_id" />
            </v-col>
            <v-col cols="6" lg="2" xs="6" class="pb-0 titles">
                <span>시험 타입</span>
                <v-select data-test="type" variant="outlined" hide-details v-model="selectTypes" :items="questionTypes" multiple>
                    <template v-slot:prepend-item>
                        <v-list-item title="All" @click="selectedTypeAll">
                            <template v-slot:prepend>
                                <v-checkbox-btn v-model="isTypeCheckAll" />
                            </template>
                        </v-list-item>
                        <v-divider class="mt-2" />
                    </template>
                    <template v-slot:selection="{ item, index }">
                        <v-chip v-if="index < 1">
                            <span>{{ isTypeCheckAll === true ? "All" : item.title }}</span>
                        </v-chip>
                        <span v-if="index === 1" class="text-grey text-caption align-self-center">
                            (+{{ selectTypes.length - 1 }} others)
                        </span>
                    </template>
                </v-select>
            </v-col>
            <v-col cols="6" lg="2" xs="6" class="pb-0 titles">
                <span>시험 난이도</span>
                <v-select data-test="level" variant="outlined" hide-details :items="questionLevels" v-model="selectLevels" multiple>
                    <template v-slot:prepend-item>
                        <v-list-item title="All" @click="selectedLevelAll">
                            <template v-slot:prepend>
                                <v-checkbox-btn v-model="isLevelCheckAll" />
                            </template>
                        </v-list-item>
                        <v-divider class="mt-2" />
                    </template>
                    <template v-slot:selection="{ item, index }">
                        <v-chip v-if="index < 1">
                            <span>{{ isLevelCheckAll === true ? "All" : item.title }}</span>
                        </v-chip>
                        <span v-if="index === 1" class="text-grey text-caption align-self-center">
                            (+{{ questionLevels.length - 1 }} others)
                        </span>
                    </template>
                </v-select>
            </v-col>
            <v-col cols="6" lg="2" xs="6" class="pb-0 titles">
                <span>기출 년도</span>
                <v-select data-test="year" variant="outlined" hide-details :items="questionYears" v-model="selectYears" multiple>
                    <template v-slot:prepend-item>
                        <v-list-item title="All" @click="selectedYearAll">
                            <template v-slot:prepend>
                                <v-checkbox-btn v-model="isYearCheckAll" />
                            </template>
                        </v-list-item>
                        <v-divider class="mt-2" />
                    </template>
                    <template v-slot:selection="{ item, index }">
                        <v-chip v-if="index < 1">
                            <span>{{ isYearCheckAll === true ? "All" : item.title }}</span>
                        </v-chip>
                        <span v-if="index === 1" class="text-grey text-caption align-self-center">
                            (+{{ questionYears.length - 1 }} others)
                        </span>
                    </template>
                </v-select>
            </v-col>

            <v-col cols="6" lg="2" xs="6" class="pb-0 titles">
                <span>기출 회차</span>
                <v-select data-test="academic" variant="outlined" hide-details :items="questionRounds" v-model="selectRounds" multiple>
                    <template v-slot:prepend-item>
                        <v-list-item title="All" @click="selectedRoundAll">
                            <template v-slot:prepend>
                                <v-checkbox-btn v-model="isRoundCheckAll" />
                            </template>
                        </v-list-item>
                        <v-divider class="mt-2" />
                    </template>
                    <template v-slot:selection="{ item, index }">
                        <v-chip v-if="index < 1">
                            <span>{{ isRoundCheckAll === true ? "All" : item.title }}</span>
                        </v-chip>
                        <span v-if="index === 1" class="text-grey text-caption align-self-center">
                            (+{{ questionRounds.length - 1 }} others)
                        </span>
                    </template>
                </v-select>
            </v-col>
            <v-col class="search ml-2 mt-5 py-0">
                <v-btn data-test="search" color="primary" class="mt-3" @click="search">검색</v-btn>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12">
                <div>
                    <p class="question-title">시험 문제 리스트</p>
                </div>
                <v-table>
                    <thead>
                        <tr class="question-header">
                            <td class="question-content" style="min-width: 120px;">Date</td>
                            <td class="question-content" style="min-width: 100px;">시험유형</td>
                            <td class="question-content" style="min-width: 80px;">난이도</td>
                            <td class="question-content" style="min-width: 100px;">출제년도</td>
                            <td class="question-content" style="min-width: 100px;">출제회차</td>
                            <td class="question-question" style="min-width: 350px;">시험문제</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr data-test="questions" v-for="(rows, index) in questions" :key="index" id="quesions" @click="showQuestion(rows, index)">
                            <td class="question-content"> {{ getFullDate(rows.create_date) }}</td>
                            <td class="question-content">{{ rows.question_type}}</td>
                            <td class="question-content"> {{ rows.question_level }}</td>
                            <td class="question-content">{{ rows.question_year }}</td>
                            <td class="question-content">{{ rows.question_round }}</td>
                            <td class="question-question">{{ rows.question }}</td>
                        </tr>
                    </tbody>
                </v-table>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col cols="4" lg="1" xs="4" class="pagenation">
                <v-btn class="pagenation-btn" @click="prevent">이전</v-btn>
            </v-col>
            <v-col cols="4" lg="1" xs="4" class="pagenation"> 
                <div> {{ page }} / {{ totalPage }} 페이지 </div>
            </v-col>
            <v-col cols="4" lg="1" xs="4" class="pagenation">
                <v-btn class="pagenation-btn" @click="next">다음</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useExamStore } from '@/stores/useExamStore';
import useQuestionStorage from '@/mixins/useQuestionStorage';
import useMoment from '@/mixins/useMoment';
import axios from '@/axios';
import moment from 'moment';
import router from '@/router';
import useChangeASCIIAndBactick from '@/mixins/useChangeASCIIAndBactick';

const examStore = useExamStore();
const { questionTypes, questionYears, questionRounds, questionLevels } = useQuestionStorage();
const { getFullDate } = useMoment();
const { changeBactick, changeTable } = useChangeASCIIAndBactick();

const selectTypes = ref([]);
const isTypeCheckAll = ref(false);
const selectLevels = ref([]);
const isLevelCheckAll = ref(false);
const selectYears = ref([]);
const isYearCheckAll = ref(false);
const selectRounds = ref([]);
const isRoundCheckAll = ref(false);
const questions = ref([]);
const page = ref(1);
const countPage = ref(30);
const startDate = ref();
const totalPage = ref(0);
const endDate = ref(moment().format('YYYY-MM-DD'));

function selectedTypeAll() {
    isTypeCheckAll.value = !isTypeCheckAll.value;
    isTypeCheckAll.value !== true ? selectTypes.value = [] : selectTypes.value = questionTypes.value.slice();
}
function selectedLevelAll() {
    isLevelCheckAll.value = !isLevelCheckAll.value;
    isLevelCheckAll.value !== true ? selectLevels.value = [] : selectLevels.value = questionLevels.value.slice();
}
function selectedYearAll() {
    isYearCheckAll.value = !isYearCheckAll.value;
    isYearCheckAll.value !== true ? selectYears.value = [] : selectYears.value = questionYears.value.slice();
}
function selectedRoundAll() {
    isRoundCheckAll.value = !isRoundCheckAll.value;
    isRoundCheckAll.value !== true ? selectRounds.value = [] : questionRounds.value = questionRounds.value.slice();
}

function showQuestion(rows, index) {
    router.push({
        path: '/problem-Process',
        query: {
            exam_id: rows.exam_id,
            question_id: rows.question_id 
        }
    });
}

async function search() {
    await axios.get('/question-problem-group-desc', {
        params: {
            start_date : startDate.value,
            end_date : endDate.value,
            question_type : selectTypes.value,
            question_year : selectYears.value,
            question_round : selectRounds.value,
            question_level : selectLevels.value,
            exam_id: examStore.exam_id === undefined ? undefined : examStore.exam_id,
            page: ( page.value - 1),
            countPage: ( countPage.value - 1),
        }
    }).then(res => {
        const data = res.data;
        totalPage.value = Math.ceil(data.total_page[0].total_page)

        data.rows.forEach(q => {
            changeTable.forEach(t => {
                q[t.key] = changeBactick(q[t.key]);
            });
        });
        questions.value = data.rows;
    });
}

function prevent() {
    const prvMsg = '첫 번째 페이지입니다.';
    page.value <= 1 ? alert (prvMsg) : page.value--;
    search();
}

function next() {
    const nextMsg = '마지막 페이지입니다.';
    totalPage.value <= page.value ? alert (nextMsg) : page.value++;
    search();
}

onMounted(() => {
    search();
});

</script>

<style scoped>

.titles {
    font-weight: bold;
}

.question-title {
    font-size: 35px;
    font-weight: bold;
}

.question-header{
    font-size: 15px;
    font-weight: bold;
}

td{
    border-bottom: 1px solid black;
}

.question-content{
    width: 10%;
}

.question-question{
    width: 50%;
}

#quesions:hover {
    cursor: pointer;
}

.search {
    align-content: center;
    text-align: end;
}

.pagenation {
    text-align: center;
}

.pagenation-btn:hover {
    background: silver;
    animation-name: pagenation-btn;
    background-size: 0% 100%; /* 초기 배경 크기 */
    animation-duration: 1s; /* 애니메이션 지속 시간 */
}

@keyframes pagenation-btn {
    0% {
        background-color: transparent; /* 시작은 투명 */
    }
    100% {
        background-color: silver; /* 끝은 은색 */
    }
}
</style>