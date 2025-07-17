<template>
    <v-container fluid>
        <v-row>
            <v-col>
                <span style="font-size: 20px; font-weight: bold;">게시판 글쓰기</span>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <v-text-field variant="outlined" hide-details v-model="title" />
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <v-text-field variant="outlined" hide-details v-model="contents" />
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
import router from '@/router';

const title = ref('');
const contents = ref('');

const { userId } = useAuthStore();

function upload () {
    const errorMsg = '알 수 없는 오류가 발생하였습니다.';
    const list = {
        title: title.value,
        contents: contents.value
    }
    axios.post('board-upload', {
    }).then(res => {
        const data = res.data;
        if (data.result) {
            router.push('/board-upload');
        } else {
            return alert (errorMsg);
        }
    });
}

</script>

<style scoped>
</style>