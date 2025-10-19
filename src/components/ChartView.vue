<template>
    <v-container fluid="">
        <v-row>
            <v-col>
                <canvas ref="myChart"> </canvas>
                <div id="licens">
                    <v-col v-for="value in source">
                        <v-btn @click="updateChart"></v-btn>
                    </v-col>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>


<script setup>
import { Chart, registerables } from 'chart.js';
import { ref, onMounted } from 'vue';
import axios from '@/axios';
import { useAuthStore } from "@/stores/useAuthStore";

const auth = useAuthStore();

Chart.register(...registerables);

const myChart = ref(null);
const result = ref();

async function makeChartDate(params) {
    const labels = [params.question_year, question_round];
    
    const chartData = {
        labels: labels,
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
    }]};

    const ctx = myChart.value.getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
            scales: {
                y: {
                    stacked: true
                }
            }
        }
    });
}

onMounted(async () => {

    await axios.get('/chart', {
        params : {
            user_id : auth.userId.value
        }
    }).then(res => {
        result.value = res.data.result;
    });
    await makeChartDate(result);
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