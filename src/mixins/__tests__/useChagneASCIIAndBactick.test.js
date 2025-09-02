import { describe, test, expect, vi, beforeEach } from "vitest";
import useChangeASCIIAndBactick from '../useChangeASCIIAndBactick';
import { flushPromises, mount } from "@vue/test-utils";

describe('useChangeASCIIAndBactick', () => {
    let wrapper = '';

    beforeEach(() => {
        wrapper = useChangeASCIIAndBactick();
    });

    test('changeASCII 함수 작동 확인', async () => {
        const mockData = `가나다라'마바사아`;
        const mockExpect = '가나다라[39]마바사아';

        const result = await wrapper.changeASCII(mockData);
        expect(result).toBe(mockExpect);
    });


});