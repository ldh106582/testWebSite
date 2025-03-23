import { test, expect } from "@playwright/test";

const url = 'http://localhost:5173/question-create';
const mockExamId = '정보처리기사';

test.beforeEach(async ({ page }) => {
    await page.goto(url);
});

test.describe('QuestionCreateView', () => {
    test('시험 유형 조회', async ({ page }) => {
        await page.fill('[data-test="examId"] input', mockExamId);
        await page.keyboard.down('ArrowDown');
        await page.keyboard.press('Enter')
    });
});