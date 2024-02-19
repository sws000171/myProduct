<script setup lang="ts">

import { db } from '../../firebase/firebase';
import { doc,getDoc, updateDoc, deleteDoc, Timestamp } from "firebase/firestore";
import { onMounted,ref,inject, watch } from 'vue';
import { useRoute,useRouter } from 'vue-router';
import {resizeTextArea} from '../common/resizeTextArea'

//query部分の取得
const route = useRoute();
const { readId } = route.query;

const isLoading = ref(false);
let strReadId =String(readId);

const refText = ref();

//他コンポーネントからデータを受け取る
let injectEditFlg = ref(inject('appEditFlg'));
let injectDeleteFlg = ref(inject('appDeleteFlg'));

let data = ref({
  title: "",
  text: "",
  upadate: ""
});

onMounted(()=>{
  readData()
  resizeTextArea(refText)
});

//firebase read
const readData = async () =>{

  isLoading.value = true
  const docRef = doc(db, "myDiary",strReadId);
  const error = ref();

  try{
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      //console.log("Document data:", docSnap.data().text);
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
};
//firebase update
const updateData = async () =>{
  const docRef = doc(db, "myDiary", strReadId);
  await updateDoc(docRef,{
    title:data.value.title,
    text:data.value.text,
    update: Timestamp.fromDate(new Date())
  });
};
//firestore delte
const deleteDiary = ()=> {
  console.log("delete!!!");
  deleteDoc(doc(db, "myDiary", strReadId));
}
//ナビゲーションバーのeditがクリックされた場合
const editJudge = ()=>{
  if (injectEditFlg.value == true) {
    const fieldsetElement = document.querySelector('fieldset');
    if (fieldsetElement) {
      fieldsetElement.disabled = false;
    }
    return true;
  }else{
    return false;
  }
}
//更新処理
const updateDiary = ()=>{
  const fieldsetElement = document.querySelector('fieldset');
  if (fieldsetElement) {
    fieldsetElement.disabled = true;
    updateData();
    injectEditFlg.value = false;
  }
}
//削除処理
const router = useRouter();
const showModal = ref(false) // モーダルの表示状態
watch(injectDeleteFlg,()=> {
  if (injectDeleteFlg.value == true) {
    showModal.value = true;
    deleteDiary();
    injectDeleteFlg.value = false;
    router.push({name:"MainPage"});
  }
});
//テキストエリアのリサイズ
watch(data.value,()=>{
  resizeTextArea(refText);
});
</script>

<template>
  <fieldset disabled class="body">
  <div class="mb-3">
    <label for="exampleFormControlInput1" class="form-label">Title</label>
    <div class="col-md-5">
      <input type="text" v-model="data.title" class="form-control" id="exampleFormControlInput1">
    </div>
  </div>
  <div class="mb-3">
    <label for="exampleFormControlTextarea1" class="form-label">Text</label>
    <div class="col-md-8">
      <textarea ref="refText" v-model="data.text" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
    </div>
  </div>
</fieldset>
<td>
  <a v-if="editJudge()">
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#updateModal">
      Update
    </button>
  </a>
</td>

<!-- update Modal -->
<div class="modal fade" id="updateModal" tabindex="-1" aria-labelledby="updateModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="upateModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        更新しますか？
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="updateDiary" >Save changes</button>
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