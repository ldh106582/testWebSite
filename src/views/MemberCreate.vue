<template>
    <v-container fluid fill-height>
        <v-row>
            <v-col class="d-flex justify-center align-center" style="height: 100vh;">
                <v-card class="mx-auto" max-width="1000" style="width: 50%;">
                    <v-sheet class="mx-auto" style="border: 1px solid red;" width="80%" height="60vh">
                        <v-col>
                            <p class="text-h4 font-weight-black">회원가입</p>
                            <p>Welcom to test world</p>
                            <p>Let's begin the adventure</p>
                        </v-col>
                        <v-form fast-fail @submit.prevent>
                            <v-text-field v-model="firstName" :rules="firstNameRules" label="아이디 (ID)" />
                            <v-text-field v-model="lastName" :rules="lastNameRules" label="패스워드 (Password)" />
                            <v-text-field v-model="lastName" :rules="lastNameRules" label="이름 (name)" />
                            <v-text-field v-model="lastName" :rules="lastNameRules" label="이름 (name)" />
                            <v-btn class="mt-2" type="submit" block>Submit</v-btn>
                        </v-form>
                    </v-sheet>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>

</script>

<style lang="less" scoped>

</style>