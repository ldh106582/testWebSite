<template>
    <div class="assistant-container container">
        <aside class="sidebar">
            <h2 class="sidebar-title">Product Category</h2>
            <div>
                <button class="btn btn-secondary w-100 text-start" @click="isOpenProducts = !isOpenProducts">
                    {{ isOpenProducts ? '▼' : '▶' }} Product
                </button>
                
                <ul v-if="isOpenProducts" class="list-group mt-2">
                    <li v-for="item in products" class="list-group-item" :class="{ 'selected': selectedProd === item }"
                    @click="selectedProd = item" style="cursor: pointer; width: 100%;">
                        <label>
                            <input type="radio" name="category" :value="item" hidden>
                            {{ item }}
                        </label>
                    </li>
                </ul>
            </div>

            <div class="mt-2">
                <button class="btn btn-secondary w-100 text-start" @click="isOpenPin = !isOpenPin">
                    {{ isOpenPin ? '▼' : '▶' }} Pin
                </button>
                
                <ul v-if="isOpenPin" class="list-group mt-2">
                    <li v-for="item in pin" class="list-group-item" :class="{ 'selected': selectedPin === item }"
                    @click="selectedPin = item" style="cursor: pointer; width: 100%;">
                        <label>
                            <input type="radio" name="category" :value="item" hidden>
                            {{ item }} Pin
                        </label>
                    </li>
                </ul>
            </div>

            <div class="mt-2">
                <button class="btn btn-secondary w-100 text-start" @click="isOpenColor = !isOpenColor">
                    {{ isOpenColor ? '▼' : '▶' }} Color
                </button>
                
                <ul v-if="isOpenColor" class="list-group mt-2">
                    <li v-for="item in color" class="list-group-item" :class="{ 'selected': selectedColor === item }"
                    @click="selectedColor = item" style="cursor: pointer; width: 100%;">
                        <label>
                            <input type="radio" name="category" :value="item" hidden>
                            {{ item }}
                        </label>
                    </li>
                </ul>
            </div>
        </aside>

        <section class="chat-area">
            <ais-instant-search :search-client="searchClient" index-name="do_test">
                <ais-hits>
                    <template v-slot:item="{ item }">
                        <div class="hit">
                            <img v-if="item.imageURL" :src="item.imageURL" alt="" />
                            <h2>{{ item.partnumber }}</h2>
                            <p>{{ item.productdescription }}</p>
                        </div>
                    </template>
                </ais-hits>

                <form class="chat-input" @submit.prevent="handleSend">
                    <div class="chat-input" style="width: 100%;">
                        <ais-search-box class="input-field" />
                    </div>
                </form>
            </ais-instant-search>
        </section>
    </div>
</template>

<script setup>
import { ref, shallowRef } from 'vue';
import algoliasearch from 'algoliasearch';

const isOpenProducts = ref(false);
const isOpenPin = ref(false);
const isOpenColor = ref(false);
const selectedProd = ref(null);
const selectedPin = ref(null);
const selectedColor = ref(null);

const products = ['Housing', 'Connector', 'Terminal', 'TPA'];
const pin = ['2', '3', '4', '5', '6', '7', '8'];
const color = ['Black', 'White', 'Natural', 'Red', 'Blue'];

const searchClient = algoliasearch(
    'TXR99WRW8L', 
    'a7d8dc0446ef5b356aee0baa1a0f16f1' 
);

</script>

<style scope>

.dropdown-wrapper {
    width: 100%;
    display: inline-block;
}

.dropdown-menu {
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    list-style: none;
    padding: 0;
    margin: 0;
}

.dropdown-menu li {
    padding: 12px 16px;
    cursor: pointer;
}

.dropdown-menu li:hover {
    background-color: #ddd;
}


/* algolia */
.assistant-container {
    display: flex;
    height: 90vh;
    background: #f9fafc;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 12px rgba(0,0,0,0.05);
}

/* Sidebar */
.sidebar {
    width: 240px;
    background: #fff;
    border-right: 1px solid #e5e7eb;
    padding: 24px;
}

.sidebar-title {
    font-weight: 600;
    color: #0b2a66;
    margin-bottom: 12px;
}

.categories {
    list-style: none;
    padding: 0;
}

.list-group-item.selected {
    background: #0b2a66;
    color: white;
    border-color: #0b2a66;
}

.list-group-item:hover {
    background: #0b2a6620;
}
/* Chat area */
.chat-area {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    background: #f7f9fc;
    padding: 24px;
    overflow-y: auto;
}

.chat-heading {
    font-size: 20px;
    font-weight: 700;
    color: #0b2a66;
    margin-bottom: 16px;
}

.chat-window {
    flex: 1;
    overflow-y: auto;
    padding-right: 10px;
    margin-bottom: 16px;
}

.message {
    display: flex;
    margin-bottom: 10px;
}

.message.user {
    justify-content: flex-end;
}

.message.assistant {
    justify-content: flex-start;
}

.bubble {
    max-width: 70%;
    padding: 10px 14px;
    border-radius: 16px;
    line-height: 1.4;
}

.user .bubble {
    background: #4285f4;
    color: white;
    border-bottom-right-radius: 4px;
}

.assistant .bubble {
    background: #fff;
    color: #333;
    border-bottom-left-radius: 4px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

/* Input field */
.chat-input {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    border-top: 1px solid #e5e7eb;
    padding: 10px 12px;
    box-shadow: 0 -2px 6px rgba(0,0,0,0.05);
}

.input-field {
    flex: 1;
    padding: 10px 12px;
    border-radius: 8px;
    border: 1px solid #ccc;
    outline: none;
}

.send-btn {
    margin-left: 8px;
    background: #0b2a66;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* 연슺 */
.ais-Hits-list {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

.ais-SearchBox {
    width: 100%;
}

.ais-SearchBox-form {
    display: flex;
    align-items: center;
    width: 100%;
}


.ais-SearchBox-input {
    flex: 1;
    width: 100%;
    padding: 10px 12px;
    border-radius: 8px;
    border: 1px solid #ccc;
    outline: none;
}

.ais-SearchBox-submit {
    margin-left: 8px;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0; /* 버튼 크기 고정 */
}

</style>