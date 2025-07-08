<template>
    <v-container fluid>
        <v-row>
            <v-col>
                
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/useAuthStore';

const { userId } = useAuthStore();

</script>

<style scoped>
</style>