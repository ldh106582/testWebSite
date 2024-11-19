import { describe, test, vi, expect, beforeEach } from "vitest";
import LoginPageView from "@/views/LoginPageView.vue";
import axios from "@/axios";
import { mount } from "@vue/test-utils";

describe('LoginPageView', ()=> {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(LoginPageView);
    });
    describe("UI 페이지", () => {
        test('login btn', async () => {
            wrapper.vm.user.userId = 'test';
            wrapper.vm.user.userPw = 'test12!';

            await wrapper.vm.$nextTick();

            const loginBtn = wrapper.findAll('[data-test="login"]')[0];

            wrapper.vm.login();

            loginBtn.trigger('click');
        });
    });
    describe('login 함수', () => {
        describe('아이디 비밀번호 입력 null 오류', () => {
            const mockCheckLogin = '아이디 비밀번호 모두 입력해야 합니다.';

            test('아이디를 입력 하지 않을 때', async() => {
                wrapper.vm.user.userId = '';
                wrapper.vm.user.userPw = 'test12!';
                window.alert = vi.fn();

                await wrapper.vm.$nextTick();

                wrapper.vm.login();

                expect(window.alert).toBeCalledWith(mockCheckLogin);
            });
            test('비밀번호를 입력 하지 않았을 때', async() => {
                wrapper.vm.user.userId = 'test';
                wrapper.vm.user.userId = '';
                window.alert = vi.fn();

                await wrapper.vm.$nextTick();

                wrapper.vm.login();

                expect(window.alert).toBeCalledWith(mockCheckLogin);
            });
        });
        
        
    });
    describe('findId, findPw함수', () => {
        // test('아이디 찾기 함수 호출', () => {
        //     wrapper.vm.findId();


        // });
        // test('비밀번호 찾기 함수 호출', () => {
        //     wrapper.vm.findPw();
        // });

    });
})