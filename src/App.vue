<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar>
      <v-col class="header" @click="mainPage">IT 개발자 자격증 사이트</v-col>
      <v-btn class="createMember mr-5" @click="createMember">회원가입</v-btn>
      <v-btn class="createMember mr-5" @click="login">로그인</v-btn>
    </v-app-bar>

    <v-navigation-drawer class="sideBar">
      <v-list density="compact" nav>
        <v-list-item class="sideBar-text" v-for="(list, index) in lists" :key="index"  :title="list.title"
          :to="list.path" prepend-icon="mdi-text-box-outline">
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="sideBar-main align-center justify-center">
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

  function mainPage () {
    router.push('/')
  }

  function createMember () {
    router.push('/member-create');
  };

  function login () {
    router.push('/login-page')
  }
</script>

<style scoped>
.header:hover{
  cursor: pointer;
}

.createMember {
  border: 1px solid silver;
}

.sideBar{
  background-color: rgb(26, 32, 53);
}

.sideBar-text{
  color: rgb(255, 255, 255);
  box-shadow: rgba(69, 65, 78, 0.06) 4px 4px 10px 0px;
  font-size: 14px;
  font-weight: 200;
}


</style>
