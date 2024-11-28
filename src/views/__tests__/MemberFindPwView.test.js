import { describe,test,expect, beforeEach } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import MemberFindPwView from '@/views/MemberFindPwView.vue';
import MemberMarchPwView from "@/views/MemberMarchPwView.vue";
import axios from "@/axios";
import { createPinia, setActivePinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/useAuthStore";

describe('MemberFindPwView', () => {
    let wrapper;
    let router;
    const alertSpy = vi.spyOn(window, 'alert');
    const userId = 'test';
    const mockUSerInfo = {
        userData : [
            { user_id: 'test', user_pw: 'test123!', user_name: 'tester' },
            { token: 'test123456789!@#$%' },

        ]
    };

    beforeEach(async() => {
        setActivePinia(createPinia());

        router = createRouter({
            history: createWebHistory(),
            routes: 
            [
                {
                    path: '/march-pw',
                    name: 'march-pw',
                    component: MemberMarchPwView
                },
            ],
        });
        router.push({ path: '/march-pw' });
        await router.isReady();

        wrapper = mount(MemberFindPwView, {
            props: {
                isAuthenticated: true
            },
            global: [router]
        });

        vi.spyOn(axios, 'get').mockResolvedValue({
            data: { 
                result : false,
                userData: {}
            }
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

            await flushPromises();
            await wrapper.vm.findPw();
            const userPw = wrapper.vm.templatePw();
            await wrapper.vm.$nextTick();

            expect(axios.get).toBeCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith('/findpw-email', { params: { userId: userId, userPw: userPw } });
            expect(alertSpy).toBeCalledWith(confrimMsg);

            login(mockUSerInfo);
        });

        // test('axios get 호출 실패 시 alert 확인', async() => {
        //     const confrimMsg = '존재하는 아이디가 없습니다.';
        //     wrapper.vm.userId = userId;

        //     axios.get.mockResolvedValueOnce({
        //         data: { result: false, userData: [{ user_id: userId }], token: 'mockToken' } // userData 구조 맞춤
        //     });

        //     await flushPromises();
        //     await wrapper.vm.$nextTick();
        //     await wrapper.vm.findPw();

        //     expect(axios.get).toBeCalledTimes(1);
        //     expect(alertSpy).toBeCalledWith(confrimMsg);
        // });
    });
});