export default function useFileUpload () {
    function getInputFile (event, callback) {
        const file = event.files[0];
        const reader = new FileReader();

        reader.onload = async (e) => {
            const result = e.target.result;

            const formData = new FormData();
            formData.append('imageData', result);
            formData.append('fileName', file.name);

            callback({ formData: formData, result: result });
        };

        reader.readAsDataURL(file);
    }

    return { getInputFile }
}