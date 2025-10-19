import { defineStore } from 'pinia'

export const useExamStart = defineStore('examStart', {
    state: () => ({
        problems : [],
        examResult : [],
        answers: [],
        score : 0,
        passFail :0 
    }),

    actions: {
        setExamData(data) {
            this.problems = data.problems;
            this.examResult = data.examResult;
            this.score = data.score;
            this.passFail = data.passFail;
            this.answers = data.answers;
        }
    }
});