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
                <v-autocomplete variant="outlined" hide-details label="시험유형" v-model="examTypeStore.exam_id"
                item-title="exam_name" item-value="exam_id" :items="examTypeStore.list"
                :menu-props="{ maxHeight: '200' }">
                    <template v-slot:item="{ props, item }">
                        <v-list-item
                        v-bind="props"
                        :title="item.raw.exam_name"
                        ></v-list-item>
                    </template>
                </v-autocomplete>
            </v-col>
            <v-col cols="12" class="py-0 px-3 d-flex justify-end">
                <v-btn color="indigo" @click="search">유형조회</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" class="pb-5">
                <span class="examType-search">데이터 수정 및 삭제</span>
            </v-col>
        </v-row>

        <v-row class="px-3" v-if="isCheckData">
            <v-col cols="12" class="examType-search-haeder" style="">
                <span class="examType-search">데이터를 조회해주세요.</span>
            </v-col>
        </v-row>

        <v-row class="px-3" v-else>
            <v-col class="examType-typeName px-1" cols="11" >
                <v-text-field variant="outlined" hide-details v-model="examStorages.exam_name" />
            </v-col>
            <v-col cols="1" class="d-flex align-center px-0 justify-end">
                <v-btn color="red" @click="examDelete(examStorages.exam_id)">삭제</v-btn>
            </v-col>
            <v-col class="examType-typeName px-1" cols="12" >
                <v-text-field variant="outlined" hide-details v-model="examStorages.exam_time" />
            </v-col>
            <v-col cols="12" class="examType-description px-1" >
                <v-textarea variant="outlined" hide-details class="examType-description-text" v-model="examStorages.exam_description" />
            </v-col>
            <v-col class="px-1 pt-1 d-flex justify-end" >
                <v-btn color="primary" @click="examSave(examStorages.exam_id)">저장</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import axios from '@/axios';
import { ref } from 'vue';
import { useExamTypeStore } from '@/stores/useExamTypeStore';

const isCheckData = ref(true);
const examStorages = ref([]);

const examTypeStore = useExamTypeStore();

function search () {
    const errorMsg = '알 수 없는 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.';
    const typeNameNull = '데이터를 먼저 입력해주세요.';

    if (examTypeStore.exam_id === undefined) { return alert (typeNameNull) }

    axios.get('/exam', {
        params: {
            exam_id: examTypeStore.exam_id
        }
    }).then(res => {
        const data = res.data;

        if (data.result) {
            alert (errorMsg)
        } else {
            examStorages.value = data.rows[0];
            
            isCheckData.value = false;
        }
    });
}

function examDelete (id) {
    const confirmMsg = '되돌릴 수 없습니다. 정말 삭제하시겠습니까?';
    const cancelMsg = '취소되었습니다.';
    const errorMsg ='진행 중 오류를 발견하였습니다.';
    const succesMsg = '삭제되었습니다.';

    if (!confirm (confirmMsg)) { return alert (cancelMsg) };
    
    axios.delete('/exam', {
        params: {
            exam_id: id,
        }
    }).then(res => {
        const data = res.data;

        data.result === true ? alert (errorMsg) : alert (succesMsg);

    });
}

function examSave (id) {

    const errorMsg = '저장 중 오류가 발생하였습니다. 변경사항을 확인 후 다시 시도해주세요.';
    const succesMsg = '데이터를 변경하는 성공하였습니다.';

    axios.put('/exam', {
        exam_id: id,
        exam_name: examStorages.value.exam_name,
        exam_time: examStorages.value.exam_time,
        exam_description: examStorages.value.exam_description
    }).then(res => {
        const data = res.data;

        data.result === true ? alert (errorMsg) : alert (succesMsg)
    });
}

</script>

<style lang="css" scoped>
.exam-search {
    font-weight: bold;
    font-size: 20px;
}

.exam-search-haeder {
    text-align: center; 
    border: 1px solid silver; 
    border-radius: 8px;
}

.exam-description{
    width: 100%;
}

</style>