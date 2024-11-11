<template>
    <v-container fluid fill-height>
        <v-row>
            <v-col class="d-flex justify-center align-center" style="height: 100vh;">
                <v-sheet class="mx-auto" width="40%" height="48vh">
                    <v-col style="margin-bottom: 1.5%; width: 100%;"> <!--class="typing-container"-->
                        <div class="member-create" id="intro" v-html="typedText"></div> <!---->
                        <div id="cursor"></div>
                    </v-col>
                    <v-form fast-fail @submit.prevent="createMember" style="width: 100%;">
                        <v-col class="d-flex" style="width: 100%;"> 
                            <v-text-field data-test="userId" v-model="userId" :rules="firstNameRules" label="아이디 (ID)" style="width: 70%; margin-right: 2%;" 
                            @input="errorId" />
                            <v-btn style="width: 20%; margin-top: 1%;" @click="idCheck">중복확인</v-btn>
                        </v-col>
                        <v-col> <v-text-field data-test="userPw" v-model="userPW" :rules="lastNameRules" label="패스워드 (Password)" /> </v-col>
                        <v-col> <v-text-field data-test="userName" v-model="userName" :rules="lastNameRules" label="이름 (name)" /> </v-col>
                        <v-col><v-btn class="mt-2" type="submit" block>Submit</v-btn></v-col>
                    </v-form>
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>  
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from '@/axios';


const intro = `회원가입 페이지 입니다. <div class="welcome"> 안녕하세요. It 시험을 공부할 수 있는 공간에 오신 것을 환영합니다.</div> <div class="welcome"> 여러분들의 미래를 응원합니다.</div> `;
const typedText = ref('');
let index = 0;
let speed = 50;
const userId = ref('');
const userPw = ref('');
const userName = ref('');
const errorMSG = ref('한글은 입력하실 수 없습니다.');
const errorUserId = ref('이미 존재하는 아이디가 있습니다. 새로운 아이디를 설정해주세요.');
const confirmId = ref('Id 중복 체크를 반드시 진행하셔야 합니다.')
const checkId = ref(false)

function typing () {
    if(index < intro.length) {
        typedText.value += intro.charAt(index);
        index++;
        setTimeout(typing, speed);
    }
};

function errorId () {
    const hasKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(userId.value);

    if (hasKorean) {
        userId.value = '';
        return alert (errorMSG.value);
    }

};

function idCheck () {
    axios.get('/idCheck')
    .then((res) => {
        const data = res.data.result;

        if(data.code) {
            return alert(errorUserId);
        }
        
        checkId = true;

    });
};

function createMember() {
    
    if(checkId === false) {
        return alert(errorUserId)
    } 

}



onMounted (() => {
    typing ();
})

</script>

<style>
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard-dynamic-subset.css');/* regular-400, medium-500, semibold-600, bold-700 */ 

body,html {height:100%;margin:0;padding:0}
ul, li, dl, dt, dd, p, span{margin:0;padding:0}
*, :after, :before{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}

.member-create{
    font-size: 35px;
    font-weight:700;
    font-family:'Pretendard';
    width:450px;
    word-break:keep-all
}

#cursor {
    border-left: 2px solid #000; /* 커서 스타일 */
    animation: blink 0.7s infinite;
    display: none;
    margin-left: 2px;
    height: 35px; /* 폰트 크기와 동일하게 설정 */
    vertical-align: middle;
}

.member-create .welcome {
    font-size: 17.2px !important;
    display: block;  /* p 태그가 블록 레벨로 표시되도록 */
    margin-top: 10px;  /* 위 아래 여백 추가 */
    font-weight: 400;  /* 글씨 두께 조정 */
}

@keyframes blink {
    50% {
        opacity: 0;
    }
}

</style>