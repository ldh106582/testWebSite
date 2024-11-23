import { describe,test,expect, beforeEach } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import MemberFindPwView from '@/views/MemberFindPwView.vue';
import axios from "@/axios";
import { createRouter, createWebHistory } from "vue-router";
import { ref } from "vue";

describe('MemberFindIdView', () => {
    let wrapper;
    const userId = 'test'
    const temporaryPw = 'test123!'
    const alertSpy = vi.spyOn(window, 'alert');

    beforeEach(async() => {
        // const router = createRouter({
        //     history: createWebHistory(),
        //     rotues: [{
        //         path: '/',
        //         name: '',
        //         component: MemberLoginPageView
        //     }]
        // });

        // router.push({
        //     path: '/',
        // });

        // await router.isReady()
        
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

    describe('findId', () => {
        const obj = { params : { userId: userId, userPw: temporaryPw }}
        test('axios get 호출 성공 시 alert 확인', async() => {
            const confrimMsg = "작성하신 이메일로 임시 비밀번호를 전송하였습니다.";
            wrapper.vm.userId = userId;
            wrapper.vm.temporaryPw = temporaryPw;

            axios.get.mockResolvedValueOnce({
                data: { result : false }
            });

            await flushPromises();
            await wrapper.vm.$nextTick();
            await wrapper.vm.findPw();

            expect(axios.get).toBeCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith('/findpw-email',  obj);

            expect(alertSpy).toBeCalledWith(confrimMsg);
        });

        test('axios get 호출 실패 시 alert 확인', async() => {
            const confrimMsg = '존재하는 아이디가 없습니다.';
            wrapper.vm.userId = userId;
            wrapper.vm.temporaryPw = temporaryPw;

            axios.get.mockResolvedValueOnce({
                data: { result : true }
            });

            await flushPromises();
            await wrapper.vm.$nextTick();
            await wrapper.vm.findPw();

            expect(axios.get).toBeCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith('/findpw-email', obj);

            expect(alertSpy).toBeCalledWith(confrimMsg);
        });
    });
});