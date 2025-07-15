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

        <v-row>
            <v-col>
                <v-btn text="올리기" @click="upload" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/useAuthStore';
import axios from '@/axios';

const title = ref('');
const contents = ref('');

const { userId } = useAuthStore();

function upload () {
    const list = {
        title: title.value,
        contents: contents.value
    }
    axios.post('board-upload', {
    }).then(res => {
        const data = res.data
    });
}

</script>

<style scoped>
</style>