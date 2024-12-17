import { describe, test, expect, vi, beforeEach } from "vitest";
import axios from "@/axios";
import ExamTypeCreatView from "@/views/ExamTypeCreatView.vue";
import { flushPromises, mount } from "@vue/test-utils";

describe('ExamTypeCreatView', () => {
    let wrapper;
    const mockExamSubject = 'testSubject';
    const mockExamDescription = "test description";
    
    const alertSpy = vi.spyOn(window, 'alert');
    const confirmSpy = vi.spyOn(window, 'confirm');

    beforeEach(() => {
        vi.spyOn(axios, 'get').mockResolvedValueOnce({
            data: {
                status: 200,
                result: false
            }
        });

        wrapper = mount(ExamTypeCreatView);
    });

    describe('v-if isSearch 확인', () => {
        
        test('true 일 경우', async () => {
            // const btn = wrapper.vm.find('[data-test="search"]')
            // await btn.trigger('click');

            // await wrapper.vm.$nextTick();

            // wrapper.vm.isSearch = true;

        });

        test('false 일 경우', () => {

        })

    });

    describe('searchExamType 함수', () => {

        test('axios get 연결 확인', () => {

        });

        test('axios 연결 성공 시 alert', () => {

        });
        
        test('axios 연결 실패 시 alert', () => {

        });

    });

    describe('createEaxmType 함수', () => {

        test('axios get 연결확인', async () => {

            wrapper.vm.examSubject = mockExamSubject;
            wrapper.vm.examDescription = mockExamDescription;

            wrapper.vm.$nextTick();

            wrapper.vm.createEaxmType();
            await flushPromises();

            expect(axios.get).toBeCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith('/create-examType', {
                params: {
                    exam_subject: 'testSubject',
                    exam_description: 'test description'
                }
            })
        });

        test('axios get 성공 시 alert', () => {

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

        test('axios 연결 실패 시 alert', async () => {
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