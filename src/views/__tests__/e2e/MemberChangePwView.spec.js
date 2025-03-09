import MemberChangePwView from "@/views/MemberChangePwView.vue";
import { test, expect } from "@playwright/test";

const url = 'http://localhost:5173/member-changepw';

test.beforeEach(async ({ page }) => {
    await page.goto(url);
});

test.describe('MemberChangePwView', async () => {
    test('아이디 입력 시 DB에 존재하지 않을 경우', async ({ page }) => {

    });
});