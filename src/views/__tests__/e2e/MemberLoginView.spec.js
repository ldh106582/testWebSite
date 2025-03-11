import { test, expect } from "@playwright/test";

const url = 'http://localhost:5173/member-login';
const mockUserId = 'nonDb@naver.com';
const mockUserPw = 'vndn23690!';

test.beforeEach(async ({ page }) => {
    await page.goto(url);
});

test.describe('MemberLoginView', () => {
    test('로그인 작동 확인', async ({ page }) => {
        const msg1 = '아이디 비밀번호 모두 입력해야 합니다.';
        
        page.on('dialog', async dialog => {
            const message = dialog.message();
            expect(message).toContain(msg1);
            await page.waitForTimeout(2000);
            await dialog.accept();
        });

        await page.fill('[data-test="userId"] input', '');
        await page.fill('[data-test="userPw"] input', '');
        page.click('[data-test="login"]');
    });

    test('아이디 비밀번호가 DB에 존재하지 않을 시', async ({ page }) => {
        const msg1 = '일치하는 아이디와 비밀번호가 없습니다.';

        page.on('dialog', async dialog => {
            const message = dialog.message();
            expect(message).toContain(msg1);
            await page.waitForTimeout(2000);
            await dialog.accept();
        });

        await page.fill('[data-test="userId"] input', mockUserId);
        await page.fill('[data-test="userPw"] input', mockUserPw);

        await Promise.all([
            page.waitForResponse(res => res.url().includes('/login') && res.status() === 200),
            page.click('[data-test="login"]')
        ]);
    });
});