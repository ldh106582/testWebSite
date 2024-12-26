import { describe, expect, vi, beforeEach, test } from "vitest";
import ExamTypeUpdateView from '@/views/ExamTypeUpdateView.vue';
import axios from "@/axios";
import { mount } from "@vue/test-utils";
import { setActivePinia, createPinia } from "pinia";
import { useExamTypeStore } from '@/stores/useExamTypeStore';

describe('ExamTypeUpdateView', () => {

    let wrapper = '';
    const alertSpy = vi.spyOn(window, 'alert');
    const confirmSpy = vi.spyOn(window, 'confirm');

    beforeEach(() => {
        setActivePinia(createPinia());

        wrapper = mount(ExamTypeUpdateView);

        vi.spyOn(axios, 'get').mockResolvedValueOnce({
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
        test('axios get 실패 시', () => {

        });
    });
});