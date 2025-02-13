import {test, expect} from "playwright-core";
import ExamUpdateView from "@/views/ExamUpdateView.vue";
import { createPinia } from 'pinia';
import { mount } from '@vue/test-utils';
import { useExamStore } from "@/stores/useExamStore";

const url = 'http://localhost:5173/exam-update/?userId=admin';

test.beforeEach(async ({ page }) => {
    const pinia = createPinia();
    const exampleStore = useExamStore(pinia); // 스토어 인스턴스 생성

    await page.goto(url);

    await page.route('**/exam', async route => {
        if (route.request().method() !== 'PUT') {
            await route.continue(); // 요청을 계속 진행
            return;
        }
        route.fulfill({
            status: 200,
            body: JSON.stringify({ result: true }),
        });
    });
});
test.describe('ExamUpdateView', () => {
    test.describe('addSubject', async () => {
        test('추가로 입력 칸 생성되는지 확인', async ({ mount, page }) => {
            const component = await mount(ExamUpdateView);
            console.log(component)
            await page.click(['data-test="addSubject"']);
        });
    });
})