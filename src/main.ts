import { createApp } from 'vue'
//import './style.css'
import App from './App.vue'
import '../firebase/firebase'

// VueRouter の利用に必要なモジュールを読み込む
import { RouteRecordRaw, createWebHistory, createRouter } from "vue-router";

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

// 
import MainPage from "./pages/MainPage.vue";
import TweetPage from "./pages/TweetPage.vue";

// 各画面のルーティング情報を記述する
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "AppPage",
    component: MainPage,
  },
  {
    path: "/tweet",
    name: "TweetPage",
    component: TweetPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

createApp(App).use(router).mount('#app')
