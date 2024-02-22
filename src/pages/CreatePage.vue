<script setup lang="ts">
import { db } from '../../firebase/firebase'
import { ref, watch } from 'vue'
import { collection, addDoc, Timestamp} from "firebase/firestore"
import {useRouter} from 'vue-router'
import {resizeTextArea} from '../common/common'
import { getAuth } from "firebase/auth"

const router = useRouter();
const auth = getAuth();
const data = ref({
  user: "",
  title: "",
  text: "",
})
const refText = ref();

//firebase create
const writeData = async()=>{
  //console.log("@1@",auth.currentUser?.uid);
  await addDoc(collection(db, "myDiary"), {
    user: auth.currentUser?.uid,
    title: data.value.title,
    text: data.value.text,
    date: Timestamp.fromDate(new Date()),
  });
  router.push({name:"MainPage"});
}
//テキストエリアリサイズ
watch(data.value,()=>{
  resizeTextArea(refText);
});
</script>

<template>
  <div class="body">
  <div class="mb-3">
    <label for="exampleFormControlInput1" class="form-label">Title</label>
    <div class="col-md-5">
      <input type="text" v-model="data.title" class="form-control" id="exampleFormControlInput1">
    </div>
  </div>
  <div class="mb-3">
    <label for="exampleFormControlTextarea1" class="form-label">Text</label>
    <div class="col-md-9">
      <textarea v-model="data.text" ref="refText" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
    </div>
  </div>  
  <button type="submit" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" >Submit</button>
  </div>
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
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="writeData" >Create diary</button>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
.body{ 
  padding-top: 60px; 
  padding-left: 1%;
}
</style>