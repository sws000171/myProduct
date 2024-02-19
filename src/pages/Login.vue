<script setup lang="ts">
import { reactive } from "vue";
import { auth } from "../../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'vue-router';

const state = reactive({
  email: "",
  password: "",
  loading: false,
});

const router = useRouter();
const login = async ()=> {
  try {
    state.loading = true;
    const { user } = await signInWithEmailAndPassword(
      auth,
      state.email,
      state.password
    );
    alert(`ログイン成功 ${user.email}`);
    router.push({name:"MainPage"});
  } catch (error) {
    alert(`エラー ${error}`);
  } finally {
    state.loading = false;
  }
};

</script>

<template>
  <div class="container">
    <div class="position-absolute top-50 start-50 translate-middle">
      <div class="card" style="width: 360px;">
        <div class="card-body">
          <h5 class="card-title text-center fs-2">Hey, what's up?</h5>
          <div class="mb-3 small">
            <label for="exampleFormControlInput1" class="form-label"></label>
            <input 
              type="email" 
              class="form-control underline-only" 
              id="exampleFormControlInput1" 
              placeholder="メールアドレス"
              v-model="state.email"
            >
            <label for="exampleFormControlInput1" class="form-label"></label>
            <input 
              type="password"
              class="form-control underline-only"
              id="inputPassword"
              placeholder="パスワード"
              v-model="state.password"
            >
          </div>
          <div class="d-flex justify-content-center">
            <button type="button" class="btn btn-primary" @click="login">ログイン</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container{ 
  padding-top: 60px; 
}

</style>