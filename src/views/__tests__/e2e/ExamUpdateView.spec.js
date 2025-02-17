// @ts-check
import { test, expect } from '@playwright/test';

const url = 'http://localhost:5173/exam-update/?userId=admin';
test.beforeEach(async ({ page }) => {
    await page.goto(url);
});

test.describe('ExamUpdateView', () => {
    
    test.describe('search 함수', () => {
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
    test.describe('deleteSubject 함수', () => {
        test('subject 삭제가 안될 경우', async ({ page }) => {
            const confirmMsg = '시험 과목을 삭제하시겠습니까?';
            const errorMsg = '시험과목을 삭제하던 중 오류가 발생하였습니다. 다시 시도해주세요.';
        
            // 다이얼로그 이벤트 리스너를 한 번만 등록
            page.on('dialog', async dialog => {
                const message = dialog.message();
                if (message.includes(confirmMsg)) {
                    expect(message).toContain(confirmMsg);
                    await dialog.accept();
                } else if (message.includes(errorMsg)) {
                    expect(message).toContain(errorMsg);
                    await dialog.accept();
                }
            });
        
            await page.click('[data-test="search"]');
            await page.keyboard.down('ArrowDown');
            await page.keyboard.press('Enter');
            await page.click('[data-test="search-click"]');
        
            const [selectResponse] = await Promise.all([
                page.waitForResponse(res => res.url().includes('/exam-join-subject') && res.status() === 200),
                page.click('[data-test="search-click"]')
            ]);
        
            await page.click('[data-test="deleteSubject"]');
        
            const [deleteResponse] = await Promise.all([
                page.waitForResponse(res => res.url().includes('/subject') && res.status() === 200),
                page.click('[data-test="deleteSubject"]')
            ]);
        });
    });
});