import requests;
from bs4 import BeautifulSoup

url = 'https://chobopark.tistory.com/196'
response = requests.get(url)
html = response.text
soup = BeautifulSoup(html, 'html.parser')

title = soup.find_all('b')
print(title)