<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {useRouter} from 'vue-router'

import { collection, onSnapshot, doc, deleteDoc, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

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

const router = useRouter();
function readpage(id:string){
  console.log(id);
  router.push({name:"ReadPage", query:{readId:id}});
}
</script>

<template>
  <div>
    <h1>My Diary</h1>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <table class="table table-striped table-hover table-bordered">
        <tr>
          <th class="td-a">Title</th>
          <th class="td-b">date</th>
          <th class="td-c">view</th>
          <th class="td-c">delete</th>
        </tr>
        <tbody>
          <tr v-for="diary in myDiary" key="id">  
            <td>{{ diary.title }}</td>
            <td>{{ diary.date }}</td>
            <td><button class="btn btn-sm btn-info" @click="readpage(diary.id)">表示</button></td>
            <td><button class="btn btn-sm btn-info" @click="deleteDiary(diary.id)">削除</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<style scoped>

</style>