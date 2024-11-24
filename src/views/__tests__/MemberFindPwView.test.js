import { describe,test,expect, beforeEach } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import MemberFindPwView from '@/views/MemberFindPwView.vue';
import axios from "@/axios";

describe('MemberFindIdView', () => {
    let wrapper;
    const alertSpy = vi.spyOn(window, 'alert');

    beforeEach(() => {
        wrapper = mount(MemberFindPwView);

        vi.spyOn(axios, 'get').mockResolvedValue({
            data: {result : false }
        });
    });

    describe('UI랜더링', () => {
        test('button 랜더링 테스트', () => {
            const btn = wrapper.findAll('[data-test="btn"]')[0];
            
            expect(btn.exists()).toBe(true);
            btn.trigger('click');
        });
    });

    describe('findId', () => {
        test('axios get 호출 성공 시 alert 확인', async() => {
            const confrimMsg = "작성하신 이메일로 임시 비밀번호를 전송하였습니다.";
            const userId = 'test'
            wrapper.vm.userId = userId;

            axios.get.mockResolvedValueOnce({
                data: { result : false }
            });

            await flushPromises();
            await wrapper.vm.$nextTick();

            expect(axios.get).toBeCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith('/user-data-check',  { userId: userId });

            expect(alertSpy).toBeCalledWith(confrimMsg);
        });
        test('axios get 호출 실패 시 alert 확인', async() => {
            const confrimMsg = '존쟈하는 아이디가 없습니다.';
            const userId = 'test'
            wrapper.vm.userId = userId;

            axios.get.mockResolvedValueOnce({
                data: { result : true }
            });

            await flushPromises();
            await wrapper.vm.$nextTick();

            expect(axios.get).toBeCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith('/user-data-check',  { userId: userId });

            expect(alertSpy).toBeCalledWith(confrimMsg);
        });
    });
});