import { defineStore } from "pinia";

export const useExamStorePage = defineStore ('exam', {
    state: () => ({
        problems : [],
        examResult : [],
        score : 0,
        passFail :0 
    }),

    actions : {
        setExamData (data) {
            console.log("data : ", data)
            this.problems = data.problems;
            this.examResult = data.result;
            this.score = data.score;
            this.passFail = data.pass_fail;
        }
    }

});