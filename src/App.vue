<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar>
      <v-col class="header" @click="mainPage">IT 개발자 자격증 사이트</v-col>
      <v-row>
        <v-col align="end" v-if="auth.isAuthenticated === false">
          <v-btn class="createMember mr-5" @click="createMember">회원가입</v-btn>
          <v-btn class="createMember mr-5" @click="login">로그인</v-btn>
        </v-col>
        <v-col align="end" v-if="auth.isAuthenticated === true">
          <v-btn class="createMember mr-5" @click="Mypage">{{ auth.userId }} 님 반갑습니다.</v-btn>
          <v-btn class="createMember mr-5" @click="logout">로그아웃</v-btn>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-navigation-drawer class="sideBar">
      <v-list-item title="정보처리기사"  value="정보처리기사" class="sideBar-text" prepend-icon="mdi-text-box-outline" @click="(e) => push(e, '/information')" />
      <v-list-item title="SQLD"  value="SQLD" class="sideBar-text" prepend-icon="mdi-text-box-outline" @click="(e) => push(e, '/sqld')" />
      <v-list-item title="네트워크 관리사 2급"  value="네트워크 관리사 2급" class="sideBar-text" prepend-icon="mdi-text-box-outline" @click="(e) => push(e, '/network')" />
      <v-list-item title="리눅스마스터 2급"  value="리눅스마스터 2급" class="sideBar-text" prepend-icon="mdi-text-box-outline" @click="(e) => push(e, '/linux')" />
      </v-navigation-drawer>

    <v-main class="sideBar-main align-center justify-center">
      <router-view />
    </v-main>
  </v-layout>
</template>

<script setup>
import { ref } from 'vue';
import router from '@/router/index';
import { useAuthStore } from './stores/useAuthStore';

// const router = useRouter();
const auth = useAuthStore();

defineOptions({
  name: 'App',
});

const lists = [
  [ '정보처리기사(실기)', (e) => push(e, '/information') ], 
  [ 'SQLD', (e) => push(e, '/sqld')],
  [ '네트워크 관리사 2급 (실기)', (e) => push(e, '/network') ], 
  [ '리눅스마스터 2급 실기',  (e) => push(e, '/linux') ],
];

  function push(e, routeName) {
    if (e.ctrlKey) return window.open(routeName, '_blank');

    router.push({
      path: routeName, 
      query: {
        userId: auth.userId
      }
    });
  }

  function mainPage () {
    router.push('/')
  }

  function createMember () {
    router.push('/member-create');
  };

  function login () {
    router.push('/member-login');
  }

  function logout () {
    if (!confirm('로그아웃 하시겠습니까??')) return;

    auth.logout(auth.userId);

    router.push('/');
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

.sideBar-text:hover {
  cursor: pointer;
}

</style>