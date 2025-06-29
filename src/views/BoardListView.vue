<template>
    <v-container fluid>
        <v-row>
            <v-col>
                
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
                            <td style="width: 10%;">{{ index + 1 }}</td>
                            <td style="width: 50%;">{{ item.board_title }}</td>
                            <td style="width: 15%;">{{ item.board_checkNum }}</td>
                            <td style="width: 15%;">{{ item.user_id }}</td>
                        </tr>
                    </tbody>
                </v-table>
            </v-col>
        </v-row>

        <v-row>
            <v-col style="text-align: end;">
                <v-btn text="글쓰기" color="indigo" style="text-align: center;" @click="writeBoard()"> </v-btn>
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


const boardList = ref([]);
const page = ref(1);
const countPage = ref(30);

async function search () {
    const errorMsg = '조회를 실패하였습니다.';
    await axios.get('/board', {
        params: {
            page: page.value,
            countPage: countPage.value
        }
    }).then(res => {
        boardList.value = res.data.rows;
    });
}

function writeBoard () {

}
onMounted (async () => {
    search ();
});
</script>

<style scoped>

.title {
    font-weight: bold;
}

</style>