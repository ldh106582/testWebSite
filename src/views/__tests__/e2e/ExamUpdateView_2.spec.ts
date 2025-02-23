import { test, expect } from '@playwright/experimental-ct-vue';
import ExamUpdateView from '@/views/ExamUpdateView.vue';

test('시험 유형 조회 및 수정 페이지 텍스트 확인', async ({ mount }) => {
    const examUpdateView = await mount(ExamUpdateView);
    await expect(examUpdateView).toContainText('시험 유형 조회 및 수정 페이지');
});
