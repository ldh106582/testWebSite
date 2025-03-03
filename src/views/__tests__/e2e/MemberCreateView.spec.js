import { test, expect } from "@playwright/test";
import { Console } from "console";

const url = 'http://localhost:5173/member-create'
test.beforeEach(async ({ page }) => {
    await page.goto(url);
    await page.waitForTimeout(6000);
});

const mockUserId_false = 'ehgus190@naver.com';
const mockUserId_ture = 'test@naver.com';

test.describe('MemberCreateView', () => {
    test.describe('아이디 중복 체크', () => {
        test('아이디가 중복 아닐 때', async ({ page}) => {
            const msg1 = '사용 가능한 아이디 입니다.';
            page.on('dialog', async dialog => {
                const message = dialog.message();
                expect(message).toBe(msg1);
            });
            await page.waitForSelector('[data-test="userId"] input');
            await page.fill('[data-test="userId"] input', mockUserId_ture);
            await page.click('[data-test="idCheck"]');
            await Promise.all([
                page.waitForResponse(res => res.url().includes('/member-check') && res.status() === 200),
                await page.click('[data-test="idCheck"]')
            ]);
        });

        test('아이디가 중복일 때', async ({ page}) => {
            const msg1 = '이미 존재하는 아이디가 있습니다. 새로운 아이디를 설정해주세요.';
            page.on('dialog', async dialog => {
                const message = dialog.message();
                expect(message).toBe(msg1);
                await dialog.dismiss();
            });
            await page.waitForSelector('[data-test="userId"] input');
            await page.fill('[data-test="userId"] input', mockUserId_false);
            await page.click('[data-test="idCheck"]');
            const response = await page.waitForResponse(res =>
                res.url().includes('/member-check') && res.status() === 200,
                { timeout: 120000 }
            );
        });
    });

    test.describe('회원가입', () => {
        test('회원가입 데이터를 전부 입력하지 않았을 때', ({ page }) => {

        });
    });
});