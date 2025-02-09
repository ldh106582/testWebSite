// global.d.ts (또는 shims-vue.d.ts)
export {};

declare global {
    interface Window {
        isSearch: boolean;
    }
}
