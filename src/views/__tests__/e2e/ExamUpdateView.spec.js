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
        test('search 함수 작동 확인', async ({ page }) => {

            // 데이터 목록이 나타날 때까지 대기
            await page.click('[data-test="search"]'); // v-list-item의 선택자 확인
            await page.keyboard.down("ArrowDown");
            await page.keyboard.press("Enter");
            await page.click("[data-test='search-click']")
            const [response] = await Promise.all([
                await page.waitForResponse(res => res.url().includes('/exam-join-subject') && res.status() === 200),
                await page.click('[data-test="search-click"]')
            ]);

            // expect(examName).toHaveText('정보처리기사')
        });
    });      
});
