import requests;
from bs4 import BeautifulSoup
from datetime import date
import re
import json

nodeUrl = 'http://localhost:3000'
# questionround = '1회차'
# question_year = '2020'
today = date.today().isoformat()
lastNum = [196, 195, 194, 192, 191, 210, 217, 271, 423, 424, 372, 420, 453, 476, 483, 495, 540, 554]
years = ['2020', '2020', '2020', '2020', '2021', '2021', '2021', '2022', '2022', '2022', '2023', '2023', '2023', '2024', '2024', '2024', '2025', '2025',]
episodes = ['1회차', '2회차', '3회차', '4회차', '1회차', '2회차', '3회차', '1회차', '2회차', '3회차', '1회차', '2회차', '3회차', '1회차', '2회차', '3회차', '1회차', '2회차' ]


def getQuestion() :
    # image_urls = []
    
    # for img_tag in img_soup.find_all('img'):
    #     img_src = img_tag.get('src')
    #     if img_src:
    #         if not img_src.startswith(('http', 'https')):
    #             img_src = url + img_src  # Assuming a simple case
    #             image_urls.append(img_src)
                
    for i, li in enumerate(lastNum) :
        year = years[i]
        round = episodes[i]
        url = f'https://chobopark.tistory.com/{li}'
        response = requests.get(url)
        html = response.text
        soup = BeautifulSoup(html, 'html.parser')
        img_soup = BeautifulSoup(response.content, 'html.parser')
        
        codeQuestion = ['다음은 자바 코드이다.', '출력 결과를 쓰시오.']
        num = []
        index = 0
        index_code = 0
        answer = getAnswer(soup)
        print('result : ',li, year, round, answer)
        code = getCodeQuestion(soup)
        for i in range(20) :
            num.append(f'{i+1}.')
        
        ## 문제
        croll_problem = soup.find_all('b')
        for p in croll_problem:
            questionText = p.get_text()
            for n in num:
                if n in questionText:
                    sliceText = ''
                    try:
                        firstIndex = questionText.index('. ')
                        sliceText = questionText[(firstIndex + 2) : -1]
                        problem = {}
                        question = {}
                    except ValueError:
                        if '.' in questionText:
                            firstIndex = questionText.index('.')
                            sliceText = questionText[(firstIndex + 1) : -1].strip()
                        else:
                            print(f"문제 형식 오류: {questionText}")
                        break
                    
                    if any(item in questionText for item in codeQuestion):
                        question = { 'question': sliceText, 'point': 5, 'level': '보통', 'type': 2,'year': year, 'round': round }
                        problem = { 'problem': code[index_code], 'answer': json.dumps(answer[index]) }
                        
                        index += 1
                        index_code += 1

                        requests.post(f'{nodeUrl}/question', 
                            json={'exam_id': 6, 'today': today, 'subject_id': 5, 
                                'questionStorages': question, 'problemStorages': problem })
                        break
                    else : 
                        question = { 'question': sliceText, 'point': 5, 'level': '보통', 'type': 2, 'year': year, 'round': round }
                        problem = { 'answer': json.dumps(answer[index]) }

                        index += 1
                        requests.post(f'{nodeUrl}/question', 
                            json={'exam_id': 6, 'today': today, 'subject_id': 5,
                                'questionStorages': question, 'problemStorages': problem})
                        break

def getCodeQuestion(soup) :
    codeList = []
    code = soup.find_all('code')
    for c in code:
        codeList.append(json.dumps(c.get_text()))
    
    return codeList

def getAnswer(soup):
    merged = []
    
    # moreless-content 클래스를 가진 모든 div 찾기
    answer_blocks = soup.find_all('div', class_='moreless-content')
    
    exclude_texts = ['해당 복원된 기출문제가 많은 분들에게', '도움이 되었으면 좋겠습니다.']
    exclude_keywords = ['기출문제이면서', '답']
    
    for block in answer_blocks:
        # 블록 안의 모든 텍스트 가져오기
        block_texts = []
        
        # p 태그들 찾기
        paragraphs = block.find_all(['p', 'span'])
        
        for para in paragraphs:
            text = para.get_text(strip=True)
            
            # 빈 텍스트는 스킵
            if not text:
                continue
            
            # 제외 키워드가 포함된 텍스트는 스킵
            if any(keyword in text for keyword in exclude_keywords):
                continue
            
            # 제외 텍스트 목록에 있으면 스킵
            if text in exclude_texts:
                continue
            
            block_texts.append(text)
        
        # 한 블록 안의 텍스트들을 합치기
        if block_texts:
            # <br> 태그로 구분된 경우 처리
            if len(block_texts) == 1 and '\n' in block_texts[0]:
                # 줄바꿈이 있으면 ' / '로 구분
                merged.append(' / '.join(block_texts[0].split('\n')))
            elif len(block_texts) == 1:
                merged.append(block_texts[0])
            else:
                # 여러 개면 합치기
                is_all_numbers = all(
                    all(c.isdigit() or c in [',', ' ', '/', '%', '(', ')'] for c in txt) 
                    for txt in block_texts
                )
                separator = ' / ' if is_all_numbers else ', '
                merged.append(separator.join(block_texts))
    
    return merged

def changeBacktick(params) :
    result = ''
    for item in params :
        if item == '"' or item == '`' or item == "'" :
            result += f'[{ord(item)}]'
        else :
            result += item
    return result

getQuestion()