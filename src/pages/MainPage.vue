<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { collection, onSnapshot, doc, deleteDoc, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
//import {tweet} from '../common/tweet';

const isLoading = ref(false)
const error = ref()
const myDiary = ref()

const diaryCollection = collection(db, 'myDiary');
const diaryQuery = query(diaryCollection, orderBy('date', 'desc'));

onMounted(() => {
    getFirebase() 
})

const getFirebase = async () =>{
  isLoading.value = true
  try {
    onSnapshot(diaryQuery, (QuerySnapshot) => {
      const fbDiary: { id: string; title: string; text: string; }[] = [];
      QuerySnapshot.forEach((doc) => {
        const diary = {
          id: doc.id,
          title: doc.data().title,
          date: formatDateTime(doc.data().date.toDate()),
          text: doc.data().text,
        };
        fbDiary.push(diary);
      });
      myDiary.value = fbDiary;
    });
  } catch (e) {
    error.value = e
  } finally {
    isLoading.value = false
  }
}
function formatDateTime(date:Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}/${month}/${day} ${hours}:${minutes}`;
}


function deleteDiary(id:string) {

  deleteDoc(doc(diaryCollection,id))
  console.log('delete');
}

</script>

<template>
  <div>
    <h1>My Product</h1>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <ul class="list-group">
      <div v-for="diary in myDiary" key="id">
        <li class="list-group-item">
            {{ diary.title }}{{ diary.date }}
            <button class="btn btn-sm btn-info" @click="$router.push('/edit')">表示</button>
            <button class="btn btn-sm btn-info" @click="deleteDiary(diary.id)">削除</button>
        </li>
          
        
      </div>
    </ul>
    </div>
    <!--
    <button id="button" class="btn btn-sm btn-info" @click="tweet()">tweet</button>
    -->
  </div>
</template>


<style scoped>

</style>