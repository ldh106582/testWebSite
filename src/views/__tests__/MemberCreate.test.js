import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import axios from "@/axios";
import { flushPromises, mount } from "@vue/test-utils";
import MemberCreate from "@/views/MemberCreate.vue";
import { ref } from "vue";

describe('Member Create', () => {
    
    let wrapper;
    let axiosGetSpy;
    let axiosPostSpy;
    const user = ref({
        userId: 'test',
        userPw: '1234',
        userName: 'test'
    });

    beforeEach(() => {
        wrapper = mount(MemberCreate);

        axiosGetSpy = vi.spyOn(axios, 'get').mockReturnValue({
            status: 200,
            data: { res: { error: true } }
        });

        axiosPostSpy = vi.spyOn(axios, 'post').mockResolvedValue({ 
           data: { error: true } // 응답 데이터에서 error가 true
        });
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
            axios.get.mockResolvedValueOnce({
                data: { error: true }
            });
            window.alert = vi.fn();

            await wrapper.vm.idCheck();

            wrapper.vm.$nextTick();

            expect(window.alert).toHaveBeenCalledWith(errorUserId);
        });
        test('userId 사용 가능할 때', async() => {
            const useUserId = '사용 가능한 아이디 입니다.';
            axios.get.mockResolvedValueOnce({
                data: { error: false }
            });

            await wrapper.vm.idCheck();

            wrapper.vm.$nextTick();

            expect(window.alert).toHaveBeenCalledWith(useUserId);
        });
    });
    describe('createMember 함수', () => {
        describe('error 발생', () => {
            test('Id 중복 체크를 하지 않았을 때', () => {
                const confirmId = 'Id 중복 체크를 반드시 진행하셔야 합니다.';
                const checkId = false;
                window.alert = vi.fn();
    
                wrapper.vm.createMember(checkId);
    
                expect(window.alert).toBeCalledWith(confirmId);
            });
            test('비밀번호 입력하지 않았을 때', async () => {
                const checkPw = '비밀번호를 반드시 입력해야 합니다.';
                wrapper.vm.checkId = true;
                wrapper.vm.user.userPw = '';
                const userPwSpy = wrapper.vm.user.userPw;
                window.alert = vi.fn();
    
                await wrapper.vm.$nextTick();
    
                wrapper.vm.createMember(userPwSpy);
    
                expect(window.alert).toBeCalledWith(checkPw);
            });
            test('이름을 입력하지 않았을 때', async () => {
                const checkName = '이름을 반드시 입력해야 합니다.';
                wrapper.vm.checkId = true;
                wrapper.vm.user.userPw = 'test12';
                const userPwSpy = wrapper.vm.user.userPw;
                window.alert = vi.fn();
    
                await wrapper.vm.$nextTick();
    
                wrapper.vm.createMember(userPwSpy);
    
                expect(window.alert).toBeCalledWith(checkName);
            });
        });
        describe('axios post 핸들러', () => {
            test('예상하지 못한 오류 발생', async () => {
                const errorMember = '회원가입이 불가합니다. ldh106582@naver.com 메일로 문의 바랍니다.';
                wrapper.vm.checkId = true;
                wrapper.vm.user = user.value;
                window.alert = vi.fn();
            
                axios.post.mockResolvedValueOnce({
                    data: { error: true }
                });
            
                await wrapper.vm.createMember();
            
                await flushPromises();
            
                expect(axios.post).toHaveBeenCalledWith('/create-member', user.value);
            
                expect(window.alert).toBeCalledWith(errorMember);
            });
            test('회원가입을 성공', async () => {
                const seccesMember = '회원가입이 완료 되었습니다.';
                wrapper.vm.checkId = true;
                wrapper.vm.user = user.value;
                window.alert = vi.fn();
            
                axios.post.mockResolvedValueOnce({
                    data: { error: false }
                });

                await wrapper.vm.createMember();
            
                await flushPromises();
            
                expect(axios.post).toHaveBeenCalledWith('/create-member', user.value);
            
                expect(window.alert).toBeCalledWith(seccesMember);
            })
        });
    });
});