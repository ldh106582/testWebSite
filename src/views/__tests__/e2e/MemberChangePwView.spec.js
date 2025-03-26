import { test, expect } from "@playwright/test";

const url = 'http://localhost:5173/member-changepw';
const mockUserPw = 'template123!';
const mockNewPw = 'template123@'

test.beforeEach(async ({ page }) => {
    await page.goto(url);
});

test.describe('MemberChangePwView', async () => {
    test('비밀번호 변경', async ({ page }) => {
        const msg1 = '새로운 비밀번호를 입력해주세요';

        page.on('dialog', async dialog => {
            const message = dialog.message();
            expect(message).toBe(msg1);
            await dialog.accept();
        });

        await page.fill('[data-test="userPw"] input', mockUserPw);
        await page.click('[data-test="changPw"]');
    });

    test('두 개의 비밀번호가 맞지 않을 때', async ({ page }) => {
        const msg1 = '두 개의 비밀번호가 다릅니다. 다시 시도해주세요.';

        page.on('dialog', async dialog => {
            const message = dialog.message();
            expect(message).toBe(msg1);
            await dialog.accept();
        });
    
        await page.fill('[data-test="userPw"] input', mockUserPw);
        await page.fill('[data-test="newPw"] input', mockNewPw);
        await page.click('[data-test="changPw"]');
    });

    test('', async ({ page }) => {
        const msg1 = '비밀번호가 정상적으로 변경되었습니다.';
        page.on('dialog', async dialog => {
            const message = dialog.message();
            expect(message).toBe(msg1);
            await dialog.accept();
        });
        await page.fill('[data-test="userPw"] input', mockUserPw);
        await page.fill('[data-test="newPw"] input', mockUserPw);
        await page.click('[data-test="changPw"]');
        
    });

});