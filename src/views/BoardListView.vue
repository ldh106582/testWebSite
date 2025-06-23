<template>
    <v-container fluid>
        <v-row>
        </v-row>
        <v-row>
            <v-col>
                <v-table width="100%" height="300px" fixed-header>
                    <thead>
                        <tr>
                            <th class="text-cneter">
                            Name
                            </th>
                            <th class="text-cneter">
                            Calories
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in desserts" :key="index">
                            <td>{{ item.name }}</td>
                            <td>{{ item.calories }}</td>
                        </tr>
                    </tbody>
                </v-table>
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