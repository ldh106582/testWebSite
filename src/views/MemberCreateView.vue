<template>
    <v-container fluid fill-height>
        <v-row>
            <v-col class="d-flex justify-center align-center" style="height: 93vh;">
                <v-sheet class="mx-auto" width="40%" height="48vh">
                    <v-col style="margin-bottom: 1.5%; width: 100%; height: 30%;">
                        <div class="member-create" id="intro" v-html="typedText"></div> 
                        <div id="cursor"></div>
                    </v-col>
                    <v-form style="width: 100%;" @submit.prevent="createMember" fast-fail>
                        <v-col class="d-flex" style="width: 100%;"> 
                            <v-text-field data-test="userId" class="userId" v-model="user.userId" label="아이디 (ID)" 
                            @input="errorMember('userId')" :rules="rulesId" />
                            <v-btn data-test="idCheck" style="width: 20%; margin-top: 1%;" @click="idCheck" :disabled="!validEmail">중복확인</v-btn>
                        </v-col>
                        <v-col v-if="checkId">
                            <v-text-field data-test="userPw" type="password" v-model="user.userPw"
                            label="패스워드 (Password)" @input="errorMember('userPw')" :rules="rulesPw"/>
                        </v-col>
                        <v-col v-if="checkPw">
                            <v-text-field data-test="userName" v-model="user.userName" label="이름 (name)" @input="errorMember('userName')" />
                        </v-col>
                        <v-col>
                            <v-btn class="mt-2" color="rgb(26, 32, 53)" type="submit" block>회원가입</v-btn>
                        </v-col>
                    </v-form>
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>  
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from '@/axios';
import { useRouter } from 'vue-router';

const intro = `회원가입 페이지 입니다. <div class="welcome"> 안녕하세요. It 시험을 공부할 수 있는 공간에 오신 것을 환영합니다.</div> <div class="welcome"> 여러분들의 미래를 응원합니다.</div> `;
const typedText = ref('');
let index = 0;
let speed = 25;
const user = ref([]);
const checkId = ref(false);
const checkPw =  ref(false);
const validEmail = ref(false);
const rulesId = ref([
    v => {
        const idPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const validId = '아이디는 패스워드를 찾는데 중요한 데이터 입니다. 이메일 형식으로 작성해주세요.';
        if (!idPattern.test(v)) {
            return validId; // 오류 메시지 반환
        } else {
            validEmail.value = true; // 유효한 경우
            return true
        }
    }
]);
const rulesPw = ref([
    v => {
        const pwPattern = /[!@#$%^&*(),.?":{}|<>]/;
        const validPw = '특수문자가 반드시 포함되어야 합니다.';
        if (!pwPattern.test(v)) {
            return validPw; 
        } else {
            return checkPw.value = true;
        }
    }
]);

const router = useRouter();

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

async function idCheck () {
    const existId = '이미 존재하는 아이디가 있습니다. 새로운 아이디를 설정해주세요.';
    const useUserId = '사용 가능한 아이디 입니다.';

    await axios.get('/member-check', {
        params: {
            userId: user.value.userId,
        }
    }).then((res) => {
        const data = res.data.result;

        const userId = res.data.rows[0].user_id;

        if (data || userId !== undefined) {
            return alert (existId);
        } else {
            alert (useUserId);
            checkId.value = true;
        }
    });
};

async function createMember() {

    const confirmId = 'ID 중복 체크를 반드시 진행하셔야 합니다.';
    const errorMember = '회원가입이 불가합니다. 잠시후 다시 시도해주시길 바랍니다.';
    const seccesMember = '회원가입이 완료 되었습니다.';

    if (checkId.value === false) {
        return alert (confirmId)
    };

    if (user.value.userPw === "") {
        return alert ('비밀번호를 반드시 입력해야 합니다.');
    } else if (user.value.userPw !== "" && user.value.userName === "") {
        return alert ('이름을 반드시 입력해야 합니다.');
    }

    await axios.post('/member-create', {
        userId: user.value.userId,
        userPw: user.value.userPw,
        userName: user.value.userName
    }).then((res) => {
        const data = res.data.result;
        
        if (data) {
            alert (errorMember);
        } else {
            alert (seccesMember);
            router.push('/member-page')
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

.userId{
    width: 70%;
    margin-right: 2%;
}

</style>