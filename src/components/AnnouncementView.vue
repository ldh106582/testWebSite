<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left"> 공지사항 </th>
        <th class="text-left"> 조회수 </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.name">
        <td>{{ item.board_title }}</td>
        <td>{{ item.board_checkNum }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';

const items = ref({})

function getBoard() {
  axios.get('http://localhost:3000/board')
    .then((res) => {
    items.value = res.data.result;
  });
}

onMounted(() => {
  getBoard();
});

</script>

<style scoped>

</style>
