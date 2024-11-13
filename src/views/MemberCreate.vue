<template>
    <v-container fluid fill-height>
        <v-row>
            <v-col class="d-flex justify-center align-center" style="height: 100vh;">
                <v-sheet class="mx-auto" width="40%" height="48vh">
                    <v-col style="margin-bottom: 1.5%; width: 100%; height: 30%;"> <!--class="typing-container"-->
                        <div class="member-create" id="intro" v-html="typedText"></div> <!---->
                        <div id="cursor"></div>
                    </v-col>
                    <v-form fast-fail @submit.prevent="createMember" style="width: 100%;">
                        <v-col class="d-flex" style="width: 100%;"> 
                            <v-text-field data-test="userId" v-model="user.userId" :rules="firstNameRules" label="아이디 (ID)" style="width: 70%; margin-right: 2%;" 
                            @input="errorMember('userId')" />
                            <v-btn style="width: 20%; margin-top: 1%;" @click="idCheck">중복확인</v-btn>
                        </v-col>
                        <v-col v-if="checkId === true"> <v-text-field data-test="userPw" v-model="user.userPw" :rules="lastNameRules" label="패스워드 (Password)" @input="errorMember('userPw')" /> </v-col>
                        <v-col v-if="user.userPw !== '' "> <v-text-field data-test="userName" v-model="user.userName" :rules="lastNameRules" label="이름 (name)" @input="errorMember('userName')" /> </v-col>
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
let speed = 25;
const user = ref({
    userId : '',
    userPw: '',
    userName: ''
});
const checkId = ref(false)

function typing () {
    if(index < intro.length) {
        typedText.value += intro.charAt(index);
        index++;
        setTimeout(typing, speed);
    }
};

function errorMember (u) {

    const errorMsg = '한글은 입력하실 수 없습니다.';
    const errorTrim = '공백은 포함될 수 없습니다.';
    const hasKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(user.value.userId);

    if (hasKorean) {
        user.value.userId = '';
        return alert (errorMsg);
    }
    
    if (user.value[u].includes(" ")) {
        user.value[u] = user.value[u].replace(" ", "");
        return alert (errorTrim);
    }
};

function idCheck () {
    const errorUserId = '이미 존재하는 아이디가 있습니다. 새로운 아이디를 설정해주세요.';
    const useUserId = '사용 가능한 아이디 입니다.';

    axios.get('/idCheck', {
        params: {
            userId: user.value.userId,
        }
    }).then((res) => {
        const data = res.data.error;

        if (data) {
            return alert (errorUserId);
        } else {
            alert (useUserId);
            checkId.value = true;
        }
    });
};

function createMember() {

    const confirmId = 'Id 중복 체크를 반드시 진행하셔야 합니다.';
    const errorMember = '회원가입이 불가합니다. ldh106582@naver.com 메일로 문의 바랍니다.';
    const seccesMember = '회원가입이 완료 되었습니다.';

    if (checkId.value === false) {
        return alert (confirmId)
    };

    if (user.value.userPw === "") {
        return alert ('비밀번호를 반드시 입력해야 합니다.');
    } else if (user.value.userName === "") {
        return alert ('이름을 반드시 입력해야 합니다.');
    }

    axios.post('/create-member', {
        userId: user.value.userId,
        userPw: user.value.userPw,
        userName: user.value.userName
    }).then((res) => {
        const data = res.data.error;

        if (data) {
            alert (errorMember);
        } else {
            alert (seccesMember);
        }
    });

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