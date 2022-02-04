<template>
  <span
    class="cursor-pointer"
    @click="signIn"
  >
    <slot />
  </span>
</template>
<script lang="ts">
import { installGoogleAuth } from '../GoogleAuth';
import { defineComponent, onMounted } from 'vue';
const googleClientId = process.env.VUE_APP_GOOGLE_CLIENT_ID;

export default defineComponent({
  name: 'GoogleAuth',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    clientId: String,
  },
  emits: ['on-submit'],
  setup(props, { emit }) {
    let gAuth: any = null;

    function signIn() {
      if (!gAuth) return;
      gAuth
        .signIn()
        .then((googleUser: any) => {
          const user = {
            id: googleUser?.getBasicProfile()?.getId(),
            email: googleUser?.getBasicProfile()?.getEmail(),
            name: googleUser?.getBasicProfile()?.getName(),
            picture: googleUser?.getBasicProfile()?.getImageUrl(),
            googleUser: googleUser,
          };
          emit('on-submit', user);
        })
        .catch((e: any) => {
          console.log('error', e);
          emit('on-submit', e);
        });
    }

    function signOut() {
      gAuth.signOut();
    }

    const options = {
      clientId: googleClientId,
      scope: 'profile email',
      prompt: 'select_account',
    };
    onMounted(async () => {
      gAuth = await installGoogleAuth(options);
    });

    return { signIn, signOut };
  },
});
</script>
