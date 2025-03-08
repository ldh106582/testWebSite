import { test, expect } from "@playwright/test";

const url = '';

test.beforeEach(async ({ page }) => {
    page.goto(url);
});