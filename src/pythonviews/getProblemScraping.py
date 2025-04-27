import requests;
from bs4 import BeautifulSoup
from datetime import date

url = 'https://chobopark.tistory.com/196'
response = requests.get(url)
html = response.text
soup = BeautifulSoup(html, 'html.parser')
nodeUrl = 'http://localhost:3000'
today = date.today()

def getQuestion () :
    codeQuestion = '코드이다.'
    num = []
    for i in range(20) :
        num.append(f'{i+1}.')
    
    ## 문제
    problem = soup.find_all('b')
    question = []
    for index, p in enumerate(problem):
        text = p.get_text()
        for n in num:
            if n in text:
                if codeQuestion in text:
                    code = getCodeQuestion()
                    answer = getAnswer()
                    question.append({'question' : text , 'code' : code, 'answer' : answer })
                    break
                else :
                    answer = getAnswer()
                    question.append({'question': text , 'answer': answer })
                    break
    print(today)
    # requests.post(f'{nodeUrl}/question', 
    #             json={'exam_id': 1, 'user_id': 'admin', 'today': today, 'questionStorages': questionStorages, 'problemStorages': problemStorages })
    return question

def getCodeQuestion () :
    codeQuestion = []
    code = soup.find_all('code')
    for c in code:
        return c.get_text()

def getAnswer () :
    targetColor = '#009a87'
    answer = []
    # for element in soup.find_all(lambda tag: tag.has_attr("style")) :
    test = soup.find_all(lambda tag: tag.has_attr("style"))
    
    for t in test :
        style = t.get('style')
        
        if f"color: {targetColor}" in style :
            text =  t.get_text(strip=True)
            if ('기출문제이면서' not in text) and ('답' not in text):
                return text
    return answer

getQuestion()
getCodeQuestion()
getAnswer()