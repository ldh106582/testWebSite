<template>
    <v-container fluid class="mx-2">
        <v-row>
            <v-col class="px-3">
                <h1>시험 문제 리스트</h1>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="2">
                <h3>Start Date</h3>
            </v-col>
            <v-col cols="2">
                <h3>End Date</h3>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="2" class="py-0 pl-2">
                <v-text-field hide-details variant="outlined" type="date" />
            </v-col>
            <v-col cols="2" class="py-0 pl-2">
                <v-text-field hide-details variant="outlined" type="date" max="9999-12-31"/>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="2" class="pb-0">
                <h3>시험 조회</h3>
            </v-col>
            <v-col cols="2" class="pb-0">
                <h3>시험 타입</h3>
            </v-col>
            <v-col cols="2" class="pb-0">
                <h3>시험 난이도</h3>
            </v-col>
            <v-col cols="2" class="pb-0">
                <h3>기출 년도</h3>
            </v-col>
            <v-col cols="2" class="pb-0">
                <h3>기출 회차</h3>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="2" class="pb-0">
                <v-autocomplete hide-details variant="outlined" :items="examTypeStore.list" item-title="exam_name" item-value="exam_id" v-model="examTypeStore.exam_id" />
            </v-col>
            <v-col cols="2" class="pb-0">
                <v-select hide-details variant="outlined" v-model="selectedTypes" :items="questionTypes" multiple>
                    <template v-slot:prepend-item>
                        <v-list-item title="All" @click="selectedTypeAll">
                            <template v-slot:prepend>
                                <v-checkbox-btn v-model="isTypeCheckAll"></v-checkbox-btn>
                            </template>
                        </v-list-item>
                        <v-divider class="mt-2"></v-divider>
                    </template>
                    <template v-slot:selection="{ item, index }">
                        <v-chip v-if="index < 1">
                            <span>{{ isTypeCheckAll === true ? "All" : item.title }}</span>
                        </v-chip>
                    <span v-if="index === 1" class="text-grey text-caption align-self-center">
                        (+{{ selectedTypes.length - 1 }} others)
                    </span>
                    </template>
                </v-select>
            </v-col>
            <v-col cols="2" class="pb-0">
                <v-select hide-details variant="outlined" v-model="selectedLevels" :items="questionLevels" multiple>
                    <template v-slot:prepend-item>
                        <v-list-item title="All" @click="selectedLevelAll">
                            <template v-slot:prepend>
                                <v-checkbox-btn v-model="isLevelCheckAll"></v-checkbox-btn>
                            </template>
                        </v-list-item>
                        <v-divider class="mt-2"></v-divider>
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
            <v-col cols="2">
                <v-select hide-details variant="outlined" v-model="selectedYears" :items="questionYears" multiple>
                    <template v-slot:prepend-item>
                        <v-list-item title="All" @click="selectedYearAll">
                            <template v-slot:prepend>
                                <v-checkbox-btn v-model="isYearCheckAll"></v-checkbox-btn>
                            </template>
                        </v-list-item>
                        <v-divider class="mt-2"></v-divider>
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
            <v-col cols="2">
                <v-select hide-details variant="outlined" v-model="selectedAcademicYears" :items="questionAcademicYears" multiple>
                    <template v-slot:prepend-item>
                        <v-list-item title="All" @click="selectedAcademicYearAll">
                            <template v-slot:prepend>
                                <v-checkbox-btn v-model="isAchademicCheckAll"></v-checkbox-btn>
                            </template>
                        </v-list-item>
                        <v-divider class="mt-2"></v-divider>
                    </template>
                    <template v-slot:selection="{ item, index }">
                        <v-chip v-if="index < 1">
                            <span>{{ isAchademicCheckAll === true ? "All" : item.title }}</span>
                        </v-chip>
                    <span v-if="index === 1" class="text-grey text-caption align-self-center">
                        (+{{ questionAcademicYears.length - 1 }} others)
                    </span>
                    </template>
                </v-select>
            </v-col>
            <v-col class="search">
                <v-btn color="primary">검색</v-btn>
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
                            <td class="question-content">Date</td>
                            <td class="question-content">시험유형</td>
                            <td class="question-content">난이도</td>
                            <td class="question-content">출제년도</td>
                            <td class="question-content">출제회차</td>
                            <td class="question-question">시험문제</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(rows, index) in questions" :key="index" id="quesions" @click="showQuestion">
                            <td class="question-content"> {{ getFullDate(rows.create_date) }}</td>
                            <td class="question-content">{{ rows.question_type}}</td>
                            <td class="question-content"> {{ rows.question_level }}</td>
                            <td class="question-content">{{ rows.question_year }}</td>
                            <td class="question-content">{{ rows.question_academic_year }}</td>
                            <td class="question-question">{{ rows.question }}</td>
                        </tr>
                    </tbody>
                </v-table>
            </v-col>
        </v-row>
        <v-row  justify="center">
            <v-col cols="1" class="pagenation">
                <v-btn class="pagenation-btn">이전</v-btn>
            </v-col>
            <v-col cols="2" class="pagenation"> 
                <div> 1 / 30 </div>
            </v-col>
            <v-col cols="1" class="pagenation">
                <v-btn class="pagenation-btn">다음</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useExamTypeStore } from '@/stores/useExamTypeStore';
import useQuestionStorage from '@/mixins/useQuestionStorage';
import useMoment from '@/mixins/useMoment';
import axios from '@/axios';

const examTypeStore = useExamTypeStore();
const { questionTypes, questionYears, questionAcademicYears, questionLevels } = useQuestionStorage();
const { getFullDate } = useMoment();

const selectedTypes = ref([]);
const isTypeCheckAll = ref(false);
const selectedLevels = ref([]);
const isLevelCheckAll = ref(false);
const selectedYears = ref([]);
const isYearCheckAll = ref(false);
const selectedAcademicYears = ref([]);
const isAchademicCheckAll = ref(false);
const questions = ref([]);
const page = ref(1);
const countPage = ref(30);

function selectedTypeAll () {
    isTypeCheckAll.value = !isTypeCheckAll.value;
    isTypeCheckAll.value !== true ? selectedTypes.value = [] : selectedTypes.value = questionTypes.value.slice();
}
function selectedLevelAll () {
    isLevelCheckAll.value = !isLevelCheckAll.value;
    isLevelCheckAll.value !== true ? selectedLevels.value = [] : selectedLevels.value = questionLevels.value.slice();
}
function selectedYearAll () {
    isYearCheckAll.value = !isYearCheckAll.value;
    isYearCheckAll.value !== true ? selectedYears.value = [] : selectedYears.value = questionYears.value.slice();
}
function selectedAcademicYearAll () {
    isAchademicCheckAll.value = !isAchademicCheckAll.value;
    isAchademicCheckAll.value !== true ? selectedAcademicYears.value = [] : selectedAcademicYears.value = questionAcademicYears.value.slice();
}

function showQuestion () {

}

function search () {

    axios.get('/question-problem-group-desc', {
        params: {
            question_type: selectedTypes.value,
            question_year: selectedYears.value,
            question_academic_year: selectedAcademicYears.value,
            question_level: selectedLevels.value,
            page: ( page.value - 1),
            countPage: ( countPage.value - 1),
        }
    }).then(res => {
        res.data.rows.forEach(q => {
            q.create_date = getFullDate(q.create_date);
        });

        questions.value = res.data.rows;
    });
}

onMounted(() => {
    search();
});

</script>

<style scoped>

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