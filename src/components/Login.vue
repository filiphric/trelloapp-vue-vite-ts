<template>
  <div class="grid grid-cols-2 items-stretch -mt-10 h-screen px-28 gap-x-8">
    <div class="grid content-center">
      <h1 class="font-bold text-3xl mb-8">
        Welcome back!
      </h1>
      <label for="email">Email</label>
      <input
        v-model="state.loginForm.email"
        class="h-10 w-full rounded-sm mb-3 px-2 bg-gray3 focus:bg-white"
        placeholder="Email"
        data-cy="login-email"
        name="email"
      >
      <label for="password">Password</label>
      <input
        v-model="state.loginForm.password"
        autocomplete="off"
        type="password"
        data-cy="login-password"
        class="h-10 w-full rounded-sm mb-3 px-2 bg-gray3 focus:bg-white"
        placeholder="Password"
        name="password"
        @keyup.enter="state.login(state.loginForm.email, state.loginForm.password)"
      >
      <button
        data-cy="login-submit"
        class="w-full py-2 text-white bg-green7 hover:bg-green6"
        @click="state.login(state.loginForm.email, state.loginForm.password)"
      >
        Log in
      </button>
      <router-link
        class="mt-4 text-sm text-center underline"
        to="/signup"
      >
        Don’t have an account? Sign up here.
      </router-link>
    </div>
    <img
      class="place-self-center self-center gap-x-5"
      src="@/assets/login.png"
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { store } from '@/stores/store';

export default defineComponent({
  setup() {
    const state = store();
    return { state };
  }
});
</script>

<style></style>
