<template>
  <v-container>
    <v-table>
      <thead>
        <tr data-test="title">
          <th> No. </th>
          <th class="title"> 제목 </th>
          <th class="checkNum"> 조회수 </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(rows, index) in items" :key="index" data-test="item" style="cursor: pointer;" @click="getContent(rows)">
          <td>{{ index + 1 }}</td>
          <td class="title">{{ rows.board_title }}</td>
          <td class="checkNum"> {{ rows.board_checkNum ?? 0 }}</td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from '@/axios';
import moment from 'moment';
import router from '@/router';

const items = ref([]);

function getBoard () {
  const today = moment().format('YYYY-MM-DD');
  const countPage = 10;
  const page = 0;

  axios.get('/board', {
    params: {
      end_date : today,
      page : page,
      countPage : countPage
    }
  }).then((res) => {
    items.value = res.data.result;
  });
}

function getContent (rows) {
  router.push({
    path: '/board-process',
    query: {
        board_id: rows.board_id
    }
  });
}

onMounted(() => {
  getBoard();
});

</script>

<style scoped>
.title{
  width: 75%;
}
.checkNum{
  width: 20%;
}
</style>
