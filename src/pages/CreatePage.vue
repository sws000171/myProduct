<script setup lang="ts">
import { db } from '../../firebase/firebase';
import { ref } from 'vue'
import { collection, addDoc, Timestamp} from "firebase/firestore";
import {useRouter} from 'vue-router'

const router = useRouter();
const data = ref({
  title: "",
  text:"",
})

async function writeData(){
  await addDoc(collection(db, "myDiary"), {
    title: data.value.title,
    text: data.value.text,
    date: Timestamp.fromDate(new Date()),
  //date: firebase.firestore.FieldValue.serverTimestamp(),
  });
  router.push({name:"MainPage"});
}

</script>

<template>
  <div class="mb-3">
    <label for="exampleFormControlInput1" class="form-label">Title</label>
    <input type="text" v-model="data.title" class="form-control" id="exampleFormControlInput1">
  </div>
  <div class="mb-3">
    <label for="exampleFormControlTextarea1" class="form-label">Textarea</label>
    <textarea v-model="data.text" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
  </div>
  <button @click="writeData" type="submit" class="btn btn-primary">Submit</button>

</template>

<style>
</style>