<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {useRouter} from 'vue-router'

import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import {formatDateTime } from '../common/common'

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
          text: doc.data().text
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

const router = useRouter();
//diary page
const diaryPage = (id:string)=>{
  router.push({name:"DiaryPage", query:{readId:id}});
}
</script>

<template>
  <h1 class="body">My Diary</h1>
  <div class="t-body"> 
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <table class="table table-striped table-hover table-bordered">
        <thead class="table-light">
        <tr class="tr-a">
          <th class="th-a">Create Date</th>
          <th class="th-b">Title</th>
        </tr>
      </thead>
        <tbody>
          <tr v-for="diary in myDiary" key="diary.id" ref="vtr" @click="diaryPage(diary.id)">
            <td class="td-a">{{ diary.date }}</td>
            <td class="td-b">{{ diary.title }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped lang="scss">
.t-body{ 
  padding-left: 2%;
  padding-right: 2%;
}
.body{ 
  padding-left: 1%;
  padding-top: 60px; 
}
.table{
  table-layout: fixed;
  border-collapse: collapse;
  border: 2px solid rgb(140 140 140);
  max-width: 800px;
}

.th-a{
  width: 150px;
}
</style>