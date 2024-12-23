import { defineStore } from "pinia";
import axios from "@/axios";
import { ref } from "vue";

export const useExamTypeStore = defineStore('examType', () => {

    const list = ref([]);

    function init() {
        axios.get('/examTypes')
        .then(res => {
            list.value = res.data.rows;
            console.log("dh : ", list.value);
        })
    }
    return { list, init }
});