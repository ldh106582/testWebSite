<template>
    <v-container fluid>
        <v-row>
            <v-col>
                <span style="font-size: 20px; font-weight: bold;">게시판 글쓰기</span>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <v-text-field variant="outlined" v-model="title" />
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <v-text-field variant="outlined" v-model="contents" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/useAuthStore';

const title = ref('');
const contents = ref('');


const { userId } = useAuthStore();


</script>

<style scoped>
</style>