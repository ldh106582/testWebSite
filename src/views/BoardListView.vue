<template>
    <v-container fluid>
        <v-row>
        </v-row>
        <v-row>
            <v-col>
                <v-table width="100%" height="300px" fixed-header>
                    <thead>
                        <tr>
                            <th class="text-cneter">
                            No.
                            </th>
                            <th class="text-cneter">
                            제목
                            </th>
                            <th class="text-cneter">
                            조회수
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in desserts" :key="index">
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.board_title }}</td>
                            <td>{{ item.board_content }}</td>
                            <td>{{ item.board_checkNum }}</td>
                        </tr>
                    </tbody>
                </v-table>
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
        const data = res.data;
        if (data.result) {
            boardList.value = data.rows
        } else {
            return alert (errorMsg);
        }

        
    });
}

onMounted (async () => {
    search ();
});
</script>

<style scoped>

</style>