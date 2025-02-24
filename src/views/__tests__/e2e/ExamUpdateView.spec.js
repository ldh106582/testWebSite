import { test, expect } from '@playwright/test';

const url = 'http://localhost:5173/exam-update/?userId=admin';
test.beforeEach(async ({ page }) => {
    await page.goto(url);
});

const mockExamName = '리눅스마스터2급';
const mockSubject = 'OS';
const mockSubjectTotal = '25';
const mockExamTime = '1시간';
const mockExamTotal = '50';
const mockExamDes = 'test';

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
            await page.keyboard.down("ArrowDown");
            await page.keyboard.press("Enter");
            await page.click("[data-test='search-click']");
            const [response] = await Promise.all([
                page.waitForResponse(res => res.url().includes('/exam-join-subject') && res.status() === 200),
                page.click('[data-test="search-click"]')
            ]);
            const examName = page.locator('[data-test="examName"] input');
            const subject = page.locator('[data-test="subject"] input').nth(0);
            const subjectTotal = page.locator('[data-test="subjectTotal"] input').nth(0);
            const examTime = page.locator('[data-test="examTime"] input');
            const examTotal = page.locator('[data-test="examTotal"] input');
            const examDes = page.locator('[data-test="examDes"] textarea');
            
            await expect(examName).toBeVisible();
            await expect(subject).toBeVisible();
            await expect(subjectTotal).toBeVisible();
            await expect(examTime).toBeVisible();
            await expect(examTotal).toBeVisible();
            await expect(examDes).toBeVisible();
            
            await expect(examName).toHaveValue(mockExamName);
            await expect(subject).toHaveValue(mockSubject);
            await expect(subjectTotal).toHaveValue(mockSubjectTotal);
            await expect(examTime).toHaveValue(mockExamTime);
            await expect(examTotal).toHaveValue(mockExamTotal);
            await expect(examDes).toHaveValue(mockExamDes);
        });
    });

    test.describe('deleteSubject 함수', () => {
        test('subject 삭제 실패', async ({ page }) => {
            const confirmMsg = '시험 과목을 삭제하시겠습니까?';
            const errorMsg = '시험과목을 삭제하던 중 오류가 발생하였습니다. 다시 시도해주세요.';
        
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

        test('subject 삭제 성공', async ({ page }) => {
            const confirmMsg = '시험 과목을 삭제하시겠습니까?';
            const succesMsg = '시험과목이 삭제되었습니다.';
            
            page.on('dialog', async dialog => {
                const message = dialog.message();
                if (message.includes(confirmMsg)) {
                    expect(message).toContain(confirmMsg);
                    await dialog.accept();                    
                } else if (message.includes(succesMsg)) {
                    expect(message).toContain(succesMsg);
                    await dialog.accept();
                }
            });
            
            await page.click('[data-test="search"]');
            await page.keyboard.down('ArrowDown');
            await page.keyboard.down('ArrowDown');
            await page.keyboard.press('Enter');

            const [selectResponse] = await Promise.all([
                page.waitForResponse(res => res.url().includes('/exam-join-subject') && res.status() === 200),
                await page.click('[data-test="search-click"]')
            ]);

            const deleteButton = page.locator('[data-test="deleteSubject"]').first();
            await expect(deleteButton).toBeVisible();

            const [deleteResponse] = await Promise.all([
                page.waitForResponse(res => res.url().includes('/subject') && res.status() === 200),
                await deleteButton.click()
            ]);
        });
    });

    test.describe('addSubject 함수', () => {
        test('클릭 했을 때 작동 확인' , async ({ page }) => {
            await page.click('[data-test="search"]');
            await page.keyboard.down("ArrowDown");
            await page.keyboard.press("Enter");
            await page.click("[data-test='search-click']");
            await Promise.all([
                page.waitForResponse(res => res.url().includes('/exam-join-subject') && res.status() === 200),
                page.click('[data-test="search-click"]')
            ]);
            
            const examName = page.locator('[data-test="examName"] input');
            expect(examName).toHaveValue('리눅스마스터2급');
            
            await page.click('[data-test="addSubject"]');
            

        });
    });
});