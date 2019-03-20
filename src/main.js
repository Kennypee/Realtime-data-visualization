import Vue from 'vue'
import App from './App.vue'
import {ChartInstaller } from '@progress/kendo-charts-vue-wrapper'
Vue.use(ChartInstaller)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
