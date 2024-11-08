    import { describe, test, expect, beforeEach, vi } from "vitest";
    import AnnouncementView from '../AnnouncementView.vue';
    import { flushPromises, mount } from "@vue/test-utils";
    import axios from "@/axios.js";

    describe('getBoard', () => {;

        const mockItems = [
                {
                    board_title: '테스트1',
                    board_checkNum: 0
                }
            ];

        let wrapper;
        let axiosSpy;

        beforeEach(() => {
            wrapper = mount(AnnouncementView);

            axiosSpy = vi.spyOn(axios, 'get').mockResolvedValue({
                status: 200,
                data: { result: mockItems } // mockItems를 배열로 반환
            });

        });

        describe('UI 랜더링 확인', () => {
            test('titles 변수 랜더링', async () => {
                await wrapper.vm.$nextTick();

                const titleSpy = wrapper.findAll('[data-test="title"]');

                expect(titleSpy.length).toBe(1);

                expect(titleSpy.text()).toContain('제목');
            });
            test('items 변수 랜더링', async () => {
                wrapper.vm.items = mockItems;

                await flushPromises();

                const itemsSpy = wrapper.findAll('[data-test="item"]');
                expect(itemsSpy.length).toBe(mockItems.length);
                expect(itemsSpy[0].text()).toContain('테스트1');
                
            });
        });
        describe('getBoard 함수 테스트', () => {
            test('axios 호출 성공', async() => {
                await wrapper.vm.getBoard();
                
                wrapper.vm.$nextTick();
                await flushPromises();

                expect(axios.get).toHaveBeenCalledWith('/board');
            });
        });
    });5