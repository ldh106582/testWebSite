<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar title="Application bar"></v-app-bar>

    <v-navigation-drawer>
      <v-list>
        <v-list-item title="Navigation drawer"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="align-center justify-center" style="min-height: 300px; width: 100%; border: 1px solid black;">
      <div class="d-flex" style="width: 100%; border: 1px solid red;" >
        <chartView class="chart" />
        <announcementView class="announcment"/>
      </div>
      <div class="d-flex" style="width: 100%; border: 1px solid red;" >
        <Welcome class="welcome" />
      </div>
    </v-main>

  </v-layout>
</template>

<script setup>
import { defineOptions } from 'vue';
import announcementView from './components/AnnouncementView.vue';
import chartView from './components/ChartView.vue'
import Welcome from './components/Welcome.vue'

defineOptions({
  name: 'App',
});
</script>

<style scoped lang="scss">

.announcment{
  width: 50%;
  border: 1px solid red;
  
}

.chart{
  width: 50%;
}

.welcome{
  width: 100%;
  border: 1px solid silver;
}
</style>
