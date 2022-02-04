<template>
  <div
    class="flex justify-end mr-3 text-white"
    :class="[route.path === '/login' || route.path === '/signup' ? 'invisible' : 'visible']"
  >
    <!-- LOGGED OUT -->
    <div
      v-show="!state.activeUser.loggedIn"
      class="flex self-center h-8 text-sm bg-white rounded-sm cursor-pointer bg-opacity-30 hover:bg-opacity-20"
      data-cy="login-menu"
      @click="router.push('/login')"
    >
      <User class="self-center ml-2 w-6 h-6" />
      <span class="self-center pr-2 pl-1">Log&nbsp;in</span>
    </div>
    <!-- LOGGED IN -->
    <div
      v-show="state.activeUser.loggedIn"
      class="flex self-center h-8 text-sm bg-white rounded-sm cursor-pointer bg-opacity-30 hover:bg-opacity-20"
      data-cy="logged-user"
      @click="
        logout();
        state.getBoardList();
        router.push('/');
      "
    >
      <LogoutIcon class="self-center ml-2 w-5 h-5 text-white fill-current" />
      <div class="inline-block self-center pr-2 pl-1">
        {{ state.activeUser.email }}
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
    User,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const state = store();
    const logout = function (this: any) {
      this.state.activeUser.loggedIn = false;
      axios.defaults.headers.common['Authorization'] = '';
      document.cookie = 'trello_token=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
      this.state.showNotification('User was logged out', false);
    };
    return { logout, route, router, state };
  },
});
</script>

<style></style>
