import { describe, test, expect, vi, beforeEach } from "vitest";
import axios from "@/axios";
import { mount } from "@vue/test-utils";
import MemberCreate from "@/views/MemberCreate.vue";
import { ref } from "vue";

describe('Member Create', () => {
    
    let wrapper;
    let axiosSpy;
    const user = ref({
        userId: 'test',
        userPw: '1234',
        userName: 'test'
    });

    beforeEach(() => {
        wrapper = mount(MemberCreate);

        axiosSpy = vi.spyOn(axios, 'get').mockReturnValue({
            status: 200,
            data: { userId: 'test123' }
        })
    });

    describe('errorMember 함수 ', () => {
        test('errorMember 함수 userId 한국어 입력 오류', () => {
            const errorMsg = '한글은 입력하실 수 없습니다.';
            wrapper.vm.user.userId = "테스트";
            const hasKoreanSpy = wrapper.vm.user.userId;
            window.alert = vi.fn();

            wrapper.vm.errorMember(hasKoreanSpy);

            expect(window.alert).toBeCalledWith(errorMsg);
        });
        test('errorMember 함수 includes 함수 실행', () => {
            const errorTrim = '공백은 포함될 수 없습니다.';
            wrapper.vm.user.userId = "te st";
            const userSpy = wrapper.vm.user.userId;
            window.alert = vi.fn();

            wrapper.vm.errorMember('userId');

            expect(window.alert).toBeCalledWith(errorTrim);
        });
    });
    describe('idcheck 함수', () => {
        test('userId가 중복일 경우', async() => {
            const errorUserId = '이미 존재하는 아이디가 있습니다. 새로운 아이디를 설정해주세요.';

            wrapper.vm.idCheck(user.userId);
            const res = await axios.get('/idCheck', {
                params: {
                    userId: user.userId
                }
            });
            window.alert = vi.fn();

            expect(window.alert).toBeCalledWith(errorUserId);
        });
    });
});