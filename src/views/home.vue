<template>
  <v-container fluid>
    <v-row>
      <v-col cols="6" sm="6">
        <chartView class="chart" />
      </v-col>
      <v-col cols="6" sm="6">
        <announcementView class="announcement" />
      </v-col>
        
      <v-row style=" height: auto;">
        <v-col cols="12" sm="12" lg="12" style="height: auto; width: 100%;">
          <Welcome class="welcome" />
        </v-col>
      </v-row>
    </v-row>
  </v-container>
</template>

<script setup>
import announcementView from '@/components/BoardView.vue';
import chartView from '@/components/ChartView.vue'
import Welcome from '@/components/Welcome.vue'
</script>

<style scoped>
.announcement {
  width: 100%;
  height: auto;
  border: 1px solid silver;
  border-radius: 1.5%;
}

.chart {
  width: 100%;
  border: 1px solid silver;
  border-radius: 1.5%;
}

.welcome {
  width: 100%;
  height: auto;
  border: 1px solid silver;
  border-radius: 1.0%;
}

.main {
  background-color: #F9F9F9;
}
</style>