<template>
  <v-table>
    <thead>
      <tr data-test="title">
        <th class="text-left"> 제목 </th>
        <th class="text-left"> 조회수 </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.name" data-test="item">
        <td @click="getContent">{{ item.board_title }}</td>
        <td @click="getContent"> {{ item.board_checkNum }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from '@/axios';

const items = ref({})

function getBoard () 
{
  axios.get('/board')
    .then((res) => {
    items.value = res.data.result;
  });
}

function getContent() 
{
  alert('게시판 이동')
}

onMounted(() => {
  getBoard();
});

</script>

<style scoped>

</style>
