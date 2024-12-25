import { defineStore } from "pinia";
import axios from "@/axios";
import { ref,onMounted  } from "vue";

export const useExamTypeStore = defineStore('examTypes', () => {

    const list = ref([]);

    async function init() {
        try {
            const res = await axios.get('/examTypes');
            list.value = res.data.rows;
        } catch (error) {
            console.error("Error fetching exam types:", error);
        }
    }

    onMounted(init); // 컴포넌트가 마운트될 때 init 호출

    return { list, init };
});