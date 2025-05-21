<template>
    <v-container fluid class="d-flex">
        <v-col cols="12">
            <v-row v-for="(problem, index) in problems" :key="index">
                <v-col cols="10">
                    <span>{{ index + 1 }}번.   {{ problem.question }}</span>
                </v-col>
            </v-row>
        </v-col>
    </v-container>
</template>

<script>
import { ref, onMounted } from 'vue';
import router from '@/router';
import axios from '../../src/axios';



</script>

<style scoped>

</style>