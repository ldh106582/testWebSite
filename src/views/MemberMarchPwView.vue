<template>
    <v-container fluid fill-height>
        <v-row justify="center" align="center" >
            <v-col cols="12"  lg="5" sm="12" class="d-flex justify-center align-center" style="height: 93vh;">
                <v-col cols="12"  lg="12" sm="12">
                    <v-col cols="12" lg="12" sm="12" class="march-title mb-4">
                        <p>비밀번호 변경 페이지</p>
                    </v-col>

                    <v-col>
                        <v-text-field cols="12" hide-details type="text" v-model="userPw" label="임시 비밀전호"></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field cols="12" type="password" v-model="newPw" label="새로운 비밀전호" :rules="rulesPw"></v-text-field>
                    </v-col>

                    <v-col class="mt-2" cols="12" lg="12" sm="12">
                        <v-btn color="rgb(26, 32, 53)" width="100%" @click="marchPw">비밀번호 변경</v-btn>
                    </v-col>
                
                </v-col>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const userPw = ref('');
const newPw = ref('');
const rulesPw = ref([
    v => {
        const pattern = /[!@#$%^&*(),.?":{}|<>]/;
        const validPw = '특수문자가 반드시 포함되어야 합니다.';

        if (!pattern.test(v)) { return  validPw }

    }
]);

const router = useRouter();

function marchPw() {
    
}

</script>

<style scoped>
.march-title{
    font-size: 35px;
    font-weight: bold;
}

</style>