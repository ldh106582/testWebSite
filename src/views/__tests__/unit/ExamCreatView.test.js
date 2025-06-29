import { describe, test, expect, vi, beforeEach } from "vitest";
import axios from "@/axios";
import ExamTypeCreatView from "@/views/ExamCreat.vue";
import { flushPromises, mount } from "@vue/test-utils";


// 아아디 중복갑 테스틐 코드 작성
describe('ExamTypeCreatView', () => {
    let wrapper;
    const mockExamName = '정보처리기사';
    const mockExamDes = "test description";
    const mockExamTime = '02시간 30분';
    const mockExamTotal = 100;
    const mockSubject = ['SQL'];
    const mockSubjectTotal = [50];
    
    let alertSpy = '';
    let confirmSpy = '';

    beforeEach(() => {
        confirmSpy = vi.spyOn(window, 'confirm').mockImplementation(() => false);
        alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

        vi.spyOn(axios, 'get').mockResolvedValueOnce({
            data: {
                status: 200,
                result: false,
                rows: []
            }
        });

        vi.spyOn(axios, 'post').mockResolvedValueOnce({
            data: {
                status: 200,
                result: false,
                rows: []
            }
        });

        wrapper = mount(ExamTypeCreatView);
    });

    describe('v-if isSearch 확인', () => {
        
        test('true 일 경우', async () => {
            const btn = wrapper.findAll('[data-test="search"]');
            
            await btn[0].trigger('click');
            
            wrapper.vm.isSearch = true;

            expect(wrapper.vm.isSearch).toBe(true);
        });

        test('false 일 경우', async () => {
            const btn = wrapper.findAll('[data-test="search"]');
            
            await btn[0].trigger('click');
            
            wrapper.vm.isSearch = false;

            expect(wrapper.vm.isSearch).toBe(false);

        })

    });

    describe('searchExam 함수', () => {
        test('examSubject 공백일 경우', async () => {
            const nullMsg = '주제를 입력해주세요';

            wrapper.vm.examSubject = '';
            wrapper.vm.searchExam();
            await wrapper.vm.$nextTick();

            expect(alertSpy).toBeCalledWith(nullMsg);

        });

        test('axios get 연결 확인', async() => {
            wrapper.vm.examName = mockExamName;
            wrapper.vm.isSearch = true;

            wrapper.vm.searchExam();
            await wrapper.vm.$nextTick();
            await flushPromises();

            expect(axios.get).toBeCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith('/exam', {
                params: {
                    exam_name: mockExamName,
                }
            });
        });

        test('axios 연결 성공 시 alert', async () => {
            const errorMsg = '데이터를 등록해주세요.';
            wrapper.vm.examName = mockExamName;
            wrapper.vm.isSearch = true;
        
            vi.spyOn(axios, 'get').mockResolvedValueOnce({
                data: {
                    result: true,
                    rows: []
                }
            });
        
            await wrapper.vm.searchExam();
            await wrapper.vm.$nextTick();
            await flushPromises();

            expect(alertSpy).toBeCalledWith(errorMsg);
        });
        
        test('axios 연결 실패 시 alert', async () => {
            wrapper.vm.examName = mockExamName;
            wrapper.vm.isSearch = true;

            wrapper.vm.searchExam();
            await wrapper.vm.$nextTick();
            await flushPromises();

            expect(axios.get).toBeCalledTimes(1);
        });

    });

    describe('saveExam 함수', () => {
        test('axios post 연결확인', async () => {
            confirmSpy.mockImplementation(() => true); 
            wrapper.vm.examName = mockExamName;
            wrapper.vm.examDes = mockExamDes;
            wrapper.vm.examTime = mockExamTime;
            wrapper.vm.examTotal = mockExamTotal;
            wrapper.vm.subjects = mockSubject;
            wrapper.vm.subjectTotal = mockSubjectTotal;
            const mockExamStorage = [
                {exam_name: mockExamName},
                {exam_des: mockExamDes},
                {exam_time: mockExamTime},
                {exam_total: mockExamTotal},
            ];
            const mockSubjectStorage = [
                {subject : mockSubject},
                {subject_total: mockSubjectTotal},
            ]
            wrapper.vm.isSearch = true;
            await wrapper.vm.$nextTick();

            wrapper.vm.saveExam();
            await wrapper.vm.$nextTick();
            await flushPromises();

            expect(axios.post).toBeCalledTimes(1);
            expect(axios.post).toHaveBeenCalledWith('/exam', {
                examStorage: mockExamStorage,
                subjectStorage : mockSubjectStorage
            });
        });

        test('axios post 성공 시 alert', async () => {
            confirmSpy.mockImplementation(() => true); 

            const successMsg = '시험 유형을 생성하는데 성공하였습니다.';

            wrapper.vm.examName = mockExamName;
            wrapper.vm.examDescription = mockExamDes;
            wrapper.vm.examTime = mockExamTime;
            
            await wrapper.vm.saveExam();
            await wrapper.vm.$nextTick();
            await flushPromises();

            expect(alertSpy).toBeCalledWith(successMsg);
        });

        test('axios 연결 실패 시 alert', async () => {
            const errorMsg = '시험유형을 생성하는데 실패하였습니다.';
        
            wrapper.vm.examName = mockExamName;
            wrapper.vm.examDescription = mockExamDes;
            wrapper.vm.examTime = mockExamTime;
            confirmSpy.mockImplementation(() => true);
        
            vi.spyOn(axios, 'post').mockResolvedValueOnce({
                data: {
                    status: 200,
                    result: true 
                }
            });
        
            await wrapper.vm.$nextTick();
            await wrapper.vm.saveExam();
            await wrapper.vm.$nextTick();
            await flushPromises();
        
            expect(alertSpy).toBeCalledWith(errorMsg);
        });
    });
});