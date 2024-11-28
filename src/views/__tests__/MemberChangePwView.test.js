import { describe, test, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import MemberChangePwView from "@/views/MemberChangePwView.vue";
import { createRouter, createWebHistory } from "vue-router";

describe('MemberChangePwView', () => {
    let wrapper;
    let router;
    const userId = 'test';
    const userPw = 'test123!';
    const newPw = 'test123@'

    beforeEach( async () => {
        router = createRouter({
            history: createWebHistory(), 
        });
        
        await router.push({ 
            path: '/change-pw', 
            query: {
                userId: userId,
                userPw: userPw
            } 
        });
        await router.isReady();

        wrapper = mount(MemberChangePwView, {
            global: {
                plugins: [router]
            }
        });
    });

    describe('marchPw 함수', () => {
        test('router 정상적으로 전달되었는지 확인', async  () => {
            
            expect(wrapper.vm.router.query).toBe('dd');
        
        });
    });
});