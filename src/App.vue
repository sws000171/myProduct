<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import {tweet} from './common/tweet';

const data = ref()
const isLoading = ref(false)
const error = ref()

const posts = []

onMounted(() => {
    getFirebase() 
})

const getFirebase = async () => {
    console.log("getFirebase")
    isLoading.value = true
    try {
        const usersCollection = collection(db, 'tweets');
        const usersSnapshot = await getDocs(usersCollection);
        data.value = usersSnapshot.docs.map(doc => doc.data());
        console.log(data.value)
    } catch (e) {
        error.value = e
    } finally {
        isLoading.value = false
    }
}
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Dropdown
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled">Disabled</a>
          </li>
        </ul>
        <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
  <div>
    <h1>My Firebase</h1>
    <div v-if="isLoading">Loading...</div>
    <div v-else>{{ data }}</div>
    <button id="button" class="btn btn-sm btn-info" @click="tweet()">tweet</button>
  </div>
</template>


<style scoped>

</style>