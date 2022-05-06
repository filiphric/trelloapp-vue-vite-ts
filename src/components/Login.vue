<template>
  <div class="grid grid-cols-2 gap-x-8 items-stretch px-28 -mt-10 h-screen">
    <div class="grid content-center">
      <h1 class="mb-8 text-3xl font-bold">
        Welcome back!
      </h1>
      <label for="email">Email</label>
      <input
        v-model="state.loginForm.email"
        class="px-2 mb-3 w-full h-10 bg-gray3 focus:bg-white rounded-sm"
        placeholder="Email"
        data-cy="login-email"
        name="email"
      >
      <label for="password">Password</label>
      <input
        v-model="state.loginForm.password"
        type="password"
        data-cy="login-password"
        class="px-2 mb-3 w-full h-10 bg-gray3 focus:bg-white rounded-sm"
        placeholder="Password"
        name="password"
        @keyup.enter="state.login(state.loginForm.email, state.loginForm.password)"
      >
      <button
        data-cy="login-submit"
        class="py-2 w-full text-white bg-green7 hover:bg-green6"
        @click="state.login(state.loginForm.email, state.loginForm.password)"
      >
        Log in
      </button>
      <GoogleSignIn
        v-if="googleEnabled === 'true'"
        @on-submit="handleResponse"
      >
        <GoogleButton :log-sign="'Log in'" />
      </GoogleSignIn>
      <router-link
        class="mt-4 text-sm text-center underline"
        to="/signup"
      >
        Don’t have an account? Sign up here.
      </router-link>
    </div>
    <img
      class="gap-x-5 self-center place-self-center"
      src="@/assets/login.png"
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { store } from '@/stores/store';
import GoogleSignIn from './GoogleSignIn.vue';
import GoogleButton from './GoogleButton.vue';

export default defineComponent({
  components: { GoogleSignIn, GoogleButton },
  setup() {
    const state = store();
    const googleEnabled = process.env.VUE_APP_GOOGLE_ENABLED;
    function handleResponse(value: any): void {
      state.oauthLogin(value.googleUser.xc.id_token);
    }
    return { state, handleResponse, googleEnabled };
  },
});
</script>

<style></style>
