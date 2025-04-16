import requests;
from bs4 import BeautifulSoup

url = 'https://chobopark.tistory.com/196'
response = requests.get(url)
html = response.text
soup = BeautifulSoup(html, 'html.parser')
num = []
for i in range(20) :
    num.append(f'{i+1}.')
answerTitle = []

problem = soup.find_all('b')
# sliceOfProblem = problem.find('<b>')
for i in range(100) :
    selector = f'#content > div > div.entry-content > div.tt_article_useless_p_margin.contents_style > div:nth-child({i})'
    answer = soup.select(selector)
    


question = []
for p in problem:
    text = p.get_text()
    for n in num:
        if n in text:
            question.append(text)
            break
