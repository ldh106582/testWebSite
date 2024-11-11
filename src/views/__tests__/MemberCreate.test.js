import { describe, test, expect, vi, beforeEach } from "vitest";
import axios from "@/axios";
import { mount } from "@vue/test-utils";
import MemberCreate from "@/views/MemberCreate.vue";

describe('Member Create', () => {
    
    let wrapper;
    let axiosSpy;

    beforeEach(() => {
        wrapper = mount(MemberCreate);

        axiosSpy = vi.spyOn(axios, 'get').mockReturnValue({
            status: 200,
            data: { user_Id: 'test123' }
        })
    });


    describe('Form Input 입력 확인', async () => {
        const userId = 'test123';
        const userPw = 'test123@';
        const userName = 'test123';

        test('userId, userPw, userName ', () => {

            const userIdField = wrapper.find('[data-test="userId"]');
            expect(userIdField.exists()).toBe(true);

            wrapper.vm.userId = userId;
            expect(wrapper.vm.userId).toBe(userId);

            const userPwField = wrapper.find('[data-test="userPw"]');
            expect(userIdField.exists()).toBe(true);

            wrapper.vm.userId = userPw;
            expect(wrapper.vm.userId).toBe(userPw);

            const userNameField = wrapper.find('[data-test="userName"]');
            expect(userIdField.exists()).toBe(true);

            wrapper.vm.userId = userName;
            expect(wrapper.vm.userId).toBe(userName);

        });
        test('userId 중복확인', () => {
            expect(axiosSpy).toBe()

        });
    });
});