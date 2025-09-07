export default function useChangeASCIIAndBactick() {
    const changeTable = [
        { key: 'question', default: null },
        { key: 'problem', default: null },
        { key: 'answer', default: null },
        { key: 'exam_des', default: null },
        { key: 'problem_explanation', default: null },
        { key: 'problem_feedback', default: null },
    ];

    function changeASCII(param) {
        const reg = /['"`]/g;

        const transformedString = param?.replace(reg, (match) => {
            let charCode = match.charCodeAt(0) ?? '';
            return `[${charCode}]`;
        });
        return transformedString;
    }

    function changeBactick(param) {
        const reg = /\[(\d+)\]|[''""]/g;
        const transformedString = param?.replace(reg, (match, code) => {
            return String.fromCharCode(parseInt(code));
        });
        return transformedString;
    }

    return {changeTable, changeASCII, changeBactick}
}