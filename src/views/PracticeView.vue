<template>
    <div class="container">
        <div class="loading-bar">
            <div class="persentage" :style="{ width: persentage + '%' }"></div>
        </div>
        <div class="time-info">
            {{ persentage }}% - {{ remainingTime }}초 남음
        </div>
    </div>

    <v-col>
        <v-btn color="red" @click="google">google</v-btn>
    </v-col>
    <v-date-input
        v-model="date"
        label="날짜 선택"
    ></v-date-input>

    <v-row>
        <v-col cols="1" class="pa-0 ml-5">
            <v-checkbox hide-details v-model="allSelected" @change="allSelectBox"></v-checkbox>
        </v-col>
        <v-col cols="9" class="px-0" style="align-content: center;">
            <span>전체선택</span>
        </v-col>
    </v-row>

    <v-row v-for="(value, index) in result" :key="index" cols="7" class="pa-0 ml-2">
        <v-col cols="1" class="pa-0">
            <v-checkbox v-model="selected[index]" hide-details value="John"></v-checkbox>
        </v-col>
        <v-col cols="2" v-for="(t, index1) in table" :key="index1" style="align-content: center;">
            <span>{{ value[t.key] }}</span>
        </v-col>
    </v-row>
</template>

<script setup>
import { ref, onMounted, shallowRef } from 'vue';
import axios from '@/axios';

const persentage = ref(0);
const totalDuration = 10;
const remainingTime = ref(totalDuration);
const date = ref(null)

const model = shallowRef(null);

const selected = ref([]);
const allSelected = ref([]);
const result = ref(
    [
        {id: 1, name: 'a'},
        {id: 2, name: 'b'},
        {id: 3, name: 'c'},
        {id: 4, name: 'd'},
        {id: 5, name: 'e'},
        {id: 6, name: 'f'},
    ]
)

const table = [
    {key: 'id'},
    {key: 'name'},
];

function allSelectBox() {
    
}

function google () {
    axios.get('/google-form', {
    })
}

function test() {
    // const formId = 'https://docs.google.com/forms/d/e/1FAIpQLSdkr-vQ8-xaw2vqQD-drE1pf2d0492GQp2eCm5nj-um1zGupg/viewform';
    // const fisrtIndex = formId.indexOf('e/');
    // const LastIndex = formId.indexOf('/viewform');
    // const result = formId.slice((fisrtIndex +2), LastIndex);
    // console.log(result)
const koreanLang = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ', 'ㄲ', 'ㅉ', 'ㄸ', 'ㅆ']
const translateLang = {
    'ㄱ': 'R',
    'ㄲ': 'R',
    'ㄴ': 'S',
    'ㄷ': 'E',
    'ㄸ': 'E',
    'ㄹ': 'F',
    'ㅁ': 'A',
    'ㅂ': 'Q',
    'ㅃ': 'Q',
    'ㅅ': 'T',
    'ㅆ': 'T',
    'ㅇ': 'D',
    'ㅈ': 'W',
    'ㅉ': 'W',
    'ㅊ': 'C',
    'ㅋ': 'Z',
    'ㅌ': 'X',
    'ㅍ': 'V',
    'ㅎ': 'G',
}

const data = koreanLang.map(lang => 
    translateLang[lang] || lang)
console.log(data)

}

onMounted(() => {
    const interval = setInterval(() => {
        if (persentage.value < 100) {
            persentage.value += 10 / totalDuration; 
            remainingTime.value = Math.ceil(totalDuration - (persentage.value / 100) * totalDuration);
        } else {
            clearInterval(interval);
        }
    }, 10);
test ();

});



</script>

<style scope>
.loading-bar {
    position: relative;
    width: 400px;
    height: 30px;
    border-radius: 15px;
    overflow: hidden;
    border-bottom: 1px solid #ddd;
}

.persentage {
    position: absolute;
    top: 1px; left: 1px; right: 1px;
    display: block;
    height: 100%;
    width: 50%; 
    border-radius: 15px;
    background-color: silver;
    animation: animation-stript 1s linear infinite;
}

@keyframes animation-stript {
    0% {background-position: 0 0;}
    100% {background-position: 60px 0;}
}
</style>