<template>
  <div class="grid grid-cols-2 items-stretch -mt-10 h-screen px-28 gap-x-8">
    <div class="grid content-center">
      <h1 class="font-bold text-3xl mb-8">Create a new account</h1>
      <label for="email">Email</label>
      <input class="h-10 w-full rounded-sm mb-3 px-2 bg-gray3 focus:bg-white" placeholder="Email" name="email" v-model="state.signupForm.email" data-cy="signup-email"/>
      <label for="password">Password</label>
      <input
        type="password"
        class="h-10 w-full rounded-sm mb-3 px-2 bg-gray3 focus:bg-white"
        data-cy="signup-password"
        placeholder="Password"
        name="password"
        v-model="state.signupForm.password"
        @keyup.enter="state.signup(state.signupForm.email, state.signupForm.password, state.signupForm.elcomeEmail)"
      />
      <div class="mb-4">
        <input type="checkbox" name="welcomeEmail" class="mr-2" v-model="state.signupForm.welcomeEmail" />
        <label class="text-sm" for="welcomeEmail">Send me a welcome email</label>
      </div>
      <button
        class="w-full py-2 text-white bg-green7 hover:bg-green6" data-cy="signup-submit"
        @click="state.signup(state.signupForm.email, state.signupForm.password, state.signupForm.welcomeEmail)"
      >
        Create account
      </button>
      <router-link class="mt-4 text-sm text-center underline" to="/login">Already have an account? Log in here</router-link>
    </div>
    <img class="place-self-center self-center gap-x-5" :src="Signup" />
  </div>
</template>

<script>
import Signup from '@/assets/signup.png';
import { store } from '@/stores/store';
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const state = store();
    return { Signup, state };
  }
});
</script>

<style></style>
