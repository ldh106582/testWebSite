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
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from '@/axios';

const persentage = ref(0);
const totalDuration = 10;
const remainingTime = ref(totalDuration);

function google () {
    axios.get('/google-form', {
    })
}

function test() {
    const formId = 'https://docs.google.com/forms/d/e/1FAIpQLSdkr-vQ8-xaw2vqQD-drE1pf2d0492GQp2eCm5nj-um1zGupg/viewform';
    const fisrtIndex = formId.indexOf('e/');
    const LastIndex = formId.indexOf('/viewform');
    const result = formId.slice((fisrtIndex +2), LastIndex);
    console.log(result)
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
    test();
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