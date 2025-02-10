// @ts-check
import { test, expect } from '@playwright/test';

const url = 'http://localhost:5173/exam-create/?userId=admin';

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
})

test.describe('ExamCreatView', () => {
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
  
      await page.waitForSelector('[data-test="search-input"] input'); 
      await page.fill('[data-test="search-input"] input', 'test');
  
      page.on('dialog', async dialog => {
        const message = dialog.message();
        expect(message).toContain(errorMsg);
        await dialog.accept();
      });
      
      const [response] = await Promise.all([
        page.waitForResponse(response => response.url().includes('/exam') && response.status() === 200),
        await page.locator('[data-test="search"]').click(),
      ]);
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
      const confirmMsg = '데이터를 저장하시겠습니까?';
      const errorMsg = '시험유형을 생성하는데 실패하였습니다.';

      await page.waitForSelector('[data-test="search-input"] input'); 
      await page.fill('[data-test="search-input"] input', 'test');
      
      const [res] = await Promise.all([
        page.waitForResponse(res => res.url().includes('/exam') && res.status() === 200),
        await page.locator('[data-test="search"]').click(),
      ]);

      await page.evaluate(isSearch => console.log(isSearch), true);

      page.on('dialog', async dialog => {  
        await dialog.accept();
      });

      await page.fill('[data-test="examTime"] input', '2시간30분');
      await page.fill('[data-test="examTotal"] input', '20');
      await page.fill('[data-test="subjects"] input', 'sql');
      await page.fill('[data-test="subjectTotal"] input', '1');
      await page.fill('[data-test="examDes"] textarea', 'testttt');

      await Promise.all([
        page.waitForResponse("/exam"),
        page.click('[data-test="saveExam"]'),
      ]);
      console.log("dh")

      page.on('dialog', async dialog => {
        console.log('dialog', dialog)
        const message = dialog.message();
        console.log(message)
        expect(message).toContain(errorMsg);
        await dialog.accept();
      });
    });
  });
});

