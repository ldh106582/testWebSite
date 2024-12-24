<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" class="my-5">
                <h1>시험 유형 조회 및 수정 페이지</h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" class="py-1">
                <span class="examType-search"> 시험유형 조회 </span>
            </v-col>
            <v-col cols="12">
                <v-autocomplete variant="outlined" hide-details label="시험유형" v-model="examTypeStore.type_name"
                item-title="type_name" item-value="type_name" :items="examTypeStore.list"
                :menu-props="{ maxHeight: '200' }">
                    <template v-slot:item="{ props, item }">
                        <v-list-item
                        v-bind="props"
                        :title="item.raw.type_name"
                        ></v-list-item>
                    </template>
                </v-autocomplete>
            </v-col>
            <v-col cols="12" class="py-0 px-3 d-flex justify-end">
                <v-btn color="indigo" >유형조회</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" class="pb-5">
                <span class="examType-search">데이터를 수정 및 삭제</span>
            </v-col>
        </v-row>

        <v-row class="px-3" v-if="isCheckData">
            <v-col cols="12" class="examType-search-haeder" style="">
                <span class="examType-search">데이터를 조회해주세요.</span>
            </v-col>
        </v-row>

        <v-row class="px-3" v-else>
            <v-col cols="12" class="examType-search" >
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import axios from '@/axios';
import { ref, onMounted } from 'vue';
import { useExamTypeStore } from '@/stores/useExamTypeStore';

const isCheckData = ref(true);

const examTypeStore = useExamTypeStore();

function test() {
    console.log(examTypeStore)
}

onMounted(() => {
    test();
});
</script>

<style lang="css" scoped>
.examType-search {
    font-weight: bold;
    font-size: 20px;
}

.examType-search-haeder {
    text-align: center; 
    border: 1px solid silver; 
    border-radius: 8px;
}
</style>