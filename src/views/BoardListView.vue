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
import axios from 'axios';

const boardList = ref([]);
const page = ref(1);
const countPage = ref(30);

async function search () {
    await axios.get('/board', {
        params: {
            page: page.value,
            countPage: countPage.value
        }
    }).then(res => {
        const data = res.data;

        
    });
}

onMounted (async () => {
    search ();
});
</script>

<style scoped>

</style>