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

const writeData = async()=>{
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
    <label for="exampleFormControlTextarea1" class="form-label">Text</label>
    <textarea v-model="data.text" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
  </div>  
  <button type="submit" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" >Submit</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        作成しますか？
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="writeData" >Save changes</button>
      </div>
    </div>
  </div>
</div>



</template>

<style>
</style>