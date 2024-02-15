<script setup lang="ts">

import { db } from '../../firebase/firebase';
import { doc,getDoc, updateDoc } from "firebase/firestore";
import { onMounted,ref,inject } from 'vue';
import { useRoute } from 'vue-router';

//query部分の取得
const route = useRoute();
const { readId } = route.query;

const isLoading = ref(false);
let strReadId =String(readId);

let injectEditFlg = ref(inject('appEditFlg'));
console.log("インジェクトした内容:",injectEditFlg);

onMounted(()=>{
  readData()
});

let data = ref({
  title:"",
  text:""
});
const error = ref();

async function readData(){
  
  isLoading.value = true
  const docRef = doc(db, "myDiary",strReadId);
  
  try{
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data().text);
      data.value.title = docSnap.data().title;
      data.value.text = docSnap.data().text;
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

async function updateData(){
  const docRef = doc(db, "myDiary", strReadId);
  await updateDoc(docRef,
    {
      title:data.value.title,
      text:data.value.text,
    }
  )
}

let editFlg = ref(false);

function editJudge(){
  if (injectEditFlg.value == true) {
      const fieldsetElement = document.querySelector('fieldset');
    if (fieldsetElement) {
      fieldsetElement.disabled = false;
      editFlg.value = true;
    }
    return true;
  }else{
    return false;
  }
}

function updateDiary(){
  const fieldsetElement = document.querySelector('fieldset');
  if (fieldsetElement) {
    fieldsetElement.disabled = true;
    editFlg.value = false;
    updateData();
    injectEditFlg.value = false;
  }
}
</script>

<template>
  <fieldset disabled>
  <div class="mb-3">
    <label for="exampleFormControlInput1" class="form-label">Title</label>
    <input type="text" v-model="data.title" class="form-control" id="exampleFormControlInput1">
  </div>
  <div class="mb-3">
    <label for="exampleFormControlTextarea1" class="form-label">Textarea</label>
    <textarea v-model="data.text" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
  </div>
</fieldset>
<td>
<a v-if="editJudge()">
  <button class="btn btn-sm btn-info" @click="updateDiary">update</button>
</a>
</td>
</template>

<style scoped lang="scss"> 
</style>