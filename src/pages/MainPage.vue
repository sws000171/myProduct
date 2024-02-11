<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { Timestamp, collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import {tweet} from '../common/tweet';

const isLoading = ref(false)
const error = ref()
const tweets = ref()

onMounted(() => {
    getFirebase() 
})

const getFirebase = async () =>{
  isLoading.value = true
  try {
    onSnapshot(collection(db, 'tweets'), (QuerySnapshot) => {
      const fbTweet: { id: string; tweet: string; time: Timestamp; flg: boolean; }[] = [];
      QuerySnapshot.forEach((doc) => {
        const tweet = {
          id: doc.id,
          tweet: doc.data().tweet,
          time: doc.data().time,
          flg: doc.data().flg,
        };
        fbTweet.push(tweet);
      });
      tweets.value = fbTweet;
      console.log(tweets);
    });
  } catch (e) {
    error.value = e
  } finally {
    isLoading.value = false
  }
}



</script>

<template>
  <div>
    <h1>My Product</h1>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <ul class="list-group">
      <div v-for="tweet in tweets" key="id">
        <li class="list-group-item">
            {{ tweet.tweet }}
            <button id="button" class="btn btn-sm btn-info">編集</button>
            <button id="button" class="btn btn-sm btn-info">削除</button>
        </li>
          
        
      </div>
    </ul>
    </div>
    <button id="button" class="btn btn-sm btn-info" @click="tweet()">tweet</button>
  </div>
</template>


<style scoped>

</style>