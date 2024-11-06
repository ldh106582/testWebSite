<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar title="Application bar"></v-app-bar>

    <v-navigation-drawer>
      <v-list>
        <v-list-item title="Navigation drawer"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      <chartView class="chart" />
      <announcementView class="announcment"/>
 
    </v-main>
  </v-layout>
</template>

<script setup>
import { defineOptions } from 'vue';
import announcementView from './components/AnnouncementView.vue';
import chartView from './components/ChartView.vue'

defineOptions({
  name: 'App',
});
</script>

<style scoped lang="scss">

.announcment{
  width: 50%;
}

.chart{
  width: 50%;
}

</style>
