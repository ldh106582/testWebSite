import { describe, expect, vi, beforeEach, test } from "vitest";
import ExamTypeUpdateView from '@/views/ExamTypeUpdateView.vue';
import axios from "@/axios";
import { flushPromises, mount } from "@vue/test-utils";
import { setActivePinia, createPinia } from "pinia";
import { useExamTypeStore } from '@/stores/useExamTypeStore';

describe('ExamTypeUpdateView', () => {

    let wrapper = '';
    const alertSpy = vi.spyOn(window, 'alert');
    let confirmSpy = vi.spyOn(window, 'confirm').mockImplementation(() => true);
    const mockStorage = [
        {
            type_id: 1,
            type_name: '정보처리기사',
            description: 'test'
        }
    ]


    beforeEach(() => {
        setActivePinia(createPinia());

        wrapper = mount(ExamTypeUpdateView);

        vi.spyOn(axios, 'get').mockResolvedValueOnce({
            data: {
                status: 200,
                result: true
            }
        });

        vi.spyOn(axios, 'delete').mockResolvedValueOnce({
            data: {
                status: 200,
                result: true
            }
        });

    });
    describe('search 함수', () => {
        test('examTypeStore.type_name이 undefined 일 경우', async () => {
            const typeNameNull = '데이터를 먼저 입력해주세요.';
            const examTypeStore = useExamTypeStore();
            examTypeStore.type_name = undefined;
            await wrapper.vm.$nextTick();

            wrapper.vm.search();
            await wrapper.vm.$nextTick();

            expect(alertSpy).toBeCalledWith(typeNameNull)
        });

        test('axios get 실패 시', async () => {
            const errorMsg = '알 수 없는 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.';
            const examTypeStore = useExamTypeStore();
            examTypeStore.type_name = '정보처리기사';

            wrapper.vm.search();
            await wrapper.vm.$nextTick();

            expect(axios.get).toBeCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith('/search-examType', {
                params:{
                    examSubject: examTypeStore.type_name
                }
            });
            expect(alertSpy).toBeCalledWith(errorMsg);
        });

        test('axios get 성공 시', async () => {
            const examTypeStore = useExamTypeStore();
            examTypeStore.type_name = '정보처리기사';
            axios.get.mockResolvedValueOnce({
                data: {
                    rows: [{
                        type_id: 1,
                        type_name: '정보처리기사',
                        description: 'test'
                    }]
                }
            });

            wrapper.vm.search();
            await wrapper.vm.$nextTick();
            await flushPromises();

            wrapper.vm.examStorages = mockStorage

            expect(axios.get).toBeCalledTimes(1);
            expect(mockStorage).toBe(wrapper.vm.examStorages)
        });
    });

    describe('examTypeDelete 함수', () => {
        describe('confirm true 일 경우', () => {
            test('confirm true 확인', () => {
                const confirmMsg = '되돌릴 수 없습니다. 정말 삭제하시겠습니까?';
    
                wrapper.vm.examTypeDelete();
                wrapper.vm.$nextTick();

                expect(confirmSpy).toBeCalledWith(confirmMsg);
            });
    
            test('confirm false 확인', () => {
                confirmSpy = vi.spyOn(window, 'confirm').mockImplementation(() => false);
                const cancelMsg = '취소되었습니다.';

                wrapper.vm.examTypeDelete();
                wrapper.vm.$nextTick();

                expect(alertSpy).toBeCalledWith(cancelMsg);

            });
        });
        describe('axios 확인', () => {
            const mockId = 1;
            test('delete result true일 경우', async () => {
                const errorMsg ='진행 중 오류를 발견하였습니다.';
                

                wrapper.vm.examTypeDelete(mockId);
                await wrapper.vm.$nextTick();
                await flushPromises();

                expect(axios.delete).toBeCalledTimes(1);

            });

            test('delete result false 일 경우', async () => {

            });
        })
    });
});