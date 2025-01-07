import { defineStore } from "pinia";
import axios from "@/axios";
import { ref  } from "vue";

export const useExamTypeStore = defineStore('examTypes', () => {

    const list = ref([]);

    async function init() {
        try {
            const res = await axios.get('/exams');
            list.value = res.data.rows;
        } catch (error) {
            console.error('Failed to fetch exam types:', error);
        }
    }

    init();

    return { list, init };
});