import Vue from 'vue'
import App from './App.vue'
import axios from "axios"

Vue.config.productionTip = false

axios.defaults.baseURL = "https://firestore.googleapis.com/v1/projects/vuejs-http-a5ff3/databases/(default)/documents/";
// axios.defaults.headers.common["Authorization"] = "kitakentokenlkdfjsalkjdfa";
axios.defaults.headers.get["Accept"] = "application/json";

axios.interceptors.request.use( //サーバーにリクエストする前にされる処理。
  config => {
    return config; //ここでヘッダー情報とか色々送れる。
  },
  error => {
    return Promise.reject(error);
  }
)
axios.interceptors.response.use( //サーバーからデータを取ってきた瞬間に他に行く前にされる処理。
  response => {
    return response; //ここでヘッダー情報とか色々送れる。
  },
  error => {
    return Promise.reject(error);
  }
)


new Vue({
  render: h => h(App),
}).$mount('#app')
