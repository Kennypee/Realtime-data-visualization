<template>
  <div id="app">
    <div id="vueapp" class="vue-app">
    <kendo-chart :title-text="'Realtime Stockchart'"
                 :legend-position="'bottom'"
                 :series="series"
                 :category-axis-categories="categories"
                 :value-axis="axis"
                 :theme="'sass'">
    </kendo-chart>
</div>
  </div>
</template>

<script>
import '@progress/kendo-theme-default/dist/all.css'

import { Chart } from '@progress/kendo-charts-vue-wrapper'
import { setInterval } from 'timers';
import io from "socket.io-client";
var socket = io.connect("http://localhost:4000");
export default {
  name: 'app',
  components: {
    Chart
  },
  mounted(){
    this.getSeriesData()
  },
  created(){
    this.getRealtimeData()
  },
  data() {
    return {
      series:[],
        categories: ["Product1", "Product2", "Product3"],
        axis: [
          {
            name: "stockrange",
            labels: {
                format: "{0}%"
            }
        },
       
        ]
      }
    },
    methods:{
    getSeriesData(fetchedData){
      this.series = [{
            name: 'Microsoft',
            data: [this.getRandomChartValues(fetchedData), 
                  this.getRandomChartValues(fetchedData), 
                  this.getRandomChartValues(fetchedData)],
            axis: "stockrange"
        },
        {
            name: 'Google',
            data: [this.getRandomChartValues(fetchedData), 
                  this.getRandomChartValues(fetchedData), 
                  this.getRandomChartValues(fetchedData)],
            axis: "stockrange"
        },
        {
            name: 'Sealuse',
            data: [this.getRandomChartValues(fetchedData), 
                  this.getRandomChartValues(fetchedData), 
                  this.getRandomChartValues(fetchedData)],
            axis: "stockrange"
        }]
     
      },
    getRealtimeData() {
      socket.on("newdata", fetchedData => {
        this.getSeriesData(fetchedData) 
      })
    },
    getRandomChartValues(number){
      return Math.floor(Math.random() * number) + 10
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
