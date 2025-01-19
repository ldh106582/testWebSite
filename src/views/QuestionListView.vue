<template>
    <v-container fluid class="mx-2">
        <v-row>
            <v-col class="my-5  py-5 px-3">
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
            <v-col cols="2">
                <v-text-field hide-details variant="outlined" type="date" />
            </v-col>
            <v-col cols="2">
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
        </v-row>


    </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useExamTypeStore } from '@/stores/useExamTypeStore';
import useQuestionStorage from '@/mixins/useQuestionStorage';

const examTypeStore = useExamTypeStore();
const { questionTypes, questionYears, questionAcademicYears, questionLevels } = useQuestionStorage();

const selectedTypes = ref([]);
const isTypeCheckAll = ref(false);
const selectedLevels = ref([]);
const isLevelCheckAll = ref(false);
const selectedYears = ref([]);
const isYearCheckAll = ref(false);
const selectedAcademicYears = ref([]);
const isAchademicCheckAll = ref(false);

function selectedTypeAll () {
    isTypeCheckAll.value = !isTypeCheckAll.value;
    isTypeCheckAll.value !== true ? selectedTypes.value = [] : selectedTypes.value = questionTypes.value.slice();
}

function selectedLevelAll() {
    isLevelCheckAll.value = !isLevelCheckAll.value;
    isLevelCheckAll.value !== true ? selectedLevels.value = [] : selectedLevels.value = questionLevels.value.slice();
}

function selectedYearAll() {
    isYearCheckAll.value = !isYearCheckAll.value;
    isYearCheckAll.value !== true ? selectedYears.value = [] : selectedYears.value = questionYears.value.slice();
}

function selectedAcademicYearAll() {
    isAchademicCheckAll.value = !isAchademicCheckAll.value;
    isAchademicCheckAll.value !== true ? selectedAcademicYears.value = [] : selectedAcademicYears.value = questionAcademicYears.value.slice();
}

</script>

<style scoped>

</style>