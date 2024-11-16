<template>
  <v-container fluid>
    <v-col class="main pa-0 ma-0" cols="12" lg="12" sm="12" xs="12">
      <div style="width: 100%; border: 1px solid red;">
        <div class="d-flex m-0 p-0" style="width: 100%; border: 1px solid red; max-width: 100%;">
          <div>
            <chartView class="chart mr-3" />
          </div>
          <div>
            <announcementView class="announcment" />
          </div>
        </div>

        <div class="d-flex mt-3" style="width: 100%;">
          <Welcome class="welcome" />
        </div>
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
/* .announcment{
  width: 50%;
  border: 1px solid silver;
}

.chart{
    width: 50%;
    border: 1px solid silver;
} */

.welcome{
  width: 100%;
  border: 1px solid silver;
}

.main{
  background-color: #F9F9F9;
  height: 90.5vh;
  max-height: 90.5vh;
}
</style>