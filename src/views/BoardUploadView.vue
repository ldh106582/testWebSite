<template>
    <v-container fluid>
        <v-row>
            <v-col>
                <span style="font-size: 20px; font-weight: bold;">게시판 글쓰기</span>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <v-text-field />
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/useAuthStore';

const { userId } = useAuthStore();

</script>

<style scoped>
</style>