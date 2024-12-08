<template>
    <v-container fluid>
        <v-row >
            <v-col style="align-content: center; height: 92vh;">
                <v-col style="text-align: center;">
                    <h1>Linux Matser 2급 (2차)</h1>
                    <h3>시간 1 시간 30분</h3>
                </v-col>
                <v-col cols="12" style="text-align: center;">
                    <v-btn style="width: 22%;" color="primary" @click="testStart" >시험 시작하기</v-btn>
                </v-col>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref } from 'vue';
import router from '@/router';

const userId = ref('');

function testStart() {
    userId.value = router.currentRoute.value.query.userId

}


</script>

<style scoped>
</style>