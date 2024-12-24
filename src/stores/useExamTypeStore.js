import { defineStore } from "pinia";
import axios from "@/axios";
import { ref } from "vue";

export const useExamTypeStore = defineStore('examTypes', () => {

    const list = ref([]);

    async function init() {
        await axios.get('/examTypes')
        .then (res => { 
            list.value = res.data.rows
        });
    }

    return { list, init };
});