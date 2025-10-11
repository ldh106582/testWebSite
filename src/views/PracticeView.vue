<template>
<v-container fluid>
    <!-- <v-row class="mx-0 my-4">
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

                <v-col cols="4" class="d-flex pa-0 flex-column align-center justify-center" style="position: relative;">
                    <v-btn color="primary" class="mt-1" @click="e => quoteCompleteAlarm()"> 완료</v-btn>
                    <p style=" font-size: 13px; top: 70%; text-align: center; position: absolute;">
                        2025-09-03
                    </p>
                </v-col> 
                
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
                
                <v-col cols="4" class="d-flex py-0 flex-column align-center justify-center" style="position: relative;">
                    <v-btn color="primary" @click="e => emailAlarm()"> 재견적 </v-btn>
                        <p style="font-size: 13px; top: 70%; text-align: center; position: absolute;">
                        2025-09-03
                        </p>
                </v-col> 
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
    </v-row> -->


    <!-- <div>
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
    </div> -->

    <!-- <v-form >
        <v-row>
            <v-col class="d-flex align-center px-0" style="flex: 1;">
                <h3 class="font-weight-bold">Total :</h3>
                <span class="font-weight-bold">&nbsp; 건</span>
            </v-col>

            <v-col class="d-flex justify-end align-center px-0 mr-1" style="flex: 0;">
                <v-btn color="green" text="전체저장" @click="save" />
            </v-col>
        </v-row>
                
        <v-row class="pa-2" style="border: 1px solid silver; border-radius: 9.8px;">
            <v-col cols="12" class="pa-0">
            <v-table  class="label-table" fixed-header density="compact" height="380">
                <thead>
                <tr>
                    <th class="header pa-2 bordered-header" style="min-width: 50px;">
                    <v-checkbox hide-details class="pa-0 d-flex justify-center" v-model="allSelected" @change="allSelectBox" />
                    </th>
                    <th class="header pa-2 bordered-header" style="min-width: 200px;">품번</th>
                    <th class="header pa-2 bordered-header" style="min-width: 200px;">품명</th>
                    <th class="header pa-2 bordered-header" style="min-width: 150px;">날짜</th>
                    <th class="header pa-2 bordered-header" style="min-width: 100px;">수량</th>
                    <th class="header pa-2 bordered-header" style="min-width: 350px;">비고</th>
                    <th class="header pa-2 bordered-header" style="min-width: 60px;"></th>
                    <th class="header pa-2 bordered-header" style="min-width: 60px;"></th>
                </tr>
                </thead>

                <tbody>
                </tbody>
            </v-table>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="auto" class="py-2 px-1" style="text-align: start;">
                <v-btn data-test="add" color='primary' @click="addLabel">추가</v-btn>
            </v-col>
            <v-col cols="auto" class="py-2 px-0" style="text-align: start;">
                <v-btn data-test="copy" color="primary" @click="copyLabel">복사</v-btn>
            </v-col>
    
            <v-col cols="auto" class="px-0 py-2 ml-auto" style="text-align: end;">
            <v-btn data-test="reset" color="red" @click="resetAll">초기화</v-btn>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" class="px-0 py-2">
            </v-col>
        </v-row>
    </v-form> -->

    <!-- <div class="test">
        <p style="width: 10%;">test</p>
    </div> -->
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
            
            <v-col v-for="(item, index) in result" :key="item.id" cols="12">
                <v-checkbox
                :value="item.id"
                v-model="selected[index]"
                :label="item.name"
                @change="updateAllSelected(item, index)"
                ></v-checkbox>
            </v-col>
            <v-btn @click="save">저장</v-btn>
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

    <!-- <h2>Automatic Slideshow</h2>
<p>Change image every 2 seconds:</p>

<div class="slideshow-container">

<div class="mySlides fade">
    <div class="numbertext">1 / 3</div>
    <img src="/img/img1.jpg" style="width:100%">
    <div class="text">Caption Text</div>
</div>

<div class="mySlides fade">
    <div class="numbertext">2 / 3</div>
    <img src="/img/img2.jpg" style="width:100%">
    <div class="text">Caption Two</div>
</div>

<div class="mySlides fade">
    <div class="numbertext">3 / 3</div>
    <img src="/img/img3.jpg" style="width:100%">
    <div class="text">Caption Three</div>
</div>

</div>
<br>

<div style="text-align:center">
    <span class="dot"></span> 
    <span class="dot"></span> 
    <span class="dot"></span> 
</div> -->

<!-- <div class="menu" @click="slide_menu">
    <span>Menu</span>
    <ul class="sub" ref="subBar">
        <li>
            <a href="#None">Home</a>
        </li>
        <li>
            <a href="#None">Profile</a>
        </li>
        <li>
            <a href="#None">Contact</a>
        </li>
        <li>
            <a href="#None">Dhd q</a>
        </li>
    </ul>
</div> -->

<!-- <div class="dropdown-wrapper">
    <button @click="toggleDropdownCor" class="dropdown-trigger">
        <span>Select an corporation</span>
        <span class="ml-5">{{ selectedCor }}</span>
    </button>
    <ul v-if="isOpenCor" class="dropdown-menu" style="display: flex;">
        <li v-for="(item, index) in testItems" :key="item" @click="selectCorporation(item)">
            <v-checkbox hide-details :label="item" :value="item" v-model="selectedCor"/>
        </li>
    </ul>
</div> -->

<!-- <div class="dropdown-wrapper">
    <button @click="toggleDropdownItems" class="dropdown-trigger">
        <span>Select an Items</span>
        <span class="ml-5">{{ selectedItems }}</span>
    </button>
    <ul v-if="isOpenItems" class="dropdown-menu" style="display: flex;">
        <li v-for="(item, index) in items" :key="item" @click="selectItems(item)">
            <v-checkbox hide-details :label="item"  v-model="selectedItems" />
        </li>
    </ul>
</div> -->


    <div class="dropdown-wrapper">
        <button @click="toggleDropdownCor" class="dropdown-trigger">
            <span>Select a corporation</span>
            <span class="ml-5">{{ selectedCor?.company || 'None' }}</span>
        </button>
        <ul v-if="isOpenCor" class="dropdown-menu">
            <li v-for="item in testItems" :key="item.company" @click="selectCorporation(item)">
                <v-checkbox 
                    hide-details 
                    :label="item.company" 
                    :model-value="selectedCor?.company === item.company"
                    @click.stop
                />
            </li>
        </ul>
    </div>

    <div class="dropdown-wrapper" v-if="selectedCor">
        <button @click="toggleDropdownItems" class="dropdown-trigger">
            <span>Select items</span>
            <span class="ml-5">{{ selectedItems.length }} selected</span>
        </button>
        <ul v-if="isOpenItems" class="dropdown-menu">
            <li v-for="item in getSelectedCompanyItems()" :key="item">
                <v-checkbox 
                    hide-details 
                    :label="item" 
                    :value="item" 
                    v-model="selectedItems"
                />
            </li>
        </ul>
    </div>

    <!-- <div v-if="selectedItems.length > 0" class="selected-items">
        <h3>Selected Items:</h3>
        <ul>
            <li v-for="item in selectedItems" :key="item">{{ item }}</li>
        </ul>
    </div> -->

</template>

<script setup>
import { ref, shallowRef } from 'vue';
import axios from '@/axios';

const isOpenCor = ref(false);
const isOpenItems = ref(false);
const selectedCor = ref(null);
const selectedItems = ref(null);
const testItems = [
    {
        company: 'Apple',
        items: ['Apple Tablet', 'Apple Phone', 'Apple Watch', 'Apple EarPhone']
    },
    {
        company: 'Samsung',
        items: ['Samsung Tablet', 'Samsung Phone', 'Samsung Watch', 'Samsung EarPhone']
    }
];

function toggleDropdownCor() {
    isOpenCor.value = !isOpenCor.value;
}

function selectCorporation(item) {
    selectedCor.value = item;
    selectedItems.value = [];
    isOpenCor.value = false;
    isOpenItems.value = true; 
}

function getSelectedCompanyItems() {
    if (!selectedCor.value) return [];
    const company = testItems.find(item => item.company === selectedCor.value.company);
    return company ? company.items : [];
}



// const toggleDropdownCor = () => {
//     isOpenCor.value = !isOpenCor.value;
// };

// const selectCorporation = (item) => {
//     selectedCor.value = item;
//     // isOpenCor.value = false;
// };


// const toggleDropdownItems = () => {
//     isOpenItems.value = !isOpenItems.value;
// }

// const selectItems = (item) => {
//     selectedItems.value = item;
//     // isOpenItems.value = false;
// };

// const subBar = ref(null);
// let subToggle = false;

// async function slide_menu() {
//     const totalHeigth = subBar.value.style.height
//     console.log(subBar.value.style.height)
//     console.log(totalHeigth)
//     if (!subToggle) {
//         for (let i = 0; i <= 160; i++) {
//             subBar.value.style.height = `${i}px`;
//         }
//     } else {
//         for (let i = 160; i >= 0; i--) {
//             subBar.value.style.height = `${i}px`;
//         }
//     }
//     subToggle = !subToggle;
// }

// const persentage = ref(0);
// const totalDuration = 10;
// const remainingTime = ref(totalDuration);
// const model = shallowRef(null);

// const selected = ref([false]);
// const allSelected = ref(false);
// const result = ref(
//     [
//         {id: 1, name: 'a'},
//         {id: 2, name: 'b'},
//         {id: 3, name: 'c'},
//         {id: 4, name: 'd'},
//         {id: 5, name: 'e'},
//         {id: 6, name: 'f'},
//     ]
// )

// const table = [
//     {key: 'id'},
//     {key: 'name'},
// ];
// const storage = [];

// function save() {
//     console.log(selected.value)
// }

// function allSelectBox() {
//     if (allSelected.value) {
//         selected.value = result.value.map(item => item.id);
//     } else {
//         selected.value = []
//     }
// }

// function updateAllSelected(rows, index) {
    
//     const listObj = {};

//     if (result.value[index].id === selected.value[index]) {
//         table.forEach(t => {
//             listObj[t.key] = result.value[index][t.key];
//         });
//     }
//     storage.push(listObj)

//     console.log(storage)
//     // allSelected.value = selected.value.length === result.value.length
// }
// function google () {
//     axios.get('/google-form', {
//     })
// }

// function test() {

//     const table = [
//         {key: 'question'}
//     ];
    
//     const testdata = [
//         {question: 'asdfasdf[39]asdfsdf'}
//     ];

//     const reg = /\[(\d+)\]|[''""]/g;
//     const result = testdata[0].question?.replace(reg, (match, code) => {
//         return String.fromCharCode(parseInt(code));
//     });
    
//     console.log(result)

// }

// // const data = koreanLang.map(lang => 
// //     translateLang[lang] || lang)
// // console.log(data)

// // }

// onMounted(() => {
//     const interval = setInterval(() => {
//         if (persentage.value < 100) {
//             persentage.value += 10 / totalDuration; 
//             remainingTime.value = Math.ceil(totalDuration - (persentage.value / 100) * totalDuration);
//         } else {
//             clearInterval(interval);
//         }
//     }, 10);
// test ();
// showSlides();

// });

// let slideIndex = 0;
// function showSlides() {
//     let i;
//     let slides = document.getElementsByClassName("mySlides");
//     let dots = document.getElementsByClassName("dot");
//     for (i = 0; i < slides.length; i++) {
//         slides[i].style.display = "none";  
//     }
//     slideIndex++;
//     if (slideIndex > slides.length) {slideIndex = 1}    
//     for (i = 0; i < dots.length; i++) {
//         dots[i].className = dots[i].className.replace(" active", "");
//     }
//     slides[slideIndex-1].style.display = "block";  
//     dots[slideIndex-1].className += " active";
//     setTimeout(showSlides, 2000);
// }
</script>

<style scope>

/*

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

@media screen and (max-width: 800px) {
    .test {
        width: 100%;
        display: none;
    }
}

.slideshow-container {
  max-width: 300px;
  position: relative;
  margin: auto;
}

.text {
  color: #f2f2f2;
  font-size: 15px;
  padding: 8px 12px;
  position: absolute;
  bottom: 8px;
  width: 100%;
  text-align: center;
}

.numbertext {
  color: #f2f2f2;
  font-size: 12px;
  padding: 8px 12px;
  position: absolute;
  top: 0;
}


.dot {
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
}

.active {
  background-color: #717171;
}


.fade {
  animation-name: fade;
  animation-duration: 1.5s;
}

@keyframes fade {
  from {opacity: .4} 
  to {opacity: 1}
}


@media only screen and (max-width: 300px) {
  .text {font-size: 11px}
}

.mySlides {display: none;}
img {vertical-align: middle;} */


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
</style>