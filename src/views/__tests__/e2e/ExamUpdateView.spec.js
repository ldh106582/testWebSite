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
    test.describe('시험 정보 출력', () => {
        test('시험 이름 미입력', async ({ page }) => {
            const typeNameNull = '데이터를 먼저 입력해주세요.';
            await page.fill('[data-test="search"] input', '');
            page.on('dialog', async dialog => {
                const message = dialog.message();
                expect(message).toContain(typeNameNull);
                await dialog.accept();
            });
            await page.click("[data-test='search-click']");
        });

        test('시험 정보 출력 확인', async ({ page }) => {
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

    test.describe('subject', () => {
        test('subject 삭제 오류', async ({ page }) => {
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
            
            await Promise.all([
                page.waitForResponse(res => res.url().includes('/exam-join-subject') && res.status() === 200),
                page.click('[data-test="search-click"]')
            ]);
        
            await page.click('[data-test="deleteSubject"]');
        
            await Promise.all([
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

        test('subject 추가 버튼' , async ({ page }) => {
            await page.click('[data-test="search"]');
            await page.keyboard.down("ArrowDown");
            await page.keyboard.down("ArrowDown");
            await page.keyboard.press("Enter");
            await page.click("[data-test='search-click']");
            await Promise.all([
                page.waitForResponse(res => res.url().includes('/exam-join-subject') && res.status() === 200),
                page.click('[data-test="search-click"]')
            ]);
            
            const examName = page.locator('[data-test="examName"] input');
            expect(examName).toHaveValue('리눅스마스터2급');

            const subject = page.locator('[data-test="subject"]').all();
            const subjectTotal = page.locator('[data-test="subjectTotal"]').all();
            
            await page.click('[data-test="addSubject"]');

            expect((await subject).length).toEqual(2);
            expect((await subjectTotal).length).toEqual(2);
        });

        test('subject 내용 숨김 / 나타남', async ({ page }) => {
            await page.click('[data-test="search"]');
            await page.keyboard.down("ArrowDown");
            await page.keyboard.down("ArrowDown");
            await page.keyboard.press("Enter");
            await page.click("[data-test='search-click']");
            await Promise.all([
                page.waitForResponse(res => res.url().includes('/exam-join-subject') && res.status() === 200),
                page.click('[data-test="search-click"]')
            ]);
            await page.click('[data-test="toggleVisible"]');
            await expect(page.locator('[data-test="subject"]')).toBeHidden();

            await page.waitForTimeout(3000); // 3000 밀리초 = 3초

            await page.click('[data-test="toggleVisible"]');
            await expect(page.locator('[data-test="subject"]').nth(0)).toBeVisible();
        });
    });

    test.describe('시험 수정 및 삭제', () => {
        test('시험 정보 수정', async ({ page }) => {
            const msg1 = '데이터를 변경하는 성공하였습니다.';

            await page.click('[data-test="search"]');
            await page.keyboard.down('ArrowDown');
            await page.keyboard.press('Enter');

            page.on('dialog', async dialog => {
                const message = dialog.message();
                expect(message).toBe(msg1);
                dialog.accept();
            })
            
            await Promise.all([
                page.waitForResponse(res => res.url().includes('/exam-join-subject') && res.status() === 200),
                page.click('[data-test="search-click"]')
            ]);

            page.locator('[data-test="subject"] input', 'SQL').nth(0);
            page.locator('[data-test="subject"Total] input', '3').nth(0);
            
            await page.click('[data-test="examSave"]');
            await Promise.all([
                page.waitForResponse(res => res.url().includes('/exam') && res.status() === 200),
                page.click('[data-test="examSave"]')
            ]);
        });
        
        test('시험 정보 삭제', async ({ page }) => {
            const msg1 = '되돌릴 수 없습니다. 정말 삭제하시겠습니까?';
            const msg2 = '삭제되었습니다.';
            
            await page.click('[data-test="examDelete"]');
            page.on('dialog', async dialog => {
                const message = dialog.message();
                if (message.includes(msg1)) {
                    expect(message).toBe(msg1);
                    await dialog.accept();
                } else if (message.includes(msg2)) {
                    console.log("msg2", message)
                    await dialog.accept();
                }
            });
            await page.click('[data-test="search"]');
            await page.keyboard.down('ArrowDown');
            await page.keyboard.press('Enter');
            await Promise.all([
                page.waitForResponse(res => res.url().includes('/exam') && res.status() === 200),
                page.click('[data-test="examDelete"]')
            ]);
        });

        test('시험 정보 삭제 취소', async ({ page }) => {
            const msg1 = '되돌릴 수 없습니다. 정말 삭제하시겠습니까?';
            const msg2 = '취소되었습니다.';
            await page.click('[data-test="examDelete"]');
            page.on('dialog', async dialog => {
                const message = dialog.message();
                if (message.includes(msg1)) {
                    expect(message).toBe(msg1);
                    await dialog.accept();
                } else if (message.includes(msg2)) {
                    console.log("msg2", message)
                    await dialog.accept();
                }
            });
        });
    });
});