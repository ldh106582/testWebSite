import { describe, test, expect, vi, beforeEach } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import MemberChangePwView from "@/views/MemberChangePwView.vue";
import MemberLoginPageView from "@/views/MemberLoginPageView.vue";
import { createRouter, createWebHistory } from "vue-router";
import axios from "@/axios";

describe('MemberChangePwView', () => {
    let wrapper;
    let router;
    let mockUserInfo = {
        userData: [
            { user_id: 'test', user_pw: 'test123!', user_name: 'tester' },
            { token: 'test123456789!@#$%' },
        ]
    };
    const mockUserId = 'test';
    const mockUserPw = 'test123!';
    const mockNewPw = 'test123@';
    const alertSpy = vi.spyOn(window, 'alert');

    beforeEach( async () => {
        router = createRouter({
            history: createWebHistory(),
            routes: [
                {
                    path: '/member-page',
                    name: 'member-page',
                    component: MemberLoginPageView
                }
            ]
        });
        
        await router.push({ path: '/member-changepw', query: { userId: mockUserId, userPw: mockNewPw } });
        await router.isReady();

        vi.spyOn(axios, 'put').mockResolvedValueOnce({
            data: {
                status: 200,
                result: false,

            }
        })

        wrapper = mount(MemberChangePwView, {
            global: {
                plugins: [router]
            }
        });
    });

    describe('changePw 함수', async() => {

        test('router 정상적으로 전달되었는지 확인', async  () => {
            const checkPw = '새로운 비밀번호를 입력해주세요';
            wrapper.vm.newPw = '';

            wrapper.vm.changePw();

            expect(alertSpy).toBeCalledWith(checkPw);
        });

        test('axios put 호출 성공 시 결과 확인', async () => {
            const successMsg = '비밀번호가 정상적으로 변경되었습니다.';
            wrapper.vm.newPw = mockNewPw;
            wrapper.vm.router.currentRoute.value.query.userId = mockUserId;

            await wrapper.vm.changePw();
            await wrapper.vm.$nextTick();

            expect(axios.put).toBeCalledTimes(1);
            expect(axios.put).toHaveBeenCalledWith('/member-changepw', { 
                userId: mockUserId,
                userPw: mockNewPw 
            });
            expect(alertSpy).toBeCalledWith(successMsg);
        });

        test('axios put 호출 실패 시 결과 확인', async() => {
            const errorMsg = '예상하지 못한 오류가 발생하였습니다. 잠시 후 다시 시도해주세요';
            wrapper.vm.newPw = mockNewPw;
            wrapper.vm.router.currentRoute.value.query.userId = mockUserId;
            vi.spyOn(axios, 'put').mockResolvedValueOnce({
                data: {
                    result: true,
                },
            });

            await flushPromises();
            await wrapper.vm.changePw();
            await wrapper.vm.$nextTick();

            expect(axios.put).toBeCalledTimes(1);
            expect(axios.put).toHaveBeenCalledWith('/member-changepw', { 
                userId: mockUserId,
                userPw: mockNewPw 
            });
            expect(alertSpy).toBeCalledWith(errorMsg);

        });
    });
});