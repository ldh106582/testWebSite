<template>
    <v-container fluid>
        <v-row>
            <v-col>
                <span style="font-size: 20px; font-weight: bold;">게시판</span>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="6" lg="2" xs="6" class="py-0 p">
                <v-text-field variant="outlined" hide-details type="date" v-model="startDate" />
            </v-col>
            <v-col cols="6" lg="2" xs="6" class="py-0">
                <v-text-field variant="outlined" hide-details type="date" v-model="endDate" />
            </v-col>
        </v-row>
        
        <v-row>
            <v-col cols="9" lg="11" xs="7" class="pr-0">
                <v-text-field variant="outlined" hide-details v-model="searchData" />
            </v-col>
            <v-col cols="3" lg="1" xs="3" align-self="center" style="text-align: end;">
                <v-btn text="검색" color="primary" @click="search" />
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <v-table height="300px" density="compact" fixed-header>
                    <thead>
                        <tr>
                            <th class="title text-cneter" style="min-width: 30px;">
                                No.
                            </th>
                            <th class="title text-cneter" style="min-width: 120px;">
                                등록일
                            </th>
                            <th class="title text-cneter" style="min-width: 200px;">
                                제목
                            </th>
                            <th class="title text-cneter" style="min-width: 100px;">
                                작성자
                            </th>
                            <th class="title text-cneter" style="min-width: 80px;">
                                조회수
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(rows, index) in boardList" :key="index" @click="showBoard(rows)">
                            <td class="contents">{{ index + 1 }}</td>
                            <td class="contents">{{ rows.update_date }}</td>
                            <td class="contents">{{ rows.board_title }}</td>
                            <td class="contents">{{ rows.user_id }}</td>
                            <td class="contents">{{ rows.board_checkNum }}</td>
                        </tr>
                    </tbody>
                </v-table>
            </v-col>
        </v-row>

        <v-row>
            <v-col style="text-align: end;">
                <v-btn text="글쓰기" color="indigo" style="text-align: center;" @click="writeBoard" />
            </v-col>
        </v-row>
        
        <v-row>
            <v-col>
                <v-pagination :length="5"></v-pagination>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from '@/axios';
import router from '@/router';
import useMoment from '@/mixins/useMoment';
import moment from 'moment';

const { getFullDate } = useMoment();

const boardList = ref([]);
const page = ref(0);
const countPage = ref(30);
const startDate = ref('');
const endDate = ref(moment().format('YYYY-MM-DD'));
const searchData = ref('');

function search() {
    axios.get('/board', {
        params: {
            start_date : startDate.value,
            end_date : endDate.value,
            search_data : searchData.value,
            page : page.value,
            countPage : countPage.value
        }
    }).then(res => {
        res.data.result.forEach(item => {
            item.board_checkNum = item.board_checkNum ?? 0,
            item.update_date = getFullDate(item.update_date)
        });
        boardList.value =  res.data.result;
    });
}

function showBoard(rows) {
    router.push({
        path: '/board-process',
        query: {
            board_id: rows.board_id
        }
    });

}

function writeBoard() {
    router.push({
        path: '/board-process',
    });
}

onMounted(() => {
    search();
});

</script>

<style scoped>

.title {
    font-weight: bold;
    border: 1px solid silver;
}

.contents {
    border: 1px solid silver;
    cursor: pointer;
}


</style>