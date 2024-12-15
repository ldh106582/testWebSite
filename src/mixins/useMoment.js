import moment from "moment";

export default function useMoment () {

    function getToday (today) {
        return moment(new Date())
    }

    function getCreateAt () {
        const today = moment().format('YYYY-MM-DD HH:mm:ss');
        return today
    }

    return { getToday, getCreateAt }
};