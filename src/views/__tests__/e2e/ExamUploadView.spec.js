// @ts-check
import { test, expect } from '@playwright/test';

const url = 'http://localhost:5173/exam-upload/?userId=admin';

test.beforeEach(async ({ page }) => {
  await page.goto(url);

  await page.route('**/exam', async route => {
    if (route.request().method() !== 'POST') {
      await route.fallback();
      return;
    }

    const requestBody = await route.request().postDataJSON();
    expect(requestBody).toEqual({
      examStorage: [
          {exam_name: 'test'},
          {exam_des: 'testttt'},
          {exam_time: '2시간30분'},
          {exam_total: "20"},
      ],
      subjectStorage: [
        { subject: ['sql'] },
        { subject_total: ["1"] },
      ],
    });

    route.fulfill({
      status: 200,
      body: JSON.stringify({ result: true }),
    });
  });
});

test.describe('ExamCView', () => {
  test.describe('searchExam 함수', () => {
    test(' 버튼 확인 -> examName 아무것도 입력하지 않았을 경우', async ({ page }) => {
      const nullMsg = '주제를 입력해주세요';
      
      await page.waitForSelector('[data-test="search-input"] input'); 
      await page.fill('[data-test="search-input"] input', '');
  
      page.on('dialog', async dialog => {
        const message = dialog.message();
        expect(message).toContain(nullMsg);
        await dialog.accept();
      });
    });
  
    test('searchExam 버튼 확인 -> 새로운 데이터 일 경우', async ({ page }) => {
      const errorMsg = '데이터를 등록해주세요.';
      page.on('dialog', async dialog => {
        const message = dialog.message();
        expect(message).toContain(errorMsg);
        await dialog.accept();
      });
      
      await page.waitForSelector('[data-test="search-input"] input'); 
      await page.fill('[data-test="search-input"] input', 'test');
      await page.locator('[data-test="search"]').click();
    });
  
    test('searchExam 버튼 확인 -> 데이터가 존재할 경우', async ({ page }) => {
      const resultMsg = '해당하는 시험은 이미 존재합니다.';
      const mockResult = { rows: 
        [{
            exam_id: 1,
            exam_name: '정보처리기사',
            exam_time: '02시간30분',
            exam_des: 'testeee',
            exam_total: null
          }]
      };
  
      await page.waitForSelector('[data-test="search-input"] input'); 
      await page.fill('[data-test="search-input"] input', '정보처리기사');
  
      page.on('dialog', async dialog => {
        const message = dialog.message();
        expect(message).toContain(resultMsg);
        await dialog.accept();
      });
      
      const [response] = await Promise.all([
        page.waitForResponse(response => response.url().includes('/exam') && response.status() === 200),
        await page.locator('[data-test="search"]').click(),
      ]);
      const responseData = await response.json();
      expect(mockResult).toEqual(responseData);
    });
  });

  test.describe('saveExam 함수', () => {
    test('버튼 확인 -> examName 아무것도 입력하지 않았을 경우', async ({ page }) => {
      const nullMsg = '주제를 입력해주세요';
      await page.waitForSelector('[data-test="search-input"] input'); 
      await page.fill('[data-test="search-input"] input', '');
      
      page.on('dialog', async dialog => {
        const message = dialog.message();
        expect(message).toContain(nullMsg);
        await dialog.accept();
      });
    });

    test('저장 실패했을 때', async ({ page } ) => {
      const errorMsg = '시험유형을 생성하는데 실패하였습니다.';

      await page.waitForSelector('[data-test="search-input"] input'); 
      await page.fill('[data-test="search-input"] input', 'test');
      
      const [res] = await Promise.all([
        page.waitForResponse(res => res.url().includes('/exam') && res.status() === 200),
        await page.locator('[data-test="search"]').click(),
      ]);

      page.on('dialog', async dialog => {
        await dialog.accept();
      });

      await page.fill('[data-test="examTime"] input', '2시간30분');
      await page.fill('[data-test="examTotal"] input', '20');
      await page.fill('[data-test="subjects"] input', 'sql');
      await page.fill('[data-test="subjectTotal"] input', '1');
      await page.fill('[data-test="examDes"] textarea', 'testttt');

      await page.waitForSelector('[data-test="saveExam"]:not([disabled])');
      const [saveResponse] = await Promise.all([
        page.waitForResponse(response => 
          response.url().includes('/exam') && response.status() === 200 
        ),

        page.click('[data-test="saveExam"]')
      ]);

      page.on('dialog', async dialog => {
        const message = dialog.message();
        expect(message).toContain(errorMsg);
        await dialog.accept();
      });
    });

    test('저장 성공했을 경우', async ({ page }) => {
      const successMsg = '시험 유형을 생성하는데 성공하였습니다.';

      await page.fill('[data-test="search-input"] input', 'test')

      const [res] = await Promise.all([
        page.waitForResponse(res => res.url().includes('/exam') && res.status() === 200),
        await page.locator("[data-test='search']").click()
      ]);

      page.on('dialog', async dialog => {
        await dialog.accept()
      });

      await page.fill("[data-test='examTime'] input", '2시간30분');
      await page.fill("[data-test='examTotal'] input", '20');
      await page.fill("[data-test='subjects'] input", 'sql');
      await page.fill("[data-test='subjectTotal'] input", '1');
      await page.fill("[data-test='examDes'] textarea", 'testttt');

      const [response] = await Promise.all([
        page.waitForResponse(res => res.url().includes('/exam') && res.status() === 200),
        await page.locator("[data-test='saveExam']").click()
      ]);

      page.on('dialog', async dialog => {
        const message = dialog.message();
        expect(message).toContain(successMsg);
        await dialog.accept();
      })
    });

    test('addSubject 함수', async ({ page }) => {
      const subjects = page.locator('[data-test="subjects"]').all();
      const subjectTotal = page.locator('[data-test="subjectTotal"]').all();
      
      await page.click('[data-test="addSubject"]');
      
      expect((await subjects).length).toBe(1);
      expect((await subjectTotal).length).toBe(1);
    });
  });
});

