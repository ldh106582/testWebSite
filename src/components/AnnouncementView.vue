<template>
  <v-col cols="12" lg="12" sm="12" xm="12">
    <v-table style="border: 1px solid red;">
      <thead>
        <tr data-test="title">
          <th class="title"> 제목 </th>
          <th class="checkNum"> 조회수 </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.name" data-test="item">
          <td @click="getContent" class="title">{{ item.board_title }}</td>
          <td @click="getContent" class="checkNum"> {{ item.board_checkNum }}</td>
        </tr>
      </tbody>
    </v-table>
  </v-col>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from '@/axios';

const items = ref({})

function getBoard () {
  axios.get('/board')
    .then((res) => {
    items.value = res.data.result;
  });
}

function getContent() {
  alert('게시판 이동')
}

onMounted(() => {
  getBoard();
});

</script>

<style scoped>
.title{
  width: 80%;
}
.checkNum{
  width: 20%;
}
</style>
