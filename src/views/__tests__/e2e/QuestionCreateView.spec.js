import { test, expect } from "@playwright/test";

const url = 'http://localhost:5173/question-create';

test.beforeEach(async ({ page }) => {
    await page.goto(url);
});

