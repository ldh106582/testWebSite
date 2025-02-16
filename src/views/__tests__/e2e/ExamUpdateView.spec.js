// @ts-check
import { test, expect } from '@playwright/test';

const url = 'http://localhost:5173/exam-update/?userId=admin';
test.beforeEach(async ({ page }) => {
    await page.goto(url);

})

test.describe('ExamUpdateView', () => {
    // test('추가로 입력 칸 생성되는지 확인', async ({ page }) => {
    //     await page.click('[data-test="addSubject"]');
    // });
    
    test.describe('search', () => {
        test('데이터를 입력하지 않았을 때', async ({ page }) => {
            const typeNameNull = '데이터를 먼저 입력해주세요.';
            await page.fill('[data-test="search"] input', '');
            page.on('dialog', async dialog => {
                const message = dialog.message();
                expect(message).toContain(typeNameNull);
                await dialog.accept();
            });
            await page.click("[data-test='search-click']");
        });

        test('search 함수 결과 출력 확인', async ({ page }) => {
            await page.click('[data-test="search"]');
            await page.keyboard.down("ArrowDown");
            await page.keyboard.press("Enter");
            await page.click("[data-test='search-click']");
            const [response] = await Promise.all([
                page.waitForResponse(res => res.url().includes('/exam-join-subject') && res.status() === 200),
                page.click('[data-test="search-click"]')
            ]);

            const examName = page.locator('[data-test="examName"] input');
            await expect(examName).toBeVisible();
            await expect(examName).toHaveText('정보처리기사');
        });
    });
});
