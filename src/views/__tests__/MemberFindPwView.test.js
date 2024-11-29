import { describe,test,expect, beforeEach } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import MemberFindPwView from '@/views/MemberFindPwView.vue';
import MemberChangePwView from "@/views/MemberChangePwView.vue";
import axios from "@/axios";
import { createPinia, setActivePinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/useAuthStore";
import { ref } from "vue";

describe('MemberFindPwView', () => {
    let wrapper;
    let router;
    const userId = 'test';
    const userPw = 'test123!'
    const mockUserInfo = {
        userData : [
            { user_id: 'test', user_pw: 'test123!', user_name: 'tester' },
            { token: 'test123456789!@#$%' },
        ]
    };

    const alertSpy = vi.spyOn(window, 'alert');
    
    beforeEach(async() => {
        setActivePinia(createPinia());

        router = createRouter({
            history: createWebHistory(),
            routes: 
            [
                {
                    path: '/change-pw',
                    name: 'change-pw',
                    component: MemberChangePwView
                },
            ],
        });
        router.push({ path: '/change-pw', mockUSerInfo: mockUserInfo });
        await router.isReady();

        wrapper = mount(MemberFindPwView, {
            props: {
                isAuthenticated: true
            },
            global: {
                plugins :[router],
            },
        });

        vi.spyOn(axios, 'get').mockResolvedValue({
            data: { 
                result : false,
                userData: {}
            }
        });

        const auth = useAuthStore();
        vi.spyOn(auth, 'login').mockImplementation(() => {});

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
            const push = vi.spyOn(router, 'push');
            const mockUserInfo = {
                result: false,
                userData: [{ user_pw: 'test123!' }]
            };

            vi.mocked(axios.get).mockResolvedValue({
                data: mockUserInfo
            });
        
            await wrapper.vm.findPw();
            await wrapper.vm.$nextTick();

            expect(axios.get).toBeCalledTimes(1);
            expect(alertSpy).toBeCalledWith(confrimMsg);
        });

        test('axios get 호출 실패 시 alert 확인', async() => {
            const confrimMsg = '존재하는 아이디가 없습니다.';
            wrapper.vm.userId = userId;
            axios.get.mockResolvedValueOnce({
                data: { result: true, userData: [{ user_id: userId }], token: 'mockToken' } // userData 구조 맞춤
            });
            const push = vi.spyOn(router, 'push');
            
            await wrapper.vm.$nextTick();
            await wrapper.vm.findPw();
            await flushPromises();

            const userPw = wrapper.vm.templatePw();
            await wrapper.vm.$nextTick();

            expect(axios.get).toBeCalledTimes(1);
            expect(alertSpy).toBeCalledWith(confrimMsg);
        });
    });
});