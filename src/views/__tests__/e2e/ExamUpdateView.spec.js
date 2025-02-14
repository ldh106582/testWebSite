// @ts-check
import { test, expect } from '@playwright/test';

const url = 'http://localhost:5173/exam-update/?userId=admin';
test.beforeEach(async ({ page }) => {
    await page.goto(url);

})

test.describe('ExamUpdateView', () => {
    test.describe('search', () => {
        test('추가로 입력 칸 생성되는지 확인', async ({ page }) => {
            await page.click('[data-test="addSubject"]'); // 선택자 수정
        });
    });
});