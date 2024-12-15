import moment from "moment";

export default function useMomet () {

    function getToday() {
        return moment(new Date())
    }

    return { getToday }
};