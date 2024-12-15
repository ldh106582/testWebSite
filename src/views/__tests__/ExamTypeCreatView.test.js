import { describe, test, expect, vi, beforeEach } from "vitest";
import axios from "@/axios";
import ExamTypeCreatView from "@/ExamTypeCreatView.vue";
import { mount } from "@vue/test-utils";

describe('ExamTypeCreatView', () => {
    let wrapper;
    const alertSpy = vi.spyOn(window, 'alert')
    
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

        });
        test('axios get 성공', () => {

        });
        test('axios get 실패', () => {

        });
    });

})