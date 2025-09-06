export default function useChangeASCIIAndBactick() {
    const changeTable = [
        { key: 'question' },
        { key: 'problem' },
        { key: 'answer' },
        { key: 'exam_des' },
        { key: 'problem_explanation' },
        { key: 'problem_feedBack' },
    ];

    function changeASCII(param) {
        const reg = /['"`]/g;
        const transformedString = param.replace(reg, (match) => {
            let charCode = match.charCodeAt(0);
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