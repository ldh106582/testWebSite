<template>
<v-container fluid>
    <v-row class="mx-0 my-4">
        <v-col class="pr-5" cols="12" xs="12" lg="6">
            <v-row>
                <span class="mb-1" style="font-weight: bold">환율</span>
            </v-row>
            <v-row class="outline">
                <v-col cols="auto">
                    <v-text-field variant="outlined" hide-details type="date" />
                </v-col>
                <v-col cols="auto" align-self="center">
                    <v-radio-group inline hide-details >
                    <v-radio label="USD" value="usd" />
                    <v-radio label="CNH" value="cnh" />
                    </v-radio-group>
                </v-col>
                <v-col cols="auto" align-self="center">
                    <v-btn data-test="rateSave" xs="4" color="purple" variant="outlined" @click="rateSave" >저장</v-btn>
                </v-col>
                <v-col cols="12" class="pt-0">
                    <v-text-field data-test="exchangeRate" class="dense" variant="outlined" hide-details type="text" placeholder="환율값" />
                </v-col>
            </v-row>
        </v-col>
        
        <v-col cols="12" xs="12" lg="6">
            <v-row>
                <span class="mb-1" style="font-weight: bold">결재</span>
            </v-row>
        
            <v-row class="outline py-0" style="min-height: 93px;">
                <v-col cols="4" align-self="center">
                    <v-checkbox hide-details label="Steve, Kim" value="Steve.kim@bandomk.com" color="primary" />
                </v-col>
                <v-col cols="4" align-self="center">
                    <v-checkbox hide-details label="Jongho, Lee" value="Jongho.lee@bandomk.com" color="primary" />
                </v-col> 

                <!-- <v-col cols="4" class="d-flex pa-0 flex-column align-center justify-center" style="position: relative;">
                    <v-btn color="primary" class="mt-1" @click="e => quoteCompleteAlarm()"> 완료</v-btn>
                    <p style=" font-size: 13px; top: 70%; text-align: center; position: absolute;">
                        2025-09-03
                    </p>
                </v-col> -->
                
                <v-col cols="4" class="d-flex py-0" style="text-align: center; ">
                    <div class="d-flex py-0 flex-column align-center justify-center"
                        style="position: relative; border-right: 1px solid black;">
                        <v-btn class="mr-2" color="primary" style="width: 70px;" @click="e => emailAlarm()">견적</v-btn>
                        <p class="mr-2" style="font-size: 13px; position: absolute; text-align: center; top: 70%;">
                            2025-09-03
                        </p>
                    </div>

                    <div class="d-flex py-0 flex-column align-center justify-center ml-2"
                        style="position: relative;">
                        <v-btn  variant="outlined" color="primary" style="width: 70px;"
                        @click="e => quoteCompleteAlarm()"> 완료</v-btn>
                        <p style="font-size: 13px; position: absolute; text-align: center; top: 70%;">
                            2025-09-03
                        </p>
                    </div>
                </v-col>
                
                <!-- <v-col cols="4" class="d-flex py-0 flex-column align-center justify-center" style="position: relative;">
                    <v-btn color="primary" @click="e => emailAlarm()"> 재견적 </v-btn>
                        <p style="font-size: 13px; top: 70%; text-align: center; position: absolute;">
                        2025-09-03
                        </p>
                </v-col>  -->
            </v-row>
            <v-row class="outline mt-5">
                <v-col cols="8">
                    <span>견적 완료까지 소요 시간 &nbsp; : &nbsp; 3시간 30분 </span>
                </v-col>
                <v-col class="py-1 d-flex justify-end">
                    <v-radio-group inline hide-details>
                    <v-radio label="Hour" value="hour" />
                    <v-radio label="Day" value="day" />
                    </v-radio-group>
                </v-col>
            </v-row>
        </v-col> 
    </v-row>


    <div>
        <v-table class="quote-cell" fixed-header density="compact" height="300">
            <thead>
                <tr data-test="title">
                    <th></th>
                    <th class="cell pa-0" style="min-width: 120px;">품 목 *</th>
                    <th class="cell pa-0" style="min-width: 200px;">Description</th>
                    <th class="cell pa-0" style="min-width: 180px;">SaleStatus</th>
                    <th class="cell pa-0" style="min-width: 100px;">Origin</th>
                    <th class="cell pa-0" style="min-width: 80px;">SPQ</th>
                    <th class="cell pa-0" style="min-width: 80px;">MFR</th>
                    <th class="cell pa-0" style="min-width: 180px;">Remarks</th>
                    <th class="cell pa-0" style="min-width: 100px;">업데이트</th>
                    <th class="cell pa-0" style="min-width: 50px; text-align: center;">복사</th>
                    <th class="cell pa-0" style="min-width: 50px; text-align: center;">삭제</th>
                </tr>
            </thead>
            <tbody>
                <tr data-test="searchResults" @click="selected = index" >
                <td>O</td>
                <td class="cell pa-0" style="width: 200px;">
                    <v-text-field data-test="item" hide-details variant="outlined" density="compact" style="padding: 0px" 
                    value="351500319" />
                </td>
                <td class="cell pa-0">
                    <v-text-field data-test="item" hide-details variant="outlined" density="compact" 
                    value="이건 test" />
                </td>
                <td class="cell pa-0">
                    <v-text-field data-test="item" hide-details variant="outlined" density="compact" 
                    value="Standard Product"/>
                </td>
                <td class="cell pa-0">
                    <v-text-field data-test="item" hide-details variant="outlined" density="compact" 
                    value="molex" />
                </td>
                <td class="cell pa-0">
                    <v-text-field data-test="item" hide-details variant="outlined" density="compact" type="number" 
                    value="12000"
                    />
                </td>
                <td class="cell pa-0">
                    <v-text-field data-test="item" hide-details variant="outlined" density="compact" 
                    value="molex"
                    />
                </td>
                <td class="cell pa-0">
                    <v-text-field data-test="item" hide-details variant="outlined" density="compact" 
                    value="test" />
                </td>
                <td class="cell pa-0">
                    <v-btn variant="text" class="pa-0" color="primary" @click="postItem([row.item])">업데이트</v-btn>
                </td>
                <td class="cell pa-0" style="text-align: center;">
                    <v-btn variant="text" class="pa-0" prepend-icon="mdi-content-copy" @click="clipboardItem(row)"></v-btn>
                </td>
                <td class="cell pa-0" style="text-align: center;">
                    <v-btn variant="text" class="pa-0" prepend-icon="mdi-delete" @click="deleteItem(index, row)"></v-btn></td>
                </tr>
            </tbody>
        </v-table>
    </div>
</v-container>

    <!-- <div class="container">
        <div class="loading-bar">
            <div class="persentage" :style="{ width: persentage + '%' }"></div>
        </div>
        <div class="time-info">
            {{ persentage }}% - {{ remainingTime }}초 남음
        </div>
    </div>

    <v-col>
        <v-btn color="red" @click="google">google</v-btn>
    </v-col>
    <v-date-input
        v-model="date"
        label="날짜 선택"
    ></v-date-input> -->

    <!-- <div>
    <v-row>
        <v-col cols="1" class="pa-0 ml-5">
            <v-checkbox hide-details v-model="allSelected" @change="allSelectBox"></v-checkbox>
        </v-col>
        
        <v-col cols="9" class="px-0" style="align-content: center;">
            <span>전체선택</span>
        </v-col>
        
        <v-col cols="12">
            <v-checkbox
            v-for="item in result"
            :key="item.id"
            v-model="selected"
            :value="item.id"
            :label="item.name"
            @change="updateAllSelected"
            ></v-checkbox>
        </v-col>
    </v-row>
</div> -->
    <!-- <v-row v-for="(value, index) in result" :key="index" cols="7" class="pa-0 ml-2">
        <v-col cols="1" class="pa-0">
            <v-checkbox v-model="selected[index]" hide-details value="John"></v-checkbox>
        </v-col>
        <v-col cols="2" v-for="(t, index1) in table" :key="index1" style="align-content: center;">
            <span>{{ value[t.key] }}</span>
        </v-col>
    </v-row>-->
</template>

<script setup>
import { ref, onMounted, shallowRef } from 'vue';
import axios from '@/axios';

const persentage = ref(0);
const totalDuration = 10;
const remainingTime = ref(totalDuration);
const date = ref(null)

const model = shallowRef(null);

const selected = ref([]);
const allSelected = ref(false);
const result = ref(
    [
        {id: 1, name: 'a'},
        {id: 2, name: 'b'},
        {id: 3, name: 'c'},
        {id: 4, name: 'd'},
        {id: 5, name: 'e'},
        {id: 6, name: 'f'},
    ]
)

const table = [
    {key: 'id'},
    {key: 'name'},
];

function allSelectBox() {
    if (allSelected.value) {
    selected.value = result.value.map(item => item.id);
    } else {
    selected.value = []
    }
}

function updateAllSelected() {
    allSelected.value = selected.value.length === result.value.length
}
function google () {
    axios.get('/google-form', {
    })
}

function test() {

    const table = [
        {key: 'question'}
    ];
    
    const testdata = [
        {question: 'asdfasdf[39]asdfsdf'}
    ];

    const reg = /\[(\d+)\]|[''""]/g;
    const result = testdata[0].question?.replace(reg, (match, code) => {
        return String.fromCharCode(parseInt(code));
    });
    
    console.log(result)

}

// const data = koreanLang.map(lang => 
//     translateLang[lang] || lang)
// console.log(data)

// }

onMounted(() => {
    const interval = setInterval(() => {
        if (persentage.value < 100) {
            persentage.value += 10 / totalDuration; 
            remainingTime.value = Math.ceil(totalDuration - (persentage.value / 100) * totalDuration);
        } else {
            clearInterval(interval);
        }
    }, 10);
test ();

});



</script>

<style scope>
.loading-bar {
    position: relative;
    width: 400px;
    height: 30px;
    border-radius: 15px;
    overflow: hidden;
    border-bottom: 1px solid #ddd;
}

.persentage {
    position: absolute;
    top: 1px; left: 1px; right: 1px;
    display: block;
    height: 100%;
    width: 50%; 
    border-radius: 15px;
    background-color: silver;
    animation: animation-stript 1s linear infinite;
}

@keyframes animation-stript {
    0% {background-position: 0 0;}
    100% {background-position: 60px 0;}
}

.outline {
    min-width: 100px;
    border: solid 1px rgb(118,118,118);
    border-radius: 5px;
    padding: 5px;
}
</style>