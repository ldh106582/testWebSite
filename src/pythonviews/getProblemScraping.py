import requests;
from bs4 import BeautifulSoup
from datetime import date

url = 'https://chobopark.tistory.com/196'
response = requests.get(url)
html = response.text
soup = BeautifulSoup(html, 'html.parser')
nodeUrl = 'http://localhost:3000'
today = date.today().isoformat()

def getQuestion () :
    codeQuestion = '코드이다.'
    num = []
    index = 0
    answer = getAnswer()
    
    for i in range(20) :
        num.append(f'{i+1}.')
    
    ## 문제
    croll_problem = soup.find_all('b')
    for p in croll_problem:
        text = p.get_text()
        for n in num:
            if n in text:
                firstIndex = text.index('. ')
                sliceText = text[(firstIndex + 2) : -1]
                problem = []
                question = []
                if codeQuestion in text:
                    question.append({ 'question': sliceText, 'question_point': 5,
                                    'question_level': '보통', 'question_type': '단답형',
                                    'question_year': '2020', 'question_academic_year': '1회차' })
                    code = getCodeQuestion()
                    problem.append({ 'problem' : code, 'answer' : answer[index] })
                    index += 1
                    requests.post(f'{nodeUrl}/question', 
                        json={'exam_id': 1, 'user_id': 'admin', 'today': today, 'subject_id': 6, 'questionStorages': question, 'problemStorages': problem })
                    break
                else :
                    question.append({ 'question': sliceText, 'question_point': 5,
                                    'question_level': '보통', 'question_type': '단답형',
                                    'question_year': '2020', 'question_academic_year': '1회차' })
                    problem.append({ 'answer': answer[index] })
                    index += 1
                    requests.post(f'{nodeUrl}/question', 
                        json={'exam_id': 1, 'user_id': 'admin', 'today': today, 'subject_id': 5,'questionStorages': question, 'problemStorages': problem })
                    break
    return problem

def getCodeQuestion () :
    codeQuestion = []
    code = soup.find_all('code')
    for c in code:
        return c.get_text()

def getAnswer () :
    targetColor = '#009a87;'
    answer = []
    
    test = soup.find_all(lambda tag: tag.has_attr("style"))
    for t in test :
        style = t.get('style')
        if f"color: {targetColor}" in style :
            text =  t.get_text(strip=True)
            if ('기출문제이면서' not in text) and ('답' not in text):
                answer.append(text)
    return answer

getQuestion()
getCodeQuestion()
getAnswer()