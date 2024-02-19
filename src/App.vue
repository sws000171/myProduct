<script setup lang="ts">
import { useRoute,RouterLink } from 'vue-router';
import { provide,ref } from 'vue';

const route = useRoute();

let appEditFlg = ref(false);
let appDeleteFlg = ref(false);

const isRead = ()=> route.path === "/diary";
const isMain =()=> route.path === "/";

const editSetting = ()=> appEditFlg.value = true;
const deleteSetting = ()=> appDeleteFlg.value = true;

//子コンポーネント（router）値渡し
provide('appEditFlg', appEditFlg);
provide('appDeleteFlg', appDeleteFlg);

</script>

<template>
  <div class='fixed-top'>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <!--<a class="navbar-brand" href="/">MyDiary</a>-->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/">
              <font-awesome-icon icon="fa-solid fa-house" /> Home</a>
          </li>
          <li v-if="isMain()" class="nav-item">
            <RouterLink v-bind:to="{name:'CreatePage'}" class="nav-link">
              <font-awesome-icon icon="fa-solid fa-note-sticky" /> Create
            </RouterLink>
          </li>
          <li v-if="isRead()" class="nav-item">
            <a class="nav-link" @click="editSetting()">
              <font-awesome-icon icon="fa-solid fa-pencil" /> Edit</a>
          </li>
          <li v-if="isRead()" class="nav-item">
            <a class="nav-link" data-bs-toggle="modal" data-bs-target="#deleteModal">
              <font-awesome-icon icon="fa-solid fa-trash-can" /> Delete</a>
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
  </div>
  <RouterView />

  <!-- Dlete Modal -->
  <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="deleteModalLabel">Modal title</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          削除しますか？
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="deleteSetting">Delete diary</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.nav-item{
  cursor: pointer;
}
</style>
