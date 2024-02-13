<script setup lang="ts">
import { db } from '../../firebase/firebase';
import { collection, addDoc, Timestamp} from "firebase/firestore";

await addDoc(collection(db, "myDiary"), {
 title: "Tokyo",
 text: "Japan",
 date: Timestamp.fromDate(new Date()),
 //date: firebase.firestore.FieldValue.serverTimestamp(),
});


</script>

<template>
  <h1>CreatePage</h1>


  
</template>

<style scoped lang="scss"> 
</style>