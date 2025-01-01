import { describe, test, expect, vi, beforeEach } from "vitest";
import axios from "@/axios";
import ExamTypeCreatView from "@/views/ExamTypeCreatView.vue";
import { flushPromises, mount } from "@vue/test-utils";

describe('ExamTypeCreatView', () => {
    let wrapper;
    const mockExamSubject = 'testSubject';
    const mockExamDescription = "test description";
    
    const alertSpy = vi.spyOn(window, 'alert');
    let confirmSpy = '';

    beforeEach(() => {
        confirmSpy = vi.spyOn(window, 'confirm');
        vi.spyOn(axios, 'get').mockResolvedValueOnce({
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

    describe('searchExamType 함수', () => {
        test('examSubject 공백일 경우', async () => {
            const nullMsg = '주제를 입력해주세요';

            wrapper.vm.examSubject = '';
            wrapper.vm.searchExam();
            await wrapper.vm.$nextTick();

            expect(alertSpy).toBeCalledWith(nullMsg);

        });

        test('axios get 연결 확인', async() => {
            wrapper.vm.examSubject = mockExamSubject;
            wrapper.vm.isSearch = true;

            wrapper.vm.searchExam();
            await wrapper.vm.$nextTick();
            await flushPromises();

            expect(axios.get).toBeCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith('/examType', {
                params: {
                    type_name: 'testSubject',
                }
            });
        });

        test('axios 연결 성공 시 alert', async () => {
            const errorMsg = '데이터를 등록해주세요.';
            const mockExamSubject = 'mock exam subject';
            wrapper.vm.examSubject = mockExamSubject;
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
            wrapper.vm.examSubject = mockExamSubject;
            wrapper.vm.isSearch = true;

            wrapper.vm.searchExam();
            await wrapper.vm.$nextTick();
            await flushPromises();

            expect(axios.get).toBeCalledTimes(1);
        });

    });

    describe('createEaxmType 함수', () => {
        test('axios get 연결확인', async () => {
            confirmSpy.mockReturnValue(true); 
            wrapper.vm.examSubject = mockExamSubject;
            wrapper.vm.examDescription = mockExamDescription;
            wrapper.vm.isSearch = true;

            wrapper.vm.createEaxmType();

            await wrapper.vm.$nextTick();
            await flushPromises();

            expect(axios.get).toBeCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith('/create-examType', {
                params: {
                    examSubject: 'testSubject',
                    examDescription: 'test description'
                }
            })
        });

        test('axios get 성공 시 alert', async () => {
            confirmSpy.mockReturnValue(true); 

            const successMsg = '시험 유형을 생성하는데 성공하였습니다.';

            wrapper.vm.examSubject = mockExamSubject;
            wrapper.vm.examDescription = mockExamDescription;

            vi.spyOn(axios, 'get').mockResolvedValueOnce({
                data: {
                    result : false
                }
            });
            
            await wrapper.vm.createEaxmType();
            await wrapper.vm.$nextTick();
            await flushPromises();

            expect(alertSpy).toBeCalledWith(successMsg);

        });

        test('axios 연결 실패 시 alert', async () => {
            const errorMsg = '시험유형을 생성하는데 실패하였습니다.';
            confirmSpy.mockReturnValue(true); 

            wrapper.vm.examSubject = mockExamSubject;
            wrapper.vm.examDescription = mockExamDescription;

            vi.spyOn(axios, 'get').mockResolvedValueOnce({
                data: {
                    result : true
                }
            });

            await wrapper.vm.createEaxmType();
            await wrapper.vm.$nextTick();
            
            expect(alertSpy).toBeCalledWith(errorMsg);
        });

    });

})