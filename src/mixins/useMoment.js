import moment from "moment";

export default function useMoment() {

    function getToday(date) {
        return moment(new Date())
    }

    function getFullDate(date) {
        const today = moment(date).format('YYYY-MM-DD');
        return today
    }

    function getCreateAt() {
        const today = moment().format('YYYY-MM-DD HH:mm:ss');
        return today
    }

    function getUnix(date) {
        return moment(date).unix();
    }

    return { getToday, getCreateAt , getUnix, getFullDate}
};