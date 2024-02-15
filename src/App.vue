<script setup lang="ts">
import { useRoute } from 'vue-router';
import { provide,ref } from 'vue';

const route = useRoute();

let appEditFlg = ref(false);
provide('appEditFlg', appEditFlg);

function isRead(){
  const routePath = route.path
  console.log("naka:",routePath);
  
  if (route.path == "/read"? true:false){
    return true;
  }else{
    return false;
  }
}

function editSetting(){
  appEditFlg.value = true;
}

</script>

<template>
    <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <!--<a class="navbar-brand" href="/">MyDiary</a>-->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/">Home</a>
          </li>
          <li v-if="!isRead()" class="nav-item">
            <a class="nav-link" href="/create">Create</a>
          </li>
          <li v-if="isRead()" class="nav-item">
            <a class="nav-link" @click="editSetting()">Edit</a>
          </li>
          <!-- 実現できなかったtwitter bot の更新内容確認用に作成した画面
          <li class="nav-item">
            <a class="nav-link" href="/tweet">tweet</a>
          </li>
          -->
        </ul>

      </div>
    </div>
  </nav>
  <RouterView />
</template>

<style scoped>

</style>
