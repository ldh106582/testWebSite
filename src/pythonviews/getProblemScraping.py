# import requests;
# from bs4 import BeautifulSoup
# from datetime import date
# import re

# url = 'https://chobopark.tistory.com/195'
# response = requests.get(url)
# html = response.text
# soup = BeautifulSoup(html, 'html.parser')
# nodeUrl = 'http://localhost:3000'
# questionround = '2회차'
# question_year = '2020'
# today = date.today().isoformat()

# def getQuestion () :
#     codeQuestion = ['다음은 자바 코드이다.', '출력 결과를 쓰시오.']
#     num = []
#     index = 0
#     index_code = 0
#     answer = getAnswer()
#     code = getCodeQuestion()
#     print(code[1])
#     for i in range(20) :
#         num.append(f'{i+1}.')
    
#     ## 문제
#     croll_problem = soup.find_all('b')
#     for p in croll_problem:
#         questionText = p.get_text()
#         for n in num:
#             if n in questionText:
#                 firstIndex = questionText.index('. ')
#                 sliceText = questionText[(firstIndex + 2) : -1]
#                 problem = []
#                 question = []
                
#                 if any(item in questionText for item in codeQuestion):
#                     question.append({ 'question': sliceText, 'question_point': 5,
#                                     'question_level': '보통', 'question_type': '단답형',
#                                     'question_year': question_year, 'question_round': questionround })
#                     problem.append({ 'problem' : code[index_code], 'answer' : answer[index] })
#                     print(index, sliceText)
#                     print(index, index_code, code[index_code])

#                     index += 1
#                     index_code += 1

#                     requests.post(f'{nodeUrl}/question', 
#                         json={'exam_id': 1, 
#                             'user_id': 'admin', 
#                             'today': today, 
#                             'subject_id': 6, 
#                             'questionStorages': question, 
#                             'problemStorages': problem })
#                     break
#                 else : 
#                     question.append({ 'question': sliceText, 'question_point': 5,
#                                     'question_level': '보통', 'question_type': '단답형',
#                                     'question_year': question_year, 'question_round': questionround })
#                     problem.append({ 'answer': answer[index] })
#                     print(index, sliceText)
#                     print(index,  answer[index])
#                     index += 1
#                     requests.post(f'{nodeUrl}/question', 
#                         json={'exam_id': 1, 
#                             'user_id': 'admin', 
#                             'today': today, 
#                             'subject_id': 5,
#                             'questionStorages': question,
#                             'problemStorages': problem })
#                     break
#         # return problem

# def getCodeQuestion () :
#     codeList = []
#     code = soup.find_all('code')
#     for c in code:
#         codeList.append(c.get_text())
    
#     return codeList

# def getAnswer () :
#     targetColor = '#009a87;'
#     raw_texts = []
#     num = []
#     for i in range(20) :
#         num.append(f'{i+1}.')
    
#     test = soup.find_all(lambda tag: tag.has_attr("style"))
#     for t in test :
#         temp = []
#         style = t.get('style')
#         if f"color: {targetColor}" in style :
#             text =  t.get_text(strip=True)
#             if ('기출문제이면서' not in text) and ('답' not in text):
#                 raw_texts.append(text)
#     merged = []
#     buffer = []
#     pattern = re.compile(r"^\d+\.\s")
    
#     for item in raw_texts :
#         if pattern.match(item) :
#             buffer.append(item)
#         else :
#             if buffer :
#                 merged.append(', ' .join(buffer))
#                 buffer = []
#             merged.append(item)
        
#     if buffer:
#         merged.append(', '.join(buffer))

#     return merged

def changeBacktick() :
    test = 'sadfa"d'
    for item in test :
        if '"' == item :
            print(ord(item))
    
    return

# getQuestion()
# getCodeQuestion()
# getAnswer()
changeBacktick()