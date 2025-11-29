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
        code = getCodeQuestion(soup)
        for i in range(20) :
            num.append(f'{i+1}.')
        
        ## 문제
        croll_problem = soup.find_all('b')
        for p in croll_problem:
            questionText = p.get_text()
            for n in num:
                if n in questionText:
                    firstIndex = questionText.index('. ')
                    sliceText = questionText[(firstIndex + 2) : -1]
                    problem = {}
                    question = {}
                    
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

def getAnswer(soup) :
    targetColor = '#009a87;'
    raw_texts = []
    num = []
    for i in range(20) :
        num.append(f'{i+1}.')
    
    test = soup.find_all(lambda tag: tag.has_attr("style"))
    for t in test :
        temp = []
        style = t.get('style')
        if f"color: {targetColor}" in style :
            text =  t.get_text(strip=True)
            if ('기출문제이면서' not in text) and ('답' not in text):
                raw_texts.append(text)
    merged = []
    buffer = []
    pattern = re.compile(r"^\d+\.\s")
    
    for item in raw_texts :
        if pattern.match(item) :
            buffer.append(item)
        else :
            if buffer :
                merged.append(', ' .join(buffer))
                buffer = []
            merged.append(item)
        
    if buffer:
        merged.append(', '.join(buffer))

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