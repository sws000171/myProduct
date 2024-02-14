<script setup lang="ts">

import { db } from '../../firebase/firebase';
import { doc,getDoc } from "firebase/firestore";
import { onMounted,ref } from 'vue';

import { useRoute } from 'vue-router';
const route = useRoute();
const { readId } = route.query;
console.log("id:",readId);

const isLoading = ref(false)
let strReadId =String(readId);

onMounted(()=>{
  readData()
});

let aaa = ref();
let bbb = ref();
const error = ref();

async function readData(){
  
  isLoading.value = true
  const docRef = doc(db, "myDiary",strReadId);
  
  try{
  const docSnap = await getDoc(docRef);

  
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data().text);
    aaa = docSnap.data().title;
    bbb = docSnap.data().text;
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
 
  } catch (e) {
    error.value = e
  } finally {
    isLoading.value = false
  }

}

</script>

<template>
  <h1>ReadPage</h1>
  <div v-if="isLoading">Loading...</div>
  <div v-else>
    <h2>{{ aaa }}</h2>
    <h2>{{ bbb }}</h2>
  </div>
</template>

<style scoped lang="scss"> 
</style>