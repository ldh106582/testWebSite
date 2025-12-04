import requests;
from bs4 import BeautifulSoup
from datetime import date
import re
import json

url = 'https://yunamom.tistory.com/'

def getQuestion():
    
    link = f'https://yunamom.tistory.com/{220}'
    html = response.text
    soup = BeautifulSoup(html, 'html.parser')
    
    answer = getAnswer(soup)
    
    return "dh"
    
    
    
def getAnswer(params) :
    return "dh"
    
getQuestion()