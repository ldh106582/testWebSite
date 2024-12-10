<template>
    <v-container fluid>
        <v-row>
            <v-col>

            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import router from '@/router';

const userId = ref('');
const point = ref(0);

function test() {
    
}


onMounted(() => {
    test();
})
</script>

<style scoped>

</style>