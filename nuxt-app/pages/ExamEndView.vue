<template>
    <v-container fluid class="d-flex">
        <v-col cols="12">
            <v-row v-for="(problem, index) in problems" :key="index">
                <v-col cols="10">
                    <span>{{ index + 1 }}번.   {{ problem.question }}</span>
                </v-col>

                <v-col cols="12" class="d-flex pa-0" >
                    <img v-if="problem.problem_image" :src="problem.problem_image" alt="Image" class="shadow-md rounded-xl w-full sm:w-64"
                    style="width: 100%; max-height: 500px;" />
                </v-col>

                <v-col cols="12">
                    <v-textarea v-if="problem.problem" data-test="problem" variant="outlined" hide-details
                    auto-grow v-model="problem.problem" readonly/>
                </v-col>
                
                <v-col cols="1" style="text-align: center; align-content: center;">
                    <span>제출한 답 :  </span>
                </v-col>

                <v-col>
                    <v-textarea readonly />
                </v-col>
            </v-row>
            
        </v-col>
    </v-container>
</template>

<script>
import { ref, onMounted } from 'vue';
import router from '@/router';
import axios from '../../src/axios';

function getProblem () {
    
}


onMounted(() => {
    getProblem ();
});

</script>

<style scoped>

</style>