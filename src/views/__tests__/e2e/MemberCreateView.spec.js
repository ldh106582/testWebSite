import { test, expect } from "@playwright/test";
import { Console } from "console";

const url = 'http://localhost:5173/member-create'
test.beforeEach(async ({ page }) => {
    await page.goto(url);
    await page.waitForTimeout(6000);
});

const mockUserId_false = 'ehgus190@naver.com';
const mockUserId_true = 'test@naver.com';
const mockUserPw = 'test12345!';

test.describe('MemberCreateView', () => {
    test.describe('아이디 중복 체크', () => {
        test('아이디가 중복 아닐 때', async ({ page}) => {
            const msg1 = '사용 가능한 아이디 입니다.';
            page.on('dialog', async dialog => {
                const message = dialog.message();
                expect(message).toBe(msg1);
            });
            await page.waitForSelector('[data-test="userId"] input');
            await page.fill('[data-test="userId"] input', mockUserId_true);
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
            await page.waitForResponse(res =>
                res.url().includes('/member-check') && res.status() === 200,
                { timeout: 120000 }
            );
        });
    });

    test.describe('회원가입', () => {
        test('아이디 중복 체크하지 입력하지 않았을 때', async ({ page }) => {
            const msg1 = 'ID 중복 체크를 반드시 진행하셔야 합니다.';

            page.on('dialog', async dialog => {
                const message = dialog.message();
                expect(message).toBe(msg1);
                await dialog.accept();
            });
            await page.click('[data-test="createMember"]');
        });

        test('비밀번호를 입력하지 않았을 때', async ({ page }) => {
            const msg1 = '사용 가능한 아이디 입니다.';
            const msg2 = '비밀번호를 반드시 입력해야 합니다.';

            page.on('dialog', async dialog => {
                const message = dialog.message();
                if (message.includes(msg1)) {
                    expect(message).toBe(msg1);
                    await dialog.accept();
                } else if (message.includes(msg2)) {
                    expect(message).toBe(msg2);
                    await dialog.accept();
                }
            });

            await page.waitForSelector('[data-test="userId"] input');
            await page.fill('[data-test="userId"] input', mockUserId_true);
            await page.click('[data-test="idCheck"]');
            await page.waitForResponse(res =>
                res.url().includes('/member-check') && res.status() === 200,
                { timeout: 120000 }
            );
            await page.click('[data-test="createMember"]');
        });

        test('이름을 입력하지 않았을 때', async ({ page }) => {
            const msg1 = '사용 가능한 아이디 입니다.';
            const msg2 = '이름을 반드시 입력해야 합니다.';

            page.on('dialog', async dialog => {
                const message = dialog.message();
                if (message.includes(msg1)) {
                    expect(message).toBe(msg1);
                    await dialog.accept();
                } else if (message.includes(msg2)) {
                    expect(message).toBe(msg2);
                    await dialog.accept();
                }
            });
            await page.waitForSelector('[data-test="userId"] input');
            await page.fill('[data-test="userId"] input', mockUserId_true);
            await page.click('[data-test="idCheck"]');
            await page.waitForResponse(res =>
                res.url().includes('/member-check') && res.status() === 200,
                { timeout: 120000 }
            );
            await page.fill('[data-test="userPw"] input', mockUserPw);
            await page.click('[data-test="createMember"]');
        });

    });
});