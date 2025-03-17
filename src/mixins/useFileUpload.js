import moment from 'moment';
import useMoment from '@/mixins/useMoment';

const { getUnix } = useMoment();
const today = moment().format('YYYY-MM-DD');

export default function useFileUpload () {
    function getInputFile (event, callback) {
        const errorMsg = '파일을 확인해주세요.';
        const file = event.files[0];
        const fileName = `${event.files[0].name}-${getUnix(today)}`;
        const reader = new FileReader();
        const fd = new FormData();

        reader.onload = async (e) => {
            const result = e.target.result;
            try {
                fd.append('image', file, fileName);
                callback({ fd: fd, result:result });
            } catch (error) {
                alert (errorMsg);
                console.log('err : ' , error);
            }
        };

        reader.readAsDataURL(file);
    }

    return { getInputFile }
}