// @ts-check
import { test, expect } from '@playwright/test';

test('ExamCreatView', async ({ page }) => {
  await page.goto('http://localhost:5173/exam-create/?userId=admin');

  await expect(page.locator('h1')).toHaveText('시험 추가 페이지');

});