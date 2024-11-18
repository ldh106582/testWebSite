<template>
    <v-container fluid="">
        <v-row>
            <v-col>
                <canvas ref="myChart"> </canvas>
                <div id="licens">
                    <button @click="updateChart">정보처리기사</button>
                    <button @click="updateChart">네트워크 관리사 2급</button>
                    <button @click="updateChart">리눅스 마스터 2급</button>
                    <button @click="updateChart">SQLD</button>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>


<script setup>
import { Chart, registerables } from 'chart.js';
import {ref, onMounted} from 'vue';

Chart.register(...registerables);

const myChart = ref(null);
const labels = ref(['January', 'February', 'March', 'April', 'May']);
const chartData = ref({
    labels: labels.value,
    datasets: [{
        label: 'Dataset 1',
        data: [10, 20, 30, 40, 50],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
    }, {
        label: 'Dataset 2',
        data: [15, 25, 35, 45, 55],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
    }]
})

onMounted(() => {
    const ctx = myChart.value.getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: chartData.value,
        options: {
            scales: {
                y: {
                    stacked: true
                }
            }
        }
    });
});
    

</script>


<style scoped>

#licens{
    text-align: center;
}

#licens > button{
    margin: auto;
    width: 25%;
    border: 1px solid silver;
    border-radius: 5%;
}

</style>