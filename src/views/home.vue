<template>
  <v-container fluid="">
    <v-col>
      <div class="d-flex">
        <chartView class="chart" />
        <announcementView class="announcment"/>
      </div>

      <div class="d-flex" style="width: 100%;">
        <Welcome class="welcome" />
      </div>
    </v-col>
  </v-container>
</template>

<script setup>
import announcementView from '@/components/AnnouncementView.vue';
import chartView from '@/components/ChartView.vue'
import Welcome from '@/components/Welcome.vue'
</script>

<style scoped>
.announcment{
  width: 50%;
}

.chart{
    width: 50%;
    border: 1px solid silver;
}

.welcome{
  width: 100%;
  border: 1px solid silver;
}
</style>