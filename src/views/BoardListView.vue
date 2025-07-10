<template>
    <v-container fluid>
        <v-row>
            <v-col>
                <span style="font-size: 20px; font-weight: bold;">게시판</span>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="2">
                <v-text-field variant="outlined" hide-details type="date" v-model="startDate" />
            </v-col>
            <v-col cols="2">
                <v-text-field variant="outlined" hide-details type="date" v-model="endDate" />
            </v-col>
        </v-row>
        
        <v-row>
            <v-col cols="12">
                <v-text-field variant="outlined" hide-details v-model="searchData" />
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <v-btn text="검색" color="primary" @click="search" />
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <v-table width="100%" height="300px" fixed-header>
                    <thead>
                        <tr>
                            <th class="title text-cneter" style="width: 10%;">
                                No.
                            </th>
                            <th class="title text-cneter" style="width: 50%;">
                                제목
                            </th>
                            <th class="title text-cneter" style="width: 15%;">
                                조회수
                            </th>
                            <th class="title text-cneter" style="width: 15%;">
                                작성자
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in desserts" :key="index">
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.board_title }}</td>
                            <td>{{ item.board_checkNum }}</td>
                            <td>{{ item.user_id }}</td>
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
import axios from 'axios';
import router from '@/router';

const boardList = ref([]);
const page = ref(1);
const countPage = ref(30);
const startDate = ref('');
const endDate = ref('');
const searchData = ref('');

function search () {

    axios.get ('/board', {
        params: {
            start_date : startDate.value,
            end_date : endDate.value,
            search_data : searchData.value,
            page : page.value,
            countPage : countPage.value
        }
    }).then (res => {
        boardList.value = res.data.rows;
    });
}

function writeBoard () {
    router.push('/board-upload');
}

onMounted (() => {
    search ();
});

</script>

<style scoped>

.title {
    font-weight: bold;
}

</style>