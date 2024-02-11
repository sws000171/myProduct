<script setup lang="ts">
import { onMounted } from 'vue'


onMounted(() => {
  // Twitterウィジェットのスクリプトを読み込む
  //const titleT = ref<HTMLBodyElement>();
  const script = document.createElement('script');
  script.src = 'https://platform.twitter.com/widgets.js';
  script.async = true;
  document.body.appendChild(script);
  //titleT.value?.appendChild(script);
});



</script>

<template>
  <div>
    <!-- ここにTwitterのタイムラインを表示するコードを追加 -->
    <a class="twitter-timeline" data-lang="ja" data-width="600" data-theme="light" href="https://twitter.com/sws000171?ref_src=twsrc%5Etfw">Tweets by sws000171</a>
    <!-- 他のコンテンツを追加 -->
  </div>

</template>

<style scoped lang="scss"> 
.twitter-timeline {
  text-align: center;
}
</style>