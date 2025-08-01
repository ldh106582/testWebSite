<template>
    <v-container fluid>
        <div v-if="isCheckExist">
            <v-row>
                <v-col>
                    <h1 style="font-size: 20px; font-weight: bold;">게시판 글쓰기</h1>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12">
                    <h3>제목</h3>
                </v-col>
                <v-col cols="12">
                    <v-text-field variant="outlined" hide-details placeholder="글 제목을 작성해주세요." v-model="title" />
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12">
                    <h3>내용</h3>
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
        </div>

        <div v-else>
            <v-row>
                <v-col>
                    <h1 style="font-size: 20px; font-weight: bold;">작성한 글</h1>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12">
                    <h3>제목</h3>
                </v-col>
                <v-col cols="12">
                    <v-text-field variant="outlined" hide-details v-model="list.board_title" />
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12">
                    <h3>내용</h3>
                </v-col>
                <v-col cols="12" >
                    <v-textarea variant="outlined" hide-details v-model="list.board_content" auto-grow/>
                </v-col>
            </v-row>

            <v-row v-if="user_id === userId">
                <v-col cols="12" style="text-align: end;">
                    <v-btn text="수정하기" color="indigo" @click="updateData" />
                </v-col>
            </v-row>
        </div>

        <v-row>
            <v-col cols="12" style="text-align: end;">
                <span> 작성자 : </span>
                <span> {{ user_id ?? userId }}</span>
                <span> / </span>
                <span> 작성일 : </span>
                <span> {{ today }}</span>
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
const isCheckExist = ref(true);
const list = ref();
const user_id = ref();

const { userId } = useAuthStore();

async function getBoardData (board_id) {
    await axios.get('/board-data', {
        params : {
            board_id: board_id
        }
    }).then(async res => {
        list.value  = await res.data.result[0];
        today.value = list.value.update_date;
        user_id.value = list.value.user_id;
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

function updateData () {
    const checkUpdateMsg = '게시판 글을 수정하시겠습니까?';
    const sucessMSg = '수정되었습니다.';
    const errorMsg = '오류가 발생하였습니다.';

    if (!confirm (checkUpdateMsg)) return;
    axios.put('/board', {
        list: list.value,
    }).then(res => {
        const data = res.data;

        data.result === true ? alert (sucessMSg) : alert (errorMsg);
    });
}

onMounted(async () => {
    const board_id = router.currentRoute.value.query.board_id ?? false;

    if (board_id) {
        await getBoardData (board_id);
        isCheckExist.value = false;
    }
});

</script>

<style scoped>
</style>