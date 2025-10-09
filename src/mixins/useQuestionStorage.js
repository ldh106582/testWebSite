import { ref, onMounted } from "vue";
import moment from "moment";

export default function useQuestionStorage() {
    const questionTypes = ref(['주관식', '객관식', '서술형', '단답형']);
    const questionYears = ref([]);
    const questionRounds = ref(['1회차', '2회차', '3회차', '4회차', '5회차', '자체출제']);
    const questionLevels = ref(['쉬움', '보통', '어려움']);
    

    function makeYears() {
        const currentYear = moment().format('YYYY');

        for (let startYear = 2020; startYear <= parseInt(currentYear); startYear++) {
            questionYears.value.push(startYear);
        }
        questionYears.value.push('자체출제');
    }
    
    onMounted(() => {
        makeYears();
    });

    return { questionTypes, questionYears, questionRounds, questionLevels }
}