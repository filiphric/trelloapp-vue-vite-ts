<template>
  <div class="flex justify-end text-white mr-3">
    <!-- LOGGED OUT -->
    <div
      class="flex self-center bg-white bg-opacity-30 hover:bg-opacity-20 rounded-sm h-8 cursor-pointer text-sm"
      data-cy="login-menu"
      v-show="!loggedIn"
      @click="openLogin()"
    >
      <User class="ml-2 self-center w-6 h-6" />
      <span class="self-center pr-2 pl-1">Log&nbsp;in</span>
    </div>
    <!-- LOGGED IN -->
    <div
      class="inline-block bg-blue5 rounded-md px-3 py-2 cursor-pointer hover:bg-blue6"
      data-cy="logged-user"
      v-show="loggedIn"
      @click="loginDropdown = !loginDropdown"
    >
      <Circle
        class="w-3 mr-1 mx-0 justify-self-end inline-block text-green-400 fill-current stroke-0"
      />
      {{ userEmail }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { user } from "@/stores/user";
import User from '@/assets/icons/user.svg';
import Circle from '@/assets/icons/circle.svg';

export default defineComponent({
  setup() {
    const userState = user()
    const loggedIn = userState.loggedIn
    const userEmail = userState.userEmail
    return { userState, loggedIn, userEmail}
  },
  data: function() {
    return {
      loginDropdown: false
    };
  },
  name: 'Login',
  components: {
    User,
    Circle
  },
  methods: {
    openLogin: function() {
      // this.$root.showLoginModule = true;
    },
    logout: function() {
      // this.$root.loggedIn.active = false;
      // axios.defaults.headers.common['Authorization'] = '';
      document.cookie = 'trello_token=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
      document.location.href = '/';
    }
  }
});
</script>

<style></style>
