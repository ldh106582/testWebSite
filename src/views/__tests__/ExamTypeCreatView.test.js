import { describe, test, expect, vi, beforeEach } from "vitest";
import axios from "@/axios";
import ExamTypeCreatView from "@/views/ExamTypeCreatView.vue";
import { mount } from "@vue/test-utils";

describe('ExamTypeCreatView', () => {
    let wrapper;
    const alertSpy = vi.spyOn(window, 'alert');
    const mockExamSubject = 'testSubject';
    const mockExamDescription = "test description";
    
    beforeEach(() => {
        vi.spyOn(axios, 'get').mockResolvedValueOnce({
            data: {
                status: 200,
                result: false
            }
        });

        wrapper = mount(ExamTypeCreatView);
    });

    describe('createEaxmType 함수', () => {

        test('axios get 연결확인', () => {

            wrapper.vm.examSubject = mockExamSubject;
            wrapper.vm.examDescription = mockExamDescription;

            wrapper.vm.createEaxmType();
            wrapper.vm.$nextTick();

            expect(axios.get).toBeCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith('/create-examType', {
                params: {
                    exam_subject: 'testSubject',
                    exam_description: 'test description'
                }
            })
        });

        test('axios get 성공', () => {

            const successMsg = '시험 유형을 생성하는데 성공하였습니다.';

            wrapper.vm.examSubject = mockExamSubject;
            wrapper.vm.examDescription = mockExamDescription;

            vi.spyOn(axios, 'get').mockResolvedValueOnce({
                data: {
                    result : false
                }
            });
            
            wrapper.vm.createEaxmType();
            wrapper.vm.$nextTick();

            expect(alertSpy).toBeCalledWith(successMsg);

        });

        test('axios get 실패', async () => {
            const errorMsg = '시험유형을 생성하는데 실패하였습니다.';

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