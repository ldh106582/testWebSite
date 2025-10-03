import moment from 'moment';
import useMoment from '@/mixins/useMoment';

const { getUnix } = useMoment();
const today = moment().format('YYYY-MM-DD');
const imageFormat = ['png', 'jpeg', 'jpg'];

export default function useFileUpload () {
    async function getInputFile (event, callback) {
        const errorMsg = '파일을 확인해주세요.';
        const file = event.files[0];
        const fileName = await getFileName(event.files[0].name);
        const reader = new FileReader();
        const fd = new FormData();

        reader.onload = async (e) => {
            const result = e.target.result;
            try {
                fd.append('image', file, fileName);
                await callback({ fd: fd, result:result });
            } catch (error) {
                alert(errorMsg);
                console.log('err : ' , error);
            }
        };

        reader.readAsDataURL(file);
    }

    async function getFileName (data) {
        const tempName = await data.toLowerCase();
        const frontCharLength = tempName.indexOf('.');
        const lastCharLength = tempName.length;
        let fileName = '';

        if (frontCharLength !== 0) {
            let name = `${ tempName.substring(0, frontCharLength)}-${getUnix(today)}`;
            let format = tempName.substring(frontCharLength, lastCharLength);
            fileName = `${name}${format}`;
        }
        return fileName
    }

    return { getInputFile }
}