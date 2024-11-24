import { describe,test,expect, beforeEach } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import MemberFindPwView from '@/views/MemberFindPwView.vue';
import axios from "@/axios";
import { createPinia, setActivePinia } from "pinia";
import { ref } from "vue";

describe('MemberFindIdView', () => {
    let wrapper;
    const alertSpy = vi.spyOn(window, 'alert');
    const userId = 'test';

    beforeEach(async() => {
        setActivePinia(createPinia());

        wrapper = mount(MemberFindPwView);

        vi.spyOn(axios, 'get').mockResolvedValue({
            data: { result : false }
        });
    });

    describe('UI랜더링', () => {

        test('button 랜더링 테스트', () => {
            const btn = wrapper.findAll('[data-test="btn"]')[0];
            
            expect(btn.exists()).toBe(true);
            btn.trigger('click');
        });
    });

    describe('findPw', () => {
        test('axios get 호출 성공 시 alert 확인', async() => {
            const confrimMsg = "작성하신 이메일로 임시 비밀번호를 전송하였습니다.";
            wrapper.vm.userId = userId;
            const obj = {params: { userId: userId , userPw: wrapper.vm.templatePw() }};

            axios.get.mockResolvedValueOnce({
                data: { result : false, rows: [{ user_id: userId}] }
            });

            await flushPromises();
            await wrapper.vm.$nextTick();
            await wrapper.vm.findPw();

            expect(axios.get).toBeCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith('/findpw-email', obj);

            expect(alertSpy).toBeCalledWith(confrimMsg);
        });

        test('axios get 호출 실패 시 alert 확인', async() => {
            const confrimMsg = '존재하는 아이디가 없습니다.';
            wrapper.vm.userId = userId;
            const obj = {params: { userId: userId , userPw: wrapper.vm.templatePw() }};

            axios.get.mockResolvedValueOnce({
                data: { result : true, rows: [{ user_id: userId}] }
            });

            await flushPromises();
            await wrapper.vm.$nextTick();
            await wrapper.vm.findPw();

            expect(axios.get).toBeCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith('/findpw-email',  obj);

            expect(alertSpy).toBeCalledWith(confrimMsg);
        });
    });
});