import { createApp } from 'vue'
//import './style.css'
import App from './App.vue'
import '../firebase/firebase'

// VueRouter の利用に必要なモジュールを読み込む
import { RouteRecordRaw, createWebHistory, createRouter } from "vue-router";

// Bootstrap
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

// font awesome core
import { library } from '@fortawesome/fontawesome-svg-core'
/* font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faHouse,
  faPencil,
  faNoteSticky,
  faTrashCan
} from "@fortawesome/free-solid-svg-icons";
library.add(faHouse,faPencil,faNoteSticky,faTrashCan);


// VueRouter
import MainPage from "./pages/MainPage.vue";
import TweetPage from "./pages/TweetPage.vue";
import CreatePage from "./pages/CreatePage.vue";
import DiaryPage from "./pages/DiaryPage.vue";
import LoginPage from "./pages/Login.vue";


import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";


// 各画面のルーティング情報を記述する
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "MainPage",
    component: MainPage,
  },
  {
    path: "/create",
    component: CreatePage,
  },
  {
    path: "/diary",
    name :"DiaryPage",
    component: DiaryPage,
  },
  {
    path: "/tweet",
    name: "TweetPage",
    component: TweetPage,
  },
  {
    path: "/login",
    name: "LoginPage",
    component: LoginPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

router.beforeEach(async (to) => {
  const isLogin = await new Promise((resoleve) => {
    onAuthStateChanged(auth, (user) => {
      resoleve(!!user);
    });
  });
  //loginしていない場合はLoginPageを強制表示
  const isRequiresAuth = to.name === "LoginPage";
  if (!isRequiresAuth && !isLogin) {
    return { name: "LoginPage" };
    }
});

createApp(App).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
