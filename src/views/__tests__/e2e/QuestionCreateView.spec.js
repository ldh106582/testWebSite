import { test, expect } from "@playwright/test";

const url = 'http://localhost:5173/question-create';
const mockExamId = '정보처리기사';
const mockSubjectId = 'SQL';
const mockPoint = "5";
const mockLevel = '쉬움';
const mockType = '단답형';
const mockYear = '2022';
const mockAcademinYear = '1회차';
const mockQuestion = '다음 중 해당하는 빈칸에 값을 넣으시오.';
const mockAddResult = 'WHERE';
const mockProblem = 'SELECT * FROM 테이블명 (     ) 컬럼명 = 데이터 값';
const mockProblemExplanation = 'SELECT * FROM 테이블명 WHERE 컬럼명 = 데이터 값 컬럼을 선택할 때에는 where 절이 들어가야 합니다.';
const mockProblemFeedback = '이 문제를 틀릴 경우 아직 DDL에 대한 이해 및 SQL 기초가 부족한 상황입니다. SELECT, INSERT, UPDATE, DELETE 구문을 반드시 공부하세요.';

test.beforeEach(async ({ page }) => {
    await page.goto(url);
});

test.describe('QuestionCreateView', () => {
    test('시험 유형 조회', async ({ page }) => {
        const msg1 = '등록되었습니다';

        page.on('dialog', async dialog => {
            const message = dialog.message();
            expect(message).toContain(msg1);
            await dialog.accept();
        });

        await page.click('[data-test="examId"]');
        await page.locator(`div[role="option"]:has-text("${mockExamId}")`).click();
        await page.click('[data-test="search"]');

        await page.click('[data-test="subject_id"]');
        await page.locator(`div[role="option"]:has-text("${mockSubjectId}")`).click();

        await page.fill('[data-test="point"] input', mockPoint);

        await page.click('[data-test="level"]');
        await page.locator(`div[role="option"]:has-text("${mockLevel}")`).click();

        await page.click('[data-test="type"]');
        await page.locator(`div[role="option"]:has-text("${mockType}")`).click();

        await page.click('[data-test="year"]');
        await page.locator(`div[role="option"]:has-text("${mockYear}")`).click();

        await page.click('[data-test="academinYear"]');
        await page.locator(`div[role="option"]:has-text("${mockAcademinYear}")`).click();

        await page.fill('[data-test="question"] input', mockQuestion);
        await page.fill('[data-test="problem"] textarea', mockProblem);
        await page.fill('[data-test="problemExplanation"] textarea', mockProblemExplanation);
        await page.fill('[data-test="addResult"] input', mockAddResult);
        await page.fill('[data-test="problemFeedback"] textarea', mockProblemFeedback);

        await page.click('[data-test="examCreateSave"]');
    });
});