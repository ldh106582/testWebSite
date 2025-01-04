<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar>

      <v-toolbar-title @click="mainPage" style="cursor: pointer; margin-right: 50px;">
        IT 개발자 자격증 사이트
      </v-toolbar-title>

      <router-link to="/member-login" v-if="!auth.userId"> Login </router-link>
      <span style="margin-Right: 30px;">{{auth.userId? auth.userId: ""}}</span>
      <v-btn @click="logout" v-if="auth.userId" style="margin-right: 21px;" >Logout</v-btn>
    </v-app-bar>

    <!-- <v-app-bar>
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
    </v-app-bar> -->

    <v-navigation-drawer class="sideBar">
      <v-list>
        <v-list-item 
        class="sideBar-text"
        v-for="(item, i) in examTypeStore.list ? examTypeStore.list : ''"
        :key="i"
        :title="item.type_name"
        :value="item.type_id"
        prepend-icon="mdi-text-box-outline"
        @click="e => getExamStorage(item, e)"
        >
        </v-list-item>
    </v-list>
    
      <v-list density="compact" nav v-if="auth.userId === user[0]">
        <v-list-group class="sideBar-text" prepend-icon="mdi-text-box-outline" >
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              title="시험"
            ></v-list-item>
          </template>

          <v-list-item
            v-for="([title, icon, onClick], i) in examTypes"
            :key="i"
            :title="title"
            :prepend-icon="icon"
            :value="title"
            @click="e => onClick(e)"
          ></v-list-item>
        </v-list-group>
      </v-list>
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
import { useExamTypeStore } from '@/stores/useExamTypeStore';
import moment from 'moment';

const user = ref(['admin'])
const auth = useAuthStore();
const examTypeStore = useExamTypeStore();
const examTypes = [
  ['유형 추가', 'mdi-card-minus', (e) => push(e, '/examType-create')],
  ['유형 조회 및 수정', 'mdi-magnify', (e) => push(e, '/examType-update')],
  ['문제 출제', 'mdi-pencil', (e) => push(e, '/exam-create')],
];
const today = moment().format('YYYY-MM-DD');
const userId = ref('');

defineOptions({
  name: 'App',
});

function getExamStorage (item , e) {

  // auth.userId = auth.userId === null ? moment(today).unix() : auth.userId;
  userId.value = auth.templateUser()
  router.push({
    path: '/examType-Description',
    query: {
      // userId: auth.userId,
      type_id: item.type_id
    }
  });
}

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
  line-height: 1.5;
} 

.sideBar-text :deep(.v-list-item-title) {
  font-size: 0.8125rem;
}

.sideBar-text:hover {
  cursor: pointer;
}

.v-list-item-title {
  font-size: 0.8125rem;
}

</style>