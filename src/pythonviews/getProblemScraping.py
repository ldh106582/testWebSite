import requests;
from bs4 import BeautifulSoup

url = 'https://chobopark.tistory.com/196'
response = requests.get(url)
html = response.text
soup = BeautifulSoup(html, 'html.parser')

def getQuestion () :
    codeQuestion = '코드이다.'
    num = []
    for i in range(20) :
        num.append(f'{i+1}.')
    
    ## 문제
    problem = soup.find_all('b')
    question = []
    for p in problem:
        text = p.get_text()
        for n in num:
            if n in text:
                question.append({'question' : text })
                if codeQuestion in text:
                    code = getCodeQuestion()
                    answer = getAnswer()
                    question.append({'answer' : answer })
                    break
                else :
                    answer = getAnswer()
                    question.append({'answer' : answer })
                    break
    print(question)
    return question

def getCodeQuestion () :
    codeQuestion = []
    code = soup.find_all('code')
    for c in code:
        return c.get_text()

def getAnswer () :
    targetColor = '#009a87'
    answer = []
    for element in soup.find_all(lambda tag: tag.has_attr("style")) :
        style = element.get('style')
        
        if f"color: {targetColor}" in style :
            text = element.get_text(strip=True)
            if ('기출문제이면서' not in text) and ('답' not in text):
                answer.append({text})
    
    return answer
    # answer_2 = []
    # for i in range(100) :
    #     selector = f'#content > div > div.entry-content > div.tt_article_useless_p_margin.contents_style > div.open > div > div:nth-child({i}) > span'
    #     answer = soup.select(selector)
        # answer_2 = soup._find_all('color: #009a87')
        # answer_2 = soup.select('.moreless-content > p > span')
        # print(answer)
    # for a in answer_2:
    #     text = a.get_text()

getQuestion()
getCodeQuestion()
getAnswer()