<template>
    <v-container fluid>
        <v-row>
            <v-col>
                <span style="font-size: 20px; font-weight: bold;">게시판 글쓰기</span>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12">
                <h2>제목</h2>
            </v-col>
            <v-col cols="12">
                <v-text-field variant="outlined" hide-details placeholder="글 제목을 작성해주세요." v-model="title" />
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12">
                <h2>내용</h2>
            </v-col>
            <v-col cols="12" >
                <v-textarea variant="outlined" hide-details placeholder="내용을 작성해주세요." v-model="contents" auto-grow/>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" style="text-align: end;">
                <v-btn text="올리기" color="indigo" @click="upload" />
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" style="text-align: end;">
                <span> 작성자 : </span>
                <span> {{ userId  }}</span>
                <span> / </span>
                <span> 작성일 : </span>
                <span> {{ today  }}</span>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/useAuthStore';
import axios from '@/axios';
import router from '@/router';
import moment from 'moment';

const title = ref('');
const contents = ref('');
const today = ref(moment().format('YYYY-MM-DD hh:mm:ss'));
const isCheckExist = ref(false);

const { userId } = useAuthStore();

function getBoardData (board_id) {
    axios.get('board', {
        params : {
            board_id: board_id
        }
    }).then(res => {
        const data  = res.data;

        
    });
    
}

function upload () {
    const sucessMSg = '등록되었습니다.';
    const errorMsg = '알 수 없는 오류가 발생하였습니다.';
    const titleMsg = '제목은 반드시 입력해야 합니다.';
    const contentsMsg = '내용을 반드시 입력해야 합니다.';

    if (title.value === '') return alert (titleMsg);
    if (contents.value === '') return alert (contentsMsg);

    const list = {
        user_id : userId,
        board_title: title.value,
        board_content: contents.value,
        update_date: today.value
    };

    axios.post('/board', {
        list: list
    }).then(res => {
        const data = res.data;
        if (data.result) {
            alert (sucessMSg);
            return router.push('/board-list');
        } else {
            return alert (errorMsg);
        }
    });
}

onMounted(() => {
    const board_id = router.currentRoute.value.query.board_id;

    if (board_id) {
        isCheckExist.value = true
        getBoardData (board_id);
    }
});

</script>

<style scoped>
</style>