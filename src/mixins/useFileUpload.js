import { ref } from "vue";

export default function useFileUpload () {
    function getInputFile (event, callback) {
        const file = event.files[0];
        const reader = new FileReader();

        reader.onload = async (e) => {
            const result = e.target.result;
            callback(result);
        };

        reader.readAsDataURL(file);
    }

    return { getInputFile }
}