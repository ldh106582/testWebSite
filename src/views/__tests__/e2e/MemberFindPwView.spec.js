import { test, expect } from "@playwright/test";

const url = 'http://localhost:5173/member-findpw';

const mockUserId_false = 'test1@naver.com';
const mockUserId_true = 'ehgus190@naver.com';

test.beforeEach(async ({ page }) => {
    page.goto(url);
});

test.describe('MemberFindPwView', () => {
    test('userId를 입력하지 않았을 경우', async ({page}) => {
        const msg1 = '아이디를 입력해주세요.';
        page.on('dialog', async dialog => {
            const message = dialog.accept();
            expect(message).toBe(msg1);
            await dialog.accept();
        });

        await page.fill('[data-test="userId"] input', '');
        await page.click('[data-test="btn"]');
    });
    
    test('userId가 존재하지 않을 경우', async ({ page }) => {
        const msg1 = '존재하는 아이디가 없습니다.';
        
        page.on('dialog', async dialog => {
            const message = dialog.message();
            expect(message).toBe(msg1);
            await dialog.accept();
        });

        await page.fill('[data-test="userId"] input', mockUserId_false);
        await page.click('[data-test="btn"]');
    });

    test('tepalte pw 가 정상적으로 넘어갔을 경우', async ({ page }) => {
        const msg1 = '작성하신 이메일로 임시 비밀번호를 전송하였습니다.';

        page.on('dialog', async dialog => {
            const message = dialog.message();
            expect(message).toBe(msg1);
            await dialog.accept();
        });

        await page.fill('[data-test="userId"] input', mockUserId_true)
        await page.click('[data-test="btn"]');

    });
});