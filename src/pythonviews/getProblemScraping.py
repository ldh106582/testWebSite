import requests;
from bs4 import BeautifulSoup

url = 'https://chobopark.tistory.com/196'
response = requests.get(url)
html = response.text
soup = BeautifulSoup(html, 'html.parser')
num = []
for i in range(20) :
    num.append(f'{i+1}.')

problem = soup.find_all('b')
# sliceOfProblem = proplem.find('<b>')
# answer = soup.select('#content > div > div.entry-content > div.tt_article_useless_p_margin.contents_style > div:nth-child(27)')
# print(proplem)

question = []
for p in problem :
