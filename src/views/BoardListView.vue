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

async function search () {
    await axios.get('/', {

    });
}

onMounted (async () => {
    search ();
});
</script>

<style scoped>

</style>