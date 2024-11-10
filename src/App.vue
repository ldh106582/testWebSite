<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar title="IT 자격증 사이트">
      <v-btn class="mr-5" @click="createMember">회원가입</v-btn>
    </v-app-bar>

    <v-navigation-drawer>
      <v-list density="compact" nav>
        <v-list-item
          v-for="(list, index) in lists"
          :key="index"
          :title="list.title"
          :to="list.path" 
          prepend-icon="mdi-text-box-outline">
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="align-center justify-center" style="min-height: 300px;">
      <router-view />
    </v-main>
  </v-layout>
</template>

<script setup>
import { defineOptions, ref } from 'vue';

import { useRouter } from 'vue-router'

const router = useRouter()

defineOptions({
  name: 'App',
});

const lists = ref([
  {title: '정보처리기사(실기)'}, 
  {title: 'SQLD'},
  {title : '네트워크 관리사 2급 (실기)'}, 
  {title : '리눅스마스터 2급 실기'}
  ]);

  function createMember() {
    console.log("dh : " + router)
    router.push('/member-create');
  };
</script>

<style scoped>

</style>
