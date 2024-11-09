import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "@/axios";

export const useAnnouncement = defineStore('Announcement', () => {
    
    const announcment = ref([]);

    function anc() {
        
    }

    return {announcment}

});