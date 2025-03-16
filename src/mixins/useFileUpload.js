export default function useFileUpload () {
    function getInputFile (event, callback) {
        const file = event.files[0];
        const fileName = event.files[0].name;
        const reader = new FileReader();
        const fd = new FormData();

        reader.onload = async (e) => {
            const result = e.target.result;
            try {
                fd.append('image', file, fileName);
                callback({ fd: fd, result:result });
            } catch (error) {
                alert ('파일을 확인해주세요.');
                console.log('err : ' , error);
            }
        };

        reader.readAsDataURL(file);
    }

    return { getInputFile }
}