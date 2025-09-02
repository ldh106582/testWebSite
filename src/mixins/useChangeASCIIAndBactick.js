export default function useChangeASCIIAndBactick() {

    function changeASCII(param) {
        const matchingata = /['"`]/g;
        const transformedString = param.replace(matchingata, (match) => {
            let charCode = match.charCodeAt(0);
            return `[${charCode}]`;
        });
        return transformedString;
    }

    function changeBactick() {
        
    }

    return {changeASCII, changeBactick}
}