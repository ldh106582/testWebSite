import { describe, expect, vi, beforeEach, test } from "vitest";
import ExamTypeUpdateView from '@/views/ExamUpdateView.vue';
import axios from "@/axios";
import { flushPromises, mount } from "@vue/test-utils";
import { setActivePinia, createPinia } from "pinia";
import { useExamTypeStore } from '@/stores/useExamTypeStore';

describe('ExamTypeUpdateView', () => {

    let wrapper = '';
    const mockExamId = 1;
    const mockExamName = '정보처리기사';
    const alertSpy = vi.spyOn(window, 'alert');
    let confirmSpy = vi.spyOn(window, 'confirm').mockImplementation(() => true);
    const mockStorage = [
        {
            exam_id: 1,
            exam_name: '정보처리기사',
            exam_description: 'test'
        }
    ];

    beforeEach(() => {
        setActivePinia(createPinia());        
        wrapper = mount(ExamTypeUpdateView);

        confirmSpy = vi.spyOn(window, 'confirm').mockImplementation(() => true);

        vi.spyOn(axios, 'get').mockResolvedValueOnce({
            data: {
                result: true,
                rows: []
            }
        });

        vi.spyOn(axios, 'delete').mockResolvedValueOnce({
            data: {
                status: 200,
                result: true
            }
        });

        vi.spyOn(axios, 'put').mockResolvedValueOnce({
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
            examTypeStore.exam_name = undefined;
            await wrapper.vm.$nextTick();

            wrapper.vm.search();
            await wrapper.vm.$nextTick();

            expect(alertSpy).toBeCalledWith(typeNameNull)
        });

        test('axios get 실패 시', async () => {
            const errorMsg = '알 수 없는 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.';
            const examTypeStore = useExamTypeStore();
            examTypeStore.exam_id = mockExamId;

            await wrapper.vm.$nextTick();

            wrapper.vm.search();
            await flushPromises();

            expect(axios.get).toBeCalledTimes(1);
            expect(alertSpy).toBeCalledWith(errorMsg);
        });

        test('axios get 성공 시', async () => {
            const examTypeStore = useExamTypeStore();
            examTypeStore.exam_id = mockExamId;

            wrapper.vm.search();
            await wrapper.vm.$nextTick();
            await flushPromises();

            expect(axios.get).toBeCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith('/exam', {
                params: {
                    exam_id: mockExamId,
                }
            });
        });
    });

    describe('examDelete 함수', () => {
        describe('confirm true 일 경우', () => {
            test('confirm true 확인', () => {
                const confirmMsg = '되돌릴 수 없습니다. 정말 삭제하시겠습니까?';
    
                wrapper.vm.examDelete();
                wrapper.vm.$nextTick();

                expect(confirmSpy).toBeCalledWith(confirmMsg);
            });
    
            test('confirm false 확인', () => {
                confirmSpy = vi.spyOn(window, 'confirm').mockImplementation(() => false);
                const cancelMsg = '취소되었습니다.';

                wrapper.vm.examDelete();
                wrapper.vm.$nextTick();

                expect(alertSpy).toBeCalledWith(cancelMsg);

            });
        });
        describe('axios 확인', () => {
            test('delete result true일 경우', async () => {
                const errorMsg ='진행 중 오류를 발견하였습니다.';
                wrapper.vm.isCheckData = false;

                wrapper.vm.examStorages = mockStorage[0];
                await wrapper.vm.$nextTick();

                wrapper.vm.examDelete(mockStorage[0].exam_id);
                await flushPromises(); // 모든 비동기 작업 대기
                await wrapper.vm.$nextTick();

                expect(axios.delete).toBeCalledTimes(1);
                expect(axios.delete).toHaveBeenCalledWith('/exam', {
                    params: {
                        exam_id: mockStorage[0].exam_id,
                    }
                });
            });

            test('delete result false 일 경우', async () => {
                const succesMsg = '삭제되었습니다.';
                wrapper.vm.isCheckData = false;
                vi.spyOn(axios, 'delete').mockResolvedValueOnce({
                    data: {
                        rows: mockStorage
                    }
                });

                wrapper.vm.examStorages = mockStorage[0];
                await wrapper.vm.$nextTick();

                wrapper.vm.examDelete(mockStorage[0].exam_id);
                await wrapper.vm.$nextTick();
                await flushPromises();

                expect(axios.delete).toBeCalledTimes(1);
                expect(alertSpy).toBeCalledWith(succesMsg);
            });
        });
    });

    describe('examSave 함수', () => {
        test('axios put 실패시', async () => {
            const errorMsg = '저장 중 오류가 발생하였습니다. 변경사항을 확인 후 다시 시도해주세요.';
            wrapper.vm.isCheckData = false;

            wrapper.vm.examStorages = mockStorage[0];
            await wrapper.vm.$nextTick();

            wrapper.vm.examSave(mockStorage[0].exam_id);
            await wrapper.vm.$nextTick();
            await flushPromises();

            expect(axios.put).toBeCalledTimes(1);
            expect(alertSpy).toBeCalledWith(errorMsg);

        });
        test('axios put 성공 시', async () => {
            const succesMsg = '데이터를 변경하는 성공하였습니다.';
            wrapper.vm.isCheckData = false;
            vi.spyOn(axios, 'put').mockResolvedValueOnce({
                data: {
                    rows: mockStorage
                }
            });

            wrapper.vm.examStorages = mockStorage[0];
            await wrapper.vm.$nextTick();

            wrapper.vm.examSave(mockStorage[0].exam_id);
            await wrapper.vm.$nextTick();
            await flushPromises();

            expect(axios.put).toBeCalledTimes(1);
            expect(alertSpy).toBeCalledWith(succesMsg);

        });
    });
});