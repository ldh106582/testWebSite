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
                <v-text-field variant="outlined" type="date" />
            </v-col>
            <v-col cols="2">
                <v-text-field variant="outlined" type="date" max="9999-12-31"/>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="2">
                <h3>시험 조회</h3>
            </v-col>
            <v-col cols="2">
                <h3>시험 타입</h3>
            </v-col>
            <v-col cols="2">
                <h3>시험 난이도</h3>
            </v-col>
            <v-col cols="2">
                <h3>기출 년도</h3>
            </v-col>
            <v-col cols="2">
                <h3>기출 회차</h3>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="2">
                <v-autocomplete :items="examTypeStore.list" item-title="exam_name" item-value="exam_id" v-model="examTypeStore.exam_id" />
            </v-col>
            <v-col cols="2">
                <v-select variant="outlined" v-model="selectedType" :items="questionType" multiple>
                    <template v-slot:prepend-item>
                        <v-list-item title="All" @click="selectedAll">
                            <template v-slot:prepend>
                            <v-checkbox-btn v-model="isCheckAll"></v-checkbox-btn>
                            </template>
                        </v-list-item>
                        <v-divider class="mt-2"></v-divider>
                    </template>
                    <template v-slot:selection="{ item, index }">
                        <v-chip v-if="index < 1">
                            <span>{{ isCheckAll === true ? "All" : item.title }}</span>
                        </v-chip>
                    <span v-if="index === 1" class="text-grey text-caption align-self-center">
                        (+{{ selectedType.length - 1 }} others)
                    </span>
                    </template>
                </v-select>
            </v-col>
            <v-col cols="2">
                <v-select label="시험난이도" :items="questionLevel" v-model="selectedLevel"></v-select>
            </v-col>
            <v-col cols="2">
            </v-col>
            <v-col cols="2">
            </v-col>
        </v-row>


    </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useExamTypeStore } from '@/stores/useExamTypeStore';

const examTypeStore = useExamTypeStore();

const questionType = ref(['주관식', '객관식', '서술형', '단답형']);
const selectedType = ref([]);
const isCheckAll = ref(false);
const questionLevel = ref(['쉬움', '보통', '어려움']);
const selectedLevel = ref('All')

function selectedAll () {
    isCheckAll.value = !isCheckAll.value;
    isCheckAll.value !== true ? selectedType.value = [] : selectedType.value = questionType.value.slice();
}

</script>

<style scoped>

</style>