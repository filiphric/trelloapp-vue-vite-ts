<template>
  <div
    class="flex justify-end text-white mr-3"
    :class="[route.path === '/login' || route.path === '/signup' ? 'invisible' : 'visible']"
  >
    <!-- LOGGED OUT -->
    <div
      v-show="!state.activeUser.loggedIn"
      class="flex self-center bg-white bg-opacity-30 hover:bg-opacity-20 rounded-sm h-8 cursor-pointer text-sm"
      data-cy="login-menu"
      @click="router.push('/login')"
    >
      <User class="ml-2 self-center w-6 h-6" />
      <span class="self-center pr-2 pl-1">Log&nbsp;in</span>
    </div>
    <!-- LOGGED IN -->
    <div
      v-show="state.activeUser.loggedIn"
      class="flex self-center bg-white bg-opacity-30 hover:bg-opacity-20 rounded-sm h-8 cursor-pointer text-sm"
      data-cy="logged-user"
    >
      <LogoutIcon class="ml-2 self-center w-5 h-5 text-white fill-current" />
      <div
        class="self-center pr-2 pl-1 inline-block"
        @click="
          logout();
          state.getBoardList();
        "
      >
        Log out
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { store } from '@/stores/store';
import { useRoute, useRouter } from 'vue-router';
import LogoutIcon from '@/assets/icons/logoutIcon.svg';
import User from '@/assets/icons/user.svg';
import axios from 'axios';

export default defineComponent({
  name: 'Login',
  components: {
    LogoutIcon,
    User
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const state = store();
    const logout = function(this: any) {
      this.state.activeUser.loggedIn = false;
      axios.defaults.headers.common['Authorization'] = '';
      document.cookie = 'trello_token=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
      this.state.showNotification('User was logged out', false);
    };
    return { logout, route, router, state };
  }
});
</script>

<style></style>
