import { ref } from "vue";

export default function useFileUpload () {
    function getInputFile (event, callback) {
        const file = event.files[0];
        const reader = new FileReader();

        reader.onload = async (e) => {
            const result = e.target.result; // 파일 데이터
            callback(result); // 콜백을 통해 데이터 전달
        };

        reader.readAsDataURL(file);
    }

    return { getInputFile }
}