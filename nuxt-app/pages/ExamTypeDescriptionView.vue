<template>
    <v-container fluid>
        <v-row >
            <v-col style="align-content: center; height: 92vh;">
                <v-col style="text-align: center;">
                    <h1>{{ examType.type_name }}</h1>
                    <h3>시간:  {{ examType.exam_time  }}</h3>
                </v-col>
                <v-col style="text-align: center;">
                    <v-textarea variant="outlined" :value="examType.description" readonly></v-textarea>
                </v-col>
                <v-col cols="12" style="text-align: center;">
                    <v-btn style="width: 22%;" color="primary" @click="testStart" >시험 시작하기</v-btn>
                </v-col>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import router from '@/router';
import axios from '../../src/axios';

const userId = ref('');
const examId = ref(0);
const examType = ref([]);

function getExamTypeStorage () {    
    // const route = router.currentRoute.value.query.userId;
    examId.value = router.currentRoute.value.query.exam_id;
    
    axios.get('/exam', {
        params: {
            exam_id: examId.value
        }
    }).then(res => {
        examType.value = res.data.rows[0];
    });
}

function testStart() {
    userId.value = router.currentRoute.value.query.userId

    router.push({
        path: '/information-test', 
        query: {
            userId: userId.value
        }
    })
}

onMounted(() => {
    getExamTypeStorage();
});

</script>

<style scoped>
</style>