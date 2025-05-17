import { ref } from "vue";

export default function useQuestionStorage() {
    const questionTypes = ref(['주관식', '객관식', '서술형', '단답형']);
    const questionYears = ref(['2021', '2022', '2023', '2024', '자체출제']);
    const questionRounds = ref(['1회차', '2회차', '3회차', '4회차', '5회차', '자체출제']);
    const questionLevels = ref(['쉬움', '보통', '어려움']);
    
    return { questionTypes, questionYears, questionRound: questionRounds, questionLevels }
}